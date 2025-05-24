import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const PriceComparisonTable = ({ prices, selectedCrop }) => {
  // Convert prices object to array for rendering
  const pricesList = Object.entries(prices).map(([crop, data]) => ({
    crop,
    ...data,
    isSelected: crop === selectedCrop,
  }));

  // Animation variants
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Helper function to format crop name
  const formatCropName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Helper function to determine price trend
  const getPriceTrend = (crop) => {
    // This would normally be calculated based on historical data
    // For mock purposes, we'll use a simple random approach
    const trends = ["up", "down", "stable"];
    const trendIndex = Math.floor(crop.length % 3);
    return trends[trendIndex];
  };

  // Render trend icon
  const renderTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <Icon name="TrendingUp" size={16} className="text-success" />;
      case "down":
        return <Icon name="TrendingDown" size={16} className="text-error" />;
      default:
        return <Icon name="Minus" size={16} className="text-dark-gray" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <motion.table
        className="w-full border-collapse"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <thead>
          <tr className="bg-light-gray">
            <th className="py-3 px-4 text-left font-heading text-charcoal">Crop</th>
            <th className="py-3 px-4 text-right font-heading text-charcoal">Min (₹)</th>
            <th className="py-3 px-4 text-right font-heading text-charcoal">Max (₹)</th>
            <th className="py-3 px-4 text-right font-heading text-charcoal">Avg (₹)</th>
            <th className="py-3 px-4 text-center font-heading text-charcoal">Trend</th>
          </tr>
        </thead>
        <tbody>
          {pricesList.map((item) => {
            const trend = getPriceTrend(item.crop);
            
            return (
              <motion.tr
                key={item.crop}
                variants={rowVariants}
                className={`border-b border-medium-gray border-opacity-30 hover:bg-light-gray transition-colors ${
                  item.isSelected ? "bg-leaf bg-opacity-10" : ""
                }`}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    {item.isSelected && (
                      <Icon name="Check" size={16} className="mr-2 text-leaf" />
                    )}
                    <span className={item.isSelected ? "font-medium text-leaf" : ""}>
                      {formatCropName(item.crop)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">{item.min.toLocaleString()}</td>
                <td className="py-3 px-4 text-right">{item.max.toLocaleString()}</td>
                <td className="py-3 px-4 text-right font-medium">
                  {item.avg.toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-center items-center">
                    {renderTrendIcon(trend)}
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </motion.table>
    </div>
  );
};

export default PriceComparisonTable;