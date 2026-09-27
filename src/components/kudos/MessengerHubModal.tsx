"use client";

import React, { useState } from "react";
import {
  X,
  MessageSquare,
  Search,
  Users,
  Sparkles,
  ChevronRight,
  Circle,
  Plus,
} from "lucide-react";
import { User, DirectChatMessage } from "../../types/kudos";
import KudoLogo from "./KudoLogo";

interface MessengerHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  users: User[];
  messages: DirectChatMessage[];
  onOpenChatWithUser: (user: User) => void;
}

export default function MessengerHubModal({
  isOpen,
  onClose,
  currentUser,
  users,
  messages,
  onOpenChatWithUser,
}: MessengerHubModalProps) {
  const [activeTab, setActiveTab] = useState<"chats" | "contacts">("chats");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  // Other colleagues
  const otherUsers = users.filter((u) => u.id !== currentUser.id);

  // Group messages by chat partner
  const chatPartners = otherUsers.map((partner) => {
    const thread = messages.filter(
      (m) =>
        (m.senderId === currentUser.id && m.receiverId === partner.id) ||
        (m.senderId === partner.id && m.receiverId === currentUser.id)
    );
    const lastMsg = thread[thread.length - 1];
    return {
      partner,
      threadCount: thread.length,
      lastMsg,
    };
  });

  // Recent chats sorted by last message time
  const recentChats = chatPartners.filter((c) => c.threadCount > 0);

  const filteredUsers = otherUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden border border-neutral-100 flex flex-col h-[650px] max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-100 bg-neutral-50/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <KudoLogo size="sm" />
            <div>
              <h3 className="font-extrabold text-neutral-900 text-base">kudoworks 사내 메신저</h3>
              <p className="text-[10px] text-neutral-400">
                실시간 업무 소통 & 칭찬 포인트 선물
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-neutral-100 bg-white">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="동료 이름 또는 부서 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-neutral-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="flex bg-neutral-100/80 p-1 mx-3 mt-3 rounded-2xl border border-neutral-200/50">
          <button
            onClick={() => setActiveTab("chats")}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "chats"
                ? "bg-white text-neutral-900 shadow-xs"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>최근 대화방 ({recentChats.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "contacts"
                ? "bg-white text-neutral-900 shadow-xs"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>동료 목록 ({otherUsers.length})</span>
          </button>
        </div>

        {/* Body List */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2">
          {activeTab === "chats" ? (
            recentChats.length === 0 ? (
              <div className="text-center py-16 text-neutral-400 text-xs">
                <MessageSquare className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                <p className="font-bold text-neutral-600">진행 중인 대화가 없습니다</p>
                <p className="text-[11px] mt-1 text-neutral-400">
                  '동료 목록' 탭에서 대화하고 싶은 동료를 선택해 보세요!
                </p>
                <button
                  onClick={() => setActiveTab("contacts")}
                  className="mt-3 px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  동료 찾아보기
                </button>
              </div>
            ) : (
              recentChats.map(({ partner, lastMsg }) => (
                <button
                  key={partner.id}
                  onClick={() => {
                    onClose();
                    onOpenChatWithUser(partner);
                  }}
                  className="w-full p-3 rounded-2xl bg-neutral-50 hover:bg-blue-50/60 border border-neutral-100 hover:border-blue-100 transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="relative shrink-0">
                      <img
                        src={partner.avatar}
                        alt={partner.name}
                        className="w-11 h-11 rounded-full object-cover border border-neutral-200"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                    </div>
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-extrabold text-neutral-900 group-hover:text-blue-600">
                            {partner.name}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-semibold">
                            {partner.department}
                          </span>
                        </div>
                        {lastMsg && (
                          <span className="text-[9px] text-neutral-400">{lastMsg.createdAt}</span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 truncate mt-0.5 font-medium">
                        {lastMsg ? lastMsg.text : "대화를 시작해 보세요"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-600 shrink-0" />
                </button>
              ))
            )
          ) : (
            /* Contacts Tab */
            filteredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => {
                  onClose();
                  onOpenChatWithUser(user);
                }}
                className="w-full p-3 rounded-2xl bg-white hover:bg-blue-50/60 border border-neutral-100 hover:border-blue-100 transition-all flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-11 h-11 rounded-full object-cover border border-neutral-200"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-neutral-900 group-hover:text-blue-600 flex items-center gap-1.5">
                      <span>{user.name}</span>
                      {user.isBirthdayToday && <span className="text-xs">🎂</span>}
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      {user.department} • {user.jobTitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white px-2.5 py-1 rounded-xl transition-colors">
                    대화하기
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
