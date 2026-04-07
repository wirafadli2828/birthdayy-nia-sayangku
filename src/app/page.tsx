"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import GestureScanner from '@/components/GestureScanner'; // <--- Ini sensor jarinya
import Gatekeeper from '@/components/Gatekeeper';
import FloatingMusic from '@/components/FloatingMusic';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Reasons from '@/components/Reasons';
import FinalWish from '@/components/FinalWish';
import CursorFollower from '@/components/CursorFollower';

export default function Home() {
  const [step, setStep] = useState('scanner'); // Mulai dari 'scanner'
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudio(new Audio('/music.mp3'));
  }, []);

  return (
    <main className="w-full min-h-screen bg-ivory overflow-x-hidden">
      <CursorFollower />

      <AnimatePresence mode="wait">
        {step === 'scanner' && (
          <GestureScanner key="scanner" onUnlock={() => setStep('gatekeeper')} />
        )}

        {step === 'gatekeeper' && (
          <Gatekeeper key="gatekeeper" audio={audio} onUnlock={() => setStep('final')} />
        )}
      </AnimatePresence>

      {step === 'final' && (
        <>
          <FloatingMusic audio={audio} />
          <Hero />
          <Timeline />
          <Reasons />
          <FinalWish />
        </>
      )}
    </main>
  );
}
