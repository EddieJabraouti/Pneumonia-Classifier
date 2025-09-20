import os 
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn

from model.nn import device, train_dataset, val_dataset, test_dataset, num_workers
from torch.utils.data import DataLoader


app = Flask(__name__)
CORS(app, resources={r"/*":{"origins": "*"}})

@app.route("/Model", methods=['GET', 'POST'])
async def model_route(): 
    return "Dummy words till i implement properly...."

if __name__ == "_main__":
    print("starting Flask server...")
    app.run(host="0.0.0.0", port=5001, debug=True)