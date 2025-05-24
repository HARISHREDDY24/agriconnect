import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({
  variant = 'expanded',
  isOpen = false,
  onClose,
  className = '',
  contextualOptions,
  ...props
}) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');
  
  // Update active item based on current location
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);
  
  // Base sidebar classes
  const baseClasses = 'transition-all duration-300 bg-white h-full';
  
  // Variant specific classes
  const variantClasses = {
    expanded: 'w-64 border-r border-light-gray',
    collapsed: 'w-16 border-r border-light-gray',
    contextual: 'w-64 border-r border-light-gray',
  };
  
  // Mobile drawer classes
  const mobileDrawerClasses = `
    fixed top-0 left-0 h-full z-50 shadow-lg transform 
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;
  
  // Combine classes
  const sidebarClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${className}
    ${props.isMobile ? mobileDrawerClasses : ''}
  `;

  // Navigation items
  const navItems = [
    { 
      path: '/home-screen', 
      label: 'Home', 
      icon: 'Home',
      description: 'Dashboard and overview'
    },
    { 
      path: '/ai-crop-doctor-screen', 
      label: 'Crop Doctor', 
      icon: 'Stethoscope',
      description: 'Diagnose plant issues'
    },
    { 
      path: '/marketplace-screen', 
      label: 'Marketplace', 
      icon: 'ShoppingCart',
      description: 'Buy and sell produce'
    },
    { 
      path: '/offline-features-screen', 
      label: 'Offline Tools', 
      icon: 'CloudOff',
      description: 'Use without internet'
    },
    { 
      path: '/weather-forecast', 
      label: 'Weather', 
      icon: 'Cloud',
      description: 'Local weather forecasts'
    },
    { 
      path: '/soil-analysis', 
      label: 'Soil Analysis', 
      icon: 'Layers',
      description: 'Soil health monitoring'
    },
  ];

  // Get contextual options based on current path
  const getContextualOptions = () => {
    if (contextualOptions) return contextualOptions;
    
    // Default contextual options based on path
    if (activeItem === '/ai-crop-doctor-screen') {
      return [
        { path: '/crop-diagnosis', label: 'New Diagnosis', icon: 'Plus' },
        { path: '/diagnosis-history', label: 'History', icon: 'History' },
        { path: '/saved-plants', label: 'Saved Plants', icon: 'Bookmark' },
        { path: '/treatment-guides', label: 'Treatment Guides', icon: 'FileText' },
      ];
    }
    
    if (activeItem === '/marketplace-screen') {
      return [
        { path: '/my-listings', label: 'My Listings', icon: 'Tag' },
        { path: '/browse-products', label: 'Browse Products', icon: 'Search' },
        { path: '/orders', label: 'Orders', icon: 'Package' },
        { path: '/market-prices', label: 'Market Prices', icon: 'BarChart' },
      ];
    }
    
    return navItems;
  };

  // Render navigation items
  const renderNavItems = (items) => {
    return items.map((item, index) => {
      const isActive = activeItem === item.path;
      
      return (
        <Link
          key={index}
          to={item.path}
          className={`
            flex items-center px-4 py-3 my-1 rounded-md transition-colors
            ${isActive 
              ? 'bg-leaf bg-opacity-10 text-leaf' :'text-dark-gray hover:bg-light-gray'
            }
            ${variant === 'collapsed' ? 'justify-center' : ''}
          `}
          aria-current={isActive ? 'page' : undefined}
        >
          <Icon 
            name={item.icon} 
            size={24} 
            className={isActive ? 'text-leaf' : 'text-dark-gray'} 
          />
          
          {variant !== 'collapsed' && (
            <div className="ml-3 overflow-hidden">
              <div className="font-medium">{item.label}</div>
              {variant === 'expanded' && item.description && (
                <div className="text-xs text-dark-gray truncate">
                  {item.description}
                </div>
              )}
            </div>
          )}
        </Link>
      );
    });
  };

  // Overlay for mobile drawer
  const renderOverlay = () => {
    if (!props.isMobile || !isOpen) return null;
    
    return (
      <div 
        className="fixed inset-0 bg-charcoal bg-opacity-50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
    );
  };

  return (
    <>
      {renderOverlay()}
      
      <aside className={sidebarClasses} {...props}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-light-gray flex items-center">
          {(variant !== 'collapsed' || props.isMobile) && (
            <div className="flex items-center">
              <Icon name="Leaf" size={28} className="text-leaf" />
              {variant !== 'collapsed' && (
                <span className="ml-2 text-xl font-display font-bold text-charcoal">
                  FarmWise
                </span>
              )}
            </div>
          )}
          
          {props.isMobile && (
            <button
              type="button"
              onClick={onClose}
              className="ml-auto p-2 rounded-full hover:bg-light-gray text-dark-gray"
              aria-label="Close sidebar"
            >
              <Icon name="X" size={24} />
            </button>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="p-2 overflow-y-auto" style={{ height: 'calc(100% - 70px)' }}>
          {variant === 'contextual' 
            ? renderNavItems(getContextualOptions())
            : renderNavItems(navItems)
          }
          
          {/* Bottom section with settings and help */}
          <div className="mt-8 pt-4 border-t border-light-gray">
            {renderNavItems([
              { path: '/settings', label: 'Settings', icon: 'Settings' },
              { path: '/help', label: 'Help & Support', icon: 'HelpCircle' },
            ])}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;