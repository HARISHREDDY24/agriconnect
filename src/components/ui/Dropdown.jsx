import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  required = false,
  searchable = false,
  multiple = false,
  withIcons = false,
  className = '',
  containerClassName = '',
  id,
  name,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Generate ID if not provided
  const dropdownId = id || `dropdown-${name || Math.random().toString(36).substring(2, 9)}`;
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);
  
  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };
  
  // Handle option selection
  const handleSelect = (option) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? [...value] : [];
      const optionIndex = newValue.findIndex(item => item.value === option.value);
      
      if (optionIndex > -1) {
        newValue.splice(optionIndex, 1);
      } else {
        newValue.push(option);
      }
      
      if (onChange) {
        onChange(newValue);
      }
    } else {
      if (onChange) {
        onChange(option);
      }
      setIsOpen(false);
    }
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter options based on search term
  const filteredOptions = searchTerm
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;
  
  // Check if an option is selected (for multiple select)
  const isSelected = (option) => {
    if (multiple && Array.isArray(value)) {
      return value.some(item => item.value === option.value);
    }
    return false;
  };
  
  // Get display value
  const getDisplayValue = () => {
    if (multiple && Array.isArray(value) && value.length > 0) {
      if (value.length === 1) {
        return value[0].label;
      }
      return `${value.length} items selected`;
    }
    
    if (value && !multiple) {
      return value.label;
    }
    
    return placeholder;
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (!isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    } else if (e.key === 'Tab' && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`mb-4 ${containerClassName}`} ref={dropdownRef}>
      {label && (
        <label 
          htmlFor={dropdownId} 
          className="mb-1 block text-sm font-medium text-dark-gray"
        >
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          id={dropdownId}
          className={`
            w-full rounded-md border bg-white px-3 py-2 text-left
            ${error ? 'border-error' : 'border-medium-gray'}
            ${disabled ? 'cursor-not-allowed bg-light-gray opacity-75' : 'cursor-pointer'}
            flex items-center justify-between
            focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-opacity-50
            ${className}
          `}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
          {...props}
        >
          <span className={`block truncate ${!value ? 'text-dark-gray' : 'text-charcoal'}`}>
            {getDisplayValue()}
          </span>
          <Icon 
            name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
            size={20} 
            className="text-dark-gray"
          />
        </button>
        
        {isOpen && (
          <div 
            className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto"
            role="listbox"
          >
            {searchable && (
              <div className="sticky top-0 p-2 bg-white border-b border-light-gray">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="w-full rounded-md border border-medium-gray px-3 py-1.5 pl-8 text-sm"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Icon 
                    name="Search" 
                    size={16} 
                    className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-dark-gray"
                  />
                </div>
              </div>
            )}
            
            {filteredOptions.length === 0 ? (
              <div className="py-2 px-3 text-sm text-dark-gray">No options found</div>
            ) : (
              <ul className="py-1">
                {filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`
                      px-3 py-2 text-sm cursor-pointer flex items-center
                      ${(value && !multiple && value.value === option.value) || isSelected(option)
                        ? 'bg-leaf bg-opacity-10 text-leaf' :'text-charcoal hover:bg-light-gray'
                      }
                    `}
                    onClick={() => handleSelect(option)}
                    role="option"
                    aria-selected={
                      (value && !multiple && value.value === option.value) || 
                      isSelected(option)
                    }
                  >
                    {multiple && (
                      <span className="mr-2">
                        <Icon 
                          name={isSelected(option) ? 'CheckSquare' : 'Square'} 
                          size={18} 
                          className={isSelected(option) ? 'text-leaf' : 'text-dark-gray'}
                        />
                      </span>
                    )}
                    
                    {withIcons && option.icon && (
                      <span className="mr-2">
                        <Icon name={option.icon} size={18} className="text-dark-gray" />
                      </span>
                    )}
                    
                    <span className="truncate">{option.label}</span>
                    
                    {!multiple && value && value.value === option.value && (
                      <span className="ml-auto">
                        <Icon name="Check" size={18} className="text-leaf" />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-xs text-error">{error}</p>
      )}
    </div>
  );
};

export default Dropdown;