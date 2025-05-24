import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const FAQAccordion = ({ isLiteMode }) => {
  const [openItem, setOpenItem] = useState(0);

  // Mock data for FAQs
  const faqs = [
    {
      id: 1,
      question: "How to identify common pests in wheat crops?",
      answer: "Look for symptoms like chewed leaves (grasshoppers/locusts), wilting despite watering (root pests), or small holes in leaves (beetles). For wheat specifically, check for aphids on the underside of leaves and stems. They appear as tiny green/black dots. Armyworms leave ragged leaf edges and can be found in the soil near plants. Always inspect during early morning or evening when pests are most active."
    },
    {
      id: 2,
      question: "What is the best time to irrigate rice fields?",
      answer: "Rice fields should be irrigated to maintain a water depth of 2-5 cm during the vegetative stage. Increase to 5-10 cm during flowering. The critical irrigation periods are: 1) 15-20 days after transplanting, 2) during panicle initiation, and 3) during flowering/grain filling. Irrigate preferably in the morning to reduce water loss through evaporation. Reduce water 7-10 days before harvesting to facilitate field drainage."
    },
    {
      id: 3,
      question: "How to prepare soil for sowing in the Kharif season?",
      answer: "For Kharif crops, prepare soil 30-45 days before sowing. Start with deep plowing (15-20 cm) to break hardpan and improve water penetration. Follow with 2-3 harrowing operations to break clods and level the field. Incorporate well-decomposed farmyard manure (5-10 tonnes/hectare) during the final plowing. For acidic soils, apply lime 2-3 weeks before sowing. Ensure proper field drainage to avoid waterlogging during monsoon."
    },
    {
      id: 4,
      question: "What are natural methods to control fungal diseases?",
      answer: "Several effective natural methods include: 1) Neem oil spray (mix 5ml neem oil with 1L water and few drops of soap), 2) Garlic extract spray (crush 50g garlic, soak in water overnight, dilute and spray), 3) Cow urine solution (dilute 1:10 with water), 4) Wood ash dusting on affected plants, 5) Proper crop rotation and spacing to improve air circulation, 6) Removing and burning infected plant parts. Apply these remedies early morning or evening for best results."
    },
    {
      id: 5,
      question: "When and how to apply organic fertilizers?",
      answer: "Apply organic fertilizers 2-3 weeks before sowing/planting. For established crops, apply around the drip line (not touching the stem). Recommended quantities: Compost/vermicompost: 5-10 tonnes/hectare, Farmyard manure: 10-15 tonnes/hectare, Green manure: incorporate into soil 40-45 days after sowing. For fruit trees, apply organic fertilizers after fruit harvest or before flowering. Always mix organic fertilizers with soil and irrigate afterward to prevent nutrient loss."
    }
  ];

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="space-y-2">
      <h3 className={`text-lg ${isLiteMode ? "font-bold" : "font-heading font-semibold"} text-charcoal mb-3`}>
        Common Farming Questions
      </h3>
      
      {faqs.map((faq, index) => (
        <div 
          key={faq.id}
          className={`
            ${isLiteMode 
              ? "border border-medium-gray" :"bg-white bg-opacity-80 rounded-lg shadow-sm"
            }
            ${openItem === index ? (isLiteMode ? "border-leaf" : "ring-1 ring-leaf") : ""}
          `}
        >
          <button
            onClick={() => toggleItem(index)}
            className="flex justify-between items-center w-full text-left px-4 py-3 focus:outline-none"
            aria-expanded={openItem === index}
          >
            <span className={`font-medium ${isLiteMode ? "text-charcoal" : "text-dark-gray"}`}>
              {faq.question}
            </span>
            <Icon 
              name={openItem === index ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className={`flex-shrink-0 ml-2 ${openItem === index ? "text-leaf" : "text-medium-gray"}`} 
            />
          </button>
          
          {openItem === index && (
            <div 
              className={`
                px-4 pb-3 text-sm text-dark-gray
                ${isLiteMode ? "" : "animate-fade-in"}
              `}
            >
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
      
      <div className="text-center mt-4">
        <button
          className={`
            text-sm font-medium text-leaf flex items-center justify-center mx-auto
            ${isLiteMode ? "" : "hover:text-leaf-dark transition-colors duration-200"}
            focus:outline-none focus:underline
          `}
        >
          <span>View more farming tips</span>
          <Icon name="ArrowRight" size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default FAQAccordion;