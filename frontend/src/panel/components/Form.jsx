import React from "react";

export default function Form({ onSubmit, children, className = "" }) {
  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`} autoComplete="off">
      {children}
    </form>
  );
}


