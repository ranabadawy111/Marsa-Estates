import { ChevronDown } from "lucide-react";
export default function Select({ options, className = "", ...props }) {
  return (
    <div className="relative">
      <select
        className={`appearance-none bg-white/80 border border-navy-700/10 rounded-full text-sm pl-4 pr-9 py-2.5 text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 cursor-pointer ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-600/60" />
    </div>
  );
}
