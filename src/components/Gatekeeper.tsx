"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface GatekeeperProps {
  audio: HTMLAudioElement | null;
  onUnlock: () => void;
}

export default function Gatekeeper({ audio, onUnlock }: GatekeeperProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '18042004') {
      if (audio) {
        audio.play().catch(e => console.error("Audio blocked:", e));
      }
      setIsUnlocked(true);
      setError(false);
      
      // Fire confetti
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: ['#FFFFF0', '#FFFDD0', '#D4AF37', '#A9BA9D']
        });
      }, 250);

      // Delay transition to let confetti show
      setTimeout(() => {
        onUnlock();
      }, 2000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <AnimatePresence>
      {!isUnlocked && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#A9BA9D]/20 backdrop-blur-md"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/40 p-8 rounded-3xl shadow-xl border border-white/50 backdrop-blur-xl max-w-sm w-full mx-4 text-center"
          >
            <h1 className="font-serif text-3xl text-gray-800 mb-6 drop-shadow-sm">
              hari lahir kamuu?
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <motion.div animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/50 border border-white/70 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-center tracking-widest text-[#A9BA9D] font-sans outline-none transition-all"
                  placeholder="DDMMYYYY"
                  maxLength={8}
                />
              </motion.div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#A9BA9D] to-[#8a997e] text-white font-sans py-3 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
              >
                Unlock
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
