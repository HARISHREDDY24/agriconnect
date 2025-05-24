import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Header from "../../components/ui/Header";
import ActionCard from "./components/ActionCard";
import WeatherWidget from "./components/WeatherWidget";
import BottomNavigation from "./components/BottomNavigation";
import LanguageSelector from "./components/LanguageSelector";
import IvrHelplineModal from "./components/IvrHelplineModal";

const HomeScreen = () => {
  const [isIvrModalOpen, setIsIvrModalOpen] = useState(false);
  
  // Mock data for action cards
  const actionCards = [
    {
      id: 1,
      title: "AI Crop Doctor",
      description: "Upload photos of your crops to diagnose diseases and get treatment recommendations.",
      icon: "Stethoscope",
      path: "/ai-crop-doctor-screen",
      animationSrc: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      bgColor: "from-leaf-light to-leaf"
    },
    {
      id: 2,
      title: "Marketplace",
      description: "Buy and sell crops directly. Connect with buyers and get the best prices for your produce.",
      icon: "ShoppingCart",
      path: "/marketplace-screen",
      animationSrc: "https://images.pexels.com/photos/2284170/pexels-photo-2284170.jpeg?auto=compress&cs=tinysrgb&w=500",
      bgColor: "from-soil to-harvest"
    },
    {
      id: 3,
      title: "Offline Features",
      description: "Access weather alerts via SMS and use our IVR helpline when you don\'t have internet.",
      icon: "CloudOff",
      path: "/offline-features-screen",
      animationSrc: "https://images.pixabay.com/photo/2018/05/31/11/54/sms-3443579_960_720.jpg?auto=compress&cs=tinysrgb&w=500",
      bgColor: "from-info to-sky"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-leaf-light to-wheat bg-opacity-10 pb-20">
      {/* Hero Section with Header */}
      <div className="relative bg-gradient-to-br from-leaf to-soil h-64 rounded-b-3xl shadow-elevation-2">
        <div className="absolute inset-0 bg-charcoal bg-opacity-30"></div>
        
        <div className="relative z-10">
          {/* Custom Header for Home */}
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
              <Icon name="Leaf" size={32} className="text-white" />
              <h1 className="ml-2 text-2xl font-display font-bold text-white">AgriConnect</h1>
            </div>
            <LanguageSelector />
          </div>
          
          <div className="px-6 pt-8">
            <h2 className="text-white text-3xl font-heading font-bold mb-2">
              Welcome, Farmer!
            </h2>
            <p className="text-white text-opacity-90">
              Your AI-powered farming assistant
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-4 -mt-10">
        {/* Weather Widget */}
        <div className="mb-6">
          <WeatherWidget />
        </div>
        
        {/* Action Cards */}
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {actionCards.map((card) => (
            <ActionCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              path={card.path}
              animationSrc={card.animationSrc}
              bgColor={card.bgColor}
            />
          ))}
        </div>
        
        {/* Government Schemes Banner */}
        <div className="mt-8 glassmorphism rounded-xl overflow-hidden shadow-elevation-1">
          <div className="bg-gradient-to-r from-wheat to-harvest p-3">
            <h3 className="text-charcoal font-heading font-medium">Government Schemes</h3>
          </div>
          
          <div className="p-4">
            <div className="flex items-center mb-4">
              <Icon name="Award" size={24} className="text-soil mr-3" />
              <div>
                <h4 className="font-medium">PM Kisan Samman Nidhi</h4>
                <p className="text-sm text-dark-gray">Next installment due in 15 days</p>
              </div>
            </div>
            
            <Link 
              to="/schemes" 
              className="text-leaf flex items-center text-sm font-medium"
            >
              <span>View all schemes</span>
              <Icon name="ChevronRight" size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation onIvrClick={() => setIsIvrModalOpen(true)} />
      
      {/* IVR Helpline Modal */}
      <IvrHelplineModal 
        isOpen={isIvrModalOpen} 
        onClose={() => setIsIvrModalOpen(false)} 
      />
    </div>
  );
};

export default HomeScreen;