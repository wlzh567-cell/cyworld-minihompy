"use client";

import React from "react";
import Link from "next/link";
import { showToast } from "./Toast";

export default function Footer() {
  return (
    <footer className="bg-[#F3F0E9] border-t border-[#2B3044]/10 mt-20 pt-16 pb-24 sm:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-extrabold text-xl text-[#2B3044] tracking-tight">
                ON:ROOM (온룸)
              </span>
              <span className="text-[10px] font-mono font-bold bg-[#FEE589] text-[#2B3044] px-1.5 py-0.5 rounded">
                BETA
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#676D82] max-w-sm leading-relaxed mb-4">
              과도한 피드와 경쟁을 넘어, 따뜻한 취향과 온기가 켜지는 2.5D 인터랙티브 감성 소셜 룸 플랫폼.
            </p>
            <div className="text-[11px] text-[#9FA4B8] space-y-1">
              <div>주식회사 온룸랩스 | 대표: kobe</div>
              <div>사업자 등록번호: 2026-ONROOM-01 | 통신판매업신고 완료</div>
              <div>문의: contact@onroom.me | 서울특별시 성수동 아지트</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h5 className="text-xs font-extrabold text-[#2B3044] uppercase tracking-wider mb-4">
              서비스 둘러보기
            </h5>
            <ul className="space-y-2.5 text-xs text-[#676D82]">
              <li>
                <Link href="#sandbox" className="hover:text-[#FF6B57] transition-colors">
                  인터랙티브 샌드박스
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-[#FF6B57] transition-colors">
                  핵심 기능 (Bento Grid)
                </Link>
              </li>
              <li>
                <Link href="/rewards" className="hover:text-[#FF6B57] transition-colors">
                  사전 예약 보상 시스템
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#FF6B57] transition-colors">
                  크리에이터 & 이웃 룸 쇼케이스
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div className="md:col-span-3">
            <h5 className="text-xs font-extrabold text-[#2B3044] uppercase tracking-wider mb-4">
              커뮤니티 & 지원
            </h5>
            <ul className="space-y-2.5 text-xs text-[#676D82]">
              <li>
                <button
                  onClick={() => showToast("공식 인스타그램이 곧 오픈됩니다! 📸")}
                  className="hover:text-[#FF6B57] transition-colors text-left"
                >
                  공식 인스타그램
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast("디스코드 커뮤니티가 준비 중입니다! 💬")}
                  className="hover:text-[#FF6B57] transition-colors text-left"
                >
                  공식 디스코드
                </button>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#FF6B57] transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#FF6B57] transition-colors">
                  서비스 이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#2B3044]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9FA4B8]">
          <span>© 2026 ON:ROOM Inc. All rights reserved.</span>
          <span>Designed with Neo-Nostalgia & High-Converting UX</span>
        </div>
      </div>
    </footer>
  );
}
