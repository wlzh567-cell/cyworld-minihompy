"use client";

import React, { useState } from "react";
import { Check, Gift, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { showToast } from "./Toast";

interface MilestoneSectionProps {
  totalCount: number;
}

export default function MilestoneSection({ totalCount }: MilestoneSectionProps) {
  const [creatorIdx, setCreatorIdx] = useState(0);

  const creators = [
    {
      name: "묘묘 (Myomyo)",
      role: "인디 일러스트레이터",
      roomTitle: "포근한 고양이 작업실 🐾",
      tag: "따뜻한 크림 톤",
      img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "WaveKim",
      role: "사운드 디자이너",
      roomTitle: "미드센추리 바이닐 스튜디오 🎧",
      tag: "Lo-Fi 앰비언트",
      img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Roomie",
      role: "데스크테리어 인플루언서",
      roomTitle: "미니멀 우드 & 메탈 아지트 🪵",
      tag: "데스크테리어",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "도화 (Dohwa)",
      role: "감성 포토그래퍼",
      roomTitle: "노을빛 식물 테라스 룸 🌿",
      tag: "보태니컬 감성",
      img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80",
    },
  ];

  const handlePrev = () => {
    setCreatorIdx((prev) => (prev === 0 ? creators.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCreatorIdx((prev) => (prev === creators.length - 1 ? 0 : prev + 1));
  };

  const currentCreator = creators[creatorIdx];

  return (
    <section id="milestone" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Milestone Progress Card */}
      <div className="bg-white/85 backdrop-blur-2xl border border-white/80 rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_rgba(43,48,68,0.08)] mb-14">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-extrabold text-[#676D82] uppercase tracking-wider mb-1">
              전체 사전 예약 달성 현황
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-6xl font-extrabold text-[#2B3044] font-mono tracking-tight">
                {totalCount.toLocaleString()}
              </span>
              <span className="text-base sm:text-lg text-[#9FA4B8] font-bold">/ 100,000 명</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#DCFCE7] text-[#166534] px-4 py-1.5 rounded-full text-xs font-extrabold">
            <span className="w-2 h-2 rounded-full bg-[#166534] animate-pulse"></span>
            <span>{(totalCount / 1000).toFixed(1)}% 달성 완료</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-4 sm:h-5 bg-[#F3F0E9] rounded-full overflow-hidden shadow-inner mb-6">
          <div
            className="h-full bg-gradient-to-r from-[#FEE589] via-[#FF6B57] to-[#E85542] rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(255,107,87,0.4)]"
            style={{ width: `${Math.min(100, (totalCount / 100000) * 100)}%` }}
          ></div>
        </div>

        {/* Milestone Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="bg-white/90 border border-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#166534] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#166534]">1만 명 달성</span>
                <span className="text-[10px] bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded-full font-bold">해금</span>
              </div>
              <h5 className="text-xs sm:text-sm font-extrabold text-[#2B3044] mt-0.5">
                ☕ 빈티지 머그 & 500 페블
              </h5>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white/90 border border-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#166534] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#166534]">5만 명 달성</span>
                <span className="text-[10px] bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded-full font-bold">해금</span>
              </div>
              <h5 className="text-xs sm:text-sm font-extrabold text-[#2B3044] mt-0.5">
                📻 Lo-Fi 시크릿 BGM 팩
              </h5>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white/90 border border-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#92400E]">10만 명 목표</span>
                <span className="text-[10px] bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded-full font-bold">진행 중</span>
              </div>
              <h5 className="text-xs sm:text-sm font-extrabold text-[#2B3044] mt-0.5">
                🛋️ 원형 티테이블 & 1,000 페블
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-collaboration Creator Showcase Carousel */}
      <div className="bg-gradient-to-br from-[#FAF8F2] to-[#EDE7D8] border border-white/80 rounded-3xl p-6 sm:p-10 shadow-[0_12px_32px_rgba(43,48,68,0.06)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#587065] bg-[#EBF1EE] px-3 py-1 rounded-full uppercase">
              CREATOR COLLAB
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2B3044] mt-3">
              크리에이터들이 미리 꾸민 아지트 쇼케이스
            </h3>
            <p className="text-sm text-[#676D82] mt-1">
              인디 일러스트레이터, 뮤지션, 룸투어 인플루언서 4인의 감각적인 방 템플릿.
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 bg-white hover:bg-neutral-50 rounded-full border border-[#2B3044]/10 text-[#2B3044] shadow-xs transition-transform active:scale-95"
              aria-label="Previous creator"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 bg-white hover:bg-neutral-50 rounded-full border border-[#2B3044]/10 text-[#2B3044] shadow-xs transition-transform active:scale-95"
              aria-label="Next creator"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Creator Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 h-48 sm:h-64 rounded-xl overflow-hidden shadow-inner relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentCreator.img}
              alt={currentCreator.name}
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-[#2B3044]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              {currentCreator.tag}
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col justify-center">
            <span className="text-xs font-extrabold text-[#FF6B57]">{currentCreator.role}</span>
            <h4 className="text-xl sm:text-2xl font-extrabold text-[#2B3044] mt-1 mb-2">
              {currentCreator.name} — {currentCreator.roomTitle}
            </h4>
            <p className="text-sm text-[#676D82] leading-relaxed mb-6">
              &quot;온룸에서는 남들의 시선에 쫓기지 않고, 오롯이 내가 좋아하는 소품과 플레이리스트로 공간을 채울 수 있어 마음이 편안해져요.&quot;
            </p>
            <button
              onClick={() => showToast(`${currentCreator.name} 님의 룸 템플릿이 사전 북마크되었습니다!`)}
              className="self-start bg-[#2B3044] hover:bg-[#1B1E2B] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-all"
            >
              이 룸 템플릿으로 입주 신청
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
