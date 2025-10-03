import React, { useEffect } from "react";

export default function Drawer({ open, onClose, title, children, width = 520 }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape') onClose?.();
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className={`fixed top-0 right-0 left-0 xl:left-[270px] 2xl:left-72 bottom-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={`absolute right-0 top-0 h-full bg-gray-900 border-l border-gray-800 shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width }}
        role="dialog"
        aria-modal="true"
      >
        <div className="h-full flex flex-col">
          <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
            <button type="button" className="text-gray-400 hover:text-gray-200" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-auto p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}


