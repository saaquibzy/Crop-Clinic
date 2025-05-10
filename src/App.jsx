// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import HeroSection from './Components/HeroSection';
import FeatureSection from './Components/FeatureSection';
import WorkFlow from './Components/WorkFlow';
import Pricing from './Components/Pricing';
import Testimonial from './Components/Testimonial';
import Footer from './Components/Footer';
import AnalysisPage from './components/AnalysisPage'; // Ensure path is correct

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-50">
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="max-w-7xl mx-auto pt-20 px-6">
                <HeroSection />
                <FeatureSection />
                <WorkFlow />
                <Pricing />
                <Testimonial />
              </div>
            }
          />
          <Route path="/analyze" element={<AnalysisPage />} /> {/* Add this line */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}