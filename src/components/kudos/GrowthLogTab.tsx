"use client";

import React, { useState } from "react";
import { Lock, ShieldCheck, Heart, Sparkles, Send, Plus, Eye, AlertCircle, CheckCircle2 } from "lucide-react";
import { User, GrowthNudge, Recognition, NudgeCategory } from "../../types/kudos";

interface GrowthLogTabProps {
  currentUser: User;
  users: User[];
  nudges: GrowthNudge[];
  myReceivedKudos: Recognition[];
  onSendNudge: (receiverId: string, category: NudgeCategory, situation: string, behavior: string, impact: string) => void;
}

const TEMPLATES: Record<NudgeCategory, { situation: string; behavior: string; impact: string }[]> = {
  "소통 방식": [
    {
      situation: "긴급 요청이나 작업 이슈 발생 시",
      behavior: "슬랙 멘션에 확인 이모지나 짧은 답장이 다소 지연되었어요.",
      impact: "진행 상황을 빠르게 파악하기 어려워 다음 작업이 대기 상태가 됩니다. 가벼운 확인 리액션을 남겨주시면 큰 도움이 됩니다!",
    },
    {
      situation: "비동기 텍스트 피드백을 나눌 때",
      behavior: "단답형 표현으로 인해 전달 의도가 오해될 소지가 있었어요.",
      impact: "맥락과 배경을 조금만 더 덧붙여주시면 상호 신뢰 속에서 더 유연하게 논의할 수 있을 것 같아요!",
    },
  ],
  "회의 에티켓": [
    {
      situation: "정기 스프린트 및 주간 회의 시작 시",
      behavior: "시작 시간 5분 후 참석하시는 경우가 종종 있었어요.",
      impact: "전체 아젠다 조율과 공유가 지연될 수 있습니다. 2분 전 미리 구글 밋에 대기해주시면 정말 감사하겠습니다!",
    },
    {
      situation: "여러 부서가 모인 합동 리뷰 자리에서",
      behavior: "발언 시간이 길어져 다른 참여자의 피드백 시간이 부족했어요.",
      impact: "사전에 핵심 요점 위주로 브리핑해주시면 모두가 충분히 토론할 수 있을 것 같습니다!",
    },
  ],
  "협업 방식": [
    {
      situation: "타 부서와의 연계 업무 진행 중",
      behavior: "일정 변동이나 딜레이 이슈가 마감 직전에 공유되었어요.",
      impact: "미리 위험(Blocker)을 알려주시면 함께 우선순위를 조율하거나 지원할 수 있습니다!",
    },
    {
      situation: "기획서나 스펙 변경 사항 발생 시",
      behavior: "문서 히스토리에 수정 사유가 기록되지 않았어요.",
      impact: "엔지니어링/QA 팀에서 변경 배경을 파악하기 어려우므로 짧은 코멘트 기록을 부탁드립니다!",
    },
  ],
  "업무 공유": [
    {
      situation: "데일리 스크럼 또는 주간 진행 공유 시",
      behavior: "진행 중인 과제의 blocker나 질문 사항이 언급되지 않았어요.",
      impact: "작은 고민이라도 팀에 적극 터놓아주시면 함께 빠르게 해결할 수 있습니다!",
    },
  ],
};

export default function GrowthLogTab({
  currentUser,
  users,
  nudges,
  myReceivedKudos,
  onSendNudge,
}: GrowthLogTabProps) {
  const [subTab, setSubTab] = useState<"nudges" | "kudos">("nudges");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Nudge form state
  const [targetUserId, setTargetUserId] = useState(users.find((u) => u.id !== currentUser.id)?.id || "");
  const [category, setCategory] = useState<NudgeCategory>("소통 방식");
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);

  const getUser = (id: string) => users.find((u) => u.id === id);

  const handleSendNudgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = TEMPLATES[category][selectedTemplateIndex];
    onSendNudge(targetUserId, category, t.situation, t.behavior, t.impact);
    setIsModalOpen(false);
    alert("동료에게 안전한 1:1 비공개 성장 넛지를 전달했습니다. (점수 차감 없음)");
  };

  return (
    <div className="space-y-4 pb-20">
      {/* 3-Tier Safety Banner (PRD Track B) */}
      <div className="bg-gradient-to-br from-indigo-900 via-neutral-900 to-purple-950 text-white p-5 rounded-3xl shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1 rounded-lg bg-indigo-500/20 text-indigo-300">
            <ShieldCheck className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold text-indigo-200">
            Track B • 3중 안전 장치
          </span>
        </div>
        <h4 className="text-lg font-black tracking-tight mb-1">
          벌점 없는 1:1 안전 성장 넛지
        </h4>
        <p className="text-xs text-neutral-300 leading-relaxed mb-4">
          동료의 점수를 깎지 않습니다. 감정적 비난을 원천 차단하고 검증된{" "}
          <strong className="text-amber-300">SBI(상황-행동-영향) 템플릿</strong>으로 오직 당사자의 개인 보관함에만 비공개 전송됩니다.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>동료에게 1:1 안전 성장 넛지 보내기</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex bg-neutral-200/70 p-1 rounded-2xl">
        <button
          onClick={() => setSubTab("nudges")}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            subTab === "nudges" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
          }`}
        >
          <Lock className="w-3.5 h-3.5 text-indigo-600" />
          <span>비공개 1:1 넛지함 ({nudges.length})</span>
        </button>
        <button
          onClick={() => setSubTab("kudos")}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            subTab === "kudos" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>내가 받은 칭찬 아카이브 ({myReceivedKudos.length})</span>
        </button>
      </div>

      {subTab === "nudges" ? (
        <div className="space-y-3">
          {nudges.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-neutral-100">
              <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h5 className="font-bold text-neutral-800 text-sm mb-1">
                도착한 성장 넛지가 없습니다
              </h5>
              <p className="text-xs text-neutral-400">
                동료들과 건강하고 원활한 협업을 유지하고 계십니다!
              </p>
            </div>
          ) : (
            nudges.map((nudge) => (
              <div
                key={nudge.id}
                className="bg-white rounded-3xl p-5 border border-indigo-100 shadow-[0_4px_20px_rgba(79,70,229,0.04)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                      {nudge.templateCategory}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      비공개 1:1 발송 • {nudge.createdAt}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>점수 변동 없음 (0P)</span>
                  </span>
                </div>

                {/* Structured SBI Cards */}
                <div className="space-y-2 text-xs">
                  <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                    <span className="font-extrabold text-neutral-500 block mb-0.5">
                      📍 상황 (Situation)
                    </span>
                    <p className="text-neutral-800 font-medium">{nudge.situation}</p>
                  </div>
                  <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                    <span className="font-extrabold text-neutral-500 block mb-0.5">
                      🔍 행동 (Behavior)
                    </span>
                    <p className="text-neutral-800 font-medium">{nudge.behavior}</p>
                  </div>
                  <div className="bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100/80">
                    <span className="font-extrabold text-indigo-600 block mb-0.5">
                      💡 영향 및 정중한 요청 (Impact)
                    </span>
                    <p className="text-indigo-950 font-medium">{nudge.impact}</p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>🔒 오직 나에게만 보이는 안전한 보관함입니다</span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* My Received Kudos */
        <div className="space-y-3">
          {myReceivedKudos.map((rec) => {
            const sender = getUser(rec.senderId);
            return (
              <div
                key={rec.id}
                className="bg-white rounded-3xl p-5 border border-amber-100/80 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={sender?.avatar}
                      alt={sender?.name}
                      className="w-7 h-7 rounded-full object-cover border"
                    />
                    <span className="text-xs font-bold text-neutral-800">
                      {sender?.name}님의 인정
                    </span>
                  </div>
                  <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                    +{rec.pointsAmount}P
                  </span>
                </div>
                <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full inline-block mb-2">
                  {rec.coreValueTag}
                </span>
                <p className="text-sm text-neutral-700 bg-neutral-50 p-3 rounded-2xl italic">
                  "{rec.message}"
                </p>
                <div className="mt-2 text-right text-[11px] text-neutral-400">
                  {rec.createdAt} • ❤️ {rec.cheersCount}명의 동료가 응원함
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Send 1:1 Nudge Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-6 border border-neutral-100 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-600" />
                <h4 className="font-extrabold text-neutral-900 text-sm">
                  1:1 비공개 성장 넛지 작성
                </h4>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendNudgeSubmit} className="space-y-4 overflow-y-auto pr-1">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  피드백을 전할 동료
                </label>
                <select
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  className="w-full p-2.5 bg-neutral-100 rounded-xl text-xs font-bold text-neutral-800"
                >
                  {users
                    .filter((u) => u.id !== currentUser.id)
                    .map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.department} • {u.jobTitle})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  피드백 카테고리
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["소통 방식", "회의 에티켓", "협업 방식", "업무 공유"] as NudgeCategory[]).map(
                    (cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setCategory(cat);
                          setSelectedTemplateIndex(0);
                        }}
                        className={`p-2 rounded-xl text-xs font-bold border text-center transition-all ${
                          category === cat
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                            : "bg-neutral-50 text-neutral-600 border-neutral-200"
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  심리학적 검증 SBI 템플릿 선택 (감정적 비난 방지)
                </label>
                <div className="space-y-2">
                  {TEMPLATES[category].map((t, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedTemplateIndex(idx)}
                      className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                        selectedTemplateIndex === idx
                          ? "border-indigo-600 bg-indigo-50/50 shadow-xs"
                          : "border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      <div className="font-bold text-neutral-800 mb-1">
                        템플릿 {idx + 1}: {t.situation}
                      </div>
                      <div className="text-neutral-500 text-[11px] line-clamp-2">
                        {t.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900">
                ⚠️ <strong>안내:</strong> 점수는 차감되지 않으며, 동료의 성장만을 돕기 위해 비공개 1:1로만 배달됩니다.
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl shadow-md shadow-indigo-600/20"
              >
                비공개 1:1 넛지 전송
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
