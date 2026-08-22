const variants = {
  primary: "bg-navy-700 text-sand hover:bg-navy-600",
  accent: "bg-sage-500 text-sand hover:bg-sage-600",
  secondary: "bg-transparent text-navy-700 border border-navy-700/25 hover:bg-navy-700/5",
  ghost: "bg-transparent text-navy-600 hover:bg-navy-700/5",
};
const sizes = {
  sm: "text-xs px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-[15px] px-7 py-3.5",
};
export default function Button({ children, variant = "primary", size = "md", icon: Icon, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-offset-2 focus-visible:ring-offset-sand disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon size={16} strokeWidth={2} />}
    </button>
  );
}
