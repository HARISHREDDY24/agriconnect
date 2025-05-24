import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const AlertsSection = ({ isLiteMode }) => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  
  const toggleAlerts = () => {
    setAlertsEnabled(!alertsEnabled);
  };

  // Mock data for SMS alerts
  const alerts = [
    {
      id: 1,
      message: "Heavy rainfall expected in your area tomorrow. Consider delaying any planned spraying activities.",
      timestamp: "2023-06-15T09:30:00",
      type: "weather"
    },
    {
      id: 2,
      message: "Temperature will rise to 38°C today. Ensure adequate irrigation for your crops, especially for newly planted seedlings.",
      timestamp: "2023-06-14T08:15:00",
      type: "weather"
    },
    {
      id: 3,
      message: "Locust swarm reported in neighboring districts. Monitor your fields and report any sightings to the agriculture department.",
      timestamp: "2023-06-12T16:45:00",
      type: "pest"
    }
  ];

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get icon based on alert type
  const getAlertIcon = (type) => {
    switch(type) {
      case 'weather':
        return 'Cloud';
      case 'pest':
        return 'Bug';
      case 'market':
        return 'TrendingUp';
      default:
        return 'Bell';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Icon 
            name={alertsEnabled ? "Bell" : "BellOff"} 
            size={20} 
            className={`mr-2 ${alertsEnabled ? "text-leaf" : "text-medium-gray"}`} 
          />
          <span className="text-sm font-medium text-dark-gray">
            {alertsEnabled ? "Alerts enabled" : "Alerts disabled"}
          </span>
        </div>
        
        <button 
          onClick={toggleAlerts}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-offset-1 ${alertsEnabled ? 'bg-leaf' : 'bg-medium-gray'}`}
          aria-pressed={alertsEnabled}
        >
          <span 
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${alertsEnabled ? 'translate-x-6' : 'translate-x-1'}`} 
          />
        </button>
      </div>

      {alertsEnabled ? (
        <div className={`space-y-3 ${isLiteMode ? "" : "animate-fade-in"}`}>
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`
                ${isLiteMode 
                  ? "border border-medium-gray p-3" :"bg-white bg-opacity-80 rounded-lg shadow-sm p-3"
                }
              `}
            >
              <div className="flex items-start">
                <div className={`
                  ${isLiteMode 
                    ? "mr-3" :"flex-shrink-0 rounded-full bg-leaf bg-opacity-10 p-2 mr-3"
                  }
                `}>
                  <Icon 
                    name={getAlertIcon(alert.type)} 
                    size={isLiteMode ? 16 : 20} 
                    className="text-leaf" 
                  />
                </div>
                <div className="flex-1">
                  <p className={`text-sm text-dark-gray ${isLiteMode ? "" : "mb-1"}`}>
                    {alert.message}
                  </p>
                  <div className="flex items-center mt-1">
                    <Icon name="Clock" size={14} className="text-medium-gray mr-1" />
                    <span className="text-xs text-medium-gray">
                      {formatDate(alert.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`text-center py-6 ${isLiteMode ? "border border-dashed border-medium-gray" : "bg-white bg-opacity-50 rounded-lg"}`}>
          <Icon 
            name="BellOff" 
            size={32} 
            className="text-medium-gray mx-auto mb-2" 
          />
          <p className="text-sm text-dark-gray">
            You have disabled SMS alerts.
            <br />
            Toggle the switch above to receive weather updates.
          </p>
        </div>
      )}
      
      <div className="mt-4">
        <p className="text-xs text-medium-gray">
          SMS alerts are sent based on your location and work without internet. Standard SMS rates may apply.
        </p>
      </div>
    </div>
  );
};

export default AlertsSection;