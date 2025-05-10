# elices/your_model_module.py
import tensorflow as tf
from PIL import Image
import numpy as np

# Load your trained model
MODEL_PATH = '../models/plant_disease_model.h5'
model = tf.keras.models.load_model(MODEL_PATH)

DISEASE_CLASSES = {
    0: 'Tomato Blight',
    1: 'Wheat Rust',
    2: 'Rice Blast',
    # Add all your classes
}

def preprocess_image(image_path):
    img = Image.open(image_path).convert('RGB')
    img = img.resize((224, 224))  # Match your model input size
    img_array = np.array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

def predict_disease(image_path):
    processed_img = preprocess_image(image_path)
    predictions = model.predict(processed_img)[0]
    predicted_class = np.argmax(predictions)
    confidence = float(predictions[predicted_class]) * 100
    return DISEASE_CLASSES.get(predicted_class, 'Unknown'), confidence