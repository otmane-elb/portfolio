'use client';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverScale?: boolean;
}

export default function Card({ children, className = '', hoverScale = true, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hoverScale ? { y: -2, scale: 1.01 } : {}}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`glass-card rounded-2xl p-6 transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
