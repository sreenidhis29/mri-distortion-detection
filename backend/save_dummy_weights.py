import os
import torch
from app.models.cnn import MRIModel

def main():
    os.makedirs("weights", exist_ok=True)
    model = MRIModel(num_classes=3)
    torch.save(model.state_dict(), "weights/best_model.pth")
    print("✅ Dummy weights created at weights/best_model.pth")

if __name__ == "__main__":
    main()
