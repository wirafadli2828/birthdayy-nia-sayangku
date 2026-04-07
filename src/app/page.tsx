"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Gatekeeper from '@/components/Gatekeeper';
import FloatingMusic from '@/components/FloatingMusic';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Reasons from '@/components/Reasons';
import FinalWish from '@/components/FinalWish';

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudio(new Audio('/music.mp3'));
  }, []);

  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between">
      <AnimatePresence>
        {!unlocked && <Gatekeeper key="gatekeeper" audio={audio} onUnlock={() => setUnlocked(true)} />}
      </AnimatePresence>

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
