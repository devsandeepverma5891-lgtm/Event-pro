import React from "react";

const VARIANT_CLASSES = {
  dark: "w-full h-11 px-3 rounded-md border border-gray-700 bg-gray-800 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30",
  light: "w-full h-11 px-4 border border-gray-200 rounded-md bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200",
};

const Input = React.forwardRef(function Input({ className = "", variant = "dark", ...props }, ref) {
  return (
    <input
      ref={ref}
      className={`${VARIANT_CLASSES[variant] || VARIANT_CLASSES.dark} ${className}`}
      {...props}
    />
  );
});

export default Input;


