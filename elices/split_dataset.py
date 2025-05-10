import os
import shutil
import random

# Define paths
source_dir = "data/resized/PlantVillage"  # Your resized dataset
output_dir = "data/split_dataset"
train_dir = os.path.join(output_dir, "train")
val_dir = os.path.join(output_dir, "val")

split_ratio = 0.8  # 80% train, 20% val

def split_class_folder(class_name):
    class_path = os.path.join(source_dir, class_name)
    if not os.path.isdir(class_path):
        return

    # Create train/val folders for this class
    os.makedirs(os.path.join(train_dir, class_name), exist_ok=True)
    os.makedirs(os.path.join(val_dir, class_name), exist_ok=True)

    images = [f for f in os.listdir(class_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    random.shuffle(images)

    split_idx = int(len(images) * split_ratio)
    train_images = images[:split_idx]
    val_images = images[split_idx:]

    # Copy train images
    for img in train_images:
        src = os.path.join(class_path, img)
        dst = os.path.join(train_dir, class_name, img)
        shutil.copy(src, dst)

    # Copy validation images
    for img in val_images:
        src = os.path.join(class_path, img)
        dst = os.path.join(val_dir, class_name, img)
        shutil.copy(src, dst)

    print(f"✅ Processed class: {class_name} | Train: {len(train_images)} | Val: {len(val_images)}")


def split_all_classes():
    print("🔄 Starting dataset split...")
    print(f"Using source folder: {source_dir}")
    print(f"Saving to: {output_dir}\n")

    for class_name in os.listdir(source_dir):
        split_class_folder(class_name)

    print("\n🎉 Dataset split complete!")
    print(f"Train: {train_dir}")
    print(f"Val: {val_dir}")

if __name__ == "__main__":
    split_all_classes()