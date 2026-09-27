"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles, Smile, Paperclip, CheckCheck, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import { User, DirectChatMessage } from "../../types/kudos";

interface DirectMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: User | null;
  currentUser: User;
  messages: DirectChatMessage[];
  onSendMessage: (receiverId: string, text: string, isKudosTip?: boolean) => void;
  onSendKudosTip: (receiverId: string, points: number) => void;
}

export default function DirectMessageModal({
  isOpen,
  onClose,
  targetUser,
  currentUser,
  messages,
  onSendMessage,
  onSendKudosTip,
}: DirectMessageModalProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  if (!isOpen || !targetUser) return null;

  // Filter messages between current user and target user
  const conversation = messages.filter(
    (m) =>
      (m.senderId === currentUser.id && m.receiverId === targetUser.id) ||
      (m.senderId === targetUser.id && m.receiverId === currentUser.id)
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(targetUser.id, inputText.trim());
    setInputText("");
  };

  const handleSendTip = () => {
    if (currentUser.givePoints < 50) {
      alert("잔여 발송 포인트가 부족합니다. (최소 50P 필요)");
      return;
    }

    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 },
      });
    } catch {}

    onSendKudosTip(targetUser.id, 50);
    onSendMessage(targetUser.id, `🎁 칭찬 포인트 50P를 선물로 보냈습니다! 항상 감사합니다 ✨`, true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden border border-neutral-100 flex flex-col h-[650px] max-h-[90vh]">
        {/* Chat Header */}
        <div className="px-5 py-3.5 border-b border-neutral-100 bg-neutral-50/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={targetUser.avatar}
                alt={targetUser.name}
                className="w-10 h-10 rounded-full object-cover border border-neutral-200"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-extrabold text-neutral-900">{targetUser.name}</h4>
                <span className="text-[10px] font-bold text-neutral-400">
                  {targetUser.department}
                </span>
              </div>
              <p className="text-[10px] text-emerald-600 font-bold">🟢 온라인 • 1:1 사내 메신저</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSendTip}
              className="px-2.5 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-105 text-white text-[11px] font-extrabold rounded-xl shadow-xs flex items-center gap-1 transition-all"
              title="채팅 중 50P 즉시 쏘기"
            >
              <Zap className="w-3 h-3 fill-white" />
              <span>50P 쏘기</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Timeline */}
        <div className="flex-1 p-4 overflow-y-auto bg-[#F8F9FD] space-y-3">
          <div className="text-center my-2">
            <span className="text-[10px] font-bold text-neutral-400 bg-neutral-200/70 px-3 py-1 rounded-full">
              {targetUser.name}님과의 비공개 1:1 대화방입니다
            </span>
          </div>

          {conversation.length === 0 ? (
            <div className="text-center py-16 text-neutral-400 text-xs">
              <Sparkles className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <p className="font-bold text-neutral-600">아직 나눈 대화가 없습니다</p>
              <p className="text-[11px] mt-1">
                상단 '50P 쏘기' 버튼이나 인사 메시지로 대화를 시작해 보세요!
              </p>
            </div>
          ) : (
            conversation.map((msg) => {
              const isMine = msg.senderId === currentUser.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[78%] p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      msg.isKudosTip
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-tr-none shadow-md"
                        : isMine
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white text-neutral-800 border border-neutral-100 rounded-tl-none"
                    }`}
                  >
                    {msg.isKudosTip && (
                      <div className="flex items-center gap-1 text-[10px] text-amber-100 mb-1 border-b border-white/20 pb-0.5">
                        <Sparkles className="w-3 h-3" />
                        <span>KUDO POINT BONUS</span>
                      </div>
                    )}
                    <p>{msg.text}</p>
                  </div>

                  <span className="text-[9px] text-neutral-400 mt-0.5 px-1 flex items-center gap-0.5">
                    {msg.createdAt}
                    {isMine && <CheckCheck className="w-2.5 h-2.5 text-blue-500" />}
                  </span>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-neutral-100 bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder={`${targetUser.name}님에게 메시지 보내기...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-neutral-100 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 bg-blue-600 disabled:opacity-40 text-white rounded-2xl hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
