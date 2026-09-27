"use client";

import React, { useState, useEffect } from "react";
import { X, Search, Sparkles, Send, Heart, Check, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";
import { User, CoreValue } from "../../types/kudos";

interface SendKudosModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  users: User[];
  coreValues: CoreValue[];
  defaultReceiverId?: string;
  defaultTag?: string;
  onSendKudos: (receiverId: string, points: number, message: string, tag: string) => void;
}

export default function SendKudosModal({
  isOpen,
  onClose,
  currentUser,
  users,
  coreValues,
  defaultReceiverId,
  defaultTag,
  onSendKudos,
}: SendKudosModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>(coreValues[0]?.tag || "#원팀");
  const [message, setMessage] = useState("");
  const [pointsAmount, setPointsAmount] = useState(50);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (defaultReceiverId) {
        const target = users.find((u) => u.id === defaultReceiverId);
        if (target) {
          setSelectedUser(target);
          setStep(2);
        }
      }
      if (defaultTag) {
        setSelectedTag(defaultTag);
      }
    }
  }, [isOpen, defaultReceiverId, defaultTag, users]);

  if (!isOpen) return null;

  const candidateUsers = users.filter(
    (u) => u.id !== currentUser.id && (u.name.includes(searchQuery) || u.department.includes(searchQuery))
  );

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setStep(2);
  };

  const handleNextToPoints = () => {
    if (!message.trim()) return;
    setStep(3);
  };

  const handleSubmit = () => {
    if (!selectedUser || !message.trim()) return;
    if (currentUser.givePoints < pointsAmount) {
      alert("잔여 발송 포인트가 부족합니다.");
      return;
    }

    // Fire Confetti explosion!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3B82F6", "#EC4899", "#F59E0B", "#10B981"],
      });
    } catch {}

    onSendKudos(selectedUser.id, pointsAmount, message, selectedTag);
    setIsCompleted(true);
  };

  const handleFullClose = () => {
    setStep(1);
    setSelectedUser(null);
    setMessage("");
    setPointsAmount(50);
    setIsCompleted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h3 className="font-extrabold text-neutral-800 text-base">
              {isCompleted ? "칭찬 전송 완료!" : "동료에게 칭찬 보내기 (Kudos)"}
            </h3>
          </div>
          <button
            onClick={handleFullClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {isCompleted ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-xl mb-4 animate-bounce">
                <Sparkles className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-extrabold text-neutral-900 mb-1">
                {selectedUser?.name}님에게 마음을 전했어요!
              </h4>
              <p className="text-sm text-neutral-500 mb-6">
                +{pointsAmount}P 와 함께 전사 칭찬 피드에 자랑스럽게 등록되었습니다.
              </p>
              <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-100/80 text-left mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full shadow-xs">
                    {selectedTag}
                  </span>
                  <span className="text-xs text-neutral-500">+{pointsAmount} Points</span>
                </div>
                <p className="text-sm text-neutral-700 italic">"{message}"</p>
              </div>
              <button
                onClick={handleFullClose}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-500/25 transition-all"
              >
                피드로 돌아가기
              </button>
            </div>
          ) : step === 1 ? (
            <div>
              {/* Step 1: Select User */}
              <div className="mb-4">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  STEP 1 of 3
                </span>
                <h4 className="text-lg font-bold text-neutral-900 mt-2 mb-1">
                  어떤 동료를 칭찬하고 싶으신가요?
                </h4>
                <p className="text-xs text-neutral-500">
                  나의 이번 달 칭찬 잔여 버짓:{" "}
                  <strong className="text-blue-600 font-extrabold">{currentUser.givePoints}P</strong>
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="이름 또는 부서로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* User List */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {candidateUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-blue-50/60 border border-transparent hover:border-blue-100 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-11 h-11 rounded-full object-cover border border-neutral-200 group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <div className="text-sm font-bold text-neutral-900">{user.name}</div>
                        <div className="text-xs text-neutral-500">
                          {user.department} • {user.jobTitle}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ) : step === 2 ? (
            <div>
              {/* Step 2: Message & Core Value */}
              <div className="mb-4">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  STEP 2 of 3
                </span>
                <h4 className="text-lg font-bold text-neutral-900 mt-2">
                  <span className="text-blue-600">{selectedUser?.name}</span>님에게 어떤 가치를 인정하시나요?
                </h4>
              </div>

              {/* Core Values Selector */}
              <label className="text-xs font-bold text-neutral-600 block mb-2">
                사내 핵심 가치 (Core Value) 선택
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {coreValues.map((cv) => (
                  <button
                    key={cv.id}
                    type="button"
                    onClick={() => setSelectedTag(cv.tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      selectedTag === cv.tag
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30 scale-105"
                        : "bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200"
                    }`}
                  >
                    {cv.tag}
                  </button>
                ))}
              </div>

              {/* Message Input */}
              <label className="text-xs font-bold text-neutral-600 block mb-2">
                구체적인 감사 메시지 (동료들에게 공개 피드로 공유됩니다)
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="어떤 상황에서 어떤 기여를 해주셨나요? 칭찬과 감사의 마음을 구체적으로 적어주세요 :)"
                className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 border border-neutral-200 text-neutral-600 font-bold rounded-2xl hover:bg-neutral-50 transition-colors"
                >
                  이전
                </button>
                <button
                  type="button"
                  onClick={handleNextToPoints}
                  disabled={!message.trim()}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>다음 (포인트 지정)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Step 3: Points Slider */}
              <div className="mb-4">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  STEP 3 of 3
                </span>
                <h4 className="text-lg font-bold text-neutral-900 mt-2 mb-1">
                  선물할 칭찬 포인트를 정해주세요
                </h4>
                <p className="text-xs text-neutral-500">
                  받은 동료는 이 포인트로 기프티콘과 복지 상품을 교환할 수 있어요!
                </p>
              </div>

              {/* Point Display Card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 text-center shadow-xl shadow-blue-500/20 mb-6">
                <span className="text-xs font-bold text-blue-200 uppercase tracking-widest block mb-1">
                  GIVE REWARD POINTS
                </span>
                <div className="text-5xl font-black tracking-tight flex items-center justify-center gap-1">
                  <span>+{pointsAmount}</span>
                  <span className="text-2xl font-bold text-blue-200">P</span>
                </div>
                <div className="mt-3 text-xs text-blue-100">
                  전송 후 나의 잔여 버짓:{" "}
                  <strong>{currentUser.givePoints - pointsAmount}P</strong>
                </div>
              </div>

              {/* Slider */}
              <div className="mb-6 px-2">
                <input
                  type="range"
                  min={10}
                  max={Math.min(100, currentUser.givePoints)}
                  step={10}
                  value={pointsAmount}
                  onChange={(e) => setPointsAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs font-bold text-neutral-400 mt-2">
                  <span>10P</span>
                  <span>50P (기본)</span>
                  <span>100P (최대)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3.5 border border-neutral-200 text-neutral-600 font-bold rounded-2xl hover:bg-neutral-50 transition-colors"
                >
                  이전
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-2xl shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2 transform active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>칭찬 전송하고 폭죽 터뜨리기!</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
