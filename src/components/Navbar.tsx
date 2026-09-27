"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Home } from "lucide-react";

interface NavbarProps {
  onOpenPreReg: () => void;
}

export default function Navbar({ onOpenPreReg }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-full px-5 py-3 shadow-[0_4px_20px_rgba(43,48,68,0.06)] flex items-center justify-between transition-all">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 text-[#2B3044] group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2B3044] to-[#587065] flex items-center justify-center text-[#FEE589] shadow-sm transition-transform group-hover:scale-105">
            <Home className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#2B3044]">
            ON:ROOM
          </span>
          <span className="text-[10px] font-mono font-bold bg-[#FEE589] text-[#2B3044] px-1.5 py-0.5 rounded">
            MZ BETA
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="#sandbox"
            className="text-xs font-bold text-[#676D82] hover:text-[#FF6B57] transition-colors"
          >
            룸 꾸미기 체험
          </Link>
          <Link
            href="#features"
            className="text-xs font-bold text-[#676D82] hover:text-[#FF6B57] transition-colors"
          >
            핵심 기능 (Bento)
          </Link>
          <Link
            href="/rewards"
            className="text-xs font-bold text-[#676D82] hover:text-[#FF6B57] transition-colors flex items-center gap-1"
          >
            사전 예약 혜택
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B57]"></span>
          </Link>
          <Link
            href="/explore"
            className="text-xs font-bold text-[#676D82] hover:text-[#FF6B57] transition-colors"
          >
            이웃 룸 둘러보기
          </Link>
        </nav>

        {/* Nav Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenPreReg}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#FF6B57] hover:bg-[#E85542] text-white text-xs font-extrabold px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(255,107,87,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>사전 예약하기</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2B3044] hover:bg-black/5 rounded-full"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white/95 backdrop-blur-2xl border border-white/80 rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-4 text-sm font-bold text-[#2B3044]">
            <Link
              href="#sandbox"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FF6B57]"
            >
              룸 꾸미기 체험 (Sandbox)
            </Link>
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FF6B57]"
            >
              핵심 기능 소개 (Features)
            </Link>
            <Link
              href="/rewards"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FF6B57]"
            >
              사전 예약 리워드 상세
            </Link>
            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FF6B57]"
            >
              크리에이터 & 이웃 룸 탐색
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPreReg();
              }}
              className="w-full mt-2 bg-[#FF6B57] text-white py-3 rounded-full text-center font-extrabold shadow-md"
            >
              사전 예약하고 한정 룸 받기
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
