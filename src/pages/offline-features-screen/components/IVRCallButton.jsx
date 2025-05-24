import React from "react";
import Icon from "../../../components/AppIcon";

const IVRCallButton = ({ isLiteMode }) => {
  const helplineNumber = "1800-180-1551";
  
  const handleCall = () => {
    window.location.href = `tel:${helplineNumber}`;
  };

  return (
    <div className="text-center">
      <div 
        className={`
          mx-auto mb-4 max-w-xs
          ${isLiteMode 
            ? "border border-leaf p-4" :"bg-white bg-opacity-90 rounded-lg shadow-sm p-6"
          }
        `}
      >
        <h3 className="text-lg font-medium text-charcoal mb-2">
          Kisan Call Center
        </h3>
        <p className="text-sm text-dark-gray mb-4">
          Get expert advice on farming issues in your language
        </p>
        
        <button
          onClick={handleCall}
          className={`
            flex items-center justify-center w-full py-3 px-4 text-white font-medium
            ${isLiteMode 
              ? "bg-leaf" :"bg-leaf rounded-lg shadow-sm hover:bg-leaf-dark transition-colors duration-200"
            }
            focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-opacity-50
          `}
        >
          <Icon name="Phone" size={20} className="mr-2" />
          <span className="text-lg">{helplineNumber}</span>
        </button>
      </div>
      
      <div className="text-sm text-dark-gray">
        <p className="mb-2">
          <Icon name="Clock" size={16} className="inline-block mr-1 text-leaf" />
          Available from 6:00 AM to 10:00 PM
        </p>
        <p>
          <Icon name="Globe" size={16} className="inline-block mr-1 text-leaf" />
          Support in 22 Indian languages
        </p>
      </div>
    </div>
  );
};

export default IVRCallButton;