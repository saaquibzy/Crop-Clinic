import cv2
import os

# Define paths
input_root = "data/raw/PlantVillage"  # Original dataset
output_root = "data/resized/PlantVillage"  # Resized dataset
target_size = (224, 224)  # Target size for resizing

def resize_class_folder(class_path, output_class_path):
    """Resize all images in a single class folder"""
    os.makedirs(output_class_path, exist_ok=True)

    for filename in os.listdir(class_path):
        input_path = os.path.join(class_path, filename)
        name, ext = os.path.splitext(filename)
        output_path = os.path.join(output_class_path, f"{name}_resized{ext}")

        # Skip non-image files
        if ext.lower() not in [".jpg", ".jpeg", ".png"]:
            print(f"📎 Skipped non-image file: {filename}")
            continue

        # Read and resize image
        image = cv2.imread(input_path)
        if image is None:
            print(f"❌ Failed to load: {filename}")
            continue

        resized_image = cv2.resize(image, target_size)
        cv2.imwrite(output_path, resized_image)
        print(f"✅ Resized: {filename} → {output_path}")

def resize_all_plantvillage():
    """Main function to resize entire PlantVillage dataset"""
    print("🔄 Starting batch resizing of PlantVillage dataset...")

    # Loop through each class folder
    for class_name in os.listdir(input_root):
        class_path = os.path.join(input_root, class_name)
        output_class_path = os.path.join(output_root, class_name)

        if not os.path.isdir(class_path):
            continue  # skip non-folder items

        print(f"\n📂 Processing: {class_name}")
        resize_class_folder(class_path, output_class_path)

    print("\n🎉 Dataset resizing complete!")

# Run the script
if __name__ == "__main__":
    resize_all_plantvillage()