import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const CropListingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    cropType: "",
    quantity: "",
    unit: "kg",
    price: "",
    description: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cropOptions = [
    { value: "rice", label: "Rice" },
    { value: "wheat", label: "Wheat" },
    { value: "cotton", label: "Cotton" },
    { value: "sugarcane", label: "Sugarcane" },
    { value: "maize", label: "Maize" },
    { value: "potato", label: "Potato" },
    { value: "tomato", label: "Tomato" },
    { value: "onion", label: "Onion" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const toggleUnit = () => {
    setFormData({
      ...formData,
      unit: formData.unit === "kg" ? "ton" : "kg",
      // Convert the quantity when changing units
      quantity: formData.quantity 
        ? formData.unit === "kg" 
          ? (parseFloat(formData.quantity) / 1000).toString() 
          : (parseFloat(formData.quantity) * 1000).toString()
        : "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cropType) {
      newErrors.cropType = "Please select a crop type";
    }
    
    if (!formData.quantity) {
      newErrors.quantity = "Please enter a quantity";
    } else if (isNaN(formData.quantity) || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = "Please enter a valid quantity";
    }
    
    if (formData.price && (isNaN(formData.price) || parseFloat(formData.price) <= 0)) {
      newErrors.price = "Please enter a valid price";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onSubmit(formData);
    
    // Reset form
    setFormData({
      cropType: "",
      quantity: "",
      unit: "kg",
      price: "",
      description: "",
    });
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Crop Type Selection */}
        <div>
          <label htmlFor="cropType" className="input-label">
            Crop Type <span className="text-error">*</span>
          </label>
          <select
            id="cropType"
            name="cropType"
            value={formData.cropType}
            onChange={handleChange}
            className={`input-field ${errors.cropType ? "border-error" : ""}`}
            disabled={isSubmitting}
          >
            <option value="">Select a crop</option>
            {cropOptions.map((crop) => (
              <option key={crop.value} value={crop.value}>
                {crop.label}
              </option>
            ))}
          </select>
          {errors.cropType && (
            <p className="input-error">{errors.cropType}</p>
          )}
        </div>

        {/* Quantity with Unit Toggle */}
        <div>
          <label htmlFor="quantity" className="input-label">
            Quantity <span className="text-error">*</span>
          </label>
          <div className="flex">
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className={`input-field rounded-r-none flex-1 ${
                errors.quantity ? "border-error" : ""
              }`}
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={toggleUnit}
              className="px-3 py-2 bg-light-gray border border-medium-gray border-l-0 rounded-r-md font-medium text-dark-gray hover:bg-medium-gray transition-colors"
              disabled={isSubmitting}
            >
              {formData.unit}
            </button>
          </div>
          {errors.quantity && (
            <p className="input-error">{errors.quantity}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Expected Price (Optional) */}
        <div>
          <label htmlFor="price" className="input-label">
            Expected Price (₹ per {formData.unit}) <span className="text-dark-gray text-sm">(Optional)</span>
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter expected price"
            className={`input-field ${errors.price ? "border-error" : ""}`}
            disabled={isSubmitting}
          />
          {errors.price && <p className="input-error">{errors.price}</p>}
        </div>

        {/* Description (Optional) */}
        <div>
          <label htmlFor="description" className="input-label">
            Description <span className="text-dark-gray text-sm">(Optional)</span>
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="E.g., Quality, variety, etc."
            className="input-field"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary flex items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Icon name="Loader" size={18} className="mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Icon name="ListPlus" size={18} className="mr-2" />
              List Crop
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CropListingForm;