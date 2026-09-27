"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, MessageCircle, Apple } from "lucide-react";
import { showToast } from "./Toast";

interface HeroSectionProps {
  onOpenPreReg: (contact?: string) => void;
}

export default function HeroSection({ onOpenPreReg }: HeroSectionProps) {
  const [contact, setContact] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lightOn, setLightOn] = useState(true);

  // Draw Hero 2.5D Isometric Room Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const ox = w / 2;
      const oy = h / 2 - 30 + Math.sin(angle) * 6; // gentle levitation

      // Isometric Walls
      const wallHeight = 110;
      const tileW = 50;
      const tileH = 25;
      const size = 6;

      // Projection
      const topX = ox;
      const topY = oy;
      const leftX = ox - (size * tileW) / 2;
      const leftY = oy + (size * tileH) / 2;
      const rightX = ox + (size * tileW) / 2;
      const rightY = oy + (size * tileH) / 2;
      const botX = ox;
      const botY = oy + size * tileH;

      // Left Wall
      ctx.fillStyle = "#EAE6DB";
      ctx.beginPath();
      ctx.moveTo(topX, topY);
      ctx.lineTo(leftX, leftY);
      ctx.lineTo(leftX, leftY - wallHeight);
      ctx.lineTo(topX, topY - wallHeight);
      ctx.closePath();
      ctx.fill();

      // Right Wall
      ctx.fillStyle = "#F4F0E6";
      ctx.beginPath();
      ctx.moveTo(topX, topY);
      ctx.lineTo(rightX, rightY);
      ctx.lineTo(rightX, rightY - wallHeight);
      ctx.lineTo(topX, topY - wallHeight);
      ctx.closePath();
      ctx.fill();

      // Wall Poster
      ctx.fillStyle = "#FF6B57";
      ctx.fillRect(topX + 18, topY - 80, 32, 42);
      ctx.fillStyle = "#FEE589";
      ctx.beginPath();
      ctx.arc(topX + 34, topY - 58, 8, 0, Math.PI * 2);
      ctx.fill();

      // Floor Grid
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          const px = ox + (x - y) * (tileW / 2);
          const py = oy + (x + y) * (tileH / 2);

          ctx.fillStyle = (x + y) % 2 === 0 ? "#FAF8F2" : "#F0ECE1";
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + tileW / 2, py + tileH / 2);
          ctx.lineTo(px, py + tileH);
          ctx.lineTo(px - tileW / 2, py + tileH / 2);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = "rgba(43,48,68,0.06)";
          ctx.stroke();
        }
      }

      // Isometric Furniture
      // 1. Sofa
      const sofaX = ox - 25;
      const sofaY = oy + 65;
      ctx.fillStyle = "#7D968B";
      ctx.beginPath();
      ctx.roundRect(sofaX - 22, sofaY - 24, 44, 24, 6);
      ctx.fill();
      ctx.fillStyle = "#587065";
      ctx.beginPath();
      ctx.roundRect(sofaX - 20, sofaY - 18, 40, 16, 4);
      ctx.fill();

      // 2. Brass Lamp
      const lampX = ox - 55;
      const lampY = oy + 35;
      ctx.fillStyle = "#C29B38";
      ctx.fillRect(lampX - 1.5, lampY - 48, 3, 48);
      ctx.fillStyle = "#FEE589";
      ctx.beginPath();
      ctx.arc(lampX, lampY - 48, 12, Math.PI, 0);
      ctx.fill();

      if (lightOn) {
        ctx.fillStyle = "rgba(254, 229, 137, 0.35)";
        ctx.beginPath();
        ctx.arc(lampX, lampY - 44, 26, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Vintage Turntable
      const turnX = ox + 40;
      const turnY = oy + 45;
      ctx.fillStyle = "#9C6644";
      ctx.beginPath();
      ctx.roundRect(turnX - 16, turnY - 14, 32, 16, 3);
      ctx.fill();
      // Record
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.arc(turnX - 4, turnY - 6, 7, 0, Math.PI * 2);
      ctx.fill();

      // 4. Plant
      const plantX = ox + 65;
      const plantY = oy + 75;
      ctx.fillStyle = "#E6CCB2";
      ctx.fillRect(plantX - 8, plantY - 12, 16, 12);
      ctx.fillStyle = "#386641";
      ctx.beginPath();
      ctx.arc(plantX - 4, plantY - 18, 7, 0, Math.PI * 2);
      ctx.arc(plantX + 4, plantY - 20, 8, 0, Math.PI * 2);
      ctx.arc(plantX, plantY - 24, 7, 0, Math.PI * 2);
      ctx.fill();

      angle += 0.025;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [lightOn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    onOpenPreReg(contact);
  };

  return (
    <section className="pt-8 sm:pt-14 pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Copy & Fast Conversion Form */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-white/80 rounded-full px-4 py-1.5 shadow-sm text-xs font-extrabold text-[#2B3044] mb-5">
            <span className="w-2 h-2 rounded-full bg-[#FF6B57] animate-pulse"></span>
            <span>2026 차세대 감성 소셜 룸 플랫폼</span>
          </div>

          {/* Subcopy & Headline */}
          <h2 className="text-[#587065] text-sm sm:text-base font-extrabold tracking-tight mb-2">
            복잡한 피드에서 벗어나, 온전히 나로 머무는 곳
          </h2>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#2B3044] tracking-tight leading-[1.18] mb-6">
            취향과 온기가 켜지는<br />
            나만의 디지털 방,{" "}
            <span className="relative inline-block text-[#FF6B57]">
              ON:ROOM
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FEE589] -z-10 opacity-70 rounded"></span>
            </span>
          </h1>

          <p className="text-[#676D82] text-sm sm:text-base leading-relaxed max-w-xl mb-8">
            과도한 &apos;좋아요&apos; 경쟁과 피로감을 뒤로하고, 미드센추리 가구와 따뜻한 Lo-Fi 사운드로 채우는 감각적인 디지털 아지트. 
            지금 사전 예약에 참여하고 <strong>한정판 빈티지 램프 & 1,500 페블</strong>을 100% 획득하세요.
          </p>

          {/* Fast CTA Card */}
          <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl border border-white/70 rounded-2xl p-5 sm:p-6 shadow-[0_12px_32px_rgba(43,48,68,0.08)]">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 mb-4">
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="전화번호 또는 이메일 입력"
                className="flex-1 bg-white border border-[#2B3044]/15 rounded-xl px-4 py-3.5 text-sm text-[#2B3044] placeholder:text-[#9FA4B8] focus:outline-none focus:border-[#FF6B57] focus:ring-2 focus:ring-[#FF6B57]/15 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-[#FF6B57] hover:bg-[#E85542] text-white text-sm font-extrabold px-6 py-3.5 rounded-xl shadow-[0_6px_18px_rgba(255,107,87,0.35)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              >
                <span>사전 등록하고 한정 룸 받기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3.5 border-t border-[#2B3044]/10 text-xs text-[#676D82]">
              <span className="font-medium">3초 컷 원클릭 사전 예약</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast("카카오 간편 가입이 연동되었습니다!");
                    onOpenPreReg();
                  }}
                  className="inline-flex items-center gap-1.5 bg-[#FEE500] text-[#191919] font-bold px-3 py-1.5 rounded-lg hover:brightness-95 transition-all text-[11px]"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>카카오 1초 등록</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast("Apple 간편 가입이 연동되었습니다!");
                    onOpenPreReg();
                  }}
                  className="inline-flex items-center gap-1.5 bg-black text-white font-bold px-3 py-1.5 rounded-lg hover:bg-neutral-800 transition-all text-[11px]"
                >
                  <Apple className="w-3.5 h-3.5 fill-current" />
                  <span>Apple 간편 등록</span>
                </button>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3 mt-6 text-xs text-[#676D82]">
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80')] bg-cover"></div>
              <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-[url('https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80')] bg-cover"></div>
              <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80')] bg-cover"></div>
            </div>
            <span>
              🔥 이미 <strong className="text-[#2B3044]">74,820명</strong>의 입주자가 나만의 방을 준비하고 있습니다.
            </span>
          </div>
        </div>

        {/* Right Column: Interactive 2.5D Isometric Room Visual */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md bg-white/80 backdrop-blur-2xl border border-white/70 rounded-3xl p-5 shadow-[0_20px_50px_rgba(43,48,68,0.12)]">
            {/* Top Indicator */}
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></span>
                <span className="text-[11px] font-mono font-bold text-[#2B3044]">2.5D LIVE PREVIEW</span>
              </div>
              <button
                onClick={() => {
                  setLightOn(!lightOn);
                  showToast(lightOn ? "스탠드 조명을 껐습니다." : "스탠드 조명을 켰습니다.");
                }}
                className="text-[10px] font-bold bg-[#EBF1EE] hover:bg-[#FEE589] text-[#2B3044] px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-[#FF6B57]" />
                <span>조명 {lightOn ? "끄기" : "켜기"}</span>
              </button>
            </div>

            {/* Canvas */}
            <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#F0ECE1] overflow-hidden shadow-inner flex items-center justify-center relative cursor-pointer"
                 onClick={() => setLightOn(!lightOn)}>
              <canvas ref={canvasRef} width={420} height={420} className="w-full h-full block" />
              <div className="absolute bottom-3 left-3 bg-[#2B3044]/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full pointer-events-none">
                CLICK ROOM TO INTERACT
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
