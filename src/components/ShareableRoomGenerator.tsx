"use client";

import React, { useEffect, useRef } from "react";
import { Download, Copy, Share2, Sparkles } from "lucide-react";
import { PlacedFurniture } from "./InteractiveSandbox";
import { showToast } from "./Toast";

interface GeneratorProps {
  placedItems: PlacedFurniture[];
  currentMood: "noon" | "sunset" | "dawn";
  userNickname: string;
}

export default function ShareableRoomGenerator({
  placedItems,
  currentMood,
  userNickname,
}: GeneratorProps) {
  const miniCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const TILE_W = 36;
  const TILE_H = 18;
  const GRID_SIZE = 8;

  const gridToIso = (gx: number, gy: number, ox: number, oy: number) => ({
    x: ox + (gx - gy) * (TILE_W / 2),
    y: oy + (gx + gy) * (TILE_H / 2),
  });

  // Render Mini Preview Canvas
  const renderMini = () => {
    const canvas = miniCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ox = canvas.width / 2;
    const oy = canvas.height / 2 - 25;

    // Walls
    const topCorner = gridToIso(0, 0, ox, oy);
    const leftCorner = gridToIso(0, GRID_SIZE, ox, oy);
    const rightCorner = gridToIso(GRID_SIZE, 0, ox, oy);
    const wallH = 75;

    ctx.fillStyle = currentMood === "dawn" ? "#25293A" : currentMood === "sunset" ? "#E8CFCE" : "#EAE6DB";
    ctx.beginPath();
    ctx.moveTo(topCorner.x, topCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y - wallH);
    ctx.lineTo(topCorner.x, topCorner.y - wallH);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = currentMood === "dawn" ? "#32374E" : currentMood === "sunset" ? "#F4DCDA" : "#F4F0E6";
    ctx.beginPath();
    ctx.moveTo(topCorner.x, topCorner.y);
    ctx.lineTo(rightCorner.x, rightCorner.y);
    ctx.lineTo(rightCorner.x, rightCorner.y - wallH);
    ctx.lineTo(topCorner.x, topCorner.y - wallH);
    ctx.closePath();
    ctx.fill();

    // Floor
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        const pt = gridToIso(x, y, ox, oy);
        const isAlt = (x + y) % 2 === 0;

        if (currentMood === "dawn") {
          ctx.fillStyle = isAlt ? "#2F354D" : "#3B415D";
        } else if (currentMood === "sunset") {
          ctx.fillStyle = isAlt ? "#FBE5DF" : "#F6DDD6";
        } else {
          ctx.fillStyle = isAlt ? "#FAF8F2" : "#F0ECE1";
        }

        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(pt.x + TILE_W / 2, pt.y + TILE_H / 2);
        ctx.lineTo(pt.x, pt.y + TILE_H);
        ctx.lineTo(pt.x - TILE_W / 2, pt.y + TILE_H / 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Furniture
    const sorted = [...placedItems].sort((a, b) => a.x + a.y - (b.x + b.y));
    sorted.forEach((item) => {
      const pt = gridToIso(item.x, item.y, ox, oy);
      ctx.save();
      ctx.translate(pt.x, pt.y + TILE_H / 2);
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.beginPath();
      ctx.ellipse(0, 3, 12, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Simple representations
      if (item.id === "lamp") {
        ctx.fillStyle = "#C29B38";
        ctx.fillRect(-1.5, -34, 3, 34);
        ctx.fillStyle = "#FFE589";
        ctx.beginPath();
        ctx.arc(0, -34, 9, Math.PI, 0);
        ctx.fill();
      } else if (item.id === "sofa") {
        ctx.fillStyle = "#7D968B";
        ctx.beginPath();
        ctx.roundRect(-15, -18, 30, 18, 4);
        ctx.fill();
      } else if (item.id === "turntable") {
        ctx.fillStyle = "#9C6644";
        ctx.fillRect(-11, -11, 22, 12);
        ctx.fillStyle = "#111";
        ctx.beginPath();
        ctx.arc(-3, -5, 5, 0, Math.PI * 2);
        ctx.fill();
      } else if (item.id === "plant") {
        ctx.fillStyle = "#E6CCB2";
        ctx.fillRect(-6, -10, 12, 10);
        ctx.fillStyle = "#386641";
        ctx.beginPath();
        ctx.arc(0, -16, 7, 0, Math.PI * 2);
        ctx.fill();
      } else if (item.id === "mac") {
        ctx.fillStyle = "#D6CCC2";
        ctx.fillRect(-8, -18, 16, 18);
        ctx.fillStyle = "#2B3044";
        ctx.fillRect(-6, -16, 12, 9);
      } else {
        ctx.fillStyle = "#2B3044";
        ctx.fillRect(-8, -22, 16, 22);
      }

      ctx.restore();
    });
  };

  useEffect(() => {
    renderMini();
  }, [placedItems, currentMood]);

  const referralUrl = `https://onroom.me/?ref=${encodeURIComponent(userNickname || "kobe")}_room`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    showToast("초대 링크가 복사되었습니다! 💌");
  };

  // 1080x1920 High-Res Instagram Story Export
  const downloadStoryCard = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 1920);
    grad.addColorStop(0, "#F9F8F5");
    grad.addColorStop(1, "#EDE7D8");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Decorative Header
    ctx.fillStyle = "#2B3044";
    ctx.font = "bold 34px monospace";
    ctx.fillText("ON:ROOM // MY PRIVATE SPACE", 90, 130);

    ctx.fillStyle = "#FF6B57";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("INVITE ONLY • EARLY ACCESS 2026", 90, 180);

    // Nickname & Mood
    ctx.fillStyle = "#2B3044";
    ctx.font = "bold 64px sans-serif";
    ctx.fillText(`${userNickname || "kobe"}의 감성 아지트`, 90, 310);

    ctx.fillStyle = "#676D82";
    ctx.font = "32px sans-serif";
    const moodKorean = currentMood === "sunset" ? "노을 핑크" : currentMood === "dawn" ? "새벽 앰버" : "정오의 햇살";
    ctx.fillText(`현재 무드: ${moodKorean}`, 90, 360);

    // Mini Room Canvas Scaled
    const mini = miniCanvasRef.current;
    if (mini) {
      ctx.save();
      ctx.shadowColor = "rgba(43, 48, 68, 0.25)";
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 20;
      ctx.drawImage(mini, 90, 440, 900, 900);
      ctx.restore();
    }

    // Bottom Referral Card
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.roundRect(90, 1460, 900, 300, 32);
    ctx.fill();
    ctx.strokeStyle = "rgba(43, 48, 68, 0.1)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // QR Box
    ctx.fillStyle = "#2B3044";
    ctx.fillRect(150, 1520, 180, 180);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(165, 1535, 150, 150);
    ctx.fillStyle = "#2B3044";
    ctx.font = "bold 24px monospace";
    ctx.fillText("QR CODE", 188, 1625);

    // Referral text
    ctx.fillStyle = "#2B3044";
    ctx.font = "bold 44px sans-serif";
    ctx.fillText("나만의 방으로 초대합니다", 370, 1590);

    ctx.fillStyle = "#FF6B57";
    ctx.font = "bold 34px monospace";
    ctx.fillText(referralUrl, 370, 1650);

    ctx.fillStyle = "#676D82";
    ctx.font = "26px sans-serif";
    ctx.fillText("사전 등록하고 1,500 페블 + 한정 램프 받기", 370, 1700);

    // Download
    const a = document.createElement("a");
    a.download = `onroom-${userNickname || "kobe"}-story.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();

    showToast("인스타 스토리 카드(1080×1920)가 저장되었습니다! 📸");
  };

  return (
    <section id="generator" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-gradient-to-br from-[#FAF8F2] to-[#EDE7D8] border border-white/80 rounded-3xl p-6 sm:p-12 shadow-[0_16px_40px_rgba(43,48,68,0.08)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Story Card Mockup (9:16) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-[260px] h-[460px] bg-white rounded-[32px] border-[7px] border-[#2B3044] shadow-2xl p-4 flex flex-col justify-between relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between text-[9px] font-extrabold text-[#2B3044] tracking-wider">
              <span>ON:ROOM // SPACE</span>
              <span className="bg-[#FF6B57] text-white px-1.5 py-0.5 rounded text-[8px]">INVITE ONLY</span>
            </div>

            {/* Room Visual */}
            <div className="flex-1 flex items-center justify-center my-2">
              <canvas
                ref={miniCanvasRef}
                width={260}
                height={260}
                className="w-full h-auto rounded-xl shadow-xs"
              />
            </div>

            {/* Footer */}
            <div className="bg-white/95 border border-[#2B3044]/10 rounded-xl p-2.5 flex items-center gap-2.5 shadow-sm">
              <div className="w-9 h-9 bg-[#2B3044] text-white text-[8px] font-mono flex items-center justify-center rounded">
                QR
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="text-[10px] font-extrabold text-[#2B3044] truncate">
                  {userNickname || "kobe"}의 감성 아지트
                </div>
                <div className="text-[8px] font-mono text-[#FF6B57] truncate">{referralUrl}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Generator Controls & Referral Engine */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-white/80 rounded-full px-4 py-1.5 shadow-sm text-xs font-extrabold text-[#2B3044] mb-3 self-start">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B57]" />
            <span>바이럴 루프 & 레퍼럴 보상</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-[#2B3044] tracking-tight mb-4">
            친구를 초대하고<br />한정판 카세트 테이프를 받으세요
          </h3>

          <p className="text-sm sm:text-base text-[#676D82] leading-relaxed mb-6">
            내가 꾸민 방을 인스타그램 스토리(1080×1920) 카드 규격으로 내려받아 공유해보세요. 
            내 추천 링크를 통해 3명이 사전 등록하면 <strong>시크릿 BGM 카세트 테이프</strong>를 100% 드립니다.
          </p>

          {/* Referral Link Box */}
          <div className="bg-white border border-[#2B3044]/15 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-3 mb-4 shadow-xs">
            <span className="text-xs font-mono font-bold text-[#2B3044] px-2 truncate">
              {referralUrl}
            </span>
            <button
              onClick={copyLink}
              className="bg-[#FEE589] hover:bg-[#FFE066] text-[#2B3044] text-xs font-extrabold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>링크 복사</span>
            </button>
          </div>

          {/* Download Button */}
          <button
            onClick={downloadStoryCard}
            className="w-full bg-[#2B3044] hover:bg-[#1B1E2B] text-white text-sm font-extrabold py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download className="w-4 h-4 text-[#FEE589]" />
            <span>인스타 스토리 카드 저장하기 (1080×1920 PNG)</span>
          </button>
        </div>
      </div>
    </section>
  );
}
