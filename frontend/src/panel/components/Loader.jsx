import React from "react";

export default function Loader({ size = 40, color = "border-blue-950", className = "" }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className={`animate-spin rounded-full border-2 ${color} ${className}`}
        style={{ width: size, height: size, borderTopColor: "transparent" }}
      />
    </div>
  );
}


