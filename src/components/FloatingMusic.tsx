"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Pause } from 'lucide-react';

interface FloatingMusicProps {
  audio: HTMLAudioElement | null;
}

export default function FloatingMusic({ audio }: FloatingMusicProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (audio) {
      if (audio.loop === false) audio.loop = true;
      setIsPlaying(!audio.paused);
      
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      audio.addEventListener('play', onPlay);
      audio.addEventListener('pause', onPause);
      return () => {
        audio.removeEventListener('play', onPlay);
        audio.removeEventListener('pause', onPause);
      };
    }
  }, [audio]);

  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(e => console.log(e));
      }
    }
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-40 bg-white/50 backdrop-blur-md p-4 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.2)] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-white/80 transition-colors"
      >
        {isPlaying ? (
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
            <Music size={24} />
          </motion.div>
        ) : (
          <Pause size={24} />
        )}
      </motion.button>
    </>
  );
}
