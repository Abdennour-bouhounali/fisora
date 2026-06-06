import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name,
  required = false,
  textarea = false,
  rows = 4,
  className = '',
  ...props
}) => {
  const inputStyles = "w-full bg-nature-white border-none rounded-2xl p-6 focus:ring-2 focus:ring-nature-orange transition-all shadow-premium outline-none placeholder:text-nature-green/20 text-nature-green";
  
  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="text-xs font-black uppercase tracking-widest text-nature-green/60 ml-4">
          {label} {required && <span className="text-nature-orange">*</span>}
        </label>
      )}
      
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${inputStyles} resize-none`}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputStyles}
          {...props}
        />
      )}
    </div>
  );
};

export default Input;
