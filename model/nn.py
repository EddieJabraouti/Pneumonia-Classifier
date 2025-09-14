import os
from PIL import Image, ImageFile

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
from torch.optim.lr_scheduler import StepLR
from torchvision import transforms, models
from sklearn.metrics import accuracy_score
ImageFile.LOAD_TRUNCATED_IMAGES = True  # tolerate partial/corrupt files

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

ALLOWED_EXTS = {'.jpg', '.jpeg', '.png', '.bmp', '.tif', '.tiff', '.webp'}

class PneumoniaDataset(Dataset):
    def __init__(self, root_dir, transform=None):
        self.root_dir = root_dir
        self.transform = transform
        self.image_paths, self.labels = [], []

        for label_name, y in [('NORMAL', 0), ('PNEUMONIA', 1)]:
            class_dir = os.path.join(root_dir, label_name)
            if not os.path.isdir(class_dir):
                continue
            for fname in os.listdir(class_dir):
                # skip hidden files (.DS_Store) and non-images
                if fname.startswith('.'):
                    continue
                ext = os.path.splitext(fname)[1].lower()
                if ext not in ALLOWED_EXTS:
                    continue
                self.image_paths.append(os.path.join(class_dir, fname))
                self.labels.append(y)

    def __len__(self):
        return len(self.image_paths)

    def __getitem__(self, idx):
        img_path = self.image_paths[idx]
        try:
            image = Image.open(img_path).convert('RGB')
        except Exception:
            image = Image.new('RGB', (224, 224))
        label = self.labels[idx]
        if self.transform:
            image = self.transform(image)
        return image, label

# Transforms
train_tf = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225]),
])
eval_tf = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225]),
])

# Datasets / Loaders
train_dataset = PneumoniaDataset('data/chest_xray/train', transform=train_tf)
val_dataset   = PneumoniaDataset('data/chest_xray/val',   transform=eval_tf)
test_dataset  = PneumoniaDataset('data/chest_xray/test',  transform=eval_tf)

num_workers = min(8, (os.cpu_count() or 2))  
common_loader_args = dict(batch_size=32, pin_memory=torch.cuda.is_available(),
                          num_workers=num_workers, persistent_workers=num_workers>0)

train_loader = DataLoader(train_dataset, shuffle=True,  **common_loader_args)
val_loader   = DataLoader(val_dataset,   shuffle=False, **common_loader_args)
test_loader  = DataLoader(test_dataset,  shuffle=False, **common_loader_args)

# Model
model = models.resnet18(weights=models.ResNet18_Weights.IMAGENET1K_V1)
model.fc = nn.Sequential(
    nn.Dropout(p=0.7), 
    nn.Linear(model.fc.in_features, 3),
    nn.ReLU(inplace=True), 
)
model.to(device)

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=1e-3)
scheduler = StepLR(optimizer, step_size = 4, gamma = 0.1)


num_epochs = 16

for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0

    for images, labels in train_loader:
        images = images.to(device, non_blocking=True)
        labels = labels.to(device, non_blocking=True)

        optimizer.zero_grad(set_to_none=True)
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()
    scheduler.step()

    print(f"Epoch {epoch+1}/{num_epochs} - Loss: {running_loss/len(train_loader):.4f}")

    # Validation
    model.eval()
    val_labels, val_preds = [], []
    with torch.no_grad():
        for images, labels in val_loader:
            images = images.to(device, non_blocking=True)
            outputs = model(images)
            preds = outputs.argmax(1).cpu().numpy()
            val_preds.extend(preds)
            val_labels.extend(labels.numpy())
    val_acc = accuracy_score(val_labels, val_preds)
    print(f"Validation accuracy: {val_acc:.4f}")

# Test
model.eval()
test_labels, test_preds = [], []
with torch.no_grad():
    for images, labels in test_loader:
        images = images.to(device, non_blocking=True)
        outputs = model(images)
        preds = outputs.argmax(1).cpu().numpy()
        test_preds.extend(preds)
        test_labels.extend(labels.numpy())
test_acc = accuracy_score(test_labels, test_preds)
print(f"Test accuracy: {test_acc:.4f}")

torch.save(model.state_dict(), 'pneumonia_classifier.pth')
print("Saved to pneumonia_classifier.pth")