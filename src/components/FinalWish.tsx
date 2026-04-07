"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function FinalWish() {
  const [wished, setWished] = useState(false);

  const handleMakeWish = () => {
    // Massive confetti
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFFFF0', '#FFFDD0', '#D4AF37', '#A9BA9D']
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFFFF0', '#FFFDD0', '#D4AF37', '#A9BA9D']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    setWished(true);
  };

  return (
    <section className="min-h-screen py-24 flex items-center justify-center px-4 relative z-10 w-full">
      <AnimatePresence mode="wait">
        {!wished ? (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(5px)' }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <button
              onClick={handleMakeWish}
              className="relative group bg-white/50 backdrop-blur-md border border-[#D4AF37]/50 rounded-full px-12 py-6 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)] hover:bg-white/80 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              <span className="relative font-serif tracking-widest text-[#D4AF37] text-2xl uppercase font-light">Make a Wish</span>
            </button>
            <p className="mt-8 font-sans text-[#A9BA9D] tracking-widest text-sm uppercase">Close your eyes first</p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full max-w-2xl bg-white/80 border border-[#D4AF37]/30 shadow-2xl p-8 md:p-16 rounded-3xl backdrop-blur-xl relative"
          >
            {/* Minimalist Lily SVG */}
            <svg className="w-16 h-16 absolute top-8 right-8 text-[#A9BA9D] opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22v-6c0-2 1-3 3-4 1.5-.75 4-.5 5-2 .5-1-1-3-3-2-3 1.5-6.5-1-8-5 0 0-1.5 4-8 5-2-1-3.5 1-3 2 1 1.5 3.5 1.25 5 2 2 1 3 2 3 4v6" />
            </svg>

            <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-8 border-b border-[#D4AF37]/20 pb-6 inline-block">Dearest Aprilia,</h2>
            
            <div className="space-y-6 font-sans text-gray-700 leading-loose text-lg md:text-xl">
              <p>
                Selamat ulang tahun yang ke-22, sayangku cintakuu. 
              </p>
              <p>
                Semoga semua doa dan harapanmu terkabul. Semoga selalu diberi kesehatan, kebahagiaan, dan kemudahan dalam segala hal. 
                Aku bersyukur banget bisa selalu ada di hari spesialmu ini.
              </p>
              <p>
                Tetaplah menjadi sosok yang luar biasa dan mekar dengan indah, seperti Lily putih yang anggun. 
              </p>
              <p className="font-serif italic text-[#D4AF37] text-2xl mt-12 pt-12 border-t border-[#A9BA9D]/20">
                I love you, forever and always. ❤️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
