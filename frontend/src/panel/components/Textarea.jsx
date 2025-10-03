import React from "react";

const VARIANT_CLASSES = {
  dark: "w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-sm text-gray-200 placeholder-gray-400 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-amber-500/30",
  light: "w-full px-4 py-2 border border-gray-200 rounded-md bg-white text-sm min-h-[100px] focus:outline-none",
};

const Textarea = React.forwardRef(function Textarea({ className = "", variant = "dark", ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={`${VARIANT_CLASSES[variant] || VARIANT_CLASSES.dark} ${className}`}
      {...props}
    />
  );
});

export default Textarea;


