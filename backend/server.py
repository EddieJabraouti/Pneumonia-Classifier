# import os 
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import torch
# import torch.nn as nn

# from model.nn import device, train_dataset, val_dataset, test_dataset, num_workers
# from torch.utils.data import DataLoader


# app = Flask(__name__)
# CORS(app, resources={r"/*":{"origins": "*"}})

# @app.route("/Model", methods=['GET', 'POST'])
# async def model_route(): 
#     return "Dummy words till i implement properly...."

# if __name__ == "__main__":
#     print("starting Flask server...")
#     app.run(host="0.0.0.0", port=5001, debug=True)
import base64
import time
from dotenv import load_dotenv
import os

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

@app.route("/Technology", methods=['GET', 'POST'])
def index():
    if request.method == 'POST': 
        file = request.files['image']
        image_data = base64.b64encode(file.read().decode('utf-8'))

        headers = {
            'Authorization': os.getenv("RUNPOD_KEY"),
        }

        res = request.post('<API>', 
            json = {'input': {'image': image_data}},
            headers=headers)
        
        res_id = res.json()['id']

        for _ in range(10): 
            status_response = request.post(f'<API>{res_id}', headers=headers)
            status = status_response.json()
            if status.get('status').lower() == 'completed': 
                prediction = status['output']['prediction']
                break
            time.sleep(2)

        return render_template('../frontend/src/App.jsx', original_image = f'data:image/jpeg;base64,{image_data}',
                               prediction=prediction)

    return render_template('../frontend/src/App.jsx')

if __name__ == "__main__":
    app.run(debug=True)
