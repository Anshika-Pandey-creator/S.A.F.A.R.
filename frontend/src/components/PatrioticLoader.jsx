import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Navigation, Globe, Award, CheckCircle2, Lock } from 'lucide-react';

// Authentic 24-Spoke Ashoka Chakra SVG with Radial Neon Glow
const AshokaChakra = ({ size = 64, className = "" }) => {
  const spokes = Array.from({ length: 24 });
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`shrink-0 drop-shadow-[0_0_12px_rgba(0,0,128,0.4)] ${className}`}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
    >
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="46" fill="none" stroke="#000080" strokeWidth="4" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#000080" strokeWidth="1.5" />
      
      {/* Center Hub */}
      <circle cx="50" cy="50" r="8" fill="#000080" />
      <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" />

      {/* 24 Sharp Spokes */}
      {spokes.map((_, i) => {
        const angle = i * 15;
        const rad = (angle * Math.PI) / 180;
        const x2 = 50 + 42 * Math.sin(rad);
        const y2 = 50 - 42 * Math.cos(rad);

        const dotRad = ((angle + 7.5) * Math.PI) / 180;
        const dotX = 50 + 44 * Math.sin(dotRad);
        const dotY = 50 - 44 * Math.cos(dotRad);

        return (
          <g key={i}>
            <line
              x1="50"
              y1="50"
              x2={x2}
              y2={y2}
              stroke="#000080"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx={dotX} cy={dotY} r="0.9" fill="#000080" />
          </g>
        );
      })}
    </motion.svg>
  );
};

export default function PatrioticLoader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing SafeTour NE Security Gateway...');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const durationMs = 3400; // 3.4 seconds initial load sequence
    const intervalMs = 25;
    const totalSteps = durationMs / intervalMs;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
      setProgress(nextProgress);

      // Status messages sequence based on progress
      if (nextProgress < 22) {
        setStatusText('🔐 Authenticating SHA-256 Crypto Tourist Digital ID...');
      } else if (nextProgress < 45) {
        setStatusText('🗺️ Rendering High-Zoom Satellite Geo-Fence Engine...');
      } else if (nextProgress < 70) {
        setStatusText('🧠 Calibrating Explainable AI Risk Diagnostics (0-100)...');
      } else if (nextProgress < 92) {
        setStatusText('🚨 Connecting Police Command & SOS Emergency Matrix...');
      } else {
        setStatusText('🇮🇳 SafeTour NE Gateway Fully Armed & Ready!');
      }

      if (nextProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFinished(true);
          if (onLoadingComplete) onLoadingComplete();
        }, 500);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  if (isFinished) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-100 via-slate-50 to-gray-200 flex items-center justify-center overflow-hidden select-none"
      >
        {/* Ambient Glowing Orbs (Saffron, White, Green Tricolor Atmosphere) */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-400/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

        {/* Futuristic Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

        {/* Central Graphic Container */}
        <div className="relative z-10 w-full max-w-2xl px-6 py-8 mx-auto text-center space-y-7">
          
          {/* Top Header Badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-300 text-xs font-extrabold text-amber-800 shadow-lg"
          >
            <span className="text-sm">🇮🇳</span>
            <span>GOVERNMENT OF INDIA</span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-700">MINISTRY OF DoNER</span>
          </motion.div>

          {/* HIGH-GRAPHIC TRICOLOR FLAG EMBLEM CARD */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative w-full rounded-3xl p-1 bg-gradient-to-b from-amber-400/40 via-white/80 to-emerald-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl overflow-hidden"
          >
            <div className="bg-white/95 rounded-[22px] p-4 sm:p-6 space-y-4 border border-slate-200">
              
              {/* 1. SAFFRON BAND — Top-Right Sweep */}
              <motion.div
                initial={{ x: '100%', y: '-80%', opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="h-14 w-full rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 shadow-lg border border-orange-400/50 flex items-center justify-between px-5 relative overflow-hidden group"
              >
                {/* Shimmer Light Reflection */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                
                <div className="flex items-center space-x-2 text-slate-950 font-black text-xs uppercase tracking-widest">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-950" />
                  <span>SAFFRON • COURAGE & SACRIFICE</span>
                </div>
                <span className="text-[10px] font-bold text-slate-950/70 uppercase hidden sm:inline">
                  STRENGTH OF THE NATION
                </span>
              </motion.div>

              {/* 2. WHITE BAND WITH ANIMATED ASHOKA CHAKRA — Center Expansion */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
                className="h-16 w-full rounded-2xl bg-gradient-to-r from-slate-100 via-white to-slate-100 shadow-xl border border-slate-300 flex items-center justify-between px-5 relative overflow-hidden"
              >
                <div className="hidden sm:flex items-center space-x-1.5 text-navy-950 font-extrabold text-[11px] uppercase tracking-wider">
                  <span>TRUTH</span>
                  <span>•</span>
                  <span>PEACE</span>
                </div>

                {/* Center Spinning Ashoka Chakra & Title Badge */}
                <div className="mx-auto flex items-center space-x-3.5">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="p-1 rounded-full bg-blue-50/90 shadow-lg border border-blue-900/30"
                  >
                    <AshokaChakra size={44} />
                  </motion.div>

                  <div className="text-left">
                    <div className="text-sm font-black text-navy-950 tracking-tight leading-none">
                      ASHOKA CHAKRA
                    </div>
                    <div className="text-[10px] font-extrabold text-blue-900 tracking-wider uppercase mt-0.5">
                      24 Spokes • Wheel of Law & Progress
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center space-x-1 text-navy-950 font-extrabold text-[11px] uppercase tracking-wider">
                  <span>SIH26207</span>
                </div>
              </motion.div>

              {/* 3. GREEN BAND — Bottom-Left Sweep */}
              <motion.div
                initial={{ x: '-100%', y: '80%', opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                className="h-14 w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 shadow-lg border border-emerald-400/50 flex items-center justify-between px-5 relative overflow-hidden group"
              >
                <div className="flex items-center space-x-2 text-slate-950 font-black text-xs uppercase tracking-widest">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-950" />
                  <span>GREEN • FAITH & FERTILITY</span>
                </div>
                <span className="text-[10px] font-bold text-slate-950/70 uppercase hidden sm:inline">
                  PROSPERITY & GROWTH
                </span>
              </motion.div>

            </div>
          </motion.div>

          {/* PROJECT BRANDING HEADING */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="space-y-1.5"
          >
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 drop-shadow-sm">
              S.A.F.A.R. <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent"></span>
            </h1>
            <p className="text-xs text-slate-600 font-semibold max-w-lg mx-auto">
              Smart Tourist Safety Monitoring & Incident Response System (SIH Problem Statement SIH26207)
            </p>
          </motion.div>

          {/* SLEEK TRICOLOR PROGRESS BAR & DYNAMIC STATUS TEXT */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="space-y-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-xl"
          >
            <div className="flex items-center justify-between text-xs font-semibold px-1">
              <span className="flex items-center space-x-2 text-slate-700">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin shrink-0" />
                <span className="font-mono text-emerald-800 font-bold truncate max-w-[260px] sm:max-w-md">
                  {statusText}
                </span>
              </span>
              <span className="font-mono font-black text-amber-600 text-base tracking-wider shrink-0">
                {progress}%
              </span>
            </div>

            {/* High-Graphic Loading Bar */}
            <div className="relative w-full h-3 rounded-full bg-slate-100 border border-slate-300 overflow-hidden p-0.5 shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 via-emerald-400 to-emerald-600 shadow-[0_0_15px_rgba(249,115,22,0.6)] relative"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              >
                {/* Glowing Lead Light Bullet */}
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-white rounded-full shadow-[0_0_10px_#ffffff] animate-ping" />
              </motion.div>
            </div>

            {/* Bottom Key Feature Pills */}
            <div className="pt-2 flex items-center justify-center space-x-5 text-[11px] font-bold text-slate-600 border-t border-slate-200">
              <span className="flex items-center space-x-1.5 text-amber-700">
                <Lock className="w-3.5 h-3.5" />
                <span>SHA-256 Crypto ID</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5 text-blue-700">
                <Globe className="w-3.5 h-3.5" />
                <span>Geo-Fencing HD</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5 text-emerald-700">
                <Navigation className="w-3.5 h-3.5" />
                <span>AI Risk Score</span>
              </span>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
