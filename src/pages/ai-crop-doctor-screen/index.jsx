import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../../components/AppIcon";
import Header from "../../components/ui/Header";
import ImageUploader from "./components/ImageUploader";
import ResultCard from "./components/ResultCard";
import AudioPlayer from "./components/AudioPlayer";
import HistorySection from "./components/HistorySection";

const AICropDoctorScreen = () => {
  const [activeTab, setActiveTab] = useState("diagnosis");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [error, setError] = useState(null);
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);

  // Mock data for diagnosis history
  useEffect(() => {
    // Simulate loading history from storage
    const mockHistory = [
      {
        id: "diag-001",
        cropImage: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cropName: "Tomato",
        disease: "Early Blight",
        confidence: 92,
        date: new Date(Date.now() - 86400000 * 2), // 2 days ago
      },
      {
        id: "diag-002",
        cropImage: "https://images.unsplash.com/photo-1592394533824-9440e5d68530?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cropName: "Potato",
        disease: "Late Blight",
        confidence: 87,
        date: new Date(Date.now() - 86400000 * 5), // 5 days ago
      },
      {
        id: "diag-003",
        cropImage: "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cropName: "Rice",
        disease: "Bacterial Leaf Blight",
        confidence: 95,
        date: new Date(Date.now() - 86400000 * 7), // 7 days ago
      },
    ];
    setDiagnosisHistory(mockHistory);
  }, []);

  const handleImageUpload = (imageFile) => {
    // Reset any previous errors
    setError(null);
    
    // Start analysis process
    setIsAnalyzing(true);
    
    // Mock the image analysis process with a timeout
    setTimeout(() => {
      // 10% chance of analysis failure for demo purposes
      if (Math.random() < 0.1) {
        setIsAnalyzing(false);
        setError({
          type: "analysis",
          message: "We couldn't analyze this image. Please try with a clearer photo or a different image."
        });
        return;
      }
      
      // Mock successful analysis result
      const mockResult = {
        id: `diag-${Date.now()}`,
        cropName: "Tomato",
        disease: "Leaf Spot",
        confidence: Math.floor(85 + Math.random() * 15), // 85-99% confidence
        date: new Date(),
        cropImage: URL.createObjectURL(imageFile),
        remedy: `Leaf spot is a common fungal disease affecting tomato plants. To treat this condition:

1. Remove and destroy affected leaves to prevent spread.
2. Apply a copper-based fungicide every 7-10 days.
3. Ensure proper spacing between plants for good air circulation.
4. Water at the base of plants to keep foliage dry.
5. Rotate crops annually to prevent disease buildup in soil.

Early intervention is key to preventing the spread to healthy parts of the plant and nearby plants.`,
      };
      
      setIsAnalyzing(false);
      setDiagnosisResult(mockResult);
      
      // Add to history
      setDiagnosisHistory(prev => [mockResult, ...prev].slice(0, 10)); // Keep only last 10 diagnoses
    }, 3000); // 3 second mock analysis time
  };

  const handlePermissionError = () => {
    setError({
      type: "permission",
      message: "Camera access was denied. Please enable camera permissions in your browser settings to use this feature."
    });
  };

  const handleUploadError = () => {
    setError({
      type: "upload",
      message: "Failed to upload image. Please check your connection and try again."
    });
  };

  const resetDiagnosis = () => {
    setDiagnosisResult(null);
    setError(null);
  };

  const breadcrumbs = [
    { label: "Home", path: "/home-screen" },
    { label: "AI Crop Doctor" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-light-gray">
      <Header 
        variant="contextual" 
        title="AI Crop Doctor" 
        breadcrumbs={breadcrumbs}
      />
      
      <div className="flex-1 max-w-4xl mx-auto w-full p-4">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === "diagnosis" ?"text-leaf border-b-2 border-leaf" :"text-dark-gray"
              }`}
              onClick={() => setActiveTab("diagnosis")}
            >
              <div className="flex items-center justify-center">
                <Icon name="Stethoscope" size={20} className="mr-2" />
                Diagnosis
              </div>
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === "history" ?"text-leaf border-b-2 border-leaf" :"text-dark-gray"
              }`}
              onClick={() => setActiveTab("history")}
            >
              <div className="flex items-center justify-center">
                <Icon name="Clock" size={20} className="mr-2" />
                History
              </div>
            </button>
          </div>
        </div>

        {/* Main content area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-4 md:p-6"
        >
          {activeTab === "diagnosis" ? (
            <div>
              {!isAnalyzing && !diagnosisResult && !error && (
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-24 h-24 bg-leaf bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Camera" size={40} className="text-leaf" />
                    </div>
                    <h2 className="text-xl font-heading font-semibold text-charcoal mb-2">
                      Diagnose Your Crop
                    </h2>
                    <p className="text-dark-gray mb-6">
                      Take a clear photo of the affected plant part for accurate diagnosis
                    </p>
                  </div>
                  
                  <ImageUploader 
                    onImageCapture={handleImageUpload}
                    onPermissionError={handlePermissionError}
                    onUploadError={handleUploadError}
                  />
                  
                  <div className="mt-8 p-4 bg-light-gray rounded-lg">
                    <h3 className="font-medium text-charcoal mb-2">Tips for best results:</h3>
                    <ul className="text-sm text-dark-gray space-y-2">
                      <li className="flex items-start">
                        <Icon name="Check" size={16} className="text-leaf mt-0.5 mr-2 flex-shrink-0" />
                        <span>Take close-up photos of affected areas</span>
                      </li>
                      <li className="flex items-start">
                        <Icon name="Check" size={16} className="text-leaf mt-0.5 mr-2 flex-shrink-0" />
                        <span>Ensure good lighting for clear details</span>
                      </li>
                      <li className="flex items-start">
                        <Icon name="Check" size={16} className="text-leaf mt-0.5 mr-2 flex-shrink-0" />
                        <span>Include both healthy and affected parts for comparison</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-8">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    {/* Lottie animation would go here in production */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full rounded-full border-4 border-leaf border-opacity-25"></div>
                      <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-leaf border-t-transparent animate-spin"></div>
                    </div>
                  </div>
                  <h2 className="text-xl font-heading font-semibold text-charcoal mb-2">
                    Analyzing your crop...
                  </h2>
                  <p className="text-dark-gray">
                    Our AI is examining the image for signs of disease
                  </p>
                </div>
              )}

              {error && (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-error bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={error.type === "permission" ? "ShieldAlert" : "AlertTriangle"} size={32} className="text-error" />
                  </div>
                  <h2 className="text-xl font-heading font-semibold text-charcoal mb-2">
                    {error.type === "permission" ? "Permission Required" : 
                     error.type === "upload"? "Upload Failed" : "Analysis Failed"}
                  </h2>
                  <p className="text-dark-gray mb-6 max-w-md mx-auto">
                    {error.message}
                  </p>
                  
                  {error.type === "permission" && (
                    <button 
                      className="btn-primary"
                      onClick={() => window.location.reload()}
                    >
                      Try Again
                    </button>
                  )}
                  
                  {(error.type === "upload" || error.type === "analysis") && (
                    <button 
                      className="btn-primary"
                      onClick={resetDiagnosis}
                    >
                      Try Again
                    </button>
                  )}
                </div>
              )}

              {diagnosisResult && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-heading font-semibold text-charcoal">
                      Diagnosis Result
                    </h2>
                    <button 
                      onClick={resetDiagnosis}
                      className="text-leaf hover:text-leaf-dark flex items-center"
                    >
                      <Icon name="RotateCcw" size={16} className="mr-1" />
                      New Diagnosis
                    </button>
                  </div>
                  
                  <ResultCard 
                    result={diagnosisResult}
                  />
                  
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-charcoal">Recommended Treatment</h3>
                      <AudioPlayer text={diagnosisResult.remedy} />
                    </div>
                    
                    <div className="p-4 bg-light-gray rounded-lg">
                      <p className="text-dark-gray whitespace-pre-line">
                        {diagnosisResult.remedy}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <HistorySection 
              history={diagnosisHistory}
              onSelectItem={(item) => {
                setDiagnosisResult(item);
                setActiveTab("diagnosis");
              }}
            />
          )}
        </motion.div>
      </div>
      
      {/* Bottom navigation */}
      <div className="bg-white shadow-elevation-1 p-4">
        <Link 
          to="/home-screen"
          className="btn-secondary w-full flex items-center justify-center"
        >
          <Icon name="ArrowLeft" size={18} className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AICropDoctorScreen;