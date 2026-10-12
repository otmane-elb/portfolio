export default function Badge({ children, className = '' }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <span
      className={`tag ${className}`}
    >
      {children}
    </span>
  );
}
