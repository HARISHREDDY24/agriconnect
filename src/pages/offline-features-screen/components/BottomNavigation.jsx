import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const BottomNavigation = ({ isLiteMode }) => {
  const location = useLocation();
  
  const navItems = [
    { path: "/home-screen", label: "Home", icon: "Home" },
    { path: "/ai-crop-doctor-screen", label: "Crop Doctor", icon: "Stethoscope" },
    { path: "/marketplace-screen", label: "Market", icon: "ShoppingCart" },
    { path: "/offline-features-screen", label: "Offline", icon: "CloudOff" },
  ];

  return (
    <div 
      className={`
        fixed bottom-0 left-0 right-0 z-10
        ${isLiteMode 
          ? "bg-white border-t border-medium-gray" :"bg-white bg-opacity-90 backdrop-blur-md shadow-elevation-2"
        }
      `}
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center w-1/4 h-full
                ${isActive 
                  ? "text-leaf" :"text-dark-gray"
                }
                ${isLiteMode ? "" : "transition-colors duration-200 hover:text-leaf-light"}
              `}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon 
                name={item.icon} 
                size={24} 
                className={isActive ? "fill-current" : ""} 
              />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;