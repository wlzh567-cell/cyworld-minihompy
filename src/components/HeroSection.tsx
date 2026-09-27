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

  // Draw Hero 2.5D Isometric Room Canvas (Cyworld Scale)
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
      const oy = h / 2 - 45 + Math.sin(angle) * 7; // gentle levitation

      // Isometric Walls (High-ceiling Cyworld Miniroom)
      const wallHeight = 150;
      const tileW = 58;
      const tileH = 29;
      const size = 7;

      // Projection
      const topX = ox;
      const topY = oy;
      const leftX = ox - (size * tileW) / 2;
      const leftY = oy + (size * tileH) / 2;
      const rightX = ox + (size * tileW) / 2;
      const rightY = oy + (size * tileH) / 2;

      // Left Wall
      ctx.fillStyle = "#EAE6DC";
      ctx.beginPath();
      ctx.moveTo(topX, topY);
      ctx.lineTo(leftX, leftY);
      ctx.lineTo(leftX, leftY - wallHeight);
      ctx.lineTo(topX, topY - wallHeight);
      ctx.closePath();
      ctx.fill();

      // Right Wall
      ctx.fillStyle = "#F5F1E6";
      ctx.beginPath();
      ctx.moveTo(topX, topY);
      ctx.lineTo(rightX, rightY);
      ctx.lineTo(rightX, rightY - wallHeight);
      ctx.lineTo(topX, topY - wallHeight);
      ctx.closePath();
      ctx.fill();

      // Baseboard Molding
      ctx.fillStyle = "#D7D1C2";
      ctx.beginPath();
      ctx.moveTo(topX, topY);
      ctx.lineTo(leftX, leftY);
      ctx.lineTo(leftX, leftY - 8);
      ctx.lineTo(topX, topY - 8);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#E1DBD0";
      ctx.beginPath();
      ctx.moveTo(topX, topY);
      ctx.lineTo(rightX, rightY);
      ctx.lineTo(rightX, rightY - 8);
      ctx.lineTo(topX, topY - 8);
      ctx.closePath();
      ctx.fill();

      // Scenic Sky Window on Left Wall
      const winX = topX - 110;
      const winY = topY - 120;
      const winW = 55;
      const winH = 75;

      const skyGrad = ctx.createLinearGradient(winX, winY, winX, winY + winH);
      skyGrad.addColorStop(0, "#74B9FF");
      skyGrad.addColorStop(0.7, "#A1C4FD");
      skyGrad.addColorStop(1, "#E8F0FE");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(winX, winY, winW, winH);

      // Warm Sun in Window
      ctx.fillStyle = "#FEE589";
      ctx.beginPath();
      ctx.arc(winX + 35, winY + 28, 11, 0, Math.PI * 2);
      ctx.fill();

      // Window Frame
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 4;
      ctx.strokeRect(winX, winY, winW, winH);

      // Floor Grid (Parquet Oak)
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          const px = ox + (x - y) * (tileW / 2);
          const py = oy + (x + y) * (tileH / 2);

          ctx.fillStyle = (x + y) % 2 === 0 ? "#FAF7F0" : "#F1EDE1";
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
      // 1. Sage Curved Lounge Sofa
      const sofaX = ox - 20;
      const sofaY = oy + 85;
      ctx.fillStyle = "rgba(32,36,51,0.12)";
      ctx.beginPath();
      ctx.ellipse(sofaX, sofaY + 4, 30, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#738C82";
      ctx.beginPath();
      ctx.roundRect(sofaX - 28, sofaY - 32, 56, 32, 10);
      ctx.fill();
      ctx.fillStyle = "#5E776D";
      ctx.beginPath();
      ctx.roundRect(sofaX - 25, sofaY - 16, 50, 16, 6);
      ctx.fill();
      // Cushion
      ctx.fillStyle = "#FEE589";
      ctx.beginPath();
      ctx.roundRect(sofaX - 20, sofaY - 26, 12, 14, 3);
      ctx.fill();

      // 2. Mid-century Brass Lamp
      const lampX = ox - 75;
      const lampY = oy + 45;
      ctx.fillStyle = "rgba(32,36,51,0.1)";
      ctx.beginPath();
      ctx.ellipse(lampX, lampY + 3, 16, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#B38728";
      ctx.fillRect(lampX - 2, lampY - 65, 4, 65);
      ctx.fillStyle = "#FEE589";
      ctx.beginPath();
      ctx.arc(lampX + 8, lampY - 62, 15, Math.PI, 0);
      ctx.fill();

      if (lightOn) {
        ctx.fillStyle = "rgba(254, 229, 137, 0.45)";
        ctx.beginPath();
        ctx.arc(lampX + 8, lampY - 60, 36, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Vintage Turntable
      const turnX = ox + 50;
      const turnY = oy + 60;
      ctx.fillStyle = "#6B4226";
      ctx.beginPath();
      ctx.roundRect(turnX - 20, turnY - 18, 40, 20, 4);
      ctx.fill();
      // Vinyl record
      ctx.fillStyle = "#18181B";
      ctx.beginPath();
      ctx.ellipse(turnX - 4, turnY - 8, 10, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#FF6B57";
      ctx.beginPath();
      ctx.ellipse(turnX - 4, turnY - 8, 4, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // 4. Monstera Plant in Ceramic Pot
      const plantX = ox + 80;
      const plantY = oy + 105;
      ctx.fillStyle = "#E7D6C4";
      ctx.beginPath();
      ctx.roundRect(plantX - 10, plantY - 16, 20, 16, 4);
      ctx.fill();
      ctx.fillStyle = "#2D6A4F";
      ctx.beginPath();
      ctx.arc(plantX - 5, plantY - 24, 11, 0, Math.PI * 2);
      ctx.arc(plantX + 5, plantY - 26, 12, 0, Math.PI * 2);
      ctx.arc(plantX, plantY - 32, 11, 0, Math.PI * 2);
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
          <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl border border-white/70 rounded-3xl p-5 sm:p-6 shadow-[0_12px_32px_rgba(43,48,68,0.08)]">
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
                  className="inline-flex items-center gap-1.5 bg-[#FEE500] text-[#191919] font-bold px-3.5 py-1.5 rounded-xl hover:brightness-95 transition-all text-[11px] shadow-xs"
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
                  className="inline-flex items-center gap-1.5 bg-black text-white font-bold px-3.5 py-1.5 rounded-xl hover:bg-neutral-800 transition-all text-[11px] shadow-xs"
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
          <div className="relative w-full max-w-lg bg-white/80 backdrop-blur-2xl border border-white/70 rounded-[32px] p-5 shadow-[0_20px_50px_rgba(43,48,68,0.12)]">
            {/* Top Indicator */}
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></span>
                <span className="text-[11px] font-mono font-bold text-[#2B3044]">CYWORLD MINIROOM 2.5D</span>
              </div>
              <button
                onClick={() => {
                  setLightOn(!lightOn);
                  showToast(lightOn ? "스탠드 조명을 껐습니다." : "스탠드 조명을 켰습니다.");
                }}
                className="text-[10px] font-bold bg-[#EBF1EE] hover:bg-[#FEE589] text-[#2B3044] px-3 py-1 rounded-full transition-colors flex items-center gap-1 shadow-xs"
              >
                <Sparkles className="w-3 h-3 text-[#FF6B57]" />
                <span>조명 {lightOn ? "끄기" : "켜기"}</span>
              </button>
            </div>

            {/* Canvas */}
            <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#F0ECE1] overflow-hidden shadow-inner flex items-center justify-center relative cursor-pointer"
                 onClick={() => setLightOn(!lightOn)}>
              <canvas ref={canvasRef} width={480} height={480} className="w-full h-full block" />
              <div className="absolute bottom-3 left-3 bg-[#2B3044]/80 backdrop-blur-md text-white text-[10px] font-mono px-3 py-1 rounded-full pointer-events-none shadow-sm">
                CLICK ROOM TO INTERACT
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
