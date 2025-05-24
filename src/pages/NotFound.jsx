import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/AppIcon";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-leaf-light to-wheat bg-opacity-10 p-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-elevation-2 p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <Icon name="AlertTriangle" size={64} className="text-warning mx-auto" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-4">Page Not Found</h1>
        <p className="text-dark-gray mb-8">
          The page you are looking for doesn't exist or is still under development.
        </p>
        <Link
          to="/home-screen"
          className="btn-primary inline-flex items-center justify-center"
        >
          <Icon name="Home" size={18} className="mr-2" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;