"use client";

import React, { useState } from "react";
import {
  User as UserIcon,
  ShieldAlert,
  Send,
  Lock,
  MessageCircle,
  FileText,
  Clock,
  CheckCircle,
  HelpCircle,
  Hash,
  UserPlus,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  Tag,
  Sparkles,
  Award,
  QrCode,
  Copy,
  Check,
  X,
} from "lucide-react";
import {
  User,
  ComplianceReport,
  ReportCategory,
  Recognition,
  RedeemedCoupon,
  getUserCumulativePoints,
} from "../../types/kudos";

interface MyPageTabProps {
  currentUser: User;
  users?: User[];
  recognitions?: Recognition[];
  redeemedCoupons?: RedeemedCoupon[];
  complianceReports: ComplianceReport[];
  onSubmitReport: (category: ReportCategory, title: string, details: string) => void;
  onSendChatMessage: (reportId: string, text: string) => void;
  onOpenAddUser?: () => void;
  onSelectUserProfile?: (user: User) => void;
}

export default function MyPageTab({
  currentUser,
  users = [],
  recognitions = [],
  redeemedCoupons = [],
  complianceReports,
  onSubmitReport,
  onSendChatMessage,
  onOpenAddUser,
  onSelectUserProfile,
}: MyPageTabProps) {
  const [activeView, setActiveView] = useState<"profile" | "hotline">("profile");
  const [historyFilter, setHistoryFilter] = useState<"all" | "given" | "received" | "spent">("all");
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [viewingCoupon, setViewingCoupon] = useState<RedeemedCoupon | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyBarcode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // New report form state
  const [isCreatingReport, setIsCreatingReport] = useState(false);
  const [reportCat, setReportCat] = useState<ReportCategory>("부당 업무 지시");
  const [reportTitle, setReportTitle] = useState("");
  const [reportDetails, setReportDetails] = useState("");

  const selectedReport = complianceReports.find((r) => r.id === selectedReportId);

  const getUser = (id: string) => users.find((u) => u.id === id);

  const sentKudos = recognitions.filter((r) => r.senderId === currentUser.id);
  const receivedKudos = recognitions.filter((r) => r.receiverId === currentUser.id);
  const myCoupons = redeemedCoupons.filter((c) => !c.userId || c.userId === currentUser.id);

  const totalSentPoints = sentKudos.reduce((sum, r) => sum + r.pointsAmount, 0);
  const totalReceivedPoints = receivedKudos.reduce((sum, r) => sum + r.pointsAmount, 0);
  const totalSpentPoints = myCoupons.reduce((sum, c) => sum + (c.pointsCost ?? 0), 0);

  type ActivityItem =
    | { type: "given"; id: string; rec: Recognition; targetUser?: User; date: string }
    | { type: "received"; id: string; rec: Recognition; senderUser?: User; date: string }
    | { type: "spent"; id: string; coupon: RedeemedCoupon; date: string };

  const activities: ActivityItem[] = [];

  if (historyFilter === "all" || historyFilter === "given") {
    sentKudos.forEach((rec) => {
      activities.push({
        type: "given",
        id: `given-${rec.id}`,
        rec,
        targetUser: getUser(rec.receiverId),
        date: rec.createdAt,
      });
    });
  }

  if (historyFilter === "all" || historyFilter === "received") {
    receivedKudos.forEach((rec) => {
      activities.push({
        type: "received",
        id: `received-${rec.id}`,
        rec,
        senderUser: getUser(rec.senderId),
        date: rec.createdAt,
      });
    });
  }

  if (historyFilter === "all" || historyFilter === "spent") {
    myCoupons.forEach((coupon) => {
      activities.push({
        type: "spent",
        id: `spent-${coupon.id}`,
        coupon,
        date: coupon.redeemedAt,
      });
    });
  }

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle.trim() || !reportDetails.trim()) return;
    onSubmitReport(reportCat, reportTitle, reportDetails);
    setReportTitle("");
    setReportDetails("");
    setIsCreatingReport(false);
    alert("안심 익명 신문고에 접수되었습니다. 단방향 SHA-256 해시로 암호화되어 작성자 신원이 격리됩니다.");
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedReportId) return;
    onSendChatMessage(selectedReportId, chatInput);
    setChatInput("");
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-black text-neutral-900">{currentUser.name}</h4>
              <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {currentUser.role === "hr_admin" ? "HR 관리자" : "임직원"}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              {currentUser.department} • {currentUser.jobTitle}
            </p>
            <span className="text-[10px] text-neutral-400">
              함께한 지 {currentUser.joinedDaysAgo}일째 되는 날 🌱
            </span>
          </div>
        </div>

        {/* 3-Point Overview */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-neutral-100">
          <div className="bg-neutral-50 p-2.5 rounded-2xl">
            <span className="text-[10px] text-neutral-400 font-bold block">이달의 버짓 (Give)</span>
            <span className="text-base font-black text-blue-600">
              {currentUser.givePoints.toLocaleString()} <span className="text-[10px]">P</span>
            </span>
          </div>
          <div className="bg-neutral-50 p-2.5 rounded-2xl">
            <span className="text-[10px] text-neutral-400 font-bold block">사용 가능 (Earned)</span>
            <span className="text-base font-black text-emerald-600">
              {currentUser.earnedPoints.toLocaleString()} <span className="text-[10px]">P</span>
            </span>
          </div>
          <div className="bg-neutral-50 p-2.5 rounded-2xl">
            <span className="text-[10px] text-neutral-400 font-bold block">누적 인정 (Honor)</span>
            <span className="text-base font-black text-amber-600">
              +{getUserCumulativePoints(currentUser).toLocaleString()} <span className="text-[10px]">P</span>
            </span>
          </div>
        </div>

        {onOpenAddUser && (
          <button
            onClick={onOpenAddUser}
            className="w-full mt-3 py-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <UserPlus className="w-3.5 h-3.5 text-blue-600" />
            <span>+ 신입사원 등록 / 사내 동료 초대하기</span>
          </button>
        )}
      </div>

      {/* Switcher: Profile Info vs Hotline */}
      <div className="flex bg-neutral-200/70 p-1 rounded-2xl">
        <button
          onClick={() => setActiveView("profile")}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            activeView === "profile" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
          }`}
        >
          <UserIcon className="w-3.5 h-3.5" />
          <span>내 활동 요약</span>
        </button>
        <button
          onClick={() => setActiveView("hotline")}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            activeView === "hotline"
              ? "bg-rose-600 text-white shadow-xs"
              : "text-rose-600 hover:bg-rose-50"
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>사내 안심 익명 신문고 (Track C)</span>
        </button>
      </div>

      {activeView === "profile" ? (
        <div className="space-y-4">
          {/* Quick Stats 3-Grid */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setHistoryFilter("given")}
              className={`p-3 rounded-2xl border text-left transition-all ${
                historyFilter === "given"
                  ? "bg-blue-50/80 border-blue-300 shadow-2xs"
                  : "bg-white border-neutral-100 hover:border-neutral-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-neutral-400">보낸 칭찬</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div className="text-base font-black text-blue-600">
                {sentKudos.length}
                <span className="text-[11px] font-bold text-neutral-400 ml-0.5">건</span>
              </div>
              <span className="text-[10px] text-blue-600/80 font-bold block mt-0.5">
                -{totalSentPoints.toLocaleString()} P
              </span>
            </button>

            <button
              onClick={() => setHistoryFilter("received")}
              className={`p-3 rounded-2xl border text-left transition-all ${
                historyFilter === "received"
                  ? "bg-emerald-50/80 border-emerald-300 shadow-2xs"
                  : "bg-white border-neutral-100 hover:border-neutral-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-neutral-400">받은 칭찬</span>
                <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-base font-black text-emerald-600">
                {receivedKudos.length}
                <span className="text-[11px] font-bold text-neutral-400 ml-0.5">건</span>
              </div>
              <span className="text-[10px] text-emerald-600/80 font-bold block mt-0.5">
                +{totalReceivedPoints.toLocaleString()} P
              </span>
            </button>

            <button
              onClick={() => setHistoryFilter("spent")}
              className={`p-3 rounded-2xl border text-left transition-all ${
                historyFilter === "spent"
                  ? "bg-rose-50/80 border-rose-300 shadow-2xs"
                  : "bg-white border-neutral-100 hover:border-neutral-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-neutral-400">포인트 사용</span>
                <ShoppingBag className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <div className="text-base font-black text-rose-600">
                {myCoupons.length}
                <span className="text-[11px] font-bold text-neutral-400 ml-0.5">건</span>
              </div>
              <span className="text-[10px] text-rose-600/80 font-bold block mt-0.5">
                -{totalSpentPoints.toLocaleString()} P
              </span>
            </button>
          </div>

          {/* Sub Filter Navigation Pills */}
          <div className="flex items-center justify-between gap-1 bg-neutral-100/90 p-1 rounded-2xl">
            <button
              onClick={() => setHistoryFilter("all")}
              className={`flex-1 py-1.5 rounded-xl text-[11px] font-extrabold transition-all text-center ${
                historyFilter === "all" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              전체 ({sentKudos.length + receivedKudos.length + myCoupons.length})
            </button>
            <button
              onClick={() => setHistoryFilter("given")}
              className={`flex-1 py-1.5 rounded-xl text-[11px] font-extrabold transition-all text-center ${
                historyFilter === "given" ? "bg-white text-blue-600 shadow-2xs" : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              준 내역 ({sentKudos.length})
            </button>
            <button
              onClick={() => setHistoryFilter("received")}
              className={`flex-1 py-1.5 rounded-xl text-[11px] font-extrabold transition-all text-center ${
                historyFilter === "received" ? "bg-white text-emerald-600 shadow-2xs" : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              받은 내역 ({receivedKudos.length})
            </button>
            <button
              onClick={() => setHistoryFilter("spent")}
              className={`flex-1 py-1.5 rounded-xl text-[11px] font-extrabold transition-all text-center ${
                historyFilter === "spent" ? "bg-white text-rose-600 shadow-2xs" : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              쓴 내역 ({myCoupons.length})
            </button>
          </div>

          {/* Detailed Activity List */}
          <div className="space-y-2.5">
            {activities.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-neutral-100 text-center">
                <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-neutral-600">해당 활동 내역이 아직 없습니다.</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  동료에게 따뜻한 칭찬을 건네거나 스토어에서 리워드를 교환해보세요!
                </p>
              </div>
            ) : (
              activities.map((item) => {
                if (item.type === "given") {
                  const { rec, targetUser } = item;
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-3.5 border border-neutral-100 shadow-2xs hover:shadow-xs transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          onClick={() => targetUser && onSelectUserProfile?.(targetUser)}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <div className="relative shrink-0">
                            <img
                              src={targetUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                              alt={targetUser?.name || "동료"}
                              className="w-8 h-8 rounded-full object-cover border border-neutral-200 group-hover:ring-2 group-hover:ring-blue-400 transition-all"
                            />
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center font-bold">
                              ↗
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-black text-neutral-900 group-hover:text-blue-600 transition-colors">
                                To. {targetUser?.name || "동료"}
                              </span>
                              <span className="text-[10px] text-neutral-400">
                                {targetUser?.department}
                              </span>
                            </div>
                            <span className="text-[10px] text-neutral-400">{rec.createdAt}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-blue-600">
                            -{rec.pointsAmount} P
                          </span>
                          <span className="text-[10px] text-neutral-400 block">칭찬 전달</span>
                        </div>
                      </div>

                      <div className="bg-neutral-50/80 rounded-xl p-2.5 text-xs text-neutral-700 leading-relaxed mb-2">
                        "{rec.message}"
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                          {rec.coreValueTag}
                        </span>
                      </div>
                    </div>
                  );
                }

                if (item.type === "received") {
                  const { rec, senderUser } = item;
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-3.5 border border-neutral-100 shadow-2xs hover:shadow-xs transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          onClick={() => senderUser && onSelectUserProfile?.(senderUser)}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <div className="relative shrink-0">
                            <img
                              src={senderUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                              alt={senderUser?.name || "동료"}
                              className="w-8 h-8 rounded-full object-cover border border-neutral-200 group-hover:ring-2 group-hover:ring-emerald-400 transition-all"
                            />
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] flex items-center justify-center font-bold">
                              ↙
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-black text-neutral-900 group-hover:text-emerald-600 transition-colors">
                                From. {senderUser?.name || "동료"}
                              </span>
                              <span className="text-[10px] text-neutral-400">
                                {senderUser?.department}
                              </span>
                            </div>
                            <span className="text-[10px] text-neutral-400">{rec.createdAt}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-emerald-600">
                            +{rec.pointsAmount} P
                          </span>
                          <span className="text-[10px] text-neutral-400 block">포인트 적립</span>
                        </div>
                      </div>

                      <div className="bg-neutral-50/80 rounded-xl p-2.5 text-xs text-neutral-700 leading-relaxed mb-2">
                        "{rec.message}"
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {rec.coreValueTag}
                        </span>
                      </div>
                    </div>
                  );
                }

                if (item.type === "spent") {
                  const { coupon } = item;
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-3.5 border border-neutral-100 shadow-2xs hover:shadow-xs transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold shrink-0">
                            <ShoppingBag className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-extrabold text-neutral-500 bg-neutral-100 px-1.5 py-0.2 rounded shrink-0">
                                {coupon.brand}
                              </span>
                              <span className="text-xs font-black text-neutral-900 truncate">
                                {coupon.name}
                              </span>
                            </div>
                            <span className="text-[10px] text-neutral-400">
                              교환 일시: {coupon.redeemedAt}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0 pl-2">
                          <span className="text-xs font-black text-rose-600 block mb-1">
                            -{(coupon.pointsCost ?? 0).toLocaleString()} P
                          </span>
                          {!coupon.isUsed ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setViewingCoupon(coupon);
                              }}
                              className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold flex items-center gap-1 shadow-xs active:scale-95 transition-all ml-auto"
                              title="바코드 열기"
                            >
                              <QrCode className="w-3 h-3" />
                              <span>사용 가능</span>
                            </button>
                          ) : (
                            <span className="text-[10px] font-bold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">
                              사용 완료
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        onClick={() => setViewingCoupon(coupon)}
                        className="bg-neutral-50 hover:bg-emerald-50/50 cursor-pointer p-2.5 rounded-xl flex items-center justify-between text-[11px] font-mono text-neutral-600 transition-colors border border-transparent hover:border-emerald-200 group/barcode"
                      >
                        <div className="flex items-center gap-1.5">
                          <QrCode className="w-3.5 h-3.5 text-neutral-400 group-hover/barcode:text-emerald-600" />
                          <span className="text-neutral-400 text-[10px]">바코드:</span>
                          <span className="font-bold tracking-wider text-neutral-800">{coupon.barcode}</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold group-hover/barcode:underline">
                          바코드 보기 &gt;
                        </span>
                      </div>
                    </div>
                  );
                }

                return null;
              })
            )}
          </div>

          {/* Safety Architecture Guide */}
          <div className="bg-neutral-900 text-white rounded-3xl p-5 shadow-xl mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold text-neutral-300">
                kudoworks 심리적 안전 시스템
              </span>
            </div>
            <h5 className="text-sm font-extrabold text-white mb-2">
              우리가 벌점과 감점을 도입하지 않는 이유
            </h5>
            <p className="text-xs text-neutral-300 leading-relaxed">
              사내 비토("이 사람과 일하기 싫다")나 벌점 제도는 사내 정치와 집단 따돌림을 유발합니다.
              kudoworks는 <strong>가점(칭찬)은 축제로 공개</strong>하고,{" "}
              <strong>개선 요구는 1:1 비공개 넛지와 인사팀 익명 핫라인</strong>으로 안전하게 분리 흡수합니다.
            </p>
          </div>
        </div>
      ) : (
        /* Blind-Safe Hotline Section */
        <div className="space-y-3">
          {/* Zero-Knowledge Badge Card */}
          <div className="bg-gradient-to-br from-rose-950 via-neutral-900 to-neutral-900 text-white p-5 rounded-3xl border border-rose-900/40 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded-lg bg-rose-500/20 text-rose-400">
                <Lock className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-rose-300">
                Zero-Knowledge 익명 암호화 보장
              </span>
            </div>
            <h4 className="text-base font-black mb-1">
              사내 안심 익명 신문고 (Blind-Safe Hotline)
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              직장 내 괴롭힘, 폭언, 부당 지시 등은 블라인드로 유출되기 전 사내 인사/감사팀이 즉각 해결해야 합니다.
              신고자의 계정은 <strong>단방향 SHA-256 해시로 격리</strong>되어 데이터베이스 관리자(DBA)도 작성자를 특정할 수 없습니다.
            </p>

            <button
              onClick={() => setIsCreatingReport(true)}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-extrabold shadow-md shadow-rose-600/30 transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>새로운 익명 제보 접수하기</span>
            </button>
          </div>

          {/* Existing Reports & 1:1 Anonymous Chat */}
          <div className="space-y-3">
            <h5 className="text-xs font-extrabold text-neutral-700 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>내 익명 제보 접수 내역 및 인사팀 1:1 대화</span>
            </h5>

            {complianceReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                      {report.category}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      접수번호 #{report.id}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      report.status === "received"
                        ? "bg-amber-100 text-amber-800"
                        : report.status === "reviewing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {report.status === "received"
                      ? "접수 대기"
                      : report.status === "reviewing"
                      ? "인사팀 사실 확인 중"
                      : "조치 완료"}
                  </span>
                </div>

                <h5 className="text-sm font-extrabold text-neutral-900 mb-1">{report.title}</h5>
                <p className="text-xs text-neutral-600 bg-neutral-50 p-3 rounded-2xl mb-3 leading-relaxed">
                  {report.details}
                </p>

                {/* Anonymous Hash Display */}
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono mb-3 bg-neutral-100/70 px-2.5 py-1 rounded-lg">
                  <Hash className="w-3 h-3 text-neutral-500" />
                  <span className="truncate">암호화 세션 키: {report.anonymousHash}</span>
                </div>

                {/* 1:1 Chat Toggle */}
                <button
                  onClick={() =>
                    setSelectedReportId(selectedReportId === report.id ? null : report.id)
                  }
                  className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>
                    인사팀 1:1 익명 대화창 {selectedReportId === report.id ? "닫기" : "열기"} (
                    {report.messages.length}개 메시지)
                  </span>
                </button>

                {/* 1:1 Chat Container */}
                {selectedReportId === report.id && (
                  <div className="mt-4 pt-4 border-t border-neutral-100 space-y-3">
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {report.messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex flex-col ${
                            m.sender === "reporter" ? "items-end" : "items-start"
                          }`}
                        >
                          <div className="flex items-center gap-1 text-[10px] text-neutral-400 mb-0.5">
                            <span>{m.sender === "reporter" ? "나 (익명 제보자)" : "HR 인사/감사팀"}</span>
                            <span>• {m.time}</span>
                          </div>
                          <div
                            className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                              m.sender === "reporter"
                                ? "bg-rose-600 text-white rounded-tr-none shadow-xs"
                                : "bg-neutral-100 text-neutral-800 rounded-tl-none border border-neutral-200"
                            }`}
                          >
                            {m.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendChat} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="인사팀에 익명으로 추가 사실/증빙 전달..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        className="flex-1 px-3 py-2 bg-neutral-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Report Modal */}
      {isCreatingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-6 border border-neutral-100 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h4 className="font-extrabold text-neutral-900 text-sm">
                  사내 안심 익명 신문고 접수
                </h4>
              </div>
              <button
                onClick={() => setIsCreatingReport(false)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 overflow-y-auto pr-1">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">제보 유형</label>
                <select
                  value={reportCat}
                  onChange={(e) => setReportCat(e.target.value as any)}
                  className="w-full p-2.5 bg-neutral-100 rounded-xl text-xs font-bold text-neutral-800"
                >
                  <option value="부당 업무 지시">부당 업무 지시 및 사적 지시</option>
                  <option value="직장 내 괴롭힘">직장 내 괴롭힘 및 폭언</option>
                  <option value="조직 윤리/컴플라이언스">조직 윤리 / 횡령 / 규정 위반</option>
                  <option value="기타 고충">기타 고충 사항</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">제보 제목</label>
                <input
                  type="text"
                  placeholder="사안의 핵심을 간략히 요약해주세요"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full p-2.5 bg-neutral-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  상세 경위 및 요구 사항
                </label>
                <textarea
                  rows={4}
                  placeholder="발생 일시, 상황, 대상자 등 객관적인 사실 위주로 기재해주세요."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  className="w-full p-2.5 bg-neutral-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                />
              </div>

              <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200/80 text-[11px] text-rose-950">
                🔒 <strong>100% 익명 보장:</strong> 전송 시 작성자의 고유 식별자는 즉시 해시 처리되어 인사/감사팀에도 노출되지 않습니다.
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl shadow-md shadow-rose-600/30"
              >
                익명으로 안전하게 접수하기
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Barcode / Coupon Viewer Modal */}
      {viewingCoupon && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setViewingCoupon(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
              title="닫기"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold tracking-wider uppercase mb-1">
              모바일 기프티콘 즉시 사용
            </span>
            <h4 className="text-base font-black text-neutral-900 mt-2 mb-0.5">{viewingCoupon.name}</h4>
            <p className="text-xs text-neutral-400 mb-5">{viewingCoupon.brand}</p>

            {/* Realistic Barcode Graphic */}
            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/80 mb-4 flex flex-col items-center shadow-inner">
              <div className="h-16 flex items-center gap-1.5 w-full justify-center py-1">
                {[3, 1, 4, 2, 5, 1, 3, 2, 4, 1, 2, 5, 2, 3, 1, 4, 2, 3, 1, 4, 2, 5, 1, 3, 2].map(
                  (width, idx) => (
                    <div
                      key={idx}
                      className="h-full bg-neutral-900 rounded-[1px]"
                      style={{ width: `${width * 2}px` }}
                    />
                  )
                )}
              </div>
              <div className="font-mono text-sm font-black tracking-widest text-neutral-800 mt-3">
                {viewingCoupon.barcode}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-neutral-100 rounded-xl mb-4 text-xs font-mono">
              <span className="text-neutral-600 font-bold">PIN: {viewingCoupon.pinCode}</span>
              <button
                onClick={() => handleCopyBarcode(viewingCoupon.barcode)}
                className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
              >
                {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copySuccess ? "복사됨!" : "바코드 복사"}</span>
              </button>
            </div>

            <p className="text-[11px] text-neutral-400 text-center mb-4">
              매장 결제 시 직원에게 위 바코드를 보여주세요.
            </p>

            <button
              onClick={() => setViewingCoupon(null)}
              className="w-full py-3 bg-neutral-900 text-white font-extrabold rounded-2xl hover:bg-neutral-800 transition-colors shadow-xs"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
