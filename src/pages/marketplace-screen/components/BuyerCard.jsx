import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const BuyerCard = ({ buyer }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const showContact = (e) => {
    e.stopPropagation();
    setIsContactVisible(true);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const contactVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto", 
      transition: { duration: 0.3 } 
    },
  };

  // Helper function to render stars for rating
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Icon key={`full-${i}`} name="Star" size={16} className="text-wheat" />
        ))}
        {hasHalfStar && (
          <Icon name="StarHalf" size={16} className="text-wheat" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon key={`empty-${i}`} name="Star" size={16} className="text-medium-gray" />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="card-interactive"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onClick={toggleExpand}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-heading font-semibold text-charcoal">
            {buyer.name}
          </h3>
          <div className="flex items-center mt-1">
            <Icon name="MapPin" size={14} className="text-dark-gray mr-1" />
            <span className="text-sm text-dark-gray">{buyer.location}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-lg font-medium text-leaf">
            ₹{buyer.price.toLocaleString()}
            <span className="text-sm text-dark-gray ml-1">
              per {buyer.unit}
            </span>
          </div>
          <div className="mt-1">
            {renderRatingStars(buyer.rating)}
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div className="flex items-center">
          <Icon name="Package" size={16} className="text-dark-gray mr-1" />
          <span className="text-sm">
            Needs {buyer.quantity.toLocaleString()} {buyer.unit}
          </span>
        </div>
        
        {!isContactVisible ? (
          <button
            className="btn-primary py-1 px-3 text-sm"
            onClick={showContact}
          >
            Connect
          </button>
        ) : (
          <div className="text-success text-sm font-medium flex items-center">
            <Icon name="Check" size={14} className="mr-1" />
            Connected
          </div>
        )}
      </div>

      {isExpanded && (
        <motion.div 
          className="mt-4 pt-4 border-t border-medium-gray border-opacity-30"
          variants={contactVariants}
          initial="hidden"
          animate="visible"
        >
          <h4 className="font-medium text-charcoal mb-2">Buyer Details</h4>
          
          {isContactVisible ? (
            <div className="space-y-2">
              <div className="flex items-center">
                <Icon name="Phone" size={16} className="text-leaf mr-2" />
                <a 
                  href={`tel:${buyer.contact}`} 
                  className="text-leaf hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {buyer.contact}
                </a>
              </div>
              <div className="flex items-center">
                <Icon name="Mail" size={16} className="text-dark-gray mr-2" />
                <a 
                  href={`mailto:info@${buyer.name.toLowerCase().replace(/\s+/g, '')}.com`} 
                  className="text-dark-gray hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  info@{buyer.name.toLowerCase().replace(/\s+/g, '')}.com
                </a>
              </div>
              <div className="flex items-start mt-2">
                <Icon name="AlertCircle" size={16} className="text-warning mr-2 mt-0.5" />
                <p className="text-sm text-dark-gray">
                  Always verify buyer credentials and payment terms before finalizing any deal.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center p-4">
              <button
                className="btn-primary flex items-center"
                onClick={showContact}
              >
                <Icon name="UserCheck" size={16} className="mr-2" />
                Show Contact Details
              </button>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BuyerCard;