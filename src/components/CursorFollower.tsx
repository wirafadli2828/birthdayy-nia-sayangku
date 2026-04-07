"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CursorFollower() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {/* Glow effect that follows cursor */}
      <motion.div
        animate={{
          x: mousePos.x - 100,
          y: mousePos.y - 100,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 150 }}
        className="w-[200px] h-[200px] bg-[#D4AF37]/10 rounded-full blur-[80px]"
      />
      
      {/* Elegant ring following cursor */}
      <motion.div
        animate={{
          x: mousePos.x - 15,
          y: mousePos.y - 15,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        className="w-[30px] h-[30px] border border-[#D4AF37]/30 rounded-full flex items-center justify-center"
      >
        <div className="w-[4px] h-[4px] bg-[#A9BA9D] rounded-full" />
      </motion.div>
    </div>
  );
}
