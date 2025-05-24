import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: "english", label: "English" },
    { code: "hindi", label: "हिंदी" },
    { code: "tamil", label: "தமிழ்" },
    { code: "marathi", label: "मराठी" },
    { code: "punjabi", label: "ਪੰਜਾਬੀ" },
    { code: "gujarati", label: "ગુજરાતી" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (code) => {
    onLanguageChange(code);
    setIsOpen(false);
  };

  const getLanguageLabel = () => {
    const language = languages.find(lang => lang.code === currentLanguage);
    return language ? language.label : "English";
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center text-sm font-medium text-dark-gray focus:outline-none"
      >
        <Icon name="Globe" size={16} className="text-leaf mr-1" />
        <span className="mr-1">{getLanguageLabel()}</span>
        <Icon name="ChevronDown" size={14} className="text-medium-gray" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 z-10 w-36 bg-white rounded-md shadow-elevation-2">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => selectLanguage(language.code)}
                className={`
                  w-full text-left px-3 py-2 text-sm 
                  ${currentLanguage === language.code 
                    ? "bg-leaf bg-opacity-10 text-leaf" :"text-dark-gray hover:bg-light-gray"
                  }
                `}
              >
                {language.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;