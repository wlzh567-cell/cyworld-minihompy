"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Sparkles, Heart, Music, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreRegistrationModal from "@/components/PreRegistrationModal";
import Toast, { showToast } from "@/components/Toast";

export default function ExplorePage() {
  const [isPreRegOpen, setIsPreRegOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const rooms = [
    {
      id: 1,
      title: "코비의 새벽 Lo-Fi 음악실 🌙",
      owner: "@kobe_cozy",
      category: "lofi",
      likes: 342,
      bgm: "Midnight in Seongsu",
      tags: ["미드센추리", "Lo-Fi", "빈티지오디오"],
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "도화의 식물 가득 테라스 온실 🌿",
      owner: "@dohwa_studio",
      category: "botanical",
      likes: 512,
      bgm: "Morning Sunlight",
      tags: ["식물인테리어", "테라스", "우드톤"],
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "민지의 따뜻한 북카페 & 레코드 룸 ☕",
      owner: "@minji_retro",
      category: "cafe",
      likes: 289,
      bgm: "Acoustic Afternoon",
      tags: ["북카페", "레트로", "크림아이보리"],
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      title: "진우의 사이버펑크 픽셀 아지트 ⚡",
      owner: "@jinwoo_neon",
      category: "modern",
      likes: 421,
      bgm: "Synthwave Echo",
      tags: ["네온사인", "매킨토시", "픽셀아트"],
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 5,
      title: "서아의 감성 포토그래피 갤러리 📷",
      owner: "@seoa_photo",
      category: "modern",
      likes: 670,
      bgm: "Sunset Tangerine",
      tags: ["전시액자", "미니멀", "선셋조명"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 6,
      title: "루카스의 빈티지 캠핑 락커 룸 ⛺",
      owner: "@lucas_camp",
      category: "cafe",
      likes: 198,
      bgm: "Campfire Chill",
      tags: ["캠핑기어", "러그", "아늑함"],
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&auto=format&fit=crop&q=80",
    },
  ];

  const filtered = activeCategory === "all" ? rooms : rooms.filter((r) => r.category === activeCategory);

  return (
    <main className="min-h-screen flex flex-col bg-[#F9F8F5]">
      <Toast />
      <Navbar onOpenPreReg={() => setIsPreRegOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#676D82] hover:text-[#FF6B57] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>메인 랜딩페이지로 돌아가기</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/90 border border-white/80 rounded-full px-4 py-1.5 shadow-sm text-xs font-extrabold text-[#2B3044] mb-3">
              <Compass className="w-3.5 h-3.5 text-[#FF6B57]" />
              <span>취향별 룸 갤러리</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2B3044] tracking-tight">
              이웃들의 감성 아지트 둘러보기
            </h1>
            <p className="text-sm sm:text-base text-[#676D82] mt-2">
              유령 방 없이 활동성 높은 1촌들의 개성 있는 방을 탐색해보세요.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "전체 룸" },
              { id: "lofi", label: "Lo-Fi 사운드" },
              { id: "botanical", label: "보태니컬 식물" },
              { id: "cafe", label: "코지 카페" },
              { id: "modern", label: "모던 픽셀" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#2B3044] text-white shadow-sm"
                    : "bg-white text-[#676D82] border border-[#2B3044]/10 hover:border-[#FF6B57]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-3xl border border-[#2B3044]/10 overflow-hidden shadow-[0_8px_25px_rgba(43,48,68,0.05)] hover:shadow-[0_16px_36px_rgba(43,48,68,0.1)] transition-all transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="h-48 sm:h-52 relative overflow-hidden bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#2B3044]/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <Music className="w-3 h-3 text-[#FEE589]" />
                    <span>{room.bgm}</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-[#FF6B57] mb-1">
                    <span>{room.owner}</span>
                    <span className="text-[#9FA4B8] flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      {room.likes}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-[#2B3044] mb-3 leading-snug">
                    {room.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {room.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold text-[#587065] bg-[#EBF1EE] px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    showToast(`${room.owner} 님의 방 스타일이 담겼습니다!`);
                    setIsPreRegOpen(true);
                  }}
                  className="w-full bg-[#FAF8F5] hover:bg-[#FEE589] border border-[#2B3044]/10 text-[#2B3044] text-xs font-extrabold py-3 rounded-xl transition-colors text-center"
                >
                  이 룸 스타일로 사전 등록 신청 ➔
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <PreRegistrationModal
        isOpen={isPreRegOpen}
        onClose={() => setIsPreRegOpen(false)}
        onComplete={() => {}}
      />
    </main>
  );
}
