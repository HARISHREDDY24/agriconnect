import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const EmptyState = ({ message, suggestion }) => {
  return (
    <motion.div
      className="card p-8 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-24 h-24 mb-6 text-leaf-light">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Icon name="Sprout" size={96} />
        </motion.div>
      </div>
      
      <h3 className="text-xl font-heading font-semibold text-charcoal mb-2">
        No Crops Listed Yet
      </h3>
      
      <p className="text-dark-gray mb-4">
        {message}
      </p>
      
      {suggestion && (
        <div className="bg-light-gray p-3 rounded-lg text-sm text-dark-gray flex items-start">
          <Icon name="Lightbulb" size={18} className="text-wheat mr-2 mt-0.5" />
          <span>{suggestion}</span>
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;