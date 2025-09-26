Pneumonia-Classifier

End-to-end web app to classify chest X-ray images as Pneumonia vs Normal using a deep-learning model, with a JavaScript frontend and a Python backend. The repo includes a small sample of X-ray images for quick testing and a ready-to-containerize setup via Docker.

Folders present in the repo: backend/, frontend/, model/, xray/. Primary languages: JavaScript and Python; a Dockerfile is included. 
GitHub

✨ Features

Upload a chest X-ray image and get a prediction with confidence.

REST API for programmatic inference.

Reproducible environment (Docker) + local dev workflows.

Clear separation of concerns:

frontend/ – UI (likely React/Vite/Next.js)

backend/ – API server (e.g., FastAPI/Flask) + model inference

model/ – training code and/or saved weights

xray/ – sample images for quick manual tests

🧰 Tech Stack

Model: CNN (transfer learning friendly; see model/)

Backend: Python (FastAPI or Flask), PyTorch/TensorFlow (adjust per your code)

Frontend: JavaScript (React/Vite/Next.js)

Container: Docker

The language breakdown (mostly JS + Python) and Dockerfile presence are reported by GitHub’s language stats. 
GitHub

📁 Repository Structure
