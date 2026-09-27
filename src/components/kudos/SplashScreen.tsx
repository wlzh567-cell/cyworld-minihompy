"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShieldCheck } from "lucide-react";

interface SplashScreenProps {
  onFinish: () => void;
  minDuration?: number;
}

export default function SplashScreen({ onFinish, minDuration = 2000 }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("사내 동료 네트워크 연결 중...");

  useEffect(() => {
    // Dynamic loading status messages
    const t1 = setTimeout(() => {
      setProgress(40);
      setStatusText("칭찬 피드 및 리워드 데이터 동기화...");
    }, 500);

    const t2 = setTimeout(() => {
      setProgress(75);
      setStatusText("심리적 안전 시스템 & 인사이트 활성화...");
    }, 1100);

    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText("kudoworks 준비 완료!");
    }, 1650);

    const tFinal = setTimeout(() => {
      onFinish();
    }, minDuration);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tFinal);
    };
  }, [minDuration, onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      onClick={onFinish}
      className="fixed inset-0 z-[100] h-[100dvh] w-full bg-gradient-to-b from-[#090D16] via-[#0C1222] to-[#0A0E1A] text-white flex flex-col items-center justify-between p-8 select-none cursor-pointer overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Top spacer */}
      <div className="w-full flex justify-end">
        <span className="text-[10px] text-neutral-500 font-mono tracking-wider">TAP TO SKIP</span>
      </div>

      {/* Center Hero: Signature Logo + Brand + Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center relative z-10"
      >
        {/* Animated Signature Logo Mark */}
        <div className="relative mb-6">
          {/* Pulsing Outer Ring */}
          <div className="absolute -inset-2.5 rounded-[32px] bg-gradient-to-tr from-blue-500/30 to-indigo-500/30 blur-md animate-pulse" />

          {/* Logo Box */}
          <div className="w-20 h-20 rounded-[28px] bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-amber-300 shadow-2xl shadow-blue-500/50 border border-white/25 relative overflow-hidden">
            {/* Shimmer Light Bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            <Sparkles className="w-10 h-10 text-amber-300 fill-amber-300/30 drop-shadow-[0_2px_8px_rgba(245,158,11,0.6)]" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-black tracking-tight text-white lowercase mb-2">
          kudoworks
        </h1>

        {/* Tagline */}
        <p className="text-xs font-medium text-neutral-400 max-w-xs leading-relaxed">
          동료 인정과 성장의 조직 문화 인텔리전스
        </p>
      </motion.div>

      {/* Bottom Area: Progress Bar & Dynamic Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-xs flex flex-col items-center relative z-10"
      >
        {/* Progress Bar Container */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-amber-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Status text */}
        <p className="text-[11px] font-medium text-neutral-400 transition-all duration-300">
          {statusText}
        </p>

        {/* Security & Version Footnote */}
        <div className="flex items-center gap-1.5 text-[10px] text-neutral-600 mt-4">
          <ShieldCheck className="w-3 h-3 text-emerald-500/70" />
          <span>B2B Enterprise Grade Security • v1.2</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
