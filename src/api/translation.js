// src/api/translation.js
const TREATMENT_DB = {
  'Tomato Blight': {
    en: 'Apply neem oil spray\nUse organic fungicides',
    hi: 'नीम का तेल स्प्रे करें\nकार्बनिक कवकनाशी उपयोग करें',
    // Add other languages
  },
  // Add other diseases
};

export const getTreatment = (disease, lang) => {
  return TREATMENT_DB[disease]?.[lang] || 'Treatment unavailable';
};