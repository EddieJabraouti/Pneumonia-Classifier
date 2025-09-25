import base64
import time
import requests
import json
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import torch
import torch.nn as nn
from PIL import Image
import io
import torchvision.transforms as transforms

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
            return "OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables."
        
        headers = {
            'Authorization': f'Bearer {openai_api_key}',
            'Content-Type': 'application/json'
        }
        
        # Create a detailed prompt for medical analysis
        prompt = f"""
        As a medical AI assistant, provide a detailed analysis of this chest X-ray classification result:
        
        Classification: {prediction}
        Confidence: {confidence:.2f}
        
        Please provide:
        1. What this classification means in medical terms
        2. Key visual indicators that would support this diagnosis
        3. Important considerations and limitations
        4. General recommendations (note: this is not medical advice)
        
        Keep the response professional, informative, and accessible to both medical professionals and patients.
        """
        
        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": "You are a helpful medical AI assistant that provides educational information about chest X-ray analysis. Always remind users that this is not a substitute for professional medical advice."},
                {"role": "user", "content": prompt}
            ],
            "max_tokens": 500,
            "temperature": 0.7
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
        headers = {
            'Authorization': os.getenv("RUNPOD_KEY"),
        }
        
        if not headers['Authorization']:
            return None, "RunPod API key not configured"
        
        res = requests.post('https://api.runpod.ai/v2/mcqd9qdg80jr35/run', 
            json={'input': {'image': image_data}},
            headers=headers)
        
        if res.status_code != 200:
            return None, f"RunPod API error: {res.status_code}"
        
        res_id = res.json()['id']
        
        # Poll for results
        for _ in range(10): 
            status_response = requests.post(f'https://api.runpod.ai/v2/mcqd9qdg80jr35/status/{res_id}', headers=headers)
            if status_response.status_code == 200:
                status = status_response.json()
                if status.get('status', '').lower() == 'completed': 
                    prediction = status['output']['prediction']
                    confidence = status['output'].get('confidence', 0.85)  # Default confidence if not provided
                    return prediction, confidence
            time.sleep(2)
        
        return None, "Classification timeout"
        
    except Exception as e:
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
