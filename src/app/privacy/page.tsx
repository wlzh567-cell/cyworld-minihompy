"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F9F8F5]">
      <Navbar onOpenPreReg={() => {}} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#676D82] hover:text-[#FF6B57] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>메인으로 돌아가기</span>
        </Link>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#2B3044]/10 shadow-[0_12px_32px_rgba(43,48,68,0.06)]">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#587065] mb-2">
            <Shield className="w-4 h-4 text-[#FF6B57]" />
            <span>개인정보 보호 정책</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2B3044] mb-6">
            ON:ROOM 개인정보처리방침
          </h1>

          <div className="space-y-6 text-xs sm:text-sm text-[#676D82] leading-relaxed">
            <section>
              <h2 className="text-sm font-extrabold text-[#2B3044] mb-2">1. 수집하는 개인정보 항목</h2>
              <p>
                주식회사 온룸랩스(이하 &apos;회사&apos;)는 사전 예약 및 정식 런칭 알림 서비스를 위해 아래와 같은 최소한의 개인정보를 수집합니다.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>필수 항목: 휴대전화 번호 또는 이메일 주소, 서비스 닉네임</li>
                <li>선택 항목: 추천인(레퍼럴) 코드, 샌드박스 룸 배치 설정 정보</li>
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-extrabold text-[#2B3044] mb-2">2. 개인정보의 수집 및 이용 목적</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>사전 등록자 식별 및 정식 런칭 안내 SMS/이메일 발송</li>
                <li>얼리버드 한정판 인게임 오브제(빈티지 램프 & 1,500 페블) 지급</li>
                <li>레퍼럴(추천인) 보상 카운팅 및 부정 참여 방지</li>
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-extrabold text-[#2B3044] mb-2">3. 개인정보의 보유 및 이용 기간</h2>
              <p>
                수집된 정보는 서비스 정식 오픈 후 6개월 또는 이용자의 삭제 요청 시 지체 없이 파기됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-extrabold text-[#2B3044] mb-2">4. 개인정보 보호책임자</h2>
              <p>
                성명: kobe | 이메일: wlzh567@gail.com | 부서: 온룸 정보보호팀
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
