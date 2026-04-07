"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Gatekeeper from '@/components/Gatekeeper';
import FloatingMusic from '@/components/FloatingMusic';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Reasons from '@/components/Reasons';
import FinalWish from '@/components/FinalWish';
import CursorFollower from '@/components/CursorFollower';
import GestureScanner from '@/components/GestureScanner';

export default function Home() {
  const [showScanner, setShowScanner] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudio(new Audio('/music.mp3'));
  }, []);

  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      {/* 1. Visual Cursor Animations */}
      <CursorFollower />

      <AnimatePresence mode="wait">
        {/* 2. Real-time Hand Gesture Recognition */}
        {showScanner && (
          <GestureScanner 
            key="scanner" 
            onUnlock={() => setShowScanner(false)} 
          />
        )}

        {/* 3. Password Check (Gatekeeper) */}
        {!showScanner && !unlocked && (
          <Gatekeeper 
            key="gatekeeper" 
            audio={audio} 
            onUnlock={() => setUnlocked(true)} 
          />
        )}
      </AnimatePresence>

      {/* 4. Main Content (After Unlocked) */}
      {unlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="w-full"
        >
          <FloatingMusic audio={audio} />
          <Hero />
          <Timeline />
          <Reasons />
          <FinalWish />
        </motion.div>
      )}
    </main>
  );
}
