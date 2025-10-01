import React from 'react';

const SharedInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  className = '',
  ...props
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-300 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
      {...props}
    />
  </div>
);

export default SharedInput;
