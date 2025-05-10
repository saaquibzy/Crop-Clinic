# elices/app.py
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from your_model_module import predict_disease
from translation import translate_to_local

app = Flask(__name__)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    language = request.form.get('language', 'en')
    image_file = request.files['image']
    
    # Save temporarily
    filename = secure_filename(image_file.filename)
    temp_path = os.path.join('/tmp', filename)
    image_file.save(temp_path)
    
    try:
        # Predict disease
        disease, confidence = predict_disease(temp_path)
        
        # Get treatment in English
        treatment_en = get_treatment_from_db(disease)
        prevention_en = get_prevention_from_db(disease)
        
        # Translate if needed
        if language != 'en':
            treatment = translate_to_local(treatment_en, language)
            prevention = translate_to_local(prevention_en, language)
        else:
            treatment = treatment_en
            prevention = prevention_en
        
        return jsonify({
            'disease': disease,
            'confidence': confidence,
            'treatment': treatment,
            'prevention': prevention
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

# Dummy DB functions - replace with real data
def get_treatment_from_db(disease):
    return {
        'Tomato Blight': 'Apply neem oil spray',
        'Wheat Rust': 'Use fungicides and crop rotation'
    }.get(disease, 'Treatment unavailable')

def get_prevention_from_db(disease):
    return {
        'Tomato Blight': 'Ensure proper air circulation',
        'Wheat Rust': 'Use resistant varieties'
    }.get(disease, 'Prevention unavailable')

if __name__ == '__main__':
    app.run(debug=True)