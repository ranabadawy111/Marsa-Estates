export default function Card({ children, className = "", ...props }) {
  return (
    <div className={`bg-white/70 border border-navy-700/[0.06] rounded-2xl shadow-card ${className}`} {...props}>
      {children}
    </div>
  );
}
