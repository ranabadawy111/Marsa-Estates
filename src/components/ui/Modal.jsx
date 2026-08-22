import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-navy-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-sand rounded-2xl shadow-card w-full max-w-md p-6 border border-navy-700/[0.06]">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-xl text-navy-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-navy-700/50 hover:text-navy-900 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
