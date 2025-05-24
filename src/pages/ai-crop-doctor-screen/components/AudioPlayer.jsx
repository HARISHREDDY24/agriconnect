import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const AudioPlayer = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const audioRef = useRef(null);

  // Languages supported
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "te", name: "Telugu" },
    { code: "ta", name: "Tamil" },
    { code: "pa", name: "Punjabi" }
  ];

  const playAudio = () => {
    // In a real implementation, this would call AWS Polly or similar service
    // For this mock, we'll use the browser's built-in speech synthesis
    
    if (!text) return;
    
    setIsLoading(true);
    
    // Mock a loading delay
    setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set language based on selection
        utterance.lang = language === "en" ? "en-US" : 
                         language === "hi" ? "hi-IN" : 
                         language === "te" ? "te-IN" : 
                         language === "ta" ? "ta-IN" : 
                         language === "pa" ? "pa-IN" : "en-US";
        
        utterance.onstart = () => {
          setIsPlaying(true);
          setIsLoading(false);
        };
        
        utterance.onend = () => {
          setIsPlaying(false);
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
          setIsLoading(false);
        };
        
        window.speechSynthesis.speak(utterance);
        
        // Store reference to cancel if needed
        audioRef.current = utterance;
      } catch (error) {
        console.error("Speech synthesis error:", error);
        setIsLoading(false);
      }
    }, 1000);
  };

  const stopAudio = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Stop current audio if playing
    if (isPlaying) {
      stopAudio();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={language}
        onChange={handleLanguageChange}
        className="text-xs border border-medium-gray rounded-md py-1 px-2 bg-white focus:outline-none focus:ring-2 focus:ring-leaf focus:border-transparent"
        disabled={isPlaying || isLoading}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      
      {isPlaying ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={stopAudio}
          className="p-2 bg-error bg-opacity-10 rounded-full text-error"
          aria-label="Stop audio"
        >
          <Icon name="Square" size={16} />
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={playAudio}
          disabled={isLoading}
          className={`p-2 rounded-full ${
            isLoading 
              ? "bg-light-gray text-dark-gray" :"bg-leaf bg-opacity-10 text-leaf"
          }`}
          aria-label="Play audio"
        >
          {isLoading ? (
            <Icon name="Loader" size={16} className="animate-spin" />
          ) : (
            <Icon name="Volume2" size={16} />
          )}
        </motion.button>
      )}
    </div>
  );
};

export default AudioPlayer;