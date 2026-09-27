"use client";

import React, { useState } from "react";
import { UserPlus, X, Mail, Building, Briefcase, Sparkles, Check } from "lucide-react";
import { User } from "../../types/kudos";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (newUser: Omit<User, "id" | "earnedPoints" | "cumulativePoints" | "joinedDaysAgo">) => void;
}

const AVATAR_OPTIONS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
];

export default function AddUserModal({ isOpen, onClose, onAddUser }: AddUserModalProps) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState<User["department"]>("엔지니어링");
  const [jobTitle, setJobTitle] = useState("");
  const [givePoints, setGivePoints] = useState(1000);
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[5]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !jobTitle.trim()) {
      alert("이름과 직책을 입력해 주세요.");
      return;
    }

    onAddUser({
      name: name.trim(),
      avatar: selectedAvatar,
      department,
      jobTitle: jobTitle.trim(),
      givePoints,
      role: "employee",
    });

    setName("");
    setJobTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-neutral-900 text-sm">
                신입사원 등록 / 직원 초대
              </h3>
              <p className="text-[10px] text-neutral-400">
                사내 구성원으로 등록하고 월간 칭찬 버짓을 부여합니다
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Avatar Picker */}
          <div>
            <label className="text-xs font-bold text-neutral-700 block mb-2">
              프로필 아바타 선택
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {AVATAR_OPTIONS.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedAvatar(url)}
                  className={`relative rounded-full p-0.5 transition-transform hover:scale-105 ${
                    selectedAvatar === url ? "ring-3 ring-blue-600 scale-105" : "opacity-70"
                  }`}
                >
                  <img
                    src={url}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  {selectedAvatar === url && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px]">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Job Title */}
          <div>
            <label className="text-xs font-bold text-neutral-700 block mb-1">
              이름 (직급 포함 권장)
            </label>
            <input
              type="text"
              placeholder="예: 강하늘 주니어, 송민호 매니저"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="text-xs font-bold text-neutral-700 block mb-1">소속 부서</label>
            <div className="relative">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-neutral-100 rounded-xl text-xs font-bold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="엔지니어링">엔지니어링</option>
                <option value="프로덕트">프로덕트</option>
                <option value="디자인">디자인</option>
                <option value="성장마케팅">성장마케팅</option>
                <option value="피플앤컬처(인사)">피플앤컬처(인사)</option>
              </select>
            </div>
          </div>

          {/* Job Title */}
          <div>
            <label className="text-xs font-bold text-neutral-700 block mb-1">직무 / 역할</label>
            <input
              type="text"
              placeholder="예: 프론트엔드 개발, 모바일 앱 QA, B2B 영업"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Give Points Allowance */}
          <div>
            <label className="text-xs font-bold text-neutral-700 block mb-1">
              초기 지급 칭찬 버짓 (Give Points)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                step={100}
                value={givePoints}
                onChange={(e) => setGivePoints(Number(e.target.value))}
                className="flex-1 px-3.5 py-2.5 bg-neutral-100 rounded-xl text-xs font-bold text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs font-bold text-neutral-400">P</span>
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">
              💡 신입사원이 바로 동료들을 칭찬할 수 있도록 기본 1,000P가 자동 충전됩니다.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>신입사원 즉시 등록 및 사내 계정 생성</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
