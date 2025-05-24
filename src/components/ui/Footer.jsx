import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = ({
  variant = 'standard',
  className = '',
  ...props
}) => {
  const location = useLocation();
  
  // Base footer classes
  const baseClasses = 'w-full transition-all duration-300';
  
  // Variant specific classes
  const variantClasses = {
    standard: 'bg-white py-8 px-4 border-t border-light-gray',
    minimal: 'bg-white py-4 px-4 border-t border-light-gray',
    'app-like': 'bg-white py-2 px-4 border-t border-light-gray fixed bottom-0 left-0 right-0 shadow-lg'
  };
  
  // Combine classes
  const footerClasses = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.standard}
    ${className}
  `;

  // Navigation items for app-like footer
  const navItems = [
    { path: '/home-screen', label: 'Home', icon: 'Home' },
    { path: '/ai-crop-doctor-screen', label: 'Crop Doctor', icon: 'Stethoscope' },
    { path: '/marketplace-screen', label: 'Marketplace', icon: 'ShoppingCart' },
    { path: '/offline-features-screen', label: 'Offline Tools', icon: 'CloudOff' },
  ];

  // Footer links grouped by category
  const footerLinks = [
    {
      title: 'Services',
      links: [
        { label: 'Crop Diagnosis', path: '/ai-crop-doctor-screen' },
        { label: 'Marketplace', path: '/marketplace-screen' },
        { label: 'Weather Forecast', path: '/weather-forecast' },
        { label: 'Soil Analysis', path: '/soil-analysis' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'Careers', path: '/careers' },
        { label: 'Blog', path: '/blog' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '/help' },
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'FAQ', path: '/faq' },
      ]
    }
  ];

  // Social media links
  const socialLinks = [
    { icon: 'Facebook', label: 'Facebook', url: 'https://facebook.com' },
    { icon: 'Twitter', label: 'Twitter', url: 'https://twitter.com' },
    { icon: 'Instagram', label: 'Instagram', url: 'https://instagram.com' },
    { icon: 'Youtube', label: 'YouTube', url: 'https://youtube.com' },
  ];

  // Render standard footer
  const renderStandardFooter = () => (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and description */}
        <div className="col-span-1">
          <Link to="/home-screen" className="flex items-center mb-4">
            <Icon name="Leaf" size={28} className="text-leaf" />
            <span className="ml-2 text-xl font-display font-bold text-charcoal">
              FarmWise
            </span>
          </Link>
          <p className="text-dark-gray text-sm mb-4">
            Empowering farmers with technology for sustainable agriculture and improved crop yields.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-gray hover:text-leaf transition-colors"
                aria-label={social.label}
              >
                <Icon name={social.icon} size={20} />
              </a>
            ))}
          </div>
        </div>
        
        {/* Footer link groups */}
        {footerLinks.map((group, index) => (
          <div key={index} className="col-span-1">
            <h3 className="font-heading font-semibold text-charcoal mb-4">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link 
                    to={link.path} 
                    className="text-dark-gray hover:text-leaf transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-light-gray flex flex-col md:flex-row justify-between items-center">
        <p className="text-dark-gray text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} FarmWise. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <Link to="/privacy" className="text-dark-gray hover:text-leaf transition-colors text-sm">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-dark-gray hover:text-leaf transition-colors text-sm">
            Terms of Service
          </Link>
          <Link to="/cookies" className="text-dark-gray hover:text-leaf transition-colors text-sm">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );

  // Render minimal footer
  const renderMinimalFooter = () => (
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center mb-4 md:mb-0">
        <Icon name="Leaf" size={20} className="text-leaf" />
        <span className="ml-2 text-sm font-medium text-charcoal">
          © {new Date().getFullYear()} FarmWise
        </span>
      </div>
      
      <div className="flex space-x-6">
        <Link to="/privacy" className="text-dark-gray hover:text-leaf transition-colors text-xs">
          Privacy
        </Link>
        <Link to="/terms" className="text-dark-gray hover:text-leaf transition-colors text-xs">
          Terms
        </Link>
        <Link to="/help" className="text-dark-gray hover:text-leaf transition-colors text-xs">
          Help
        </Link>
      </div>
    </div>
  );

  // Render app-like footer with navigation
  const renderAppLikeFooter = () => (
    <nav className="flex justify-around items-center">
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={index}
            to={item.path}
            className={`flex flex-col items-center py-1 px-3 ${
              isActive ? 'text-leaf' : 'text-dark-gray'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon 
              name={item.icon} 
              size={24} 
              className={isActive ? 'text-leaf' : 'text-dark-gray'} 
            />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <footer className={footerClasses} {...props}>
      {variant === 'standard' && renderStandardFooter()}
      {variant === 'minimal' && renderMinimalFooter()}
      {variant === 'app-like' && renderAppLikeFooter()}
    </footer>
  );
};

export default Footer;