import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = ({ 
  variant = 'standard',
  title,
  breadcrumbs,
  transparent = false,
  onMenuClick,
  onProfileClick,
  className = '',
  ...props
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect for transparent variant
  useEffect(() => {
    if (variant === 'transparent') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [variant]);
  
  // Base header classes
  const baseClasses = 'w-full py-3 px-4 flex items-center justify-between transition-all duration-300';
  
  // Variant specific classes
  const variantClasses = {
    standard: 'bg-white shadow-sm',
    contextual: 'bg-white shadow-sm',
    transparent: isScrolled 
      ? 'bg-white shadow-sm' 
      : 'bg-transparent'
  };
  
  // Text color for transparent variant
  const textColorClass = (variant === 'transparent' && !isScrolled) 
    ? 'text-white' :'text-charcoal';
  
  // Combine classes
  const headerClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${className}
  `;

  // Logo component
  const Logo = () => (
    <Link to="/home-screen" className="flex items-center">
      <div className="flex items-center">
        <Icon 
          name="Leaf" 
          size={28} 
          className={variant === 'transparent' && !isScrolled ? 'text-leaf-light' : 'text-leaf'} 
        />
        <span className={`ml-2 text-xl font-display font-bold ${textColorClass}`}>
          FarmWise
        </span>
      </div>
    </Link>
  );

  // Navigation items
  const navItems = [
    { path: '/home-screen', label: 'Home', icon: 'Home' },
    { path: '/ai-crop-doctor-screen', label: 'Crop Doctor', icon: 'Stethoscope' },
    { path: '/marketplace-screen', label: 'Marketplace', icon: 'ShoppingCart' },
    { path: '/offline-features-screen', label: 'Offline Tools', icon: 'CloudOff' },
  ];

  // Render breadcrumbs
  const renderBreadcrumbs = () => {
    if (!breadcrumbs) return null;
    
    return (
      <div className="flex items-center text-sm">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <Icon name="ChevronRight" size={16} className="mx-1 text-dark-gray" />
            )}
            {crumb.path ? (
              <Link to={crumb.path} className="text-dark-gray hover:text-leaf">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-dark-gray">{crumb.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <header className={headerClasses} {...props}>
      {/* Left section - Menu button */}
      <div>
        <button
          type="button"
          onClick={onMenuClick}
          className={`p-2 rounded-full hover:bg-light-gray focus:outline-none focus:ring-2 focus:ring-leaf ${textColorClass}`}
          aria-label="Open menu"
        >
          <Icon name="Menu" size={24} />
        </button>
      </div>
      
      {/* Center section - Logo or Title */}
      <div className="flex items-center">
        {variant === 'standard' ? (
          <Logo />
        ) : variant === 'contextual' ? (
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-heading font-semibold text-charcoal">{title}</h1>
            {renderBreadcrumbs()}
          </div>
        ) : (
          <Logo />
        )}
      </div>
      
      {/* Right section - Profile button */}
      <div>
        <button
          type="button"
          onClick={onProfileClick}
          className={`p-2 rounded-full hover:bg-light-gray focus:outline-none focus:ring-2 focus:ring-leaf ${textColorClass}`}
          aria-label="Open profile"
        >
          <Icon name="User" size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;