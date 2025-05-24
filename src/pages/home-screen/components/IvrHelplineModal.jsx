import React from "react";
import Icon from "../../../components/AppIcon";

const IvrHelplineModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-charcoal bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-elevation-3 max-w-md w-full animate-scale-in">
        <div className="p-4 border-b border-medium-gray border-opacity-20 flex justify-between items-center">
          <h2 className="text-xl font-heading font-semibold text-charcoal">Farmer Helpline</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-light-gray focus:outline-none focus:ring-2 focus:ring-leaf"
          >
            <Icon name="X" size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-leaf bg-opacity-10 flex items-center justify-center">
              <Icon name="PhoneCall" size={36} className="text-leaf" />
            </div>
          </div>
          
          <p className="text-center text-dark-gray mb-6">
            Our experts are available 24/7 to help with your farming queries. Call our toll-free number:
          </p>
          
          <div className="text-center mb-6">
            <a 
              href="tel:18001801551" 
              className="text-2xl font-heading font-bold text-leaf"
            >
              1800-180-1551
            </a>
          </div>
          
          <div className="bg-light-gray rounded-lg p-4 mb-6">
            <h3 className="font-medium text-charcoal mb-2">Available Services:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Icon name="Check" size={18} className="text-success mr-2 mt-0.5" />
                <span>Crop disease diagnosis assistance</span>
              </li>
              <li className="flex items-start">
                <Icon name="Check" size={18} className="text-success mr-2 mt-0.5" />
                <span>Weather advisory and alerts</span>
              </li>
              <li className="flex items-start">
                <Icon name="Check" size={18} className="text-success mr-2 mt-0.5" />
                <span>Market price information</span>
              </li>
              <li className="flex items-start">
                <Icon name="Check" size={18} className="text-success mr-2 mt-0.5" />
                <span>Government scheme guidance</span>
              </li>
            </ul>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IvrHelplineModal;