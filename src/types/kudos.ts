export type Role = "employee" | "hr_admin" | "super_admin";

export interface User {
  id: string;
  name: string;
  avatar: string;
  department: "엔지니어링" | "프로덕트" | "디자인" | "성장마케팅" | "피플앤컬처(인사)";
  jobTitle: string;
  givePoints: number; // 월간 칭찬 버짓 (소멸형)
  earnedPoints: number; // 리워드 교환 가능 잔여 포인트 (사용 시 차감)
  cumulativePoints?: number; // 누적 동료 인정 포인트 (칭찬왕/리더보드 기준, 포인트를 써도 영구 보존)
  role: Role;
  joinedDaysAgo: number;
  isBirthdayToday?: boolean;
  isNewHire?: boolean;
}

export const BASE_CUMULATIVE_POINTS: Record<string, number> = {
  "user-1": 2450, // 김민준 대리
  "user-2": 3800, // 박서연 과장 (1위 칭찬왕)
  "user-3": 1900, // 최유진 매니저
  "user-4": 1200, // 정도윤 팀장
  "user-5": 2100, // 이지원 팀장
  "user-6": 250,  // 한승우 신입
};

export function getUserCumulativePoints(user: User): number {
  const base = BASE_CUMULATIVE_POINTS[user.id] ?? 0;
  const currentCumulative = user.cumulativePoints ?? 0;
  return Math.max(base, currentCumulative);
}

export interface CoreValue {
  id: string;
  tag: string;
  name: string;
  color: string;
  desc: string;
}

export interface Recognition {
  id: string;
  senderId: string;
  receiverId: string;
  pointsAmount: number;
  message: string;
  coreValueTag: string;
  cheersCount: number;
  cheeredByMe?: boolean;
  createdAt: string;
}

export type NudgeCategory = "협업 방식" | "소통 방식" | "업무 공유" | "회의 에티켓";

export interface GrowthNudge {
  id: string;
  senderId: string; // 내부 보관용
  receiverId: string;
  templateCategory: NudgeCategory;
  situation: string; // 상황
  behavior: string;  // 행동
  impact: string;    // 영향 및 부탁
  isRead: boolean;
  createdAt: string;
}

export type ReportCategory = "직장 내 괴롭힘" | "부당 업무 지시" | "조직 윤리/컴플라이언스" | "기타 고충";
export type ReportStatus = "received" | "reviewing" | "resolved";

export interface ReportMessage {
  id: string;
  sender: "reporter" | "hr";
  text: string;
  time: string;
}

export interface ComplianceReport {
  id: string;
  anonymousHash: string; // 단방향 SHA-256 해시 키
  category: ReportCategory;
  title: string;
  details: string;
  status: ReportStatus;
  createdAt: string;
  messages: ReportMessage[];
}

export type StoreCategory = "coffee" | "voucher" | "food" | "custom";

export interface StoreItem {
  id: string;
  name: string;
  brand: string;
  category: StoreCategory;
  price: number;
  image: string;
  badge?: string;
  description: string;
  isCustomBenefit?: boolean;
}

export interface RedeemedCoupon {
  id: string;
  userId?: string;
  itemId: string;
  name: string;
  brand: string;
  pointsCost?: number;
  barcode: string;
  pinCode: string;
  redeemedAt: string;
  isUsed: boolean;
}

export interface DirectChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
  isKudosTip?: boolean;
}

