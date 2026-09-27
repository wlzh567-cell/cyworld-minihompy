"use client";

import React, { useState } from "react";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Award,
  Download,
  RefreshCw,
  Search,
  Zap,
  BarChart3,
  Network,
  Share2,
  Calendar,
  Building2,
  CheckCircle2,
  UserPlus,
} from "lucide-react";
import { User, Recognition, CoreValue, getUserCumulativePoints } from "../../types/kudos";

interface HrIntelligenceDashboardProps {
  users: User[];
  recognitions: Recognition[];
  coreValues: CoreValue[];
  onTriggerOneOnOne: (userId: string) => void;
  onResetMonthlyBudget: () => void;
  onOpenAddUser: () => void;
}

export default function HrIntelligenceDashboard({
  users,
  recognitions,
  coreValues,
  onTriggerOneOnOne,
  onResetMonthlyBudget,
  onOpenAddUser,
}: HrIntelligenceDashboardProps) {
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [scheduledUsers, setScheduledUsers] = useState<string[]>([]);

  // 1. ONA Matrix Calculations (부서 간 칭찬 교류 집계)
  const departments = ["엔지니어링", "프로덕트", "디자인", "성장마케팅", "피플앤컬처(인사)"] as const;

  const getUser = (id: string) => users.find((u) => u.id === id);

  // 2. High Risk / Flight Risk Radar (활동 급감 및 소외 직원 - 최근 입사자 또는 칭찬 수신 저조)
  const flightRiskList = [
    {
      user: users.find((u) => u.id === "user-6") || users[0],
      riskScore: 78,
      riskLevel: "HIGH",
      reason: "입사 45일 차, 최근 30일간 칭찬 수신 1건에 불과 (조기 적응 사일로 위험)",
      recommendation: "직속 팀장 커피챗 1:1 면담 & 온보딩 버디 배정",
    },
    {
      user: users.find((u) => u.id === "user-4") || users[1],
      riskScore: 62,
      riskLevel: "MEDIUM",
      reason: "타 부서와의 칭찬 송수신 활동 40% 감소 (타 부서 협업 단절 징후)",
      recommendation: "크로스 펑셔널 싱크 미팅 조율",
    },
  ];

  // 3. Hidden Gems (동료가 뽑은 숨은 실무 에이스 TOP 3 - 누적 인정 점수 기준)
  const topRecognized = [...users]
    .sort((a, b) => getUserCumulativePoints(b) - getUserCumulativePoints(a))
    .slice(0, 3);

  // 4. Core Value Distribution
  const valueStats = coreValues.map((cv) => {
    const count = recognitions.filter((r) => r.coreValueTag === cv.tag).length;
    const percentage = Math.round((count / (recognitions.length || 1)) * 100);
    return { ...cv, count, percentage };
  });

  const handleScheduleClick = (userId: string) => {
    onTriggerOneOnOne(userId);
    setScheduledUsers((prev) => [...prev, userId]);
  };

  const handleDownloadCsv = () => {
    alert("전사 조직 문화 인텔리전스 ONA 분석 리포트 (CSV) 다운로드가 시작되었습니다.");
  };

  return (
    <div className="space-y-6">
      {/* Executive KPI Summary Header */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                HR Culture Intelligence • Enterprise Admin
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
              전사 조직 건강도 & ONA 네트워크 분석 대시보드
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              사내 갈등이 블라인드로 유출되기 전 선제 감지하고, 숨은 핵심 인재를 객관적 데이터로 발굴합니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAddUser}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-2xl shadow-md shadow-blue-500/25 flex items-center gap-1.5 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ 신입사원 등록 / 초대</span>
            </button>
            <button
              onClick={onResetMonthlyBudget}
              className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-2xl flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>월간 칭찬 버짓 일괄 지급 (1,000P)</span>
            </button>
            <button
              onClick={handleDownloadCsv}
              className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-2xl flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ONA 분석 리포트 내보내기</span>
            </button>
          </div>
        </div>

        {/* 4 Core B2B SaaS Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
            <span className="text-xs text-neutral-500 font-bold block mb-1">주간 칭찬 참여율 (W)</span>
            <div className="text-2xl font-black text-blue-600 flex items-baseline gap-1">
              <span>84.2%</span>
              <span className="text-xs text-emerald-600 font-bold">▲ 목표 65% 초과 달성</span>
            </div>
            <span className="text-[11px] text-neutral-400 mt-1 block">전체 직원 중 84%가 주 1회 이상 칭찬</span>
          </div>

          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
            <span className="text-xs text-neutral-500 font-bold block mb-1">포인트 소진율 (Burn Rate)</span>
            <div className="text-2xl font-black text-indigo-600 flex items-baseline gap-1">
              <span>88.5%</span>
              <span className="text-xs text-emerald-600 font-bold">건전 수준</span>
            </div>
            <span className="text-[11px] text-neutral-400 mt-1 block">매월 말 소멸 효과로 적극 칭찬 유도</span>
          </div>

          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
            <span className="text-xs text-neutral-500 font-bold block mb-1">사일로/이탈 감지 조기경보</span>
            <div className="text-2xl font-black text-rose-600 flex items-baseline gap-1">
              <span>2명</span>
              <span className="text-xs text-rose-500 font-bold">면담 필요</span>
            </div>
            <span className="text-[11px] text-neutral-400 mt-1 block">최근 60일간 교류 활동 급감 소외직원</span>
          </div>

          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
            <span className="text-xs text-neutral-500 font-bold block mb-1">예상 퇴사 비용 절감액</span>
            <div className="text-2xl font-black text-emerald-600 flex items-baseline gap-1">
              <span>약 8,000만 원</span>
            </div>
            <span className="text-[11px] text-neutral-400 mt-1 block">핵심 인재 조기 퇴사 4건 예방 기준</span>
          </div>
        </div>
      </div>

      {/* Grid: ONA Network & Flight Risk Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module 1: ONA Interactive Visualization */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-neutral-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-neutral-900 text-base">
                  조직 네트워크 분석 (ONA) 부서 간 협업 맵
                </h3>
              </div>
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                실시간 데이터 매핑
              </span>
            </div>
            <p className="text-xs text-neutral-500 mb-6">
              부서 간 오가는 칭찬과 포인트 흐름을 분석하여 소통이 단절된 사일로(Silo) 구간을 시각화합니다.
            </p>

            {/* Interactive ONA Diagram Canvas / Mock Network */}
            <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-900 to-indigo-950 rounded-2xl p-6 min-h-[300px] flex items-center justify-center overflow-hidden">
              {/* Central Hub */}
              <div className="absolute z-10 w-24 h-24 rounded-full bg-blue-600/40 backdrop-blur-xl border-2 border-blue-400 flex flex-col items-center justify-center text-white shadow-2xl animate-pulse">
                <Building2 className="w-6 h-6 text-amber-300 mb-1" />
                <span className="text-[11px] font-black">ON:ROOM HQ</span>
                <span className="text-[9px] text-blue-200">전사 허브</span>
              </div>

              {/* Department Nodes */}
              {departments.map((dept, i) => {
                const angle = (i * (360 / departments.length) * Math.PI) / 180;
                const radius = 115;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                const isSilo = dept === "성장마케팅"; // Example silo demo

                return (
                  <div
                    key={dept}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className={`absolute z-20 px-3 py-2 rounded-2xl backdrop-blur-md border text-center transition-transform hover:scale-110 cursor-pointer shadow-lg ${
                      isSilo
                        ? "bg-rose-950/80 border-rose-500/80 text-rose-200"
                        : "bg-white/10 border-white/20 text-white"
                    }`}
                  >
                    <div className="text-[11px] font-black">{dept}</div>
                    <div className="text-[9px] opacity-80">
                      {isSilo ? "⚠️ 교류 둔화 구간" : "활발한 교류 (Good)"}
                    </div>
                  </div>
                );
              })}

              {/* Decorative connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#10B981" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="#F59E0B" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="20%" y2="70%" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 3" />
              </svg>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>정상 교류 부서</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>소통 단절(Silo) 주의 부서 (성장마케팅)</span>
            </span>
          </div>
        </div>

        {/* Module 2: Flight Risk Radar (고립 및 조기 퇴사 위험군) */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <h3 className="font-extrabold text-neutral-900 text-base">
                소외 및 이탈 위험군 감지 (Track D)
              </h3>
            </div>
            <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              무음 스크리닝
            </span>
          </div>

          <p className="text-xs text-neutral-500 mb-4">
            최근 칭찬 송수신 활동이 급감한 직원을 감지하여 팀장 1:1 면담을 선제 트리거합니다.
          </p>

          <div className="space-y-3">
            {flightRiskList.map(({ user, riskScore, riskLevel, reason, recommendation }) => {
              const isScheduled = scheduledUsers.includes(user.id);

              return (
                <div
                  key={user.id}
                  className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/70 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover border"
                      />
                      <div>
                        <div className="text-xs font-black text-neutral-900">{user.name}</div>
                        <div className="text-[10px] text-neutral-500">
                          {user.department} • {user.jobTitle}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        riskLevel === "HIGH" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      위험지수 {riskScore}%
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-600 leading-snug">{reason}</p>

                  <div className="bg-white p-2.5 rounded-xl border border-neutral-200/60 text-[10px] text-neutral-500">
                    💡 <strong>인사팀 권고:</strong> {recommendation}
                  </div>

                  <button
                    onClick={() => handleScheduleClick(user.id)}
                    disabled={isScheduled}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isScheduled
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
                    }`}
                  >
                    {isScheduled ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>팀장 1:1 면담 요청 완료됨</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-3.5 h-3.5" />
                        <span>직속 팀장 1:1 면담 트리거 발동</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Module 3 & 4: Hidden Gems & Core Values Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module 3: Hidden Gems (동료가 뽑은 숨은 에이스) */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-neutral-900 text-base">
                숨은 핵심 인재 리포트 (Hidden Gems)
              </h3>
            </div>
            <span className="text-[11px] text-neutral-400">연말 다면평가/승진 참조용</span>
          </div>

          <p className="text-xs text-neutral-500 mb-4">
            상사의 하향식 평가와 별개로, 동료들로부터 자발적인 칭찬과 인정을 가장 많이 받은 실무자 순위입니다.
          </p>

          <div className="space-y-3">
            {topRecognized.map((user, idx) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 hover:bg-amber-50/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                      idx === 0
                        ? "bg-amber-400 text-white shadow-xs"
                        : idx === 1
                        ? "bg-neutral-300 text-neutral-800"
                        : "bg-amber-700/20 text-amber-800"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <div className="text-xs font-extrabold text-neutral-900">{user.name}</div>
                    <div className="text-[10px] text-neutral-500">
                      {user.department} • {user.jobTitle}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black text-amber-600">
                    +{getUserCumulativePoints(user).toLocaleString()} P
                  </div>
                  <div className="text-[10px] text-neutral-400">동료 지지도 98.4%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 4: Core Values Analytics */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <h3 className="font-extrabold text-neutral-900 text-base">
                사내 핵심 가치 (Core Values) 실천 현황
              </h3>
            </div>
            <span className="text-[11px] text-neutral-400">전사 캠페인 분석</span>
          </div>

          <p className="text-xs text-neutral-500 mb-4">
            어떤 핵심 가치가 사내에서 가장 활발히 실천되고 있는지 해시태그 빈도를 집계합니다.
          </p>

          <div className="space-y-3.5">
            {valueStats.map((stat) => (
              <div key={stat.id}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-neutral-800 flex items-center gap-1.5">
                    <span className="text-indigo-600">{stat.tag}</span>
                    <span className="text-neutral-400 font-normal">({stat.name})</span>
                  </span>
                  <span className="text-neutral-700">{stat.count}건 ({stat.percentage}%)</span>
                </div>
                <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                    style={{ width: `${Math.max(15, stat.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
