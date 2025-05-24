import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import HomeScreen from "./pages/home-screen";
import AICropDoctorScreen from "./pages/ai-crop-doctor-screen";
import MarketplaceScreen from "./pages/marketplace-screen";
import OfflineFeaturesScreen from "./pages/offline-features-screen";
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/home-screen" element={<HomeScreen />} />
          <Route path="/ai-crop-doctor-screen" element={<AICropDoctorScreen />} />
          <Route path="/marketplace-screen" element={<MarketplaceScreen />} />
          <Route path="/offline-features-screen" element={<OfflineFeaturesScreen />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;