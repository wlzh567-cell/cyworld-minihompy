"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sun, Sunset, Moon, RotateCcw, Shuffle, Sparkles, Check } from "lucide-react";
import { showToast } from "./Toast";

export interface FurnitureItem {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export interface PlacedFurniture {
  id: string;
  x: number;
  y: number;
}

interface SandboxProps {
  onSaveRoom: (items: PlacedFurniture[]) => void;
  placedItems: PlacedFurniture[];
  setPlacedItems: React.Dispatch<React.SetStateAction<PlacedFurniture[]>>;
  currentMood: "noon" | "sunset" | "dawn";
  setCurrentMood: (mood: "noon" | "sunset" | "dawn") => void;
}

export const FURNITURE_LIST: FurnitureItem[] = [
  { id: "lamp", name: "플로어 스탠드", icon: "💡", category: "조명" },
  { id: "sofa", name: "패브릭 소파", icon: "🛋️", category: "가구" },
  { id: "turntable", name: "빈티지 턴테이블", icon: "📻", category: "사운드" },
  { id: "plant", name: "몬스테라 화분", icon: "🌿", category: "식물" },
  { id: "mac", name: "클래식 컴퓨터", icon: "🖥️", category: "데스크" },
  { id: "poster", name: "바우하우스 포스터", icon: "🖼️", category: "아트" },
];

export default function InteractiveSandbox({
  onSaveRoom,
  placedItems,
  setPlacedItems,
  currentMood,
  setCurrentMood,
}: SandboxProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedFurniture, setSelectedFurniture] = useState("lamp");
  const [hoverTile, setHoverTile] = useState<{ gx: number; gy: number } | null>(null);

  const TILE_W = 54;
  const TILE_H = 27;
  const GRID_SIZE = 8;

  const gridToIso = (gx: number, gy: number, ox: number, oy: number) => ({
    x: ox + (gx - gy) * (TILE_W / 2),
    y: oy + (gx + gy) * (TILE_H / 2),
  });

  const isoToGrid = (px: number, py: number, ox: number, oy: number) => {
    const dx = px - ox;
    const dy = py - oy;
    const gx = Math.floor((dy / (TILE_H / 2) + dx / (TILE_W / 2)) / 2);
    const gy = Math.floor((dy / (TILE_H / 2) - dx / (TILE_W / 2)) / 2);
    return { gx, gy };
  };

  const drawScene = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ox = canvas.width / 2;
    const oy = canvas.height / 2 - 45;

    // Walls
    const topCorner = gridToIso(0, 0, ox, oy);
    const leftCorner = gridToIso(0, GRID_SIZE, ox, oy);
    const rightCorner = gridToIso(GRID_SIZE, 0, ox, oy);
    const wallH = 110;

    // Left Wall
    ctx.fillStyle = currentMood === "dawn" ? "#25293A" : currentMood === "sunset" ? "#E8CFCE" : "#EAE6DB";
    ctx.beginPath();
    ctx.moveTo(topCorner.x, topCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y - wallH);
    ctx.lineTo(topCorner.x, topCorner.y - wallH);
    ctx.closePath();
    ctx.fill();

    // Right Wall
    ctx.fillStyle = currentMood === "dawn" ? "#32374E" : currentMood === "sunset" ? "#F4DCDA" : "#F4F0E6";
    ctx.beginPath();
    ctx.moveTo(topCorner.x, topCorner.y);
    ctx.lineTo(rightCorner.x, rightCorner.y);
    ctx.lineTo(rightCorner.x, rightCorner.y - wallH);
    ctx.lineTo(topCorner.x, topCorner.y - wallH);
    ctx.closePath();
    ctx.fill();

    // Floor Tiles
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

        if (hoverTile && hoverTile.gx === x && hoverTile.gy === y) {
          ctx.fillStyle = "rgba(255, 107, 87, 0.45)";
        }

        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(pt.x + TILE_W / 2, pt.y + TILE_H / 2);
        ctx.lineTo(pt.x, pt.y + TILE_H);
        ctx.lineTo(pt.x - TILE_W / 2, pt.y + TILE_H / 2);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = currentMood === "dawn" ? "rgba(255,255,255,0.06)" : "rgba(43,48,68,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Depth Sorting
    const sorted = [...placedItems].sort((a, b) => a.x + a.y - (b.x + b.y));
    sorted.forEach((item) => {
      drawObject(ctx, item.id, item.x, item.y, ox, oy);
    });
  };

  const drawObject = (
    ctx: CanvasRenderingContext2D,
    id: string,
    gx: number,
    gy: number,
    ox: number,
    oy: number
  ) => {
    const pt = gridToIso(gx, gy, ox, oy);
    const cx = pt.x;
    const cy = pt.y + TILE_H / 2;

    ctx.save();
    ctx.translate(cx, cy);

    // Shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    ctx.beginPath();
    ctx.ellipse(0, 4, 18, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    switch (id) {
      case "lamp":
        ctx.fillStyle = "#C29B38";
        ctx.fillRect(-2, -50, 4, 50);
        ctx.fillStyle = "#FFE589";
        ctx.beginPath();
        ctx.arc(0, -50, 14, Math.PI, 0);
        ctx.fill();
        ctx.fillStyle = "rgba(254, 229, 137, 0.35)";
        ctx.beginPath();
        ctx.arc(0, -45, 26, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "sofa":
        ctx.fillStyle = "#7D968B";
        ctx.beginPath();
        ctx.roundRect(-22, -26, 44, 26, 6);
        ctx.fill();
        ctx.fillStyle = "#587065";
        ctx.beginPath();
        ctx.roundRect(-20, -18, 40, 16, 4);
        ctx.fill();
        break;

      case "turntable":
        ctx.fillStyle = "#9C6644";
        ctx.beginPath();
        ctx.roundRect(-16, -16, 32, 18, 3);
        ctx.fill();
        ctx.fillStyle = "#111";
        ctx.beginPath();
        ctx.arc(-4, -8, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FF6B57";
        ctx.beginPath();
        ctx.arc(-4, -8, 3, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "plant":
        ctx.fillStyle = "#E6CCB2";
        ctx.fillRect(-10, -14, 20, 14);
        ctx.fillStyle = "#386641";
        ctx.beginPath();
        ctx.arc(-6, -24, 9, 0, Math.PI * 2);
        ctx.arc(6, -26, 11, 0, Math.PI * 2);
        ctx.arc(0, -32, 10, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "mac":
        ctx.fillStyle = "#D6CCC2";
        ctx.beginPath();
        ctx.roundRect(-12, -26, 24, 26, 4);
        ctx.fill();
        ctx.fillStyle = "#2B3044";
        ctx.fillRect(-9, -23, 18, 14);
        ctx.fillStyle = "#4ADE80";
        ctx.fillRect(-6, -18, 6, 2);
        break;

      case "poster":
        ctx.fillStyle = "#2B3044";
        ctx.fillRect(-12, -32, 24, 32);
        ctx.fillStyle = "#FF6B57";
        ctx.beginPath();
        ctx.arc(0, -18, 7, 0, Math.PI * 2);
        ctx.fill();
        break;
    }

    ctx.restore();
  };

  useEffect(() => {
    drawScene();
  }, [placedItems, currentMood, hoverTile]);

  const handlePointer = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const isTouch = "touches" in e;
    const clientX = isTouch ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = isTouch ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const px = (clientX - rect.left) * scaleX;
    const py = (clientY - rect.top) * scaleY;

    const ox = canvas.width / 2;
    const oy = canvas.height / 2 - 45;
    const { gx, gy } = isoToGrid(px, py, ox, oy);

    if (gx >= 0 && gx < GRID_SIZE && gy >= 0 && gy < GRID_SIZE) {
      setHoverTile({ gx, gy });
    } else {
      setHoverTile(null);
    }
  };

  const handlePlace = () => {
    if (!hoverTile) return;
    const { gx, gy } = hoverTile;

    setPlacedItems((prev) => {
      const filtered = prev.filter((item) => !(item.x === gx && item.y === gy));
      return [...filtered, { id: selectedFurniture, x: gx, y: gy }];
    });

    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(15);
    }

    showToast("가구가 타일에 배치되었습니다!");
  };

  const handleReset = () => {
    setPlacedItems([]);
    showToast("방이 초기화되었습니다.");
  };

  const handleRandomize = () => {
    setPlacedItems([
      { id: "lamp", x: Math.floor(Math.random() * 6), y: Math.floor(Math.random() * 6) },
      { id: "sofa", x: 2, y: 5 },
      { id: "turntable", x: 5, y: 2 },
      { id: "plant", x: 6, y: 6 },
      { id: "mac", x: 4, y: 4 },
    ]);
    showToast("감성 배치가 추천되었습니다 ✨");
  };

  return (
    <section id="sandbox" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-white/80 rounded-full px-4 py-1.5 shadow-sm text-xs font-extrabold text-[#2B3044] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B57]" />
          <span>무설치 즉각 플레이 인터랙션</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2B3044] tracking-tight mb-3">
          감각적인 나만의 룸 미리 꾸미기
        </h2>
        <p className="text-[#676D82] text-sm sm:text-base">
          가구를 선택하고 타일을 클릭하여 배치해보세요. 조명 필터를 변경하고 완성된 방을 간직할 수 있습니다.
        </p>
      </div>

      {/* Main Sandbox Box */}
      <div className="bg-white/85 backdrop-blur-2xl border border-white/80 rounded-3xl p-5 sm:p-8 shadow-[0_16px_40px_rgba(43,48,68,0.08)]">
        {/* Top Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Mood Filters */}
          <div className="flex items-center bg-[#2B3044]/5 p-1 rounded-full">
            <button
              onClick={() => {
                setCurrentMood("noon");
                showToast("정오의 햇살 필터 적용 ☀️");
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentMood === "noon" ? "bg-white text-[#2B3044] shadow-sm" : "text-[#676D82]"
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>정오의 햇살</span>
            </button>
            <button
              onClick={() => {
                setCurrentMood("sunset");
                showToast("노을 핑크 필터 적용 🌇");
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentMood === "sunset" ? "bg-white text-[#2B3044] shadow-sm" : "text-[#676D82]"
              }`}
            >
              <Sunset className="w-3.5 h-3.5 text-rose-500" />
              <span>노을 핑크</span>
            </button>
            <button
              onClick={() => {
                setCurrentMood("dawn");
                showToast("새벽 앰버 필터 적용 🌙");
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentMood === "dawn" ? "bg-white text-[#2B3044] shadow-sm" : "text-[#676D82]"
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span>새벽 앰버</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 bg-white hover:bg-neutral-50 border border-[#2B3044]/10 text-xs font-bold text-[#676D82] px-4 py-2 rounded-full transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>방 비우기</span>
            </button>
            <button
              onClick={handleRandomize}
              className="flex items-center gap-1.5 bg-white hover:bg-[#FEE589]/50 border border-[#2B3044]/10 text-xs font-bold text-[#2B3044] px-4 py-2 rounded-full transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#FF6B57]" />
              <span>자동 추천</span>
            </button>
          </div>
        </div>

        {/* Isometric Canvas Stage with touch-action: none */}
        <div className="relative w-full h-[380px] sm:h-[480px] bg-gradient-to-br from-[#FCFBF7] to-[#EDE8DB] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center touch-none">
          <canvas
            ref={canvasRef}
            width={800}
            height={480}
            onMouseMove={handlePointer}
            onMouseLeave={() => setHoverTile(null)}
            onClick={handlePlace}
            onTouchMove={handlePointer}
            onTouchEnd={handlePlace}
            className="w-full h-full block cursor-grab active:cursor-grabbing"
          />
          <div className="absolute top-4 left-4 bg-[#2B3044]/75 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-full pointer-events-none">
            8×8 ISOMETRIC STAGE
          </div>
        </div>

        {/* Furniture Item Deck */}
        <div className="mt-6">
          <div className="text-xs font-extrabold text-[#676D82] uppercase tracking-wider mb-3">
            배치할 모던 오브제 선택 (클릭 후 타일에 안착)
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
            {FURNITURE_LIST.map((item) => {
              const isSelected = selectedFurniture === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedFurniture(item.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all transform hover:-translate-y-1 ${
                    isSelected
                      ? "bg-[#FFF8F6] border-[#FF6B57] shadow-[0_4px_14px_rgba(255,107,87,0.25)] ring-2 ring-[#FF6B57]/20"
                      : "bg-white border-[#2B3044]/10 hover:border-[#FF6B57]"
                  }`}
                >
                  <span className="text-2xl sm:text-3xl mb-1">{item.icon}</span>
                  <span className="text-xs font-extrabold text-[#2B3044] whitespace-nowrap">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-bold text-[#587065] bg-[#EBF1EE] px-1.5 py-0.5 rounded mt-1">
                    {item.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="mt-8 bg-gradient-to-r from-[#FFF6F3] to-[#FFF0EC] border border-[#FF6B57]/20 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-extrabold text-[#2B3044]">
              ✨ 내가 꾸민 이 방 그대로 입주할 준비 되셨나요?
            </h4>
            <p className="text-xs sm:text-sm text-[#676D82] mt-0.5">
              방 구조를 저장하고 사전 등록을 마치면 런칭 시 그대로 생성됩니다.
            </p>
          </div>
          <button
            onClick={() => onSaveRoom(placedItems)}
            className="w-full sm:w-auto bg-[#FF6B57] hover:bg-[#E85542] text-white text-sm font-extrabold px-6 py-3.5 rounded-full shadow-[0_6px_20px_rgba(255,107,87,0.35)] transition-all whitespace-nowrap"
          >
            이 방 저장하고 내 방 개설하러 가기 ➔
          </button>
        </div>
      </div>
    </section>
  );
}
