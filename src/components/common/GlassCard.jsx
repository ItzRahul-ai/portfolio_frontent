const GlassCard = ({ children, className = "" }) => (
  <div className={`glass-panel rounded-2xl p-5 sm:p-6 ${className}`}>{children}</div>
);

export default GlassCard;


