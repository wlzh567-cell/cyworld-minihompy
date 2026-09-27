"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
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
            <FileText className="w-4 h-4 text-[#FF6B57]" />
            <span>이용 약관</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2B3044] mb-6">
            ON:ROOM 서비스 이용약관
          </h1>

          <div className="space-y-6 text-xs sm:text-sm text-[#676D82] leading-relaxed">
            <section>
              <h2 className="text-sm font-extrabold text-[#2B3044] mb-2">제 1 조 (목적)</h2>
              <p>
                본 약관은 주식회사 온룸랩스가 제공하는 감성 소셜 룸 플랫폼 ON:ROOM 및 관련 제반 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-extrabold text-[#2B3044] mb-2">제 2 조 (사전 예약 리워드)</h2>
              <p>
                사전 등록을 완료한 회원에게는 공지된 가상 재화(페블) 및 한정판 인게임 오브제가 지급되며, 타인에게 현금으로 양도하거나 판매할 수 없습니다.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-extrabold text-[#2B3044] mb-2">제 3 조 (저작권 및 BGM 라이선스)</h2>
              <p>
                플랫폼 내에서 제공되는 음원 및 픽셀 일러스트의 저작권은 해당 창작자 및 회사에 귀속되며, 플랫폼 외부로 무단 추출 또는 상업적 재배포를 금지합니다.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
