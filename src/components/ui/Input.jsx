import React, { forwardRef } from 'react';
import Icon from '../AppIcon';

const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  icon,
  iconPosition = 'left',
  clearable = false,
  disabled = false,
  required = false,
  className = '',
  containerClassName = '',
  id,
  name,
  autoComplete,
  min,
  max,
  step,
  ...props
}, ref) => {
  // Generate ID if not provided
  const inputId = id || `input-${name || Math.random().toString(36).substring(2, 9)}`;
  
  // Handle clear button click
  const handleClear = () => {
    if (onChange) {
      // Create a synthetic event object
      const event = {
        target: { value: '', name },
        preventDefault: () => {},
        stopPropagation: () => {}
      };
      onChange(event);
    }
  };

  // Base input classes
  const baseInputClasses = `
    w-full rounded-md border border-medium-gray bg-white px-3 py-2 text-charcoal
    placeholder:text-dark-gray focus:border-leaf focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-opacity-50
    disabled:cursor-not-allowed disabled:bg-light-gray disabled:opacity-75
    transition-colors duration-200
  `;
  
  // Adjust padding based on icon position
  const inputClasses = `
    ${baseInputClasses}
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${(icon && iconPosition === 'right') || (type === 'search' || clearable) ? 'pr-10' : ''}
    ${error ? 'border-error focus:border-error focus:ring-error' : ''}
    ${className}
  `;

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="mb-1 block text-sm font-medium text-dark-gray"
        >
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon name={icon} size={20} className="text-dark-gray" />
          </div>
        )}
        
        {/* Input Element */}
        {type === 'textarea' ? (
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={inputClasses}
            ref={ref}
            rows={props.rows || 4}
            {...props}
          />
        ) : (
          <input
            id={inputId}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={inputClasses}
            ref={ref}
            autoComplete={autoComplete}
            min={type === 'number' ? min : undefined}
            max={type === 'number' ? max : undefined}
            step={type === 'number' ? step : undefined}
            {...props}
          />
        )}
        
        {/* Right Icon or Clear Button */}
        {((icon && iconPosition === 'right') || (type === 'search') || (clearable && value)) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {clearable && value && (
              <button
                type="button"
                onClick={handleClear}
                className="text-dark-gray hover:text-error focus:outline-none"
                aria-label="Clear input"
              >
                <Icon name="X" size={18} />
              </button>
            )}
            
            {!clearable && icon && iconPosition === 'right' && (
              <Icon name={icon} size={20} className="text-dark-gray" />
            )}
            
            {type === 'search' && !clearable && (
              <Icon name="Search" size={20} className="text-dark-gray" />
            )}
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <p className="mt-1 text-xs text-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;