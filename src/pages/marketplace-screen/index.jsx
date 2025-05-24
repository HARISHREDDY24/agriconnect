import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../components/AppIcon";
import Header from "../../components/ui/Header";
import CropListingForm from "./components/CropListingForm";
import PriceComparisonTable from "./components/PriceComparisonTable";
import BuyerCard from "./components/BuyerCard";
import BottomNavigation from "./components/BottomNavigation";
import EmptyState from "./components/EmptyState";

const MarketplaceScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [listings, setListings] = useState([]);
  const [mandiPrices, setMandiPrices] = useState({});
  const [buyerOffers, setBuyerOffers] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");

  // Mock data for mandi prices
  const mockMandiPrices = {
    rice: { min: 1800, max: 2200, avg: 2000 },
    wheat: { min: 1950, max: 2350, avg: 2150 },
    cotton: { min: 5500, max: 6200, avg: 5800 },
    sugarcane: { min: 280, max: 350, avg: 310 },
    maize: { min: 1700, max: 1950, avg: 1800 },
    potato: { min: 1200, max: 1500, avg: 1350 },
    tomato: { min: 1500, max: 2000, avg: 1750 },
    onion: { min: 1300, max: 1800, avg: 1550 },
  };

  // Mock data for buyer offers
  const mockBuyerOffers = {
    rice: [
      {
        id: 1,
        name: "Agro Processors Ltd.",
        price: 2150,
        quantity: 500,
        unit: "ton",
        location: "Haryana",
        contact: "+91 98765 43210",
        rating: 4.5,
      },
      {
        id: 2,
        name: "National Food Corp",
        price: 2050,
        quantity: 1000,
        unit: "ton",
        location: "Punjab",
        contact: "+91 87654 32109",
        rating: 4.2,
      },
      {
        id: 3,
        name: "Farmer\'s Cooperative",
        price: 2100,
        quantity: 250,
        unit: "ton",
        location: "Uttar Pradesh",
        contact: "+91 76543 21098",
        rating: 4.7,
      },
    ],
    wheat: [
      {
        id: 4,
        name: "Grain Exporters Inc.",
        price: 2250,
        quantity: 750,
        unit: "ton",
        location: "Madhya Pradesh",
        contact: "+91 65432 10987",
        rating: 4.3,
      },
      {
        id: 5,
        name: "Regional Mills",
        price: 2200,
        quantity: 500,
        unit: "ton",
        location: "Rajasthan",
        contact: "+91 54321 09876",
        rating: 4.0,
      },
    ],
    cotton: [
      {
        id: 6,
        name: "Textile Industries",
        price: 6000,
        quantity: 100,
        unit: "ton",
        location: "Gujarat",
        contact: "+91 43210 98765",
        rating: 4.6,
      },
    ],
    sugarcane: [
      {
        id: 7,
        name: "Sugar Mills Ltd.",
        price: 330,
        quantity: 5000,
        unit: "ton",
        location: "Maharashtra",
        contact: "+91 32109 87654",
        rating: 4.4,
      },
    ],
    maize: [
      {
        id: 8,
        name: "Poultry Feed Co.",
        price: 1850,
        quantity: 300,
        unit: "ton",
        location: "Karnataka",
        contact: "+91 21098 76543",
        rating: 4.1,
      },
    ],
    potato: [
      {
        id: 9,
        name: "Food Processing Inc.",
        price: 1400,
        quantity: 200,
        unit: "ton",
        location: "West Bengal",
        contact: "+91 10987 65432",
        rating: 4.2,
      },
    ],
    tomato: [
      {
        id: 10,
        name: "Fresh Produce Ltd.",
        price: 1800,
        quantity: 50,
        unit: "ton",
        location: "Tamil Nadu",
        contact: "+91 09876 54321",
        rating: 4.3,
      },
    ],
    onion: [
      {
        id: 11,
        name: "Vegetable Exporters",
        price: 1600,
        quantity: 150,
        unit: "ton",
        location: "Andhra Pradesh",
        contact: "+91 98765 12345",
        rating: 4.4,
      },
    ],
  };

  useEffect(() => {
    // Simulate loading data on initial render
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Set mock data
    setMandiPrices(mockMandiPrices);
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update with mock data (in a real app, this would fetch fresh data)
    setMandiPrices(mockMandiPrices);
    setRefreshing(false);
  };

  const handleCropSubmit = (cropData) => {
    // Add the new listing
    const newListing = {
      id: Date.now(),
      ...cropData,
      timestamp: new Date(),
    };
    
    setListings([newListing, ...listings]);
    
    // Update selected crop to show relevant buyer offers
    setSelectedCrop(cropData.cropType);
    
    // Set buyer offers based on selected crop
    setBuyerOffers(mockBuyerOffers[cropData.cropType] || []);
  };

  // Breadcrumbs for the header
  const breadcrumbs = [
    { label: 'Home', path: '/home-screen' },
    { label: 'Marketplace', path: null }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-off-white">
      <Header 
        variant="contextual" 
        title="Crop Marketplace" 
        breadcrumbs={breadcrumbs}
      />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Pull to refresh indicator */}
        {refreshing && (
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 text-leaf"
            >
              <Icon name="RefreshCw" size={32} />
            </motion.div>
          </div>
        )}
        
        {/* Crop Listing Form */}
        <section className="mb-8">
          <div className="card p-4 md:p-6">
            <h2 className="text-xl font-heading font-semibold text-charcoal mb-4">
              List Your Crop
            </h2>
            <CropListingForm onSubmit={handleCropSubmit} />
          </div>
        </section>
        
        {/* Market Prices Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-semibold text-charcoal">
              Current Market Prices
            </h2>
            <button 
              onClick={handleRefresh}
              className="btn-tertiary flex items-center"
              disabled={refreshing}
            >
              <Icon name="RefreshCw" size={18} className="mr-2" />
              Refresh
            </button>
          </div>
          
          {isLoading ? (
            <div className="card p-4 flex justify-center items-center h-40">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="text-leaf"
              >
                <Icon name="Loader" size={32} />
              </motion.div>
            </div>
          ) : (
            <PriceComparisonTable prices={mandiPrices} selectedCrop={selectedCrop} />
          )}
        </section>
        
        {/* Buyer Offers Section */}
        <section className="mb-16">
          <h2 className="text-xl font-heading font-semibold text-charcoal mb-4">
            Potential Buyers
          </h2>
          
          {selectedCrop ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {buyerOffers.map((buyer) => (
                <BuyerCard key={buyer.id} buyer={buyer} />
              ))}
            </div>
          ) : listings.length > 0 ? (
            <div className="card p-6 text-center">
              <p className="text-dark-gray">
                Select a crop to view potential buyer offers
              </p>
            </div>
          ) : (
            <EmptyState 
              message="List your crops to see potential buyer offers" 
              suggestion="Try listing wheat, rice, or cotton to see available buyers"
            />
          )}
        </section>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default MarketplaceScreen;