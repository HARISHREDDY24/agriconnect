import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const ActionCard = ({ 
  title, 
  description, 
  icon, 
  path, 
  animationSrc,
  bgColor = "from-leaf-light to-leaf",
  iconColor = "text-white" 
}) => {
  return (
    <Link 
      to={path} 
      className="block w-full transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-opacity-50"
    >
      <div className="glassmorphism rounded-xl overflow-hidden shadow-elevation-2 h-full">
        <div className={`bg-gradient-to-br ${bgColor} p-4 flex items-center justify-between`}>
          <div className="flex items-center">
            <div className={`rounded-full p-2 ${iconColor} bg-white bg-opacity-20`}>
              <Icon name={icon} size={24} />
            </div>
            <h3 className="ml-3 text-xl font-heading font-semibold text-white">{title}</h3>
          </div>
          <Icon name="ChevronRight" className="text-white" />
        </div>
        
        <div className="p-4">
          <div className="h-40 mb-4 overflow-hidden rounded-lg bg-light-gray flex items-center justify-center">
            {animationSrc ? (
              <img 
                src={animationSrc} 
                alt={`${title} illustration`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name={icon} size={64} className="text-medium-gray opacity-50" />
            )}
          </div>
          <p className="text-dark-gray">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ActionCard;