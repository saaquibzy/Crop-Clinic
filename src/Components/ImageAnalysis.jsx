import { useState, useRef } from 'react';
import { Camera, Upload, Loader2, Leaf } from 'lucide-react';

export default function ImageAnalysis() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en'); // Default to English
  const fileInputRef = useRef();
  const videoRef = useRef();
  const [showCamera, setShowCamera] = useState(false);

  // Supported local languages (customize as needed)
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'mr', name: 'Marathi' },
    { code: 'ta', name: 'Tamil' },
    // Add more languages as needed
  ];

  const handleImageUpload = async (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('language', language);

      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera error: ", err);
      alert("Could not access camera");
      setShowCamera(false);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    
    canvas.toBlob((blob) => {
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
      handleImageUpload(file);
      stopCamera();
    }, 'image/jpeg', 0.95);
  };

  const stopCamera = () => {
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Leaf className="text-green-600 mr-2" />
        <h2 className="text-2xl font-bold text-green-800">Crop Disease Detection</h2>
      </div>

      {/* Language Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Image Upload/Capture Area */}
      {!showCamera ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
          {preview ? (
            <div className="mb-4">
              <img 
                src={preview} 
                alt="Preview" 
                className="mx-auto max-h-64 rounded-md"
              />
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="mb-4 text-gray-600">
                Upload a photo of affected plant leaves
              </p>
            </>
          )}

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
            >
              <Upload className="mr-2" size={16} />
              Upload Image
            </button>
            
            <button
              onClick={startCamera}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            >
              <Camera className="mr-2" size={16} />
              Take Photo
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])}
            className="hidden"
          />
        </div>
      ) : (
        <div className="mb-6">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline
            className="w-full rounded-md border border-gray-300"
          />
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={captureImage}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Capture
            </button>
            <button
              onClick={stopCamera}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Results Section */}
      {isLoading && (
        <div className="text-center py-8">
          <Loader2 className="w-12 h-12 mx-auto animate-spin text-green-600" />
          <p className="mt-2 text-gray-600">Analyzing your image...</p>
        </div>
      )}

      {results && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-green-800">
            Analysis Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Disease Detected:</h4>
              <p className="text-lg font-bold">{results.disease}</p>
              
              <h4 className="font-medium mt-4 mb-2">Confidence Level:</h4>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-green-600 h-4 rounded-full" 
                  style={{ width: `${results.confidence}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {results.confidence}% confidence
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Recommended Treatment:</h4>
              <p className="whitespace-pre-line">{results.treatment}</p>
              
              {results.prevention && (
                <>
                  <h4 className="font-medium mt-4 mb-2">Prevention Tips:</h4>
                  <p className="whitespace-pre-line">{results.prevention}</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}