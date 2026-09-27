import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, ExternalLink } from "lucide-react";
import fs from "fs";
import path from "path";

export const metadata = {
  title: "✿ 추억의 싸이월드 미니홈피 & 미니룸 ✿",
  description: "BGM과 도토리, 일촌평, 미니미가 가득한 레트로 싸이월드 미니홈피",
};

export default function MiniroomPage() {
  // Read cyworld.html contents directly to serve inline without static 404 caching issues
  const htmlPath = path.join(process.cwd(), "public", "cyworld.html");
  let rawHtml = "";
  try {
    rawHtml = fs.readFileSync(htmlPath, "utf-8");
  } catch {
    rawHtml = "<div>미니룸을 불러오는 중 오류가 발생했습니다.</div>";
  }

  return (
    <div className="min-h-screen bg-[#fce4f3] flex flex-col items-center">
      {/* Top Floating Control Bar */}
      <div className="w-full max-w-5xl px-4 py-3 flex items-center justify-between z-50 bg-white/80 backdrop-blur-md border-b border-pink-200 sticky top-0 shadow-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5a3060] bg-white px-3.5 py-1.5 rounded-full border border-pink-200 hover:bg-pink-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-pink-500" />
          <span>ON:ROOM 홈으로 가기</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/#sandbox"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-orange-400 to-rose-400 px-4 py-1.5 rounded-full shadow-xs hover:brightness-105 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>12×12 모던 미니룸 에디터 보기</span>
          </Link>
          <a
            href="/cyworld.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-pink-600 bg-pink-100 hover:bg-pink-200 px-3 py-1.5 rounded-full transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            <span>새 창 전체화면</span>
          </a>
        </div>
      </div>

      {/* Embedded Classic Cyworld Minihompy Frame */}
      <div className="w-full flex-1 flex justify-center p-2 sm:p-4">
        <iframe
          srcDoc={rawHtml}
          title="Cyworld Classic Minihompy"
          className="w-full max-w-[1100px] h-[90vh] rounded-2xl border-4 border-pink-200/80 shadow-2xl bg-white"
        />
      </div>
    </div>
  );
}
