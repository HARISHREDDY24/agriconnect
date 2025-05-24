import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      path: "/home-screen",
      label: "Home",
      icon: "Home",
    },
    {
      path: "/ai-crop-doctor-screen",
      label: "Crop Doctor",
      icon: "Stethoscope",
    },
    {
      path: "/marketplace-screen",
      label: "Market",
      icon: "ShoppingCart",
    },
    {
      path: "/offline-features-screen",
      label: "Offline",
      icon: "CloudOff",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-elevation-2 border-t border-medium-gray border-opacity-20 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full ${
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
      </div>
    </nav>
  );
};

export default BottomNavigation;