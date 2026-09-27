"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Heart,
  Trophy,
  ArrowRight,
  Clock,
  Users,
  Flame,
  Send,
  Cake,
  PartyPopper,
  UserPlus,
  X,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Recognition, getUserCumulativePoints } from "../../types/kudos";

interface KudosFeedTabProps {
  currentUser: User;
  users: User[];
  recognitions: Recognition[];
  onOpenSendModal: (defaultReceiverId?: string, defaultTag?: string) => void;
  onToggleCheers: (recId: string) => void;
  onSelectUserProfile: (user: User) => void;
}

export default function KudosFeedTab({
  currentUser,
  users,
  recognitions,
  onOpenSendModal,
  onToggleCheers,
  onSelectUserProfile,
}: KudosFeedTabProps) {
  const [filterMode, setFilterMode] = useState<"all" | "dept">("all");
  const [dismissedCards, setDismissedCards] = useState<string[]>([]);

  const getUser = (id: string) => users.find((u) => u.id === id);

  const filteredRecognitions = recognitions.filter((rec) => {
    if (filterMode === "all") return true;
    const receiver = getUser(rec.receiverId);
    return receiver?.department === currentUser.department;
  });

  // Calculate monthly champion (포인트를 소비해도 절대 깎이지 않는 영구 누적 인정 점수 기준)
  const topReceiver = users.reduce((prev, current) =>
    getUserCumulativePoints(prev) > getUserCumulativePoints(current)
      ? prev
      : current
  );

  // Today's Celebrations: Birthday & New Hire (filtered by dismissed)
  const birthdayUsers = users.filter(
    (u) => u.isBirthdayToday && !dismissedCards.includes(`bday-${u.id}`)
  );
  const newHireUsers = users.filter(
    (u) => (u.isNewHire || u.joinedDaysAgo <= 60) && !dismissedCards.includes(`nh-${u.id}`)
  );

  const handleDismiss = (cardId: string) => {
    setDismissedCards((prev) => [...prev, cardId]);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* 1. Top Wallet & Allowance Banner */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-5 rounded-3xl shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-neutral-400">이번 달 칭찬 버짓</span>
          <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
            ⏳ 매월 1일 자동 소멸
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] text-neutral-300 block mb-0.5">보낼 수 있는 포인트 (Give)</span>
            <div className="text-2xl font-black text-blue-400 flex items-baseline gap-1">
              <span>{currentUser.givePoints.toLocaleString()}</span>
              <span className="text-xs font-bold text-neutral-300">P</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] text-neutral-300 block mb-0.5">교환 가능 포인트 (Earned)</span>
            <div className="text-2xl font-black text-emerald-400 flex items-baseline gap-1">
              <span>{currentUser.earnedPoints.toLocaleString()}</span>
              <span className="text-xs font-bold text-neutral-300">P</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onOpenSendModal()}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 transform active:scale-98"
        >
          <Send className="w-4 h-4" />
          <span>동료에게 칭찬과 포인트 보내기</span>
        </button>
      </div>

      {/* 2. 🏆 [무조건 상단 고정] 이달의 칭찬 왕 (Top Earner) */}
      <div
        onClick={() => onSelectUserProfile(topReceiver)}
        className="bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-rose-500/20 border-2 border-amber-300/90 rounded-3xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={topReceiver.avatar}
              alt={topReceiver.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-400 shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-white shadow-xs">
              <Trophy className="w-3.5 h-3.5 fill-white" />
            </div>
          </div>
          <div>
            <div className="text-[10px] font-black text-amber-800 uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-500" />
              <span>이달의 칭찬 왕 (TOP EARNER)</span>
            </div>
            <div className="text-sm font-black text-neutral-900 flex items-center gap-1.5 mt-0.5">
              <span>{topReceiver.name}</span>
              <span className="text-xs font-semibold text-neutral-500">
                ({topReceiver.department})
              </span>
            </div>
            <div className="text-xs font-bold text-amber-700 mt-0.5">
              누적 +{getUserCumulativePoints(topReceiver).toLocaleString()}P 획득
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-black text-orange-600 bg-amber-100/90 px-3 py-1.5 rounded-full shadow-2xs group-hover:bg-orange-600 group-hover:text-white transition-colors">
          <span>MVP</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 3. 🎂🌱 [스와이프로 닫기 가능] 생일 & 신규 입사 축하 카드 */}
      <AnimatePresence>
        {(birthdayUsers.length > 0 || newHireUsers.length > 0) && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1 text-[11px] text-neutral-400 font-bold">
              <span>🎉 사내 축하 소식</span>
              <span className="text-[10px]">👈 좌우로 밀어서 닫기</span>
            </div>

            {/* Birthday Cards (Swipeable) */}
            {birthdayUsers.map((bUser) => {
              const cardId = `bday-${bUser.id}`;
              return (
                <motion.div
                  key={cardId}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 200, height: 0, marginBottom: 0 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 70) {
                      handleDismiss(cardId);
                    }
                  }}
                  className="bg-gradient-to-r from-pink-500/15 via-rose-500/15 to-purple-500/15 border border-pink-200 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs relative cursor-grab active:cursor-grabbing"
                >
                  <div
                    onClick={() => onSelectUserProfile(bUser)}
                    className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={bUser.avatar}
                        alt={bUser.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-pink-300"
                      />
                      <span className="absolute -bottom-1 -right-1 text-xs">🎂</span>
                    </div>
                    <div className="min-w-0 flex-1 flex flex-col gap-0.5">
                      {/* 1행: [✨ 오늘의 생일자] 태그 배지 */}
                      <div className="flex items-center">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-pink-100/90 text-pink-700 text-[10px] font-extrabold tracking-tight">
                          <Sparkles className="w-2.5 h-2.5 text-pink-500" />
                          오늘의 생일자
                        </span>
                      </div>
                      {/* 2행: 부서 · 대상자 */}
                      <div className="text-xs sm:text-sm font-extrabold text-neutral-900 tracking-tight leading-tight">
                        {bUser.department} · {bUser.name}
                      </div>
                      {/* 3행: 축하 메시지 */}
                      <div className="text-[11px] sm:text-xs font-medium text-pink-900/80 leading-tight hover:underline">
                        따뜻한 축하 칭찬을 전해보세요! 🎂
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pl-2 shrink-0">
                    {bUser.id !== currentUser.id && (
                      <button
                        onClick={() => onOpenSendModal(bUser.id, "#생일축하 🎂")}
                        className="px-2.5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-[11px] font-extrabold rounded-xl shadow-xs transition-all flex items-center gap-1 whitespace-nowrap active:scale-95"
                      >
                        <Cake className="w-3.5 h-3.5" />
                        <span>축하하기</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDismiss(cardId)}
                      className="p-1 rounded-full text-pink-400 hover:text-pink-700 hover:bg-pink-200/50 transition-colors"
                      title="닫기"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {/* New Hire Cards (Swipeable) */}
            {newHireUsers.map((nhUser) => {
              const cardId = `nh-${nhUser.id}`;
              return (
                <motion.div
                  key={cardId}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -200, height: 0, marginBottom: 0 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 70) {
                      handleDismiss(cardId);
                    }
                  }}
                  className="bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-blue-500/15 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs relative cursor-grab active:cursor-grabbing"
                >
                  <div
                    onClick={() => onSelectUserProfile(nhUser)}
                    className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={nhUser.avatar}
                        alt={nhUser.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-emerald-300"
                      />
                      <span className="absolute -bottom-1 -right-1 text-xs">🌱</span>
                    </div>
                    <div className="min-w-0 flex-1 flex flex-col gap-0.5">
                      {/* 1행: [🌱 신규 입사] 태그 배지 */}
                      <div className="flex items-center">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-100/90 text-emerald-800 text-[10px] font-extrabold tracking-tight">
                          <PartyPopper className="w-2.5 h-2.5 text-emerald-600" />
                          신규 입사
                        </span>
                      </div>
                      {/* 2행: 부서 · 대상자 */}
                      <div className="text-xs sm:text-sm font-extrabold text-neutral-900 tracking-tight leading-tight">
                        {nhUser.department} · {nhUser.name}
                      </div>
                      {/* 3행: 환영 메시지 */}
                      <div className="text-[11px] sm:text-xs font-medium text-emerald-900/80 leading-tight hover:underline">
                        첫 출근을 따뜻하게 환영해주세요! 🌱
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pl-2 shrink-0">
                    {nhUser.id !== currentUser.id && (
                      <button
                        onClick={() => onOpenSendModal(nhUser.id, "#환영합니다 🌱")}
                        className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-extrabold rounded-xl shadow-xs transition-all flex items-center gap-1 whitespace-nowrap active:scale-95"
                      >
                        <PartyPopper className="w-3.5 h-3.5" />
                        <span>환영하기</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDismiss(cardId)}
                      className="p-1 rounded-full text-emerald-500 hover:text-emerald-800 hover:bg-emerald-200/50 transition-colors"
                      title="닫기"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* 4. Feed Filters */}
      <div className="flex items-center justify-between pt-2">
        <h4 className="text-base font-extrabold text-neutral-900 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>실시간 칭찬 피드</span>
        </h4>

        <div className="flex bg-neutral-200/60 p-1 rounded-xl text-xs font-bold text-neutral-600">
          <button
            onClick={() => setFilterMode("all")}
            className={`px-3 py-1 rounded-lg transition-all ${
              filterMode === "all" ? "bg-white text-neutral-900 shadow-xs" : "hover:text-neutral-900"
            }`}
          >
            전사
          </button>
          <button
            onClick={() => setFilterMode("dept")}
            className={`px-3 py-1 rounded-lg transition-all ${
              filterMode === "dept" ? "bg-white text-neutral-900 shadow-xs" : "hover:text-neutral-900"
            }`}
          >
            내 부서 ({currentUser.department})
          </button>
        </div>
      </div>

      {/* 5. Recognition Feed Items */}
      <div className="space-y-3.5">
        {filteredRecognitions.map((rec) => {
          const sender = getUser(rec.senderId);
          const receiver = getUser(rec.receiverId);

          return (
            <div
              key={rec.id}
              className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow"
            >
              {/* Header: Sender -> Receiver (Clickable to view Profile) */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {/* Sender Profile Link */}
                  <button
                    onClick={() => sender && onSelectUserProfile(sender)}
                    className="flex items-center gap-1.5 hover:opacity-80 transition-opacity text-left"
                    title="프로필 보기"
                  >
                    <img
                      src={sender?.avatar}
                      alt={sender?.name}
                      className="w-7 h-7 rounded-full object-cover border border-neutral-200"
                    />
                    <span className="text-xs font-bold text-neutral-800 hover:text-blue-600 hover:underline">
                      {sender?.name}
                    </span>
                  </button>

                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />

                  {/* Receiver Profile Link */}
                  <button
                    onClick={() => receiver && onSelectUserProfile(receiver)}
                    className="flex items-center gap-1.5 hover:opacity-80 transition-opacity text-left"
                    title="프로필 보기"
                  >
                    <img
                      src={receiver?.avatar}
                      alt={receiver?.name}
                      className="w-7 h-7 rounded-full object-cover border-2 border-blue-400"
                    />
                    <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full hover:bg-blue-100 transition-colors">
                      @{receiver?.name}
                    </span>
                  </button>
                </div>

                {/* Points Badge */}
                <div className="text-xs font-black text-blue-600 bg-blue-100/70 px-2.5 py-1 rounded-full flex items-center gap-0.5 shadow-2xs">
                  <span>+{rec.pointsAmount}</span>
                  <span className="text-[10px]">P</span>
                </div>
              </div>

              {/* Core Value Tag */}
              <div className="mb-2">
                <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                  {rec.coreValueTag}
                </span>
              </div>

              {/* Message */}
              <p className="text-sm text-neutral-800 leading-relaxed font-medium mb-3 bg-neutral-50/60 p-3 rounded-2xl border border-neutral-100">
                {rec.message}
              </p>

              {/* Footer: Time & Cheers */}
              <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-xs text-neutral-400 font-semibold">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{rec.createdAt}</span>
                </div>

                {/* Cheers Button */}
                <button
                  onClick={() => onToggleCheers(rec.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                    rec.cheeredByMe
                      ? "bg-rose-50 text-rose-600 border-rose-200 shadow-2xs scale-105"
                      : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${rec.cheeredByMe ? "fill-rose-500 text-rose-500" : ""}`}
                  />
                  <span>응원하기</span>
                  <strong className="text-xs">{rec.cheersCount}</strong>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
