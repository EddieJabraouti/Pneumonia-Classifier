import json 
import base64
from io import BytesIO
import io 

import torch 
import torch.nn as nn 
from torchvision import transforms, models 
from PIL import Image

import runpod

model = models.resnet18(weights=None)
model.fc = nn.Sequential(
    nn.Dropout(p=0.7), 
    nn.Linear(model.fc.in_features, 2),
    nn.ReLU(inplace=True)
)
model.load_state_dict(torch.load('src/pneumonia_classifier.pth', map_location=torch.device('cpu'), weights_only=False))
model.eval

transform = transforms.Compose([
    transforms.Resize(256), #Resize(420)
    transforms.CenterCrop(224), #CenterCrop(384)
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225]),
])

class_names = ['NORMAL', 'PNEUMONIA']

def validate_input(job_input): 
    if job_input is None: 
        return None, 'Please provide an Image'
    
    if isinstance(job_input, str): 
        try: 
            job_input = json.load(job_input)
        except json.JSONDecodeError: 
            return None, 'Invalid JSON format'
        
    image_data = job_input.get('image')

    if image_data is None: 
        return None, "Please provide an image"
    
    if not isinstance(image_data, str): 
        return None, 'Image must be Base64 encoded string'
    return {'image': image_data}


def handler(job):
    '''
    This is the handler function for the job.
    '''
    job_input = job['input']
    name = job_input.get('name', 'World')
    return f"Hello, {name}!"

runpod.serverless.start({"handler": handler})
