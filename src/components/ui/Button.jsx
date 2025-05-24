import React from 'react';
import Icon from '../AppIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-body font-medium transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 active:transform active:scale-[0.98]';
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5 min-h-[32px]',
    md: 'text-base px-4 py-2 min-h-[40px]',
    lg: 'text-lg px-5 py-2.5 min-h-[48px]',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-leaf text-white hover:bg-leaf-dark focus:ring-leaf disabled:bg-leaf disabled:bg-opacity-60',
    secondary: 'border border-leaf text-leaf hover:bg-leaf hover:bg-opacity-10 focus:ring-leaf',
    tertiary: 'text-leaf hover:bg-leaf hover:bg-opacity-10 focus:ring-leaf',
    destructive: 'bg-error text-white hover:bg-opacity-90 focus:ring-error',
    icon: 'text-dark-gray hover:bg-light-gray focus:ring-leaf p-2',
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Disabled classes
  const disabledClasses = disabled || isLoading ? 'opacity-60 cursor-not-allowed' : '';
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size] || sizeClasses.md}
    ${variantClasses[variant] || variantClasses.primary}
    ${widthClasses}
    ${disabledClasses}
    ${className}
  `;

  // Icon size based on button size
  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <span className="mr-2 inline-block animate-spin">
          <Icon name="Loader2" size={iconSize[size] || 20} />
        </span>
      )}
      
      {icon && iconPosition === 'left' && !isLoading && (
        <span className="mr-2">
          <Icon name={icon} size={iconSize[size] || 20} />
        </span>
      )}
      
      {variant !== 'icon' && children}
      
      {icon && iconPosition === 'right' && !isLoading && (
        <span className="ml-2">
          <Icon name={icon} size={iconSize[size] || 20} />
        </span>
      )}
      
      {variant === 'icon' && icon && !isLoading && (
        <Icon name={icon} size={iconSize[size] || 20} />
      )}
    </button>
  );
};

export default Button;