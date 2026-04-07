"use client";

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="text-center z-10 max-w-4xl max-w-4xl mx-auto rounded-3xl p-10 bg-white/20 backdrop-blur-sm border border-white/30 shadow-[0_10px_40px_rgba(169,186,157,0.1)]"
      >
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="font-sans text-sm tracking-[0.3em] uppercase text-[#A9BA9D] mb-6"
        >
          A Special Day
        </motion.h2>
        
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-gray-800 mb-8 [text-wrap:balance]">
          Happy Birthday, sayangkuu cintakuu <span className="text-[#D4AF37] block mt-2">Aprilia Tri Kurniawati!</span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="font-sans text-xl md:text-2xl text-gray-600 bg-white/40 inline-block px-8 py-3 rounded-full shadow-sm"
        >
          yang ke 22 tahun <span className="inline-block animate-pulse text-red-400">❤️</span>
        </motion.p>
      </motion.div>
    </section>
  );
}
