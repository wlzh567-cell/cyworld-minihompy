"use client";

import React, { useState } from "react";
import { X, Gift, Check, Sparkles, Copy } from "lucide-react";
import confetti from "canvas-confetti";
import { showToast } from "./Toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillContact?: string;
  onComplete: (nickname: string) => void;
}

export default function PreRegistrationModal({
  isOpen,
  onClose,
  prefillContact = "",
  onComplete,
}: ModalProps) {
  const [contact, setContact] = useState(prefillContact);
  const [nickname, setNickname] = useState("kobe");
  const [agreed, setAgreed] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;

    // Confetti celebration
    if (typeof window !== "undefined") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FEE589", "#FF6B57", "#7D968B", "#2B3044"],
      });
    }

    setIsSubmitted(true);
    onComplete(nickname);
    showToast("🎉 사전 예약이 성공적으로 완료되었습니다!");
  };

  const referralUrl = `https://onroom.me/?ref=${encodeURIComponent(nickname)}_room`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    showToast("초대 링크가 복사되었습니다! 💌");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202433]/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80 animate-in zoom-in-95">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#9FA4B8] hover:text-[#2B3044] rounded-full transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-extrabold text-[#2B3044] mb-1">
                사전 예약 신청
              </h3>
              <p className="text-xs text-[#676D82]">
                런칭 즉시 알림 및 얼리버드 한정 오브제를 지급해 드립니다.
              </p>
            </div>

            {/* Reward Teaser */}
            <div className="bg-[#FFF8F0] border border-[#FFE4C7] rounded-2xl p-4 flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FEE589] flex items-center justify-center text-xl shrink-0">
                🎁
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-extrabold text-[#2B3044]">
                  얼리버드 한정 빈티지 램프 & 1,500 페블
                </h5>
                <p className="text-[11px] text-[#676D82] mt-0.5">
                  서비스 정식 오픈 시 내 아지트 보관함으로 즉시 지급됩니다.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-[#2B3044] mb-1.5">
                  연락처 또는 이메일
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="010-0000-0000 또는 example@email.com"
                  className="w-full bg-white border border-[#2B3044]/15 rounded-xl px-4 py-3 text-sm text-[#2B3044] placeholder:text-[#9FA4B8] focus:outline-none focus:border-[#FF6B57]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#2B3044] mb-1.5">
                  내 룸 닉네임 (URL 생성용)
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="예: 코비, 민지, 서아"
                  className="w-full bg-white border border-[#2B3044]/15 rounded-xl px-4 py-3 text-sm text-[#2B3044] placeholder:text-[#9FA4B8] focus:outline-none focus:border-[#FF6B57]"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="modal-terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 text-[#FF6B57] rounded border-[#2B3044]/20 focus:ring-0"
                  required
                />
                <label htmlFor="modal-terms" className="text-xs text-[#676D82] select-none">
                  사전 예약 알림 및 개인정보 수집에 동의합니다.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6B57] hover:bg-[#E85542] text-white text-sm font-extrabold py-3.5 rounded-full shadow-[0_6px_18px_rgba(255,107,87,0.35)] transition-all mt-2"
              >
                사전 예약 완료하고 혜택 받기
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-5xl mb-3 animate-bounce">🎉</div>
            <h3 className="text-2xl font-extrabold text-[#2B3044] mb-2">
              사전 예약이 완료되었습니다!
            </h3>
            <p className="text-xs sm:text-sm text-[#676D82] leading-relaxed mb-6">
              <strong>1,500 페블</strong>과 <strong>한정판 빈티지 램프</strong>가 보관함에 예약되었습니다.
            </p>

            <div className="bg-[#F3F0E9] rounded-2xl p-4 text-left mb-6">
              <div className="text-[11px] font-extrabold text-[#2B3044] mb-1">
                나만의 고유 초대 링크:
              </div>
              <div className="text-xs font-mono text-[#FF6B57] break-all font-bold">
                {referralUrl}
              </div>
            </div>

            <button
              onClick={copyLink}
              className="w-full bg-[#2B3044] hover:bg-[#1B1E2B] text-white text-sm font-extrabold py-3.5 rounded-full shadow-md transition-all flex items-center justify-center gap-2 mb-2"
            >
              <Copy className="w-4 h-4 text-[#FEE589]" />
              <span>초대 링크 복사하고 친구 부르기</span>
            </button>

            <button
              onClick={onClose}
              className="text-xs text-[#9FA4B8] hover:text-[#2B3044] font-bold mt-2"
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
