// src/api/cropService.js
export const analyzeImage = async (file, language) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await fetch('http://localhost:5000/api/analyze', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Analysis failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};