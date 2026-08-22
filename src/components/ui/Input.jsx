export default function Input({ icon: Icon, className = "", ...props }) {
  return (
    <div className="relative">
      {Icon && <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-600/50" />}
      <input
        className={`w-full bg-white/80 border border-navy-700/10 rounded-full text-sm placeholder:text-navy-700/35 text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 transition-shadow ${Icon ? "pl-10 pr-4 py-2.5" : "px-4 py-2.5"} ${className}`}
        {...props}
      />
    </div>
  );
}
