"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Gift, Sparkles, Check, Star, Coins, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreRegistrationModal from "@/components/PreRegistrationModal";
import Toast from "@/components/Toast";

export default function RewardsPage() {
  const [isPreRegOpen, setIsPreRegOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-[#F9F8F5]">
      <Toast />
      <Navbar onOpenPreReg={() => setIsPreRegOpen(true)} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#676D82] hover:text-[#FF6B57] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>메인 랜딩페이지로 돌아가기</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-white/90 border border-white/80 rounded-full px-4 py-1.5 shadow-sm text-xs font-extrabold text-[#2B3044] mb-3">
            <Gift className="w-3.5 h-3.5 text-[#FF6B57]" />
            <span>얼리버드 독점 보상 & 경제 시스템 안내</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2B3044] tracking-tight mb-4">
            사전 예약 리워드 & 가상 재화 가이드
          </h1>
          <p className="text-sm sm:text-base text-[#676D82] max-w-2xl leading-relaxed">
            온룸(ON:ROOM)의 경제 시스템은 과도한 과금 유도를 지양하고, 취향을 가꾸고 친구들과 교류하는 경험 그 자체를 보상하는 무상 재화 &apos;페블&apos;과 프리미엄 오브제를 위한 &apos;스타&apos;로 구성됩니다.
          </p>
        </div>

        {/* 1. Early-Bird Immediate Rewards */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#2B3044]/10 shadow-[0_12px_32px_rgba(43,48,68,0.06)] mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#2B3044] mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF6B57]" />
            <span>사전 예약자 100% 즉시 지급 혜택</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FFF8F0] border border-[#FFE4C7] rounded-2xl p-6 flex gap-4">
              <div className="text-4xl">💡</div>
              <div>
                <span className="text-[10px] font-mono font-bold bg-[#FF6B57] text-white px-2 py-0.5 rounded">
                  EXCLUSIVE OBJECT
                </span>
                <h3 className="text-lg font-extrabold text-[#2B3044] mt-1.5 mb-1">
                  얼리버드 한정 빈티지 브라스 램프
                </h3>
                <p className="text-xs text-[#676D82] leading-relaxed">
                  미드센추리 감성의 따뜻한 무드 조명. 정식 서비스 런칭 이후에는 재구매가 불가능한 사전 예약자 전용 영구 소장 가구입니다.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#2B3044]/10 rounded-2xl p-6 flex gap-4">
              <div className="text-4xl">💎</div>
              <div>
                <span className="text-[10px] font-mono font-bold bg-[#FEE589] text-[#2B3044] px-2 py-0.5 rounded">
                  STARTING ASSET
                </span>
                <h3 className="text-lg font-extrabold text-[#2B3044] mt-1.5 mb-1">
                  기본 정착 지원금 1,500 페블(Pebbles)
                </h3>
                <p className="text-xs text-[#676D82] leading-relaxed">
                  기본 벽지, 바닥재 및 스타터 가구 세트를 교환할 수 있는 풍성한 가상 재화로 나만의 첫 아지트를 바로 개설하세요.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Virtual Economy Teaser (Stars vs Pebbles) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#2B3044]/10 shadow-[0_12px_32px_rgba(43,48,68,0.06)] mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#2B3044] mb-2">
            온룸 듀얼 가상 재화 시스템 (Dual Economy)
          </h2>
          <p className="text-xs sm:text-sm text-[#676D82] mb-8">
            친구들의 방명록 방문, BGM 청취, 파도타기 소통을 통해 유기적으로 획득하는 선순환 경제 체계입니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Pebble */}
            <div className="border border-[#2B3044]/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <Coins className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-extrabold text-[#2B3044]">페블 (Pebble) — 무상 재화</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-[#676D82]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>친구 방명록에 스티커를 붙이고 안부를 남기면 획득</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>내 방 BGM을 친구가 1회 청취할 때마다 상호 적립</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>가구 숍에서 일반 인테리어 소품 및 식물 화분 교환</span>
                </li>
              </ul>
            </div>

            {/* Paid Star */}
            <div className="border border-[#FF6B57]/30 bg-[#FFF9F8] rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-[#FF6B57]" />
                <h3 className="text-lg font-extrabold text-[#2B3044]">스타 (Star) — 유상 재화</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-[#676D82]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B57] shrink-0" />
                  <span>인디 일러스트레이터와의 한정판 콜라보레이션 가구 소장</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B57] shrink-0" />
                  <span>정식 라이선스 인디 & 시티팝 BGM 음원 패키지 소장</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B57] shrink-0" />
                  <span>특별한 2.5D 날씨/조명 이펙트 (비 내리는 창가, 모닥불 등)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <button
            onClick={() => setIsPreRegOpen(true)}
            className="bg-[#FF6B57] hover:bg-[#E85542] text-white text-sm font-extrabold px-8 py-4 rounded-full shadow-[0_8px_25px_rgba(255,107,87,0.35)] transition-all transform hover:-translate-y-0.5"
          >
            지금 사전 예약하고 1,500 페블 받기 ➔
          </button>
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
