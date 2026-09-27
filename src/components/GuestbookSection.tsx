"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Heart, Lock, Send, Sparkles, Smile, Filter, Clock } from "lucide-react";
import { showToast } from "./Toast";

export interface GuestbookEntry {
  id: string;
  author: string;
  avatar: string;
  content: string;
  sticker: string;
  moodColor: "yellow" | "mint" | "coral" | "lavender";
  isSecret: boolean;
  likes: number;
  timestamp: string;
}

const DEFAULT_ENTRIES: GuestbookEntry[] = [
  {
    id: "entry-1",
    author: "민지_retro",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    content: "퇴근하고 맥주 한 캔 들고 놀러왔어! 방 BGM 선곡 센스 진짜 미쳤다... 계속 틀어두는 중 🎧",
    sticker: "☕",
    moodColor: "yellow",
    isSecret: false,
    likes: 14,
    timestamp: "방금 전",
  },
  {
    id: "entry-2",
    author: "성수동_웨이브",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    content: "노을 핑크 조명 켜두니까 분위기 대박이야 🌇 나도 얼리버드 램프 받으려고 바로 사전 예약 완료했음!",
    sticker: "🍒",
    moodColor: "coral",
    isSecret: false,
    likes: 8,
    timestamp: "12분 전",
  },
  {
    id: "entry-3",
    author: "도화",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    content: "싸이월드 미니홈피 시절 생각나서 울컥했잖아 🥹 1촌 맺고 자주 들를게요! 방 너무 감성적이야.",
    sticker: "💌",
    moodColor: "mint",
    isSecret: false,
    likes: 21,
    timestamp: "35분 전",
  },
  {
    id: "entry-4",
    author: "익명의 이웃",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
    content: "자물쇠를 걸어둔 다정한 비밀 안부입니다. 방 주인만 따뜻하게 열어볼 수 있어요 🕊️",
    sticker: "⭐",
    moodColor: "lavender",
    isSecret: true,
    likes: 5,
    timestamp: "1시간 전",
  },
];

const MOOD_STYLES = {
  yellow: "bg-[#FFF9DB] border-[#FFE066] text-[#2B3044]",
  mint: "bg-[#E6FCF5] border-[#96F2D7] text-[#2B3044]",
  coral: "bg-[#FFF0F0] border-[#FFC9C9] text-[#2B3044]",
  lavender: "bg-[#F3F0FF] border-[#D0BFFF] text-[#2B3044]",
};

export default function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(DEFAULT_ENTRIES);
  const [filter, setFilter] = useState<"all" | "public" | "secret">("all");

  // Form State
  const [authorName, setAuthorName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedSticker, setSelectedSticker] = useState("🍒");
  const [selectedMood, setSelectedMood] = useState<"yellow" | "mint" | "coral" | "lavender">("yellow");
  const [isSecret, setIsSecret] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("onroom_guestbook_entries");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setEntries(parsed);
          }
        } catch {
          // fallback
        }
      }
    }
  }, []);

  // Save to LocalStorage
  const saveEntries = (newEntries: GuestbookEntry[]) => {
    setEntries(newEntries);
    if (typeof window !== "undefined") {
      localStorage.setItem("onroom_guestbook_entries", JSON.stringify(newEntries));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: `entry-${Date.now()}`,
      author: authorName.trim() || "다정한 이웃",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      content: message.trim(),
      sticker: selectedSticker,
      moodColor: selectedMood,
      isSecret,
      likes: 0,
      timestamp: "방금 전",
    };

    saveEntries([newEntry, ...entries]);
    setMessage("");
    setIsFormOpen(false);

    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(15);
    }

    showToast("💌 따뜻한 방명록 글이 남겨졌습니다!");
  };

  const toggleLike = (id: string) => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, likes: entry.likes + 1 };
      }
      return entry;
    });
    saveEntries(updated);
    showToast("❤️ 방명록에 하트를 보냈습니다!");
  };

  const filteredEntries = entries.filter((item) => {
    if (filter === "public") return !item.isSecret;
    if (filter === "secret") return item.isSecret;
    return true;
  });

  return (
    <section id="guestbook" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-white/80 rounded-full px-4 py-1.5 shadow-sm text-xs font-extrabold text-[#2B3044] mb-3">
          <MessageSquare className="w-3.5 h-3.5 text-[#FF6B57]" />
          <span>모바일 터치 최적화 비동기 소통</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2B3044] tracking-tight mb-3">
          다정한 온기의 모바일 롤링페이퍼
        </h2>
        <p className="text-[#676D82] text-sm sm:text-base">
          핸드폰에서도 터치 한 번으로 친구의 방명록에 스티커와 손글씨 안부를 남길 수 있습니다.
        </p>
      </div>

      <div className="bg-white/85 backdrop-blur-2xl border border-white/80 rounded-3xl p-5 sm:p-10 shadow-[0_16px_40px_rgba(43,48,68,0.08)]">
        {/* Top Controls: Filter & Write Trigger */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Filter Pills */}
          <div className="flex items-center bg-[#2B3044]/5 p-1 rounded-full self-start">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === "all" ? "bg-white text-[#2B3044] shadow-sm" : "text-[#676D82]"
              }`}
            >
              전체 쪽지 ({entries.length})
            </button>
            <button
              onClick={() => setFilter("public")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === "public" ? "bg-white text-[#2B3044] shadow-sm" : "text-[#676D82]"
              }`}
            >
              공개 방명록
            </button>
            <button
              onClick={() => setFilter("secret")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === "secret" ? "bg-white text-[#2B3044] shadow-sm" : "text-[#676D82]"
              }`}
            >
              비밀 안부 🔒
            </button>
          </div>

          {/* New Post Button */}
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-[#FF6B57] hover:bg-[#E85542] text-white text-xs sm:text-sm font-extrabold px-5 py-3 rounded-full shadow-[0_4px_16px_rgba(255,107,87,0.35)] transition-all flex items-center justify-center gap-2 transform active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isFormOpen ? "작성창 접기" : "나도 쪽지 남기기"}</span>
          </button>
        </div>

        {/* Expandable Write Form (Mobile Friendly Bottom/Inline Drawer) */}
        {isFormOpen && (
          <div className="bg-[#FAF8F5] border border-[#2B3044]/10 rounded-2xl p-5 sm:p-6 mb-8 animate-in fade-in slide-in-from-top-3">
            <h4 className="text-sm font-extrabold text-[#2B3044] mb-3 flex items-center gap-2">
              <span>✍️ 방명록 한 줄 남기기</span>
              <span className="text-[10px] font-normal text-[#676D82]">
                (휴대폰에서도 자판 치기 편하게 최적화되어 있습니다)
              </span>
            </h4>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="내 닉네임 (미입력 시 '다정한 이웃')"
                  className="bg-white border border-[#2B3044]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2B3044] focus:outline-none focus:border-[#FF6B57]"
                />

                {/* Mood Color Options */}
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#2B3044]/15">
                  <span className="text-xs text-[#676D82] font-bold">노트 색상:</span>
                  {(["yellow", "mint", "coral", "lavender"] as const).map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setSelectedMood(color)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        color === "yellow"
                          ? "bg-[#FFF9DB]"
                          : color === "mint"
                          ? "bg-[#E6FCF5]"
                          : color === "coral"
                          ? "bg-[#FFF0F0]"
                          : "bg-[#F3F0FF]"
                      } ${selectedMood === color ? "scale-125 border-[#2B3044]" : "border-transparent"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Message Textarea */}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="친구에게 전하고 싶은 따뜻한 한마디나 감상을 남겨보세요..."
                className="w-full bg-white border border-[#2B3044]/15 rounded-xl p-4 text-xs sm:text-sm text-[#2B3044] focus:outline-none focus:border-[#FF6B57] resize-none"
                required
              />

              {/* Stickers & Options */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  <span className="text-xs text-[#676D82] font-bold shrink-0">스티커:</span>
                  {["🍒", "⭐", "💌", "☕", "🐈", "🍀", "🎧", "🌙"].map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setSelectedSticker(emoji)}
                      className={`p-1.5 rounded-lg border text-base transition-transform active:scale-90 ${
                        selectedSticker === emoji
                          ? "bg-white border-[#FF6B57] scale-125 shadow-xs"
                          : "border-transparent hover:bg-white"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-[#676D82] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isSecret}
                      onChange={(e) => setIsSecret(e.target.checked)}
                      className="w-3.5 h-3.5 text-[#FF6B57] rounded border-[#2B3044]/20"
                    />
                    <Lock className="w-3.5 h-3.5" />
                    <span>비밀글로 남기기</span>
                  </label>

                  <button
                    type="submit"
                    className="bg-[#2B3044] hover:bg-[#1B1E2B] text-white text-xs font-extrabold px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-[#FEE589]" />
                    <span>남기기</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Guestbook Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredEntries.map((entry) => {
            const style = MOOD_STYLES[entry.moodColor] || MOOD_STYLES.yellow;
            return (
              <div
                key={entry.id}
                className={`relative rounded-2xl p-5 border shadow-sm transition-all transform hover:-translate-y-0.5 ${style}`}
              >
                {/* Floating Sticker */}
                <div className="absolute top-3 right-3 text-2xl filter drop-shadow-sm">
                  {entry.sticker}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={entry.avatar}
                    alt={entry.author}
                    className="w-9 h-9 rounded-full object-cover border border-white shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="text-xs sm:text-sm font-extrabold text-[#2B3044]">
                        {entry.author}
                      </h5>
                      {entry.isSecret && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-amber-200/60 px-1.5 py-0.2 rounded">
                          <Lock className="w-2.5 h-2.5" /> 비밀
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#676D82] font-mono flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {entry.timestamp}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm leading-relaxed mb-4 font-normal text-[#2B3044]/90 pr-6">
                  {entry.content}
                </p>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-black/5 text-xs">
                  <span className="text-[11px] text-[#676D82]">온룸 1촌 인증 쪽지</span>
                  <button
                    onClick={() => toggleLike(entry.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/70 hover:bg-white rounded-full text-xs font-bold text-[#FF6B57] shadow-xs transition-transform active:scale-90"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{entry.likes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-12 text-xs text-[#9FA4B8]">
            아직 남겨진 쪽지가 없습니다. 첫 번째 다정한 안부를 남겨보세요!
          </div>
        )}
      </div>
    </section>
  );
}
