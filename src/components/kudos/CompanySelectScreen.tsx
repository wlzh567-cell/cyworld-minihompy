"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Plus, ArrowRight, Users, Sparkles, CheckCircle2, ChevronRight, X } from "lucide-react";
import { CompanyWorkspace } from "@/types/kudos";
import KudoLogo from "./KudoLogo";

interface CompanySelectScreenProps {
  companies: CompanyWorkspace[];
  selectedCompanyId?: string;
  onSelectCompany: (company: CompanyWorkspace) => void;
  onCreateCompany: (newCompany: { name: string; industry: string; tagline: string; emoji: string }) => void;
}

export default function CompanySelectScreen({
  companies,
  selectedCompanyId,
  onSelectCompany,
  onCreateCompany,
}: CompanySelectScreenProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newIndustry, setNewIndustry] = useState("IT · 테크 / 스타트업");
  const [newTagline, setNewTagline] = useState("동료와 함께 성장하는 긍정적인 문화");
  const [newEmoji, setNewEmoji] = useState("🏢");

  const emojiOptions = ["🏢", "🚀", "💡", "⚡", "🌟", "🌿", "☕", "🎯"];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      alert("회사명을 입력해주세요.");
      return;
    }
    onCreateCompany({
      name: newName.trim(),
      industry: newIndustry,
      tagline: newTagline.trim() || "동료 인정과 성장의 조직 문화",
      emoji: newEmoji,
    });
    setIsCreateModalOpen(false);
    setNewName("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0E1A] text-white flex flex-col justify-between overflow-y-auto select-none">
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 px-5 pt-8 pb-4 flex items-center justify-between max-w-md mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <KudoLogo size="sm" withText />
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider bg-white/10 text-neutral-300 px-2.5 py-1 rounded-full border border-white/10">
          Enterprise
        </span>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-md mx-auto w-full px-5 py-2 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 text-center sm:text-left"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/25 text-blue-300 text-[11px] font-bold mb-2.5">
            <Building2 className="w-3 h-3 text-blue-400" />
            <span>회사 워크스페이스 선택</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            어느 회사로 입장하시겠어요?
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            소속된 사내 워크스페이스를 선택하여 칭찬과 리워드를 확인하세요.
          </p>
        </motion.div>

        {/* Company Cards List */}
        <div className="space-y-3 mb-4">
          {companies.map((company, index) => {
            const isCurrent = company.id === selectedCompanyId;
            return (
              <motion.button
                key={company.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                onClick={() => onSelectCompany(company)}
                className={`w-full text-left p-4 rounded-2xl border transition-all relative overflow-hidden group active:scale-[0.98] ${
                  isCurrent
                    ? "bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-neutral-900/40 border-blue-500/80 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500"
                    : "bg-white/[0.05] hover:bg-white/[0.08] border-white/10 hover:border-white/20"
                }`}
              >
                {/* Subtle highlight gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

                <div className="flex items-start gap-3.5 relative z-10">
                  {/* Company Logo Emoji Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${company.logoBg} flex items-center justify-center text-2xl shadow-md border border-white/20 shrink-0`}
                  >
                    <span>{company.logoEmoji}</span>
                  </div>

                  {/* Company Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h3 className="text-sm font-black text-white truncate flex items-center gap-1.5">
                        {company.name}
                        {isCurrent && (
                          <span className="text-[9px] bg-blue-500 text-white font-black px-1.5 py-0.2 rounded-full">
                            선택됨
                          </span>
                        )}
                      </h3>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {company.domain}
                      </span>
                    </div>

                    <p className="text-[11px] text-neutral-300 font-medium line-clamp-1 mb-2">
                      {company.tagline}
                    </p>

                    {/* Metadata Footer */}
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-white/10">
                      <div className="flex items-center gap-2.5">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-neutral-400" />
                          <span>{company.memberCount}명</span>
                        </span>
                        <span className="bg-white/10 text-neutral-300 px-1.5 py-0.2 rounded">
                          {company.industry}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-400 font-extrabold group-hover:translate-x-0.5 transition-transform">
                        <span>입장하기</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Add New Company Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full py-3 px-4 rounded-2xl border border-dashed border-white/25 hover:border-blue-400/60 bg-white/[0.02] hover:bg-blue-500/10 text-neutral-300 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 text-blue-400" />
          <span>+ 우리 회사 / 새로운 팀 워크스페이스 직접 추가</span>
        </motion.button>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 px-5 py-4 max-w-md mx-auto w-full text-center">
        <p className="text-[10px] text-neutral-500">
          kudoworks Enterprise Multi-Tenant Architecture • 안전한 사내 망 분리
        </p>
      </div>

      {/* Create Company Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="bg-[#141A29] border border-white/15 rounded-t-[32px] sm:rounded-3xl p-6 w-full max-w-sm text-white shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/30 flex items-center justify-center text-blue-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black">새 회사 워크스페이스 추가</h3>
                    <p className="text-[10px] text-neutral-400">사내 칭찬 플랫폼을 즉시 개설합니다</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-3.5">
                {/* Emoji Selection */}
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 block mb-1.5">
                    회사 대표 아이콘
                  </label>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {emojiOptions.map((emoji) => (
                      <button
                        type="button"
                        key={emoji}
                        onClick={() => setNewEmoji(emoji)}
                        className={`w-9 h-9 rounded-xl text-base flex items-center justify-center transition-all ${
                          newEmoji === emoji
                            ? "bg-blue-600 text-white ring-2 ring-blue-400 scale-105"
                            : "bg-white/5 hover:bg-white/10 text-neutral-300"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 block mb-1">
                    회사명 (또는 팀명) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: (주)카카오, 토스뱅크, 우리회사"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 block mb-1">
                    업종 / 분야
                  </label>
                  <input
                    type="text"
                    placeholder="예: IT · 테크, 이커머스, 제조/유통"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 block mb-1">
                    조직 슬로건 / 문화 한 줄 소개
                  </label>
                  <input
                    type="text"
                    placeholder="예: 동료 인정과 자율적인 성장의 문화"
                    value={newTagline}
                    onChange={(e) => setNewTagline(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 py-2.5 bg-white/10 hover:bg-white/15 text-neutral-300 rounded-xl text-xs font-bold transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/30"
                  >
                    <span>워크스페이스 개설 ➔</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
