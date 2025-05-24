import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const LocationSelector = ({ isLiteMode, locationLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Pune, Maharashtra");

  // Mock data for districts
  const districts = [
    { id: 1, name: "Pune, Maharashtra" },
    { id: 2, name: "Nashik, Maharashtra" },
    { id: 3, name: "Ahmednagar, Maharashtra" },
    { id: 4, name: "Satara, Maharashtra" },
    { id: 5, name: "Kolhapur, Maharashtra" },
    { id: 6, name: "Solapur, Maharashtra" },
    { id: 7, name: "Sangli, Maharashtra" },
    { id: 8, name: "Jalgaon, Maharashtra" },
    { id: 9, name: "Dhule, Maharashtra" },
    { id: 10, name: "Nanded, Maharashtra" }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLocation = (location) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`
          flex items-center text-sm font-medium 
          ${isLiteMode 
            ? "border border-medium-gray px-2 py-1" :"bg-white bg-opacity-80 rounded-md px-3 py-1.5 shadow-sm hover:bg-opacity-100"
          }
          focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-opacity-50
        `}
      >
        <Icon name="MapPin" size={16} className="text-leaf mr-1" />
        <span className="mr-1">{selectedLocation}</span>
        <Icon name="ChevronDown" size={16} className="text-medium-gray" />
      </button>

      {isOpen && (
        <div 
          className={`
            absolute right-0 mt-1 z-10 w-64 
            ${isLiteMode 
              ? "border border-medium-gray bg-white" :"bg-white rounded-md shadow-elevation-2"
            }
          `}
        >
          <div className="p-2">
            <div className="mb-2">
              <label className="text-xs font-medium text-dark-gray block mb-1">
                {locationLabel}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search districts..."
                  className="w-full px-3 py-1.5 text-sm border border-medium-gray rounded-md focus:outline-none focus:ring-2 focus:ring-leaf focus:border-transparent"
                />
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-medium-gray" 
                />
              </div>
            </div>
            
            <div className={`max-h-48 overflow-y-auto ${isLiteMode ? "" : "scrollbar-thin"}`}>
              {districts.map((district) => (
                <button
                  key={district.id}
                  onClick={() => selectLocation(district.name)}
                  className={`
                    w-full text-left px-3 py-2 text-sm 
                    ${selectedLocation === district.name 
                      ? "bg-leaf bg-opacity-10 text-leaf" :"text-dark-gray hover:bg-light-gray"
                    }
                    ${isLiteMode ? "" : "rounded-md"}
                  `}
                >
                  {district.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;