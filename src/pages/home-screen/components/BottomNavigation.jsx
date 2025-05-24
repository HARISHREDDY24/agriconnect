import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const BottomNavigation = ({ onIvrClick }) => {
  const location = useLocation();
  
  const navItems = [
    { path: "/home-screen", label: "Home", icon: "Home" },
    { path: "/ai-crop-doctor-screen", label: "Crop Doctor", icon: "Stethoscope" },
    { path: "/marketplace-screen", label: "Market", icon: "ShoppingCart" },
    { path: "/offline-features-screen", label: "Offline", icon: "CloudOff" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-elevation-3 border-t border-medium-gray border-opacity-20 z-10">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-4 ${
                isActive ? "text-leaf" : "text-dark-gray"
              }`}
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
        
        <button
          onClick={onIvrClick}
          className="flex flex-col items-center py-2 px-4 text-soil"
        >
          <Icon name="PhoneCall" size={24} />
          <span className="text-xs mt-1">Helpline</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;