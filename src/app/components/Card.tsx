'use client';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverScale?: boolean;
  glowColor?: string;
}

export default function Card({ children, className = '', hoverScale = true, glowColor, ...props }: Readonly<CardProps>) {
  return (
    <motion.div
      whileHover={hoverScale ? { y: -3 } : {}}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card rounded-2xl p-6 ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
      {...props}
    >
      {/* Subtle inner glow on top edge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '15%',
          right: '15%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)',
          pointerEvents: 'none',
        }}
      />
      {children}
    </motion.div>
  );
}
