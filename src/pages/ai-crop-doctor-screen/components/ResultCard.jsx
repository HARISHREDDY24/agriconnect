import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ResultCard = ({ result }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Determine confidence level color
  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return "text-success";
    if (confidence >= 70) return "text-leaf";
    if (confidence >= 50) return "text-warning";
    return "text-error";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-lg overflow-hidden shadow-elevation-1 border border-medium-gray border-opacity-20"
    >
      <div className="relative h-48 bg-light-gray">
        <Image 
          src={result.cropImage} 
          alt={`${result.cropName} with ${result.disease}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-charcoal">
          {formatDate(result.date)}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-heading font-semibold text-charcoal">
              {result.cropName}
            </h3>
            <p className="text-dark-gray text-sm">
              Identified Disease
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full ${getConfidenceColor(result.confidence)} bg-opacity-10 flex items-center`}>
            <Icon name="CheckCircle" size={14} className={`mr-1 ${getConfidenceColor(result.confidence)}`} />
            <span className={`text-xs font-medium ${getConfidenceColor(result.confidence)}`}>
              {result.confidence}% Confidence
            </span>
          </div>
        </div>
        
        <div className="bg-light-gray rounded-lg p-3 mb-2">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-error bg-opacity-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <Icon name="Virus" size={20} className="text-error" />
            </div>
            <div>
              <h4 className="font-medium text-charcoal">
                {result.disease}
              </h4>
              <p className="text-xs text-dark-gray">
                Fungal Disease
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="bg-light-gray rounded-full px-3 py-1 text-xs text-dark-gray flex items-center">
            <Icon name="AlertTriangle" size={12} className="text-warning mr-1" />
            Yield Loss Risk: Medium
          </div>
          <div className="bg-light-gray rounded-full px-3 py-1 text-xs text-dark-gray flex items-center">
            <Icon name="Clock" size={12} className="text-info mr-1" />
            Treatment Urgency: High
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;