import React from "react";

const variantClasses = {
  default: "bg-gray-100 text-gray-700 border border-gray-300",
  outline: "bg-white text-gray-700 border border-gray-300",
  secondary: "bg-blue-100 text-blue-700 border border-blue-200",
  success: "bg-green-100 text-green-700 border border-green-200",
  warning: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  danger: "bg-red-100 text-red-700 border border-red-200",
};

export default function Badge({ children, variant = "default", className = "" }) {
  return (
    <span
      className={`px-3 py-0.5 rounded-full text-xs font-medium ${
        variantClasses[variant] || variantClasses.default
      } ${className}`}
    >
      {children}
    </span>
  );
}


