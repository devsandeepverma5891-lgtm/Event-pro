import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function CustomSelectBox({ options = [], value, onChange, placeholder, multiple = false, variant = "dark" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = () => {
    if (multiple) {
      if (Array.isArray(value) && value.length > 0) {
        const labels = options.filter(o => value.includes(o.value)).map(o => o.label);
        return labels.join(", ");
      }
      return placeholder;
    }
    const selected = options.find(opt => opt.value === value);
    return selected ? selected.label : placeholder;
  };

  const isSelected = (val) => (multiple ? Array.isArray(value) && value.includes(val) : value === val);

  const handleSelect = (val) => {
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      const next = current.includes(val) ? current.filter(v => v !== val) : [...current, val];
      onChange(next);
    } else {
      onChange(val);
      setOpen(false);
    }
  };

  const baseBtn = variant === "dark"
    ? "w-full h-11 px-3 border border-gray-700 rounded-md bg-gray-800 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
    : "w-full h-11 px-4 border border-gray-200 rounded-md bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200";

  const menuCls = variant === "dark"
    ? "absolute left-0 z-20 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg py-1 max-h-60 overflow-auto"
    : "absolute left-0 z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1 max-h-60 overflow-auto";

  const itemCls = (selected) => variant === "dark"
    ? `flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-800 rounded-md ${selected ? "bg-gray-800 text-amber-400" : "text-gray-200"}`
    : `flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded-md ${selected ? "bg-gray-100 font-semibold" : ""}`;

  return (
    <div className="relative min-w-[160px]" ref={ref}>
      <button type="button" className={`flex items-center justify-between ${baseBtn}`} onClick={() => setOpen(o => !o)}>
        <span className="truncate text-left">{selectedLabel()}</span>
        <ChevronDown className={variant === "dark" ? "w-4 h-4 ml-2 text-gray-400" : "w-4 h-4 ml-2 text-gray-400"} />
      </button>
      {open && (
        <div className={menuCls}>
          {options.map(opt => (
            <div
              key={opt.value}
              className={itemCls(isSelected(opt.value))}
              onClick={() => handleSelect(opt.value)}
            >
              {isSelected(opt.value) && <Check className={variant === "dark" ? "w-4 h-4 mr-2 text-amber-400" : "w-4 h-4 mr-2 text-blue-600"} />}
              <span>{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


