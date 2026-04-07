"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart, Sparkles, Hand, Lock, Fingerprint } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GestureScannerProps {
  onUnlock: () => void;
}

export default function GestureScanner({ onUnlock }: GestureScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'detected'>('loading');
  const [gestureText, setGestureText] = useState('');
  const [activeEffect, setActiveEffect] = useState<'love' | 'heart' | 'birthday' | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  // Load MediaPipe from CDN for speed
  useEffect(() => {
    const loadMediaPipe = async () => {
      try {
        // Load scripts dynamically
        const scripts = [
          'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js',
          'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
          'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js'
        ];

        for (const src of scripts) {
          await new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            document.head.appendChild(script);
          });
        }
        
        initializeHands();
      } catch (err) {
        console.error("MediaPipe failed to load", err);
        setStatus('ready'); // Fallback to manual if CDN fails
      }
    };

    loadMediaPipe();
  }, []);

  const initializeHands = () => {
    // @ts-ignore
    const hands = new window.Hands({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7
    });

    hands.onResults(onResults);

    if (videoRef.current) {
      // @ts-ignore
      const camera = new window.Camera(videoRef.current, {
        onFrame: async () => {
          // @ts-ignore
          await hands.send({ image: videoRef.current });
        },
        width: 640,
        height: 480
      });
      camera.start();
      setStatus('ready');
    }
  };

  const onResults = (results: any) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];
      detectGesture(landmarks);
    } else {
      setGestureText('');
    }
  };

  const detectGesture = (points: any) => {
    // Logic for finger detection (Y coordinate comparison)
    const tipIds = [4, 8, 12, 16, 20]; // Thumb, Index, Middle, Ring, Pinky
    const upFingers = tipIds.map((id, index) => {
      if (index === 0) { // Thumb logic is usually X-based, keeping it simple for now
        return points[id].x < points[id - 2].x ? 1 : 0;
      }
      return points[id].y < points[id - 2].y ? 1 : 0;
    });

    const raisedCount = upFingers.reduce((a, b) => a + b, 0);

    // 1. I Love You (Index Raised) - ☝️
    if (raisedCount === 1 && upFingers[1]) {
      setGestureText("I Love You ❤️");
      setActiveEffect('love');
    } 
    // 2. Peace/V Sign - ✌️
    else if (raisedCount === 2 && upFingers[1] && upFingers[2]) {
      setGestureText("Fireworks! 🎆");
      confetti({ particleCount: 10, spread: 70, origin: { y: 0.6 }, colors: ['#D4AF37', '#FFFDD0'] });
    }
    // 3. ILY Gesture (Thumb, Index, Pinky) - 🤟
    else if (raisedCount === 3 && upFingers[0] && upFingers[1] && upFingers[4]) {
      setGestureText("Love in the air! 💖");
      setActiveEffect('heart');
    }
    // 4. Fist - ✊ (All down)
    else if (raisedCount === 0) {
      setGestureText("Scanning Identity...");
      setScanProgress(prev => {
        if (prev >= 100) {
          onUnlock();
          return 100;
        }
        return prev + 1;
      });
    }
    // 5. Open Palm - 🖐️
    else if (raisedCount === 5) {
      setGestureText("Happy Birthday! 🎂");
      setActiveEffect('birthday');
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ivory/95 backdrop-blur-md">
      <div className="relative w-full max-w-lg p-6 flex flex-col items-center">
        
        {/* Camera Container */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border-2 border-gold/30 shadow-2xl bg-black">
          <video ref={videoRef} className="w-full h-full object-cover scale-x-[-1]" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {status === 'loading' && (
              <div className="text-white flex flex-col items-center gap-4">
                <RefreshCcw className="animate-spin text-gold" size={40} />
                <span className="font-sans text-xs tracking-widest uppercase">Initializing Vision Engine...</span>
              </div>
            )}
            
            <AnimatePresence>
              {gestureText && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="bg-white/20 backdrop-blur-xl border border-white/50 px-6 py-2 rounded-full shadow-lg"
                >
                  <span className="font-serif text-gold text-lg md:text-xl">{gestureText}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress Bar for Fist Unlock */}
          {scanProgress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
              <motion.div 
                className="h-full bg-gold" 
                animate={{ width: `${scanProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Floating Effects */}
        <AnimatePresence>
          {activeEffect === 'heart' && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              className="absolute pointer-events-none"
            >
              <Heart className="text-red-400 fill-red-400" size={120} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex gap-4 justify-center">
            <span className="bg-white/50 p-2 rounded-lg text-xs opacity-60">☝️ ILY</span>
            <span className="bg-white/50 p-2 rounded-lg text-xs opacity-60">✌️ Confetti</span>
            <span className="bg-white/50 p-2 rounded-lg text-xs opacity-60">✊ Unlock</span>
          </div>
          <p className="font-serif text-gray-800 text-lg">"Tunjukkan tanganmu ke kamera, sayang."</p>
          
          <button 
            onClick={onUnlock}
            className="text-xs font-sans text-green/50 underline tracking-widest uppercase mt-4"
          >
            Skip to manual
          </button>
        </div>
      </div>
    </div>
  );
}

// Re-using Lucide Icon for script usage
function RefreshCcw(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" 
      strokeLinecap="round" strokeLinejoin="round" 
      {...props}
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}
