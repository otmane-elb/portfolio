'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function Spotlight() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(94,106,210,0.08),transparent_80%)]"
        style={{
          // @ts-ignore
          '--x': `${springX}px`,
          // @ts-ignore
          '--y': `${springY}px`,
        }}
      />
    </motion.div>
  );
}
