"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reasons = [
  "Because your smile is the brightest thing in my world.",
  "Because you always know how to make me laugh, even on bad days.",
  "Because of how deeply and genuinely you care for others.",
  "Because of the way you look at me.",
  "Because you are my best friend and my greatest love."
];

export default function Reasons() {
  const [cards, setCards] = useState(reasons);

  const handleNext = () => {
    setCards((prev) => {
      const newCards = [...prev];
      const topCard = newCards.shift();
      if (topCard) newCards.push(topCard);
      return newCards;
    });
  };

  return (
    <section className="py-24 px-4 relative z-10 overflow-hidden min-h-[600px] flex flex-col justify-center">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl text-gray-800 mb-4">Reasons Why I Love You</h2>
        <p className="font-sans text-[#A9BA9D]">(Click the card to read more)</p>
      </div>

      <div className="relative w-full max-w-sm mx-auto h-[350px] flex justify-center items-center">
        <AnimatePresence>
          {cards.map((reason, index) => {
            const isTop = index === 0;
            return (
              <motion.div
                key={reason}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ 
                  opacity: 1 - index * 0.15,
                  scale: 1 - index * 0.05,
                  y: index * 15,
                  zIndex: cards.length - index
                }}
                exit={{ opacity: 0, x: -200, rotate: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onClick={isTop ? handleNext : undefined}
                className={`absolute w-full h-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white flex flex-col justify-center text-center ${isTop ? 'cursor-pointer hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)]' : ''}`}
                style={{
                  transformOrigin: "top center"
                }}
              >
                {/* Gold floral corner decoration */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/50 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/50 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/50 rounded-br-lg" />
                
                {/* Lily icon representation */}
                <svg className="w-8 h-8 mx-auto mb-6 text-[#A9BA9D] opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22v-6c0-2 1-3 3-4 1.5-.75 4-.5 5-2 .5-1-1-3-3-2-3 1.5-6.5-1-8-5 0 0-1.5 4-8 5-2-1-3.5 1-3 2 1 1.5 3.5 1.25 5 2 2 1 3 2 3 4v6" />
                </svg>

                <p className="font-serif text-2xl text-gray-700 leading-relaxed [text-wrap:balance]">
                  {reason}
                </p>
                
                {isTop && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-6 left-0 right-0 text-center text-xs font-sans text-gray-400 tracking-widest uppercase"
                  >
                    Tap Card
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
