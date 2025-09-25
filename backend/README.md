# Pneumonia Classifier Backend

This Flask backend provides API endpoints for pneumonia classification using AI models and OpenAI analysis.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
Create a `.env` file in the backend directory with:
```
RUNPOD_KEY=your_runpod_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the server:
```bash
python server.py
```

The server will start on `http://localhost:5001`

## API Endpoints

- `POST /api/classify` - Upload and classify chest X-ray images
- `GET /api/health` - Health check endpoint

## Features

- Image upload and validation
- RunPod API integration for pneumonia classification
- OpenAI API integration for detailed analysis
- CORS enabled for frontend integration
- Error handling and validation
