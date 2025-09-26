import base64
import time
import requests
import json
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure upload settings
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_openai_analysis(prediction, confidence):
    """Generate analysis using OpenAI API"""
    try:
        openai_api_key = os.getenv("OPENAI_API_KEY")
        if not openai_api_key:
            # Return an educational mock analysis
            return f"""<strong>What this means:</strong> The AI model classified this chest X-ray as {prediction} with {confidence:.1%} confidence. This classification indicates {'no radiographic evidence of pneumonia' if prediction == 'NORMAL' else 'radiographic findings consistent with pneumonia'}.

<strong>Key findings:</strong> {'Clear bilateral lung fields, normal cardiac silhouette, and absence of consolidation or pleural effusion' if prediction == 'NORMAL' else 'Consolidation patterns, airspace opacities, and possible pleural effusion consistent with pneumonic process'}.

<strong>Important notes:</strong> This analysis is for educational purposes only. AI classification has inherent limitations and should not replace clinical correlation or professional radiological interpretation.

<strong>Next steps:</strong> {'Standard follow-up protocols apply. Consult healthcare provider if symptoms develop' if prediction == 'NORMAL' else 'Immediate clinical correlation recommended. Follow standard pneumonia management protocols'}."""
        
        headers = {
            'Authorization': f'Bearer {openai_api_key}',
            'Content-Type': 'application/json'
        }
        
        # Create an educational prompt for students and patients
        prompt = f"""
        Provide an educational analysis of this chest X-ray classification for learning purposes:
        
        Classification: {prediction}
        Confidence: {confidence:.1%}
        
        Format your response as:
        <strong>What this means:</strong> [Medical interpretation for educational purposes]
        <strong>Key findings:</strong> [Visual indicators that support this classification]
        <strong>Important notes:</strong> [Technical limitations and clinical considerations]
        <strong>Next steps:</strong> [Standard medical protocols and recommendations]
        
        Write in a clinical, educational tone suitable for medical students and informed patients. 
        Use medical terminology appropriately. Make it around 400 words. 
        Always state this is for educational purposes only and not medical advice.
        """
        
        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": "You are a clinical AI assistant providing educational analysis of chest X-ray classifications. Use appropriate medical terminology and maintain a professional, clinical tone. This is for educational purposes only and not medical advice."},
                {"role": "user", "content": prompt}
            ],
            "max_tokens": 1000,
            "temperature": 0.5
        }
        
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers=headers,
            json=data,
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            return result['choices'][0]['message']['content']
        else:
            return f"Error generating analysis: {response.status_code} - {response.text}"
            
    except Exception as e:
        return f"Error connecting to OpenAI API: {str(e)}"

def classify_image_with_runpod(image_data):
    """Classify image using RunPod API"""
    try:
        runpod_key = os.getenv("RUNPOD_KEY")
        if not runpod_key:
            return None, "RunPod API key not configured. Please set RUNPOD_KEY in your environment variables."
        
        # Clean the API key by removing any whitespace/newlines
        runpod_key = runpod_key.strip()
        
        # Debug: Print API key length (first 10 chars for security)
        print(f"RunPod API key length: {len(runpod_key)}, starts with: {runpod_key[:10]}...")
        
        headers = {
            'Authorization': runpod_key,
        }
        
        res = requests.post(
            'https://api.runpod.ai/v2/mcqd9qdg80jr35/run',
            json={'input': {'image': image_data}},
            headers=headers,
            timeout=int(os.getenv('RUNPOD_RUN_TIMEOUT', '60'))
        )
        
        if res.status_code != 200:
            return None, f"RunPod API error: {res.status_code} - {res.text}"
        
        res_data = res.json()
        if 'id' not in res_data:
            return None, f"RunPod API response missing job ID: {res_data}"
        
        res_id = res_data['id']
        print(f"RunPod job started with ID: {res_id}")
        
        # Poll for results with configurable timeout and interval
        max_attempts = int(os.getenv('RUNPOD_MAX_ATTEMPTS', '180'))
        poll_interval = float(os.getenv('RUNPOD_POLL_INTERVAL', '3.0'))
        status_timeout = int(os.getenv('RUNPOD_STATUS_TIMEOUT', '180'))
        status_url = f'https://api.runpod.ai/v2/mcqd9qdg80jr35/status/{res_id}'
        
        for attempt in range(max_attempts): 
            try:
                # RunPod status checks often expect POST
                status_response = requests.post(
                    status_url,
                    headers=headers,
                    timeout=status_timeout
                )
                
                if status_response.status_code == 200:
                    status = status_response.json()
                    print(f"Attempt {attempt + 1}: Status = {status.get('status', 'unknown')}")
                    
                    if status.get('status', '').lower() == 'completed': 
                        output = status.get('output', {})
                        prediction = output.get('Prediction', 'UNKNOWN')
                        # RunPod handler doesn't return confidence, so we'll use a default
                        confidence = 0.85
                        print(f"Classification completed: {prediction} (confidence: {confidence})")
                        return prediction, confidence
                    elif status.get('status', '').lower() == 'failed':
                        error_msg = status.get('error', 'Unknown error')
                        print(f"RunPod job failed: {error_msg}")
                        
                        # Check if it's the known handler bug
                        if "not enough values to unpack" in str(error_msg):
                            print("Detected known RunPod handler bug - please redeploy the function")
                            return None, "RunPod function has a bug. Please redeploy with fixed handler.py code."
                        
                        return None, f"RunPod job failed: {error_msg}"
                else:
                    print(f"Status check failed with code: {status_response.status_code}")
                    
            except requests.exceptions.RequestException as e:
                print(f"Request error on attempt {attempt + 1}: {e}")
                
            time.sleep(poll_interval)
        
        # If we reach here, the job timed out
        print(f"RunPod job {res_id} timed out after {max_attempts * poll_interval} seconds")
        return None, f"Classification timeout after {max_attempts * poll_interval} seconds"
        
    except requests.exceptions.Timeout:
        return None, "RunPod API request timed out"
    except requests.exceptions.ConnectionError:
        return None, "Failed to connect to RunPod API"
    except Exception as e:
        print(f"Unexpected error in RunPod classification: {e}")
        return None, f"Classification error: {str(e)}"

@app.route("/api/classify", methods=['POST'])
def classify_image():
    """Endpoint for image classification"""
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Please upload a PNG, JPG, or JPEG image.'}), 400
        
        # Read and encode image
        image_bytes = file.read()
        image_data = base64.b64encode(image_bytes).decode('utf-8')
        
        # Classify image
        prediction, confidence_or_error = classify_image_with_runpod(image_data)
        
        if prediction is None:
            return jsonify({'error': confidence_or_error}), 500
        
        # Generate OpenAI analysis
        analysis = get_openai_analysis(prediction, confidence_or_error)
        
        return jsonify({
            'success': True,
            'prediction': prediction,
            'confidence': confidence_or_error,
            'analysis': analysis,
            'image_data': f'data:image/jpeg;base64,{image_data}'
        })
        
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route("/api/health", methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Pneumonia Classifier API is running'})

if __name__ == "__main__":
    print("Starting Pneumonia Classifier Flask server...")
    app.run(host="0.0.0.0", port=5001, debug=True)
