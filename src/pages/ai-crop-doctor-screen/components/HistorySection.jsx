import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const HistorySection = ({ history, onSelectItem }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // If history is empty
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="History" size={32} className="text-dark-gray" />
        </div>
        <h2 className="text-xl font-heading font-semibold text-charcoal mb-2">
          No Diagnosis History
        </h2>
        <p className="text-dark-gray mb-6">
          Your previous crop diagnoses will appear here
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-heading font-semibold text-charcoal mb-4">
        Diagnosis History
      </h2>
      
      <div className="space-y-4">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white border border-medium-gray border-opacity-20 rounded-lg overflow-hidden shadow-sm hover:shadow-elevation-1 transition-shadow cursor-pointer"
            onClick={() => onSelectItem(item)}
          >
            <div className="flex">
              <div className="w-24 h-24 bg-light-gray flex-shrink-0">
                <Image 
                  src={item.cropImage} 
                  alt={item.cropName} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-3 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-charcoal">
                      {item.cropName}
                    </h3>
                    <p className="text-sm text-error">
                      {item.disease}
                    </p>
                  </div>
                  <span className="text-xs text-dark-gray">
                    {formatDate(item.date)}
                  </span>
                </div>
                
                <div className="mt-2 flex items-center">
                  <div className="text-xs bg-light-gray rounded-full px-2 py-0.5 flex items-center">
                    <Icon name="CheckCircle" size={12} className="text-leaf mr-1" />
                    <span>{item.confidence}% Confidence</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center pr-3">
                <Icon name="ChevronRight" size={20} className="text-dark-gray" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HistorySection;