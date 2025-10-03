import React from "react";

const colorClasses = {
  default:
    "bg-amber-400 text-gray-800 hover:bg-amber-450 border border-transparent",
  outline:
    "bg-white text-gray-500 border border-gray-300 hover:bg-gray-100",
  danger:
    "bg-red-600 text-white border border-red-600 hover:bg-red-700",
};

export default function Button({
  children,
  onClick,
  type = "button",
  color = "default",
  className = "",
  tooltip,
  ...props
}) {
  return (
    <div className={tooltip ? "relative group inline-block" : "inline-block"}>
      <button
        type={type}
        onClick={onClick}
        className={`px-3 py-2 rounded text-[16px] font-semibold transition outline-none ${
          colorClasses[color] || colorClasses.default
        } ${className}`}
        {...props}
      >
        {children}
      </button>
      {tooltip && (
        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-zinc-500 rounded-[2px] text-white text-[14px] h-[31px] leading-[31px] text-center w-auto z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap select-none px-2">
          {tooltip}
          <span className="absolute top-[-5px] left-1/2 -translate-x-1/2 bg-zinc-500 rounded-[1px] h-[10px] w-[10px] z-[3] rotate-45"></span>
        </span>
      )}
    </div>
  );
}