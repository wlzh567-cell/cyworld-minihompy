"use client";

import React from "react";
import { X, MessageSquare, Send, Sparkles, Trophy, Calendar, Building, Award } from "lucide-react";
import { User, Recognition, getUserCumulativePoints } from "../../types/kudos";

interface UserProfileModalProps {
  user: User | null;
  currentUser: User;
  allRecognitions: Recognition[];
  onClose: () => void;
  onOpenSendKudos: (userId: string) => void;
  onOpenChat: (userId: string) => void;
}

export default function UserProfileModal({
  user,
  currentUser,
  allRecognitions,
  onClose,
  onOpenSendKudos,
  onOpenChat,
}: UserProfileModalProps) {
  if (!user) return null;

  const isMe = user.id === currentUser.id;

  // Recent received recognitions
  const receivedKudos = allRecognitions.filter((r) => r.receiverId === user.id);

  // Top received tags
  const tagCounts: Record<string, number> = {};
  receivedKudos.forEach((r) => {
    tagCounts[r.coreValueTag] = (tagCounts[r.coreValueTag] || 0) + 1;
  });
  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden border border-neutral-100 flex flex-col max-h-[90vh]">
        {/* Profile Header Background */}
        <div className="relative h-28 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-4 flex justify-end items-start">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card Body */}
        <div className="px-6 pb-6 pt-0 relative flex-1 overflow-y-auto">
          {/* Avatar */}
          <div className="-mt-14 mb-3 flex items-end justify-between">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-xl bg-white"
              />
              {user.isBirthdayToday && (
                <span className="absolute -top-2 -right-2 text-xl filter drop-shadow">🎂</span>
              )}
            </div>

            <div className="text-right pb-1">
              <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 block">
                {user.department}
              </span>
            </div>
          </div>

          {/* Name & Job */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-neutral-900">{user.name}</h3>
              {user.role === "hr_admin" && (
                <span className="text-[10px] bg-neutral-900 text-white font-extrabold px-2 py-0.5 rounded-full">
                  HR Admin
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500 font-semibold mt-0.5">{user.jobTitle}</p>
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <div className="bg-neutral-50 p-3 rounded-2xl border border-neutral-100">
              <span className="text-[10px] text-neutral-400 font-bold block mb-0.5">
                누적 동료 인정 포인트
              </span>
              <div className="text-lg font-black text-emerald-600">
                +{getUserCumulativePoints(user).toLocaleString()} <span className="text-xs">P</span>
              </div>
            </div>
            <div className="bg-neutral-50 p-3 rounded-2xl border border-neutral-100">
              <span className="text-[10px] text-neutral-400 font-bold block mb-0.5">
                함께 성장한 시간
              </span>
              <div className="text-lg font-black text-neutral-800">
                {user.joinedDaysAgo} <span className="text-xs text-neutral-500">일째</span>
              </div>
            </div>
          </div>

          {/* Core Strengths */}
          {sortedTags.length > 0 && (
            <div className="mb-4">
              <span className="text-[11px] font-extrabold text-neutral-400 block mb-2 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>동료들이 인정한 핵심 강점</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sortedTags.map(([tag, count]) => (
                  <span
                    key={tag}
                    className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-xl"
                  >
                    {tag} <strong className="text-[10px] opacity-75">({count}회)</strong>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recent Kudos Received */}
          <div className="mb-5">
            <span className="text-[11px] font-extrabold text-neutral-400 block mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>최근 받은 칭찬 ({receivedKudos.length}건)</span>
            </span>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {receivedKudos.length === 0 ? (
                <div className="text-center py-4 text-xs text-neutral-400 bg-neutral-50 rounded-2xl">
                  아직 받은 칭찬이 없습니다. 먼저 첫 칭찬을 보내보세요!
                </div>
              ) : (
                receivedKudos.slice(0, 3).map((k) => (
                  <div
                    key={k.id}
                    className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold text-blue-600 bg-white px-2 py-0.5 rounded-full shadow-2xs">
                        {k.coreValueTag}
                      </span>
                      <span className="text-[10px] text-neutral-400">{k.createdAt}</span>
                    </div>
                    <p className="text-neutral-700 font-medium line-clamp-2 leading-relaxed text-[11px]">
                      "{k.message}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {!isMe ? (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100">
              <button
                onClick={() => {
                  onClose();
                  onOpenChat(user.id);
                }}
                className="py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>1:1 사내 메신저</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenSendKudos(user.id);
                }}
                className="py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>칭찬 & 포인트</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3 bg-neutral-100 text-neutral-700 font-bold rounded-2xl text-xs"
            >
              내 프로필 닫기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
