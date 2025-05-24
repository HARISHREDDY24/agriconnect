import React, { useState } from "react";



import Header from "../../components/ui/Header";
import AlertsSection from "./components/AlertsSection";
import LocationSelector from "./components/LocationSelector";
import IVRCallButton from "./components/IVRCallButton";
import FAQAccordion from "./components/FAQAccordion";
import BottomNavigation from "./components/BottomNavigation";
import LanguageSelector from "./components/LanguageSelector";

const OfflineFeaturesScreen = () => {
  const [isLiteMode, setIsLiteMode] = useState(false);
  const [language, setLanguage] = useState("english");

  const toggleLiteMode = () => {
    setIsLiteMode(!isLiteMode);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const translations = {
    english: {
      title: "Offline Features",
      smsAlerts: "SMS Weather Alerts",
      ivrHelpline: "IVR Helpline",
      liteMode: "Lite Mode",
      location: "Your Location",
    },
    hindi: {
      title: "ऑफलाइन सुविधाएँ",
      smsAlerts: "एसएमएस मौसम अलर्ट",
      ivrHelpline: "आईवीआर हेल्पलाइन",
      liteMode: "लाइट मोड",
      location: "आपका स्थान",
    },
    tamil: {
      title: "ஆஃப்லைன் அம்சங்கள்",
      smsAlerts: "SMS வானிலை எச்சரிக்கைகள்",
      ivrHelpline: "IVR உதவி எண்",
      liteMode: "லைட் மோட்",
      location: "உங்கள் இடம்",
    },
  };

  const t = translations[language];

  return (
    <div className={`min-h-screen flex flex-col ${isLiteMode ? "bg-white" : "bg-light-gray"}`}>
      <Header 
        variant="contextual" 
        title={t.title}
        onMenuClick={() => {}}
        onProfileClick={() => {}}
      />
      
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
        <div className="flex items-center">
          <span className="text-sm font-medium text-dark-gray mr-2">{t.liteMode}</span>
          <button 
            onClick={toggleLiteMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-offset-1 ${isLiteMode ? 'bg-leaf' : 'bg-medium-gray'}`}
          >
            <span 
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isLiteMode ? 'translate-x-6' : 'translate-x-1'}`} 
            />
          </button>
        </div>
        
        <LanguageSelector 
          currentLanguage={language} 
          onLanguageChange={handleLanguageChange} 
        />
      </div>

      <main className={`flex-1 container mx-auto px-4 py-6 ${isLiteMode ? "max-w-md" : ""}`}>
        <div className={`mb-8 ${isLiteMode ? "" : "glassmorphism rounded-lg p-4"}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl ${isLiteMode ? "font-bold" : "font-heading font-semibold"} text-charcoal`}>
              {t.smsAlerts}
            </h2>
            <LocationSelector isLiteMode={isLiteMode} locationLabel={t.location} />
          </div>
          
          <AlertsSection isLiteMode={isLiteMode} />
        </div>

        <div className={`${isLiteMode ? "" : "glassmorphism rounded-lg p-4"}`}>
          <h2 className={`text-xl ${isLiteMode ? "font-bold" : "font-heading font-semibold"} text-charcoal mb-4`}>
            {t.ivrHelpline}
          </h2>
          
          <IVRCallButton isLiteMode={isLiteMode} />
          
          <div className="mt-6">
            <FAQAccordion isLiteMode={isLiteMode} />
          </div>
        </div>
      </main>

      <BottomNavigation isLiteMode={isLiteMode} />
    </div>
  );
};

export default OfflineFeaturesScreen;