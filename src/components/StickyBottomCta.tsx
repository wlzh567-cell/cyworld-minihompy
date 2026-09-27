"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface StickyProps {
  onOpenPreReg: () => void;
}

export default function StickyBottomCta({ onOpenPreReg }: StickyProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 420) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-32px)] max-w-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#2B3044]/95 text-white backdrop-blur-xl border border-white/20 rounded-full px-5 py-3 shadow-[0_16px_36px_rgba(0,0,0,0.3)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="bg-[#FF6B57] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full whitespace-nowrap">
            사전 등록 혜택
          </span>
          <span className="text-xs sm:text-sm font-semibold truncate">
            한정판 빈티지 램프 + 1,500 페블 100% 지급
          </span>
        </div>

        <button
          onClick={onOpenPreReg}
          className="bg-[#FEE589] hover:bg-[#FFE066] text-[#2B3044] text-xs font-extrabold px-5 py-2.5 rounded-full shadow-md whitespace-nowrap transition-transform transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
        >
          <span>사전 등록 신청</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
