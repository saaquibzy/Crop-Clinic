import tensorflow as tf

# Path to your trained Keras model
model_path = "models/plant_disease_model.h5"
# Output TFLite model path
tflite_model_path = "models/plant_disease_model.tflite"

# Load the Keras model
model = tf.keras.models.load_model(model_path)

# Convert to TensorFlow Lite model
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

# Save the TFLite model to disk
with open(tflite_model_path, 'wb') as f:
    f.write(tflite_model)

print(f"✅ TFLite model saved at {tflite_model_path}")
