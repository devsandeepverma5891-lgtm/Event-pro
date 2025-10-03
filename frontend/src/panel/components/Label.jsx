import React from "react";

const Label = React.forwardRef(function Label({ className = "", ...props }, ref) {
  return (
    <label ref={ref} className={`block text-sm font-medium mb-1 ${className}`} {...props} />
  );
});

export default Label;


