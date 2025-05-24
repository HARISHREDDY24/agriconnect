import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const Card = ({
  variant = 'standard',
  title,
  subtitle,
  content,
  image,
  icon,
  iconColor,
  value,
  label,
  footer,
  onClick,
  to,
  className = '',
  children,
  ...props
}) => {
  // Base card classes
  const baseClasses = 'rounded-lg shadow-md overflow-hidden transition-all duration-200';
  
  // Variant specific classes
  const variantClasses = {
    standard: 'bg-white p-4',
    interactive: 'bg-white p-4 hover:shadow-lg hover:translate-y-[-2px] cursor-pointer',
    feature: 'bg-white p-4 border-l-4 border-leaf',
    stat: 'bg-white p-4 flex flex-col items-center justify-center text-center',
    product: 'bg-white flex flex-col h-full',
  };
  
  // Glassmorphism effect
  const glassEffect = 'backdrop-blur-sm bg-white bg-opacity-80 border border-medium-gray border-opacity-20';
  
  // Combine classes
  const cardClasses = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.standard}
    ${variant === 'interactive' ? glassEffect : ''}
    ${className}
  `;

  // Card content based on variant
  const renderCardContent = () => {
    switch (variant) {
      case 'stat':
        return (
          <>
            {icon && <Icon name={icon} size={32} className={`mb-2 ${iconColor || 'text-leaf'}`} />}
            <div className="text-3xl font-bold text-charcoal mb-1">{value}</div>
            {label && <div className="text-sm text-dark-gray">{label}</div>}
          </>
        );
        
      case 'product':
        return (
          <>
            {image && (
              <div className="aspect-w-16 aspect-h-9 w-full">
                <Image 
                  src={image} 
                  alt={title || 'Product image'} 
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="p-4 flex-grow">
              {title && <h3 className="text-lg font-heading font-semibold text-charcoal mb-1">{title}</h3>}
              {subtitle && <p className="text-sm text-dark-gray mb-2">{subtitle}</p>}
              {content && <p className="text-base text-charcoal">{content}</p>}
              {children}
            </div>
            {footer && <div className="p-4 pt-0 mt-auto border-t border-light-gray">{footer}</div>}
          </>
        );
        
      default:
        return (
          <>
            {icon && <Icon name={icon} size={24} className={`mb-2 ${iconColor || 'text-leaf'}`} />}
            {title && <h3 className="text-lg font-heading font-semibold text-charcoal mb-1">{title}</h3>}
            {subtitle && <p className="text-sm text-dark-gray mb-2">{subtitle}</p>}
            {image && (
              <div className="mb-3 -mx-4">
                <Image 
                  src={image} 
                  alt={title || 'Card image'} 
                  className="w-full object-cover"
                />
              </div>
            )}
            {content && <p className="text-base text-charcoal">{content}</p>}
            {children}
            {footer && <div className="mt-4 pt-3 border-t border-light-gray">{footer}</div>}
          </>
        );
    }
  };

  // Render as link if 'to' prop is provided
  if (to) {
    return (
      <Link to={to} className={cardClasses} {...props}>
        {renderCardContent()}
      </Link>
    );
  }

  // Render as button if onClick is provided
  if (onClick) {
    return (
      <button 
        onClick={onClick} 
        className={`${cardClasses} text-left w-full`}
        type="button"
        {...props}
      >
        {renderCardContent()}
      </button>
    );
  }

  // Default render as div
  return (
    <div className={cardClasses} {...props}>
      {renderCardContent()}
    </div>
  );
};

export default Card;