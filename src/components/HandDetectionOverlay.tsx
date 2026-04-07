"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCcw, Lock } from 'lucide-react';

interface HandDetectionOverlayProps {
  onScanComplete: () => void;
}

export default function HandDetectionOverlay({ onScanComplete }: HandDetectionOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'ready' | 'complete'>('idle');

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStatus('ready');
    } catch (err) {
      console.error("Error accessing camera:", err);
      // Fail gracefully - just proceed if camera not available
      onScanComplete();
    }
  };

  const runScanning = () => {
    setIsScanning(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setStatus('complete');
        // Stop stream
        if (stream) stream.getTracks().forEach(track => track.stop());
        setTimeout(() => {
          onScanComplete();
        }, 1000);
      }
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [stream]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ivory/95">
      <div className="max-w-md w-full p-8 text-center space-y-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square max-w-[300px] mx-auto rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl"
        >
          {status === 'idle' ? (
            <div className="h-full flex flex-col items-center justify-center bg-cream/50">
              <Camera className="w-12 h-12 text-gold mb-4 opacity-50" />
              <button 
                onClick={startCamera}
                className="bg-gold text-white px-6 py-2 rounded-full font-sans text-sm tracking-widest hover:scale-105 transition-transform"
              >
                TOUCH INITIALIZED
              </button>
            </div>
          ) : (
            <div className="h-full relative">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="h-full w-full object-cover grayscale brightness-125 contrast-75 opacity-70"
              />
              {/* Scan Line Animation */}
              {isScanning && (
                <motion.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-gold shadow-[0_0_15px_#D4AF37] z-10"
                />
              )}
              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gold font-serif text-sm tracking-[0.2em] bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50">
                  {status === 'complete' ? 'MATCH FOUND' : isScanning ? 'VERIFYING...' : 'PLACE YOUR FINGER'}
                </span>
              </div>
            </div>
          )}
        </motion.div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl text-gray-800">Biometric Verification</h2>
          <p className="font-sans text-xs text-green/70 tracking-widest uppercase">Identity check for Aprilia Tri Kurniawati</p>
        </div>

        {status === 'ready' && !isScanning && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={runScanning}
            className="w-full bg-gold/80 backdrop-blur-sm text-white py-4 rounded-2xl shadow-lg font-sans tracking-widest flex items-center justify-center gap-3 hover:bg-gold transition-colors"
          >
            <Lock size={18} />
            HOLD TO SCAN
          </motion.button>
        )}

        {isScanning && (
          <div className="w-full h-1 bg-cream/50 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gold"
            />
          </div>
        )}
      </div>
    </div>
  );
}
