import React from "react";

export default function Tabs({ tabs, selected, onTabChange, children, className = "" }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex bg-gray-100 rounded-md p-1 mb-4 w-full">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            className={`px-6 py-2 text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none
              ${selected === idx
                ? "bg-white text-gray-700 shadow-sm w-full"
                : "bg-transparent text-gray-500 hover:text-blue-900 w-full"}
            `}
            style={{ minWidth: 120 }}
            onClick={() => onTabChange(idx)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}


