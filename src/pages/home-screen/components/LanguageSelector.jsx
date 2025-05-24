import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
    { code: "te", name: "తెలుగు" }
  ];
  
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language.name);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center px-3 py-2 text-sm font-medium text-white bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon name="Globe" size={16} className="mr-2" />
        <span>{selectedLanguage}</span>
        <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} className="ml-2" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-elevation-2 z-10 animate-scale-in">
          <ul className="py-1">
            {languages.map((language) => (
              <li key={language.code}>
                <button
                  type="button"
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-light-gray ${
                    selectedLanguage === language.name
                      ? "text-leaf font-medium" :"text-dark-gray"
                  }`}
                  onClick={() => handleLanguageChange(language)}
                >
                  {language.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;