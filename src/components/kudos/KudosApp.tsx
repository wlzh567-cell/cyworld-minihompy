"use client";

import React, { useState } from "react";
import {
  Home,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  User as UserIcon,
  Shield,
  Smartphone,
  LayoutDashboard,
  Bell,
  MessageSquare,
  Plus,
  RefreshCw,
  UserPlus,
  X,
} from "lucide-react";
import {
  User,
  Recognition,
  GrowthNudge,
  StoreItem,
  RedeemedCoupon,
  ComplianceReport,
  NudgeCategory,
  ReportCategory,
  DirectChatMessage,
  getUserCumulativePoints,
} from "../../types/kudos";
import {
  INITIAL_USERS,
  CORE_VALUES,
  INITIAL_RECOGNITIONS,
  INITIAL_NUDGES,
  STORE_ITEMS,
  INITIAL_COMPLIANCE_REPORTS,
} from "../../data/mockKudos";
import KudosFeedTab from "./KudosFeedTab";
import SendKudosModal from "./SendKudosModal";
import RewardStoreTab from "./RewardStoreTab";
import GrowthLogTab from "./GrowthLogTab";
import MyPageTab from "./MyPageTab";
import HrIntelligenceDashboard from "./HrIntelligenceDashboard";
import AddUserModal from "./AddUserModal";
import UserProfileModal from "./UserProfileModal";
import DirectMessageModal from "./DirectMessageModal";
import MessengerHubModal from "./MessengerHubModal";
import KudoLogo from "./KudoLogo";
import SplashScreen from "./SplashScreen";
import { AnimatePresence } from "framer-motion";

export default function KudosApp() {
  // App-level view mode: Mobile Phone App vs HR Enterprise Dashboard
  const [appMode, setAppMode] = useState<"mobile" | "hr_admin">("mobile");

  // Add User / Employee Onboarding Modal State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Central Messenger Hub Modal State
  const [isMessengerHubOpen, setIsMessengerHubOpen] = useState(false);

  // Account / Role Switcher Modal State (for real mobile app experience)
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // App Initial Splash / Loading Screen State
  const [showSplash, setShowSplash] = useState(true);

  // Current active user
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUserId, setCurrentUserId] = useState<string>("user-1");

  // Mobile App active tab
  const [mobileTab, setMobileTab] = useState<"feed" | "store" | "growth" | "mypage">("feed");

  // Core Data States
  const [recognitions, setRecognitions] = useState<Recognition[]>(INITIAL_RECOGNITIONS);
  const [nudges, setNudges] = useState<GrowthNudge[]>(INITIAL_NUDGES);
  const [storeItems, setStoreItems] = useState<StoreItem[]>(STORE_ITEMS);
  const [redeemedCoupons, setRedeemedCoupons] = useState<RedeemedCoupon[]>([
    {
      id: "coup-1",
      userId: "user-1",
      itemId: "store-sbux",
      name: "스타벅스 카페 아메리카노 T",
      brand: "스타벅스",
      pointsCost: 450,
      barcode: "8801234567890",
      pinCode: "7492-1849",
      redeemedAt: "2026.09.20",
      isUsed: false,
    },
    {
      id: "coup-2",
      userId: "user-2",
      itemId: "store-cj",
      name: "CJ 올리브영 기프트카드 20,000원권",
      brand: "올리브영",
      pointsCost: 2000,
      barcode: "8809876543210",
      pinCode: "5182-9021",
      redeemedAt: "2026.09.22",
      isUsed: true,
    },
    {
      id: "coup-3",
      userId: "user-2",
      itemId: "store-sbux",
      name: "스타벅스 카페 아메리카노 T",
      brand: "스타벅스",
      pointsCost: 450,
      barcode: "8805678912345",
      pinCode: "3819-4820",
      redeemedAt: "2026.09.26",
      isUsed: false,
    },
  ]);
  const [complianceReports, setComplianceReports] = useState<ComplianceReport[]>(
    INITIAL_COMPLIANCE_REPORTS
  );

  // Send Kudos Modal State
  const [isSendKudosOpen, setIsSendKudosOpen] = useState(false);
  const [sendReceiverId, setSendReceiverId] = useState<string | undefined>(undefined);
  const [sendTag, setSendTag] = useState<string | undefined>(undefined);

  // User Profile & 1:1 Direct Messenger Modal State
  const [selectedProfileUser, setSelectedProfileUser] = useState<User | null>(null);
  const [activeChatUser, setActiveChatUser] = useState<User | null>(null);

  // Initial Direct Messages
  const [directMessages, setDirectMessages] = useState<DirectChatMessage[]>([
    {
      id: "dm-1",
      senderId: "user-2",
      receiverId: "user-1",
      text: "민준님! 오늘 결제 모듈 버그 함께 확인해 주셔서 정말 감사했습니다 🙏",
      createdAt: "14:20",
    },
    {
      id: "dm-2",
      senderId: "user-1",
      receiverId: "user-2",
      text: "별말씀을요 서연님! 주말 프로모션 전에 해결되어 정말 다행이에요 :)",
      createdAt: "14:25",
    },
  ]);

  const handleOpenSendModal = (receiverId?: string, tag?: string) => {
    setSendReceiverId(receiverId);
    setSendTag(tag);
    setIsSendKudosOpen(true);
  };

  const handleOpenChatWithUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setActiveChatUser(target);
    }
  };

  // Handler: Send Direct Message & auto reply simulation
  const handleSendDirectMessage = (receiverId: string, text: string, isKudosTip?: boolean) => {
    const newMsg: DirectChatMessage = {
      id: `dm-${Date.now()}`,
      senderId: currentUserId,
      receiverId,
      text,
      createdAt: "방금 전",
      isKudosTip,
    };
    setDirectMessages((prev) => [...prev, newMsg]);

    // Simulate auto reply after 1.2s for lively chat experience
    setTimeout(() => {
      const replies = [
        "메시지 확인했습니다! 감사합니다 😊",
        "네 민준님, 바로 확인하고 반영해 드릴게요!",
        "오늘도 원팀으로 파이팅입니다 🚀✨",
        "보내주신 내용 잘 참고하겠습니다! 좋은 하루 되세요!",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setDirectMessages((prev) => [
        ...prev,
        {
          id: `dm-reply-${Date.now()}`,
          senderId: receiverId,
          receiverId: currentUserId,
          text: randomReply,
          createdAt: "방금 전",
        },
      ]);
    }, 1200);
  };

  // Handler: 50P Kudos Tip inside Chat
  const handleSendKudosTipDirect = (receiverId: string, points: number) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === currentUserId) return { ...u, givePoints: Math.max(0, u.givePoints - points) };
        if (u.id === receiverId) {
          return {
            ...u,
            earnedPoints: u.earnedPoints + points,
            cumulativePoints: getUserCumulativePoints(u) + points,
          };
        }
        return u;
      })
    );
  };

  const currentUser = users.find((u) => u.id === currentUserId) || users[0];

  // Handler: Send Kudos (Track A)
  const handleSendKudos = (receiverId: string, points: number, message: string, tag: string) => {
    // 1. Deduct givePoints from sender
    // 2. Add earnedPoints and cumulativePoints to receiver
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          return { ...u, givePoints: Math.max(0, u.givePoints - points) };
        }
        if (u.id === receiverId) {
          return {
            ...u,
            earnedPoints: u.earnedPoints + points,
            cumulativePoints: getUserCumulativePoints(u) + points,
          };
        }
        return u;
      })
    );

    // 3. Add to Recognitions Feed
    const newRec: Recognition = {
      id: `rec-${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      pointsAmount: points,
      message,
      coreValueTag: tag,
      cheersCount: 1,
      cheeredByMe: true,
      createdAt: "방금 전",
    };
    setRecognitions((prev) => [newRec, ...prev]);
  };

  // Handler: Toggle Cheers Reaction
  const handleToggleCheers = (recId: string) => {
    setRecognitions((prev) =>
      prev.map((r) => {
        if (r.id === recId) {
          const nextCheered = !r.cheeredByMe;
          return {
            ...r,
            cheeredByMe: nextCheered,
            cheersCount: nextCheered ? r.cheersCount + 1 : Math.max(0, r.cheersCount - 1),
          };
        }
        return r;
      })
    );
  };

  // Handler: Redeem Store Item
  const handleRedeemItem = (item: StoreItem) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          return {
            ...u,
            earnedPoints: Math.max(0, u.earnedPoints - item.price),
            cumulativePoints: getUserCumulativePoints(u), // 상품을 구매해도 칭찬왕 누적 점수는 절대 차감되지 않음!
          };
        }
        return {
          ...u,
          cumulativePoints: getUserCumulativePoints(u),
        };
      })
    );

    const randomBarcode = `880${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const randomPin = `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const newCoupon: RedeemedCoupon = {
      id: `coup-${Date.now()}`,
      userId: currentUser.id,
      itemId: item.id,
      name: item.name,
      brand: item.brand,
      pointsCost: item.price,
      barcode: randomBarcode,
      pinCode: randomPin,
      redeemedAt: "방금 전",
      isUsed: false,
    };

    setRedeemedCoupons((prev) => [newCoupon, ...prev]);
  };

  // Handler: Send 1:1 Growth Nudge (Track B)
  const handleSendNudge = (
    receiverId: string,
    cat: NudgeCategory,
    situation: string,
    behavior: string,
    impact: string
  ) => {
    const newNudge: GrowthNudge = {
      id: `nudge-${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      templateCategory: cat,
      situation,
      behavior,
      impact,
      isRead: false,
      createdAt: "방금 전",
    };
    setNudges((prev) => [newNudge, ...prev]);
  };

  // Handler: Submit Anonymous Compliance Report (Track C)
  const handleSubmitReport = (category: ReportCategory, title: string, details: string) => {
    const fakeHash = `sha256-${Math.random().toString(36).substring(2, 15)}${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    const newReport: ComplianceReport = {
      id: `rep-${Math.floor(1000 + Math.random() * 9000)}`,
      anonymousHash: fakeHash,
      category,
      title,
      details,
      status: "received",
      createdAt: "방금 전",
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "reporter",
          text: `[익명 제보 접수] ${details}`,
          time: "방금 전",
        },
      ],
    };
    setComplianceReports((prev) => [newReport, ...prev]);
  };

  // Handler: 1:1 Chat Message in Report
  const handleSendChatMessage = (reportId: string, text: string) => {
    setComplianceReports((prev) =>
      prev.map((rep) => {
        if (rep.id === reportId) {
          return {
            ...rep,
            messages: [
              ...rep.messages,
              {
                id: `msg-${Date.now()}`,
                sender: "reporter",
                text,
                time: "방금 전",
              },
            ],
          };
        }
        return rep;
      })
    );
  };

  // Handler: Trigger 1:1 1on1 by HR
  const handleTriggerOneOnOne = (userId: string) => {
    alert("직속 팀장 및 인사팀에 조기 퇴사 방지를 위한 1:1 커피챗 면담 캘린더 일정이 전송되었습니다.");
  };

  // Handler: Monthly Budget Reset
  const handleResetMonthlyBudget = () => {
    setUsers((prev) => prev.map((u) => ({ ...u, givePoints: 1000 })));
    alert("전사 모든 직원에게 이번 달 칭찬 버짓 1,000P가 균등 지급되었습니다! (지난달 잔여 버짓 자동 소멸 완료)");
  };

  // Handler: Add New Employee / User Onboarding
  const handleAddUser = (newUserData: Omit<User, "id" | "earnedPoints" | "cumulativePoints" | "joinedDaysAgo">) => {
    const newUserId = `user-${Date.now()}`;
    const newUser: User = {
      ...newUserData,
      id: newUserId,
      earnedPoints: 100, // 웰컴 축하 100P 적립
      cumulativePoints: 100, // 누적 인정 점수 100P 시작
      joinedDaysAgo: 1,
      isNewHire: true,
    };
    setUsers((prev) => [newUser, ...prev]);
    setCurrentUserId(newUserId);

    // 자동 입사 축하 피드 메시지 생성
    const welcomeRecognition: Recognition = {
      id: `rec-welcome-${Date.now()}`,
      senderId: "user-5", // HR 컬처 리드
      receiverId: newUserId,
      pointsAmount: 100,
      coreValueTag: "#환영합니다 🌱",
      message: `🌱 [신규 입사 환영] ${newUser.name}님이 ${newUser.department}에 신규 입사하셨습니다! kudoworks 팀의 새로운 가족이 되신 것을 진심으로 환영하며, 웰컴 온보딩 축하 포인트 100P를 선물합니다. 모두 따뜻한 환영 인사를 남겨주세요! 👏✨`,
      cheersCount: 1,
      cheeredByMe: true,
      createdAt: "방금 전",
    };
    setRecognitions((prev) => [welcomeRecognition, ...prev]);

    alert(
      `🎉 신입사원 '${newUser.name}'님이 성공적으로 등록되었습니다!\n` +
      `피드에 입사 환영 축하 메시지가 자동으로 발행되었으며,\n` +
      `신입사원에게 웰컴 100P 적립 및 1,000P의 칭찬 버짓이 부여되었습니다.`
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F5F9] text-[#202433] flex flex-col font-sans">
      {/* 🚀 Mobile First Launch / Splash Screen */}
      <AnimatePresence>
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* Global Top Navbar - Hidden on Mobile so smartphones experience a 100% real native app! */}
      <header className="hidden md:block sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-neutral-200/80 px-4 sm:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand with Official Signature Logo */}
          <div className="flex items-center gap-3">
            <KudoLogo size="md" withText />
            <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              B2B SaaS
            </span>
            <p className="text-[11px] text-neutral-400 hidden sm:block">
              동료 인정 및 조직 문화 인텔리전스 플랫폼
            </p>
          </div>

          {/* Mode Switcher: Mobile App vs HR Admin */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-2xl border border-neutral-200/80">
            <button
              onClick={() => setAppMode("mobile")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                appMode === "mobile"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📱 직원 모바일 앱 (End User)</span>
            </button>
            <button
              onClick={() => setAppMode("hr_admin")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                appMode === "hr_admin"
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
              <span>📊 HR 인사팀 어드민 (Intelligence)</span>
            </button>
          </div>

          {/* User Profile Selector & Classic Hompy Link */}
          <div className="flex items-center gap-2.5">
            {/* Messenger Hub Button */}
            <button
              onClick={() => setIsMessengerHubOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl text-xs font-extrabold transition-all shadow-xs group"
              title="사내 메신저 허브 열기"
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>💬 사내 메신저</span>
              <span className="text-[10px] bg-rose-500 text-white font-black px-1.5 py-0.2 rounded-full shadow-xs">
                2
              </span>
            </button>

            {/* Add Employee Button */}
            <button
              onClick={() => setIsAddUserOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-2xl text-xs font-extrabold transition-colors shadow-2xs"
              title="신입사원 등록 / 직원 초대"
            >
              <UserPlus className="w-3.5 h-3.5 text-blue-600" />
              <span>+ 신입사원 등록</span>
            </button>

            {/* Account Switcher */}
            <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-2xl border border-neutral-200">
              <span className="text-[10px] font-bold text-neutral-400 hidden md:inline">
                테스트 계정:
              </span>
              <select
                value={currentUserId}
                onChange={(e) => setCurrentUserId(e.target.value)}
                className="bg-transparent text-xs font-extrabold text-neutral-800 focus:outline-none cursor-pointer"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.department})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 w-full flex justify-center p-0 md:p-6 lg:p-8">
        {appMode === "hr_admin" ? (
          /* Enterprise HR Dashboard View */
          <div className="w-full max-w-7xl px-3 py-4 md:px-0">
            {/* Mobile Top Navigation Bar for Admin */}
            <div className="md:hidden flex items-center justify-between bg-neutral-900 text-white p-3 rounded-2xl mb-3 shadow-md">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black">HR 인사팀 관리자 모드</span>
              </div>
              <button
                onClick={() => setAppMode("mobile")}
                className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold rounded-xl active:scale-95"
              >
                직원 앱으로 ➔
              </button>
            </div>
            <HrIntelligenceDashboard
              users={users}
              recognitions={recognitions}
              coreValues={CORE_VALUES}
              onTriggerOneOnOne={handleTriggerOneOnOne}
              onResetMonthlyBudget={handleResetMonthlyBudget}
              onOpenAddUser={() => setIsAddUserOpen(true)}
            />
          </div>
        ) : (
          /* Mobile Phone View: 100% Fullscreen on real phones, iPhone Mockup on Desktop */
          <div className="w-full md:max-w-md flex flex-col items-center min-h-screen md:min-h-0">
            {/* Phone Bezel Frame (only on desktop md:) */}
            <div className="w-full bg-white md:rounded-[44px] md:shadow-[0_25px_70px_rgba(0,0,0,0.15)] md:border-[8px] md:border-neutral-800 overflow-hidden flex flex-col min-h-screen md:min-h-[780px] md:max-h-[850px] relative">
              {/* Dynamic Island / Speaker notch (only on desktop md:) */}
              <div className="hidden md:flex w-full h-8 bg-neutral-800 items-center justify-center relative">
                <div className="w-24 h-4 bg-neutral-900 rounded-full flex items-center justify-end px-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500/40"></span>
                </div>
              </div>

              {/* Mobile App Header (Real native app header on smartphone) */}
              <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-20 shadow-2xs">
                <KudoLogo size="sm" withText />

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMessengerHubOpen(true)}
                    className="p-1.5 px-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center gap-1.5 shadow-2xs"
                    title="사내 메신저"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black">메신저</span>
                    <span className="text-[9px] bg-rose-500 text-white font-black px-1.5 py-0.2 rounded-full shadow-xs">
                      2
                    </span>
                  </button>

                  {/* Account / Role Switcher Drawer Button */}
                  <button
                    onClick={() => setIsAccountModalOpen(true)}
                    className="flex items-center gap-1.5 p-1 pl-1 pr-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors border border-neutral-200 active:scale-95"
                    title="계정 및 관리자 모드 전환"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-6 h-6 rounded-full object-cover border border-neutral-300"
                    />
                    <span className="text-[11px] font-black text-neutral-800 max-w-[64px] truncate">
                      {currentUser.name.split(" ")[0]}
                    </span>
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                        currentUser.role === "hr_admin"
                          ? "bg-amber-400 text-neutral-900"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {currentUser.role === "hr_admin" ? "관리자" : "사용자"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Scrollable Tab Content Container */}
              <div className="flex-1 overflow-y-auto p-4 bg-[#F8F9FC]">
                {mobileTab === "feed" && (
                  <KudosFeedTab
                    currentUser={currentUser}
                    users={users}
                    recognitions={recognitions}
                    onOpenSendModal={(recId, tag) => handleOpenSendModal(recId, tag)}
                    onToggleCheers={handleToggleCheers}
                    onSelectUserProfile={(user) => setSelectedProfileUser(user)}
                  />
                )}
                {mobileTab === "store" && (
                  <RewardStoreTab
                    currentUser={currentUser}
                    storeItems={storeItems}
                    redeemedCoupons={redeemedCoupons}
                    onRedeemItem={handleRedeemItem}
                  />
                )}
                {mobileTab === "growth" && (
                  <GrowthLogTab
                    currentUser={currentUser}
                    users={users}
                    nudges={nudges.filter((n) => n.receiverId === currentUser.id)}
                    myReceivedKudos={recognitions.filter((r) => r.receiverId === currentUser.id)}
                    onSendNudge={handleSendNudge}
                  />
                )}
                {mobileTab === "mypage" && (
                  <MyPageTab
                    currentUser={currentUser}
                    users={users}
                    recognitions={recognitions}
                    redeemedCoupons={redeemedCoupons}
                    complianceReports={complianceReports}
                    onSubmitReport={handleSubmitReport}
                    onSendChatMessage={handleSendChatMessage}
                    onOpenAddUser={() => setIsAddUserOpen(true)}
                    onSelectUserProfile={(u) => setSelectedProfileUser(u)}
                  />
                )}
              </div>

              {/* Mobile Bottom 5-Navigation Tabs */}
              <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-neutral-100 px-3 py-2 flex items-center justify-around z-30 shadow-lg">
                {/* Tab 1: Feed */}
                <button
                  onClick={() => setMobileTab("feed")}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    mobileTab === "feed" ? "text-blue-600 font-extrabold" : "text-neutral-400"
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span className="text-[10px]">피드</span>
                </button>

                {/* Tab 2: Store */}
                <button
                  onClick={() => setMobileTab("store")}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    mobileTab === "store" ? "text-emerald-600 font-extrabold" : "text-neutral-400"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-[10px]">선물스토어</span>
                </button>

                {/* Center Action: Floating Send Kudos */}
                <button
                  onClick={() => setIsSendKudosOpen(true)}
                  className="w-12 h-12 -mt-5 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 transform active:scale-95 transition-transform"
                  title="칭찬하기"
                >
                  <Plus className="w-6 h-6 stroke-[3]" />
                </button>

                {/* Tab 4: Growth Log */}
                <button
                  onClick={() => setMobileTab("growth")}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    mobileTab === "growth" ? "text-indigo-600 font-extrabold" : "text-neutral-400"
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-[10px]">성장로그</span>
                </button>

                {/* Tab 5: My / Hotline */}
                <button
                  onClick={() => setMobileTab("mypage")}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    mobileTab === "mypage" ? "text-rose-600 font-extrabold" : "text-neutral-400"
                  }`}
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="text-[10px]">MY/신문고</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3-Step Send Kudos Modal */}
      <SendKudosModal
        isOpen={isSendKudosOpen}
        onClose={() => {
          setIsSendKudosOpen(false);
          setSendReceiverId(undefined);
          setSendTag(undefined);
        }}
        currentUser={currentUser}
        users={users}
        coreValues={CORE_VALUES}
        defaultReceiverId={sendReceiverId}
        defaultTag={sendTag}
        onSendKudos={handleSendKudos}
      />

      {/* Add Employee / User Onboarding Modal */}
      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onAddUser={handleAddUser}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        user={selectedProfileUser}
        currentUser={currentUser}
        allRecognitions={recognitions}
        onClose={() => setSelectedProfileUser(null)}
        onOpenSendKudos={(userId) => {
          setSelectedProfileUser(null);
          handleOpenSendModal(userId);
        }}
        onOpenChat={(userId) => {
          setSelectedProfileUser(null);
          handleOpenChatWithUser(userId);
        }}
      />

      {/* 1:1 Direct Message Modal */}
      <DirectMessageModal
        isOpen={!!activeChatUser}
        onClose={() => setActiveChatUser(null)}
        targetUser={activeChatUser}
        currentUser={currentUser}
        messages={directMessages}
        onSendMessage={handleSendDirectMessage}
        onSendKudosTip={handleSendKudosTipDirect}
      />

      {/* Central Messenger Hub Modal */}
      <MessengerHubModal
        isOpen={isMessengerHubOpen}
        onClose={() => setIsMessengerHubOpen(false)}
        currentUser={currentUser}
        users={users}
        messages={directMessages}
        onOpenChatWithUser={(partner) => {
          setIsMessengerHubOpen(false);
          setActiveChatUser(partner);
        }}
      />

      {/* Account & Role Switcher Modal (Real-app experience on mobile) */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-t-[32px] sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black text-neutral-900">접속 계정 &amp; 권한 선택</h3>
                <p className="text-xs text-neutral-400 mt-0.5">테스트할 역할을 선택해주세요</p>
              </div>
              <button
                onClick={() => setIsAccountModalOpen(false)}
                className="p-2 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode 1: Employee Users */}
            <div className="mb-4">
              <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider block mb-2">
                👥 일반 사용자 모드 (직원 앱)
              </span>
              <div className="space-y-1.5">
                {users.filter(u => u.role !== "hr_admin").map((u) => {
                  const isSelected = u.id === currentUserId && appMode === "mobile";
                  return (
                    <button
                      key={u.id}
                      onClick={() => {
                        setCurrentUserId(u.id);
                        setAppMode("mobile");
                        setIsAccountModalOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl border transition-all ${
                        isSelected
                          ? "bg-blue-50/80 border-blue-500 shadow-2xs ring-2 ring-blue-400"
                          : "bg-white border-neutral-100 hover:border-neutral-200"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover border border-neutral-200" />
                        <div className="text-left">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-neutral-900">{u.name}</span>
                            {u.id === "user-2" && (
                              <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.2 rounded-full">
                                칭찬왕 🏆
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-400 font-medium">
                            {u.department} · {u.jobTitle}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-600">
                        {u.earnedPoints.toLocaleString()}P
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mode 2: HR Admin */}
            <div>
              <span className="text-[11px] font-extrabold text-amber-600 uppercase tracking-wider block mb-2">
                🛡️ 관리자 모드 (HR Intelligence)
              </span>
              {users.filter(u => u.role === "hr_admin").map((u) => {
                const isSelected = appMode === "hr_admin";
                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      setCurrentUserId(u.id);
                      setAppMode("hr_admin");
                      setIsAccountModalOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-sm ring-2 ring-amber-400"
                        : "bg-neutral-50 border-neutral-200 hover:border-neutral-300 text-neutral-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover border border-amber-400" />
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black">{u.name}</span>
                          <span className="text-[10px] bg-amber-400 text-neutral-950 font-extrabold px-1.5 py-0.2 rounded-full">
                            HR 관리자
                          </span>
                        </div>
                        <span className={`text-[10px] font-medium ${isSelected ? "text-neutral-300" : "text-neutral-500"}`}>
                          📊 전사 컬처 인텔리전스 대시보드
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-amber-400">
                      관리자 ➔
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Replay Splash Screen Button */}
            <div className="mt-4 pt-3 border-t border-neutral-100">
              <button
                onClick={() => {
                  setIsAccountModalOpen(false);
                  setShowSplash(true);
                }}
                className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>🚀 첫 로딩화면(스플래시) 다시 보기</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
