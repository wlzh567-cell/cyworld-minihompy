"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Sun,
  Sunset,
  Moon,
  RotateCcw,
  Shuffle,
  Sparkles,
  Lamp,
  Armchair,
  Disc3,
  Sprout,
  Monitor,
  Palette,
  Maximize2,
} from "lucide-react";
import { showToast } from "./Toast";

export interface FurnitureItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  gradient: string;
  iconBg: string;
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

export const TOSS_APPLE_FURNITURE: (FurnitureItem & { icon: React.ReactNode })[] = [
  {
    id: "lamp",
    name: "미드센추리 플로어 램프",
    category: "조명",
    badge: "LIGHT",
    gradient: "from-amber-400/20 to-orange-400/20",
    iconBg: "bg-gradient-to-tr from-amber-500 to-orange-400 text-white shadow-amber-500/30",
    icon: <Lamp className="w-5 h-5" />,
  },
  {
    id: "sofa",
    name: "세이지 패브릭 라운지 소파",
    category: "가구",
    badge: "LIVING",
    gradient: "from-emerald-400/20 to-teal-400/20",
    iconBg: "bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-500/30",
    icon: <Armchair className="w-5 h-5" />,
  },
  {
    id: "turntable",
    name: "아날로그 바이닐 턴테이블",
    category: "사운드",
    badge: "AUDIO",
    gradient: "from-rose-400/20 to-pink-400/20",
    iconBg: "bg-gradient-to-tr from-[#FF6B57] to-rose-400 text-white shadow-rose-500/30",
    icon: <Disc3 className="w-5 h-5" />,
  },
  {
    id: "plant",
    name: "대형 몬스테라 테라코타",
    category: "보태니컬",
    badge: "PLANT",
    gradient: "from-green-400/20 to-lime-400/20",
    iconBg: "bg-gradient-to-tr from-green-600 to-emerald-400 text-white shadow-green-500/30",
    icon: <Sprout className="w-5 h-5" />,
  },
  {
    id: "mac",
    name: "레트로 매킨토시 워크스테이션",
    category: "데스크",
    badge: "DESK",
    gradient: "from-slate-400/20 to-indigo-400/20",
    iconBg: "bg-gradient-to-tr from-[#2B3044] to-slate-600 text-white shadow-slate-500/30",
    icon: <Monitor className="w-5 h-5" />,
  },
  {
    id: "poster",
    name: "바우하우스 지오메트릭 액자",
    category: "아트",
    badge: "ART",
    gradient: "from-indigo-400/20 to-purple-400/20",
    iconBg: "bg-gradient-to-tr from-indigo-600 to-purple-500 text-white shadow-indigo-500/30",
    icon: <Palette className="w-5 h-5" />,
  },
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

  // Large Cyworld-scale Room Geometry
  const TILE_W = 76;
  const TILE_H = 38;
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
    const oy = canvas.height / 2 - 70;

    // Outer Room Shadow / Glow
    const topCorner = gridToIso(0, 0, ox, oy);
    const leftCorner = gridToIso(0, GRID_SIZE, ox, oy);
    const rightCorner = gridToIso(GRID_SIZE, 0, ox, oy);
    const bottomCorner = gridToIso(GRID_SIZE, GRID_SIZE, ox, oy);
    const wallH = 175; // Tall, spacious room walls

    // 1. Ambient Background Wall drop shadow
    ctx.save();
    ctx.shadowColor = "rgba(43, 48, 68, 0.12)";
    ctx.shadowBlur = 35;
    ctx.shadowOffsetY = 15;

    // Left Wall Fill
    ctx.fillStyle = currentMood === "dawn" ? "#232738" : currentMood === "sunset" ? "#EAD3D0" : "#ECE7DC";
    ctx.beginPath();
    ctx.moveTo(topCorner.x, topCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y - wallH);
    ctx.lineTo(topCorner.x, topCorner.y - wallH);
    ctx.closePath();
    ctx.fill();

    // Right Wall Fill
    ctx.fillStyle = currentMood === "dawn" ? "#2E344A" : currentMood === "sunset" ? "#F5DDD8" : "#F6F2E8";
    ctx.beginPath();
    ctx.moveTo(topCorner.x, topCorner.y);
    ctx.lineTo(rightCorner.x, rightCorner.y);
    ctx.lineTo(rightCorner.x, rightCorner.y - wallH);
    ctx.lineTo(topCorner.x, topCorner.y - wallH);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 2. Baseboard Moldings (Cyworld Realism Detail)
    ctx.fillStyle = currentMood === "dawn" ? "#1A1D2B" : "#DDD7C8";
    // Left baseboard
    ctx.beginPath();
    ctx.moveTo(topCorner.x, topCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y - 12);
    ctx.lineTo(topCorner.x, topCorner.y - 12);
    ctx.closePath();
    ctx.fill();
    // Right baseboard
    ctx.fillStyle = currentMood === "dawn" ? "#222738" : "#E4DEC8";
    ctx.beginPath();
    ctx.moveTo(topCorner.x, topCorner.y);
    ctx.lineTo(rightCorner.x, rightCorner.y);
    ctx.lineTo(rightCorner.x, rightCorner.y - 12);
    ctx.lineTo(topCorner.x, topCorner.y - 12);
    ctx.closePath();
    ctx.fill();

    // 3. Wall Window (Scenic View Out The Window)
    const winX = topCorner.x - 170;
    const winY = topCorner.y - 145;
    const winW = 85;
    const winH = 110;

    // Window Sky Gradient
    const skyGrad = ctx.createLinearGradient(winX, winY, winX, winY + winH);
    if (currentMood === "sunset") {
      skyGrad.addColorStop(0, "#FF7E5F");
      skyGrad.addColorStop(0.6, "#FEB47B");
      skyGrad.addColorStop(1, "#FFECCC");
    } else if (currentMood === "dawn") {
      skyGrad.addColorStop(0, "#0F2027");
      skyGrad.addColorStop(0.5, "#203A43");
      skyGrad.addColorStop(1, "#2C5364");
    } else {
      skyGrad.addColorStop(0, "#70A1FF");
      skyGrad.addColorStop(0.7, "#A1C4FD");
      skyGrad.addColorStop(1, "#E0C3FC");
    }

    ctx.fillStyle = skyGrad;
    ctx.fillRect(winX, winY, winW, winH);

    // Sun / Moon in window
    if (currentMood === "dawn") {
      ctx.fillStyle = "#FFF9D2";
      ctx.beginPath();
      ctx.arc(winX + 26, winY + 30, 9, 0, Math.PI * 2);
      ctx.fill();
    } else if (currentMood === "sunset") {
      ctx.fillStyle = "#FF5252";
      ctx.beginPath();
      ctx.arc(winX + 44, winY + 70, 18, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "#FFF176";
      ctx.beginPath();
      ctx.arc(winX + 45, winY + 32, 14, 0, Math.PI * 2);
      ctx.fill();
    }

    // Window Wooden Frame
    ctx.strokeStyle = currentMood === "dawn" ? "#3A4259" : "#FFFFFF";
    ctx.lineWidth = 6;
    ctx.strokeRect(winX, winY, winW, winH);
    // Window Cross divider
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(winX + winW / 2, winY);
    ctx.lineTo(winX + winW / 2, winY + winH);
    ctx.moveTo(winX, winY + winH / 2);
    ctx.lineTo(winX + winW, winY + winH / 2);
    ctx.stroke();

    // 4. Stately Cyworld Wood / Tile Floor Grid
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        const pt = gridToIso(x, y, ox, oy);
        const isAlt = (x + y) % 2 === 0;

        if (currentMood === "dawn") {
          ctx.fillStyle = isAlt ? "#282E42" : "#323952";
        } else if (currentMood === "sunset") {
          ctx.fillStyle = isAlt ? "#FBE6E0" : "#F6DCD4";
        } else {
          // Warm Parquet Oak Wood Pattern
          ctx.fillStyle = isAlt ? "#FAF7F0" : "#F1EDE1";
        }

        // Hover Tile Glow
        if (hoverTile && hoverTile.gx === x && hoverTile.gy === y) {
          ctx.fillStyle = "rgba(255, 107, 87, 0.5)";
        }

        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(pt.x + TILE_W / 2, pt.y + TILE_H / 2);
        ctx.lineTo(pt.x, pt.y + TILE_H);
        ctx.lineTo(pt.x - TILE_W / 2, pt.y + TILE_H / 2);
        ctx.closePath();
        ctx.fill();

        // Delicate tile bevel border
        ctx.strokeStyle = currentMood === "dawn" ? "rgba(255,255,255,0.05)" : "rgba(43,48,68,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // 5. Depth-Sorted Furniture Rendering
    const sorted = [...placedItems].sort((a, b) => a.x + a.y - (b.x + b.y));
    sorted.forEach((item) => {
      drawHighEndObject(ctx, item.id, item.x, item.y, ox, oy);
    });
  };

  // High-End Rendered Furniture with Apple/Toss Detail
  const drawHighEndObject = (
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

    // 1. Soft Multi-layered Shadow
    ctx.fillStyle = "rgba(32, 36, 51, 0.14)";
    ctx.beginPath();
    ctx.ellipse(0, 6, 26, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    switch (id) {
      case "lamp":
        // Floor Light Cone on ground
        ctx.fillStyle = "rgba(254, 229, 137, 0.28)";
        ctx.beginPath();
        ctx.ellipse(0, 4, 38, 18, 0, 0, Math.PI * 2);
        ctx.fill();

        // Brass Base & Pole
        ctx.fillStyle = "#B38728";
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(-2, -74, 4, 74);

        // Arch curve
        ctx.beginPath();
        ctx.arc(8, -74, 12, Math.PI, Math.PI * 1.5);
        ctx.strokeStyle = "#B38728";
        ctx.lineWidth = 4;
        ctx.stroke();

        // Lampshade Dome
        const lampGrad = ctx.createLinearGradient(0, -92, 0, -68);
        lampGrad.addColorStop(0, "#FEE589");
        lampGrad.addColorStop(1, "#F59E0B");
        ctx.fillStyle = lampGrad;
        ctx.beginPath();
        ctx.arc(16, -72, 18, Math.PI, 0);
        ctx.fill();

        // Radiant bulb glow
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(16, -70, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(254, 229, 137, 0.4)";
        ctx.beginPath();
        ctx.arc(16, -68, 32, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "sofa":
        // Premium Curved Lounge Sofa
        // Wooden legs
        ctx.fillStyle = "#8D5B4C";
        ctx.fillRect(-26, -4, 4, 8);
        ctx.fillRect(22, -4, 4, 8);

        // Sofa base & Backrest
        const sofaGrad = ctx.createLinearGradient(0, -42, 0, 0);
        sofaGrad.addColorStop(0, "#738C82");
        sofaGrad.addColorStop(1, "#536B61");
        ctx.fillStyle = sofaGrad;
        ctx.beginPath();
        ctx.roundRect(-34, -42, 68, 38, 12);
        ctx.fill();

        // Seat Cushion
        ctx.fillStyle = "#637B71";
        ctx.beginPath();
        ctx.roundRect(-30, -22, 60, 20, 8);
        ctx.fill();

        // Cozy Toss Pillows
        ctx.fillStyle = "#FEE589";
        ctx.beginPath();
        ctx.roundRect(-24, -34, 14, 16, 4);
        ctx.fill();
        ctx.fillStyle = "#FF8577";
        ctx.beginPath();
        ctx.roundRect(10, -34, 14, 16, 4);
        ctx.fill();
        break;

      case "turntable":
        // Walnut Audio Cabinet Stand
        ctx.fillStyle = "#6B4226";
        ctx.beginPath();
        ctx.roundRect(-26, -24, 52, 26, 6);
        ctx.fill();

        // Upper Aluminum Deck
        ctx.fillStyle = "#E5E5E7";
        ctx.beginPath();
        ctx.roundRect(-22, -22, 44, 20, 4);
        ctx.fill();

        // Vinyl Record with Grooves
        ctx.fillStyle = "#18181B";
        ctx.beginPath();
        ctx.ellipse(-6, -12, 13, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Vinyl Coral Label
        ctx.fillStyle = "#FF6B57";
        ctx.beginPath();
        ctx.ellipse(-6, -12, 5, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Silver Tonearm
        ctx.strokeStyle = "#71717A";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(12, -18);
        ctx.lineTo(3, -12);
        ctx.stroke();
        break;

      case "plant":
        // Fluted Ceramic Pot
        const potGrad = ctx.createLinearGradient(-14, 0, 14, 0);
        potGrad.addColorStop(0, "#E7D6C4");
        potGrad.addColorStop(1, "#CBB5A1");
        ctx.fillStyle = potGrad;
        ctx.beginPath();
        ctx.roundRect(-14, -22, 28, 22, 5);
        ctx.fill();

        // Deep Green Monstera Foliage
        const leaves = [
          { x: -10, y: -38, r: 15, rot: -0.3 },
          { x: 10, y: -42, r: 16, rot: 0.2 },
          { x: 0, y: -52, r: 18, rot: 0 },
        ];
        leaves.forEach((l) => {
          ctx.save();
          ctx.translate(l.x, l.y);
          ctx.rotate(l.rot);
          ctx.fillStyle = "#2D6A4F";
          ctx.beginPath();
          ctx.ellipse(0, 0, l.r, l.r * 1.3, 0, 0, Math.PI * 2);
          ctx.fill();
          // Leaf veins
          ctx.strokeStyle = "#52B788";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, l.r);
          ctx.lineTo(0, -l.r);
          ctx.stroke();
          ctx.restore();
        });
        break;

      case "mac":
        // Classic Macintosh Desktop
        // Ivory Case
        const macGrad = ctx.createLinearGradient(0, -44, 0, 0);
        macGrad.addColorStop(0, "#E6E2D8");
        macGrad.addColorStop(1, "#CDC8BC");
        ctx.fillStyle = macGrad;
        ctx.beginPath();
        ctx.roundRect(-18, -44, 36, 42, 6);
        ctx.fill();

        // CRT Bezel & Screen
        ctx.fillStyle = "#1E293B";
        ctx.beginPath();
        ctx.roundRect(-14, -40, 28, 24, 4);
        ctx.fill();

        // Glowing Apple Hello / Terminal Cursor
        ctx.fillStyle = "#38BDF8";
        ctx.fillRect(-8, -32, 10, 3);
        ctx.fillStyle = "#4ADE80";
        ctx.fillRect(-8, -26, 5, 2);

        // Floppy Slot
        ctx.fillStyle = "#8F897C";
        ctx.fillRect(-10, -10, 20, 2);

        // Compact Keyboard on desk
        ctx.fillStyle = "#D6D1C4";
        ctx.beginPath();
        ctx.roundRect(-15, -2, 30, 8, 2);
        ctx.fill();
        break;

      case "poster":
        // Bauhaus Modern Art Stand / Poster Frame
        ctx.fillStyle = "#18181B";
        ctx.beginPath();
        ctx.roundRect(-18, -52, 36, 50, 4);
        ctx.fill();

        // White Canvas
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(-15, -49, 30, 44);

        // Geometric Bauhaus Art
        ctx.fillStyle = "#FF6B57";
        ctx.beginPath();
        ctx.arc(0, -32, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#2B3044";
        ctx.fillRect(-8, -22, 16, 6);
        ctx.fillStyle = "#FEE589";
        ctx.beginPath();
        ctx.moveTo(0, -42);
        ctx.lineTo(7, -30);
        ctx.lineTo(-7, -30);
        ctx.closePath();
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
    const oy = canvas.height / 2 - 70;
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

    showToast("가구가 룸에 배치되었습니다!");
  };

  const handleReset = () => {
    setPlacedItems([]);
    showToast("방이 깨끗하게 비워졌습니다.");
  };

  const handleRandomize = () => {
    setPlacedItems([
      { id: "lamp", x: 1, y: 1 },
      { id: "sofa", x: 2, y: 5 },
      { id: "turntable", x: 5, y: 2 },
      { id: "plant", x: 6, y: 6 },
      { id: "mac", x: 4, y: 4 },
      { id: "poster", x: 0, y: 3 },
    ]);
    showToast("싸이월드 스타일 감성 배치가 완성되었습니다 ✨");
  };

  return (
    <section id="sandbox" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-white/80 rounded-full px-4 py-1.5 shadow-sm text-xs font-extrabold text-[#2B3044] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B57]" />
          <span>CYWORLD MINIROOM REBORN • TOSS & APPLE DESIGN</span>
        </div>
        <h2 className="text-2xl sm:text-5xl font-extrabold text-[#2B3044] tracking-tight mb-3">
          큼직하고 아늑한 나만의 미니룸 스튜디오
        </h2>
        <p className="text-[#676D82] text-sm sm:text-base leading-relaxed">
          과거 싸이월드 미니룸의 넉넉한 공간감에 토스와 애플 특유의 정갈하고 감각적인 인터랙션을 더했습니다.
        </p>
      </div>

      {/* Main Big Sandbox Box */}
      <div className="bg-white/85 backdrop-blur-2xl border border-white/80 rounded-[32px] p-5 sm:p-10 shadow-[0_20px_60px_rgba(43,48,68,0.08)]">
        {/* Top Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Mood Filters (Apple Glass Style) */}
          <div className="flex items-center bg-[#2B3044]/5 backdrop-blur-md p-1.5 rounded-full border border-black/5">
            <button
              onClick={() => {
                setCurrentMood("noon");
                showToast("정오의 따스한 햇살 ☀️");
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                currentMood === "noon"
                  ? "bg-white text-[#2B3044] shadow-sm scale-102"
                  : "text-[#676D82] hover:text-[#2B3044]"
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>정오의 햇살</span>
            </button>
            <button
              onClick={() => {
                setCurrentMood("sunset");
                showToast("감성적인 노을 핑크 🌇");
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                currentMood === "sunset"
                  ? "bg-white text-[#2B3044] shadow-sm scale-102"
                  : "text-[#676D82] hover:text-[#2B3044]"
              }`}
            >
              <Sunset className="w-4 h-4 text-rose-500" />
              <span>노을 핑크</span>
            </button>
            <button
              onClick={() => {
                setCurrentMood("dawn");
                showToast("아늑한 새벽 앰버 🌙");
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                currentMood === "dawn"
                  ? "bg-white text-[#2B3044] shadow-sm scale-102"
                  : "text-[#676D82] hover:text-[#2B3044]"
              }`}
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>새벽 앰버</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 bg-white hover:bg-neutral-50 border border-[#2B3044]/10 text-xs font-extrabold text-[#676D82] px-4 py-2.5 rounded-full transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>가구 초기화</span>
            </button>
            <button
              onClick={handleRandomize}
              className="flex items-center gap-1.5 bg-[#FAF8F2] hover:bg-[#FEE589]/60 border border-[#2B3044]/10 text-xs font-extrabold text-[#2B3044] px-4.5 py-2.5 rounded-full transition-all shadow-xs"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#FF6B57]" />
              <span>추천 배치</span>
            </button>
          </div>
        </div>

        {/* EXPANSIVE CYWORLD-SCALE CANVAS STAGE */}
        <div className="relative w-full h-[460px] sm:h-[620px] bg-gradient-to-br from-[#FAF8F5] via-[#EDE7DB] to-[#E3DCCF] rounded-3xl overflow-hidden shadow-inner flex items-center justify-center touch-none border border-black/5">
          <canvas
            ref={canvasRef}
            width={1000}
            height={640}
            onMouseMove={handlePointer}
            onMouseLeave={() => setHoverTile(null)}
            onClick={handlePlace}
            onTouchMove={handlePointer}
            onTouchEnd={handlePlace}
            className="w-full h-full block cursor-grab active:cursor-grabbing"
          />

          {/* Top-Right Expandable Tag */}
          <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-md border border-white/60 text-[#2B3044] text-[11px] font-mono font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>CYWORLD MINIROOM 1000×640</span>
          </div>

          <div className="absolute bottom-5 left-5 bg-[#2B3044]/80 backdrop-blur-md text-white text-[11px] font-mono px-3.5 py-1.5 rounded-full pointer-events-none shadow-md">
            CLICK OR TAP TO PLACE FURNITURE
          </div>
        </div>

        {/* Toss & Apple Style Furniture Palette Deck */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-extrabold text-[#2B3044] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B57]"></span>
              <span>오브제 컬렉션 (Apple & Toss Design)</span>
            </div>
            <span className="text-[11px] text-[#676D82]">클릭 후 룸 타일을 누르면 배치됩니다</span>
          </div>

          {/* SQUIRCLE CARDS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {TOSS_APPLE_FURNITURE.map((item) => {
              const isSelected = selectedFurniture === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedFurniture(item.id);
                    showToast(`${item.name} 선택`);
                  }}
                  className={`relative flex flex-col items-start p-4 rounded-2xl border text-left transition-all duration-200 transform hover:-translate-y-1 active:scale-95 ${
                    isSelected
                      ? "bg-white border-[#FF6B57] shadow-[0_12px_28px_rgba(255,107,87,0.22)] ring-2 ring-[#FF6B57]/30"
                      : "bg-[#FAFAFA] hover:bg-white border-[#2B3044]/8 hover:border-[#2B3044]/20 shadow-xs"
                  }`}
                >
                  {/* Apple Squircle Icon Box */}
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3 shadow-md transition-transform ${
                      item.iconBg
                    } ${isSelected ? "scale-105" : ""}`}
                  >
                    {item.icon}
                  </div>

                  <span className="text-[9px] font-mono font-bold tracking-wider text-[#587065] bg-[#EBF1EE] px-1.5 py-0.5 rounded mb-1">
                    {item.badge}
                  </span>

                  <span className="text-xs font-extrabold text-[#2B3044] leading-snug line-clamp-1">
                    {item.name}
                  </span>

                  <span className="text-[11px] text-[#676D82] mt-0.5">{item.category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action CTA Banner */}
        <div className="mt-8 bg-gradient-to-r from-[#FFF6F3] to-[#FFF0EC] border border-[#FF6B57]/25 rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-extrabold text-[#2B3044]">
              ✨ 내가 꾸민 대형 미니룸 그대로 입주할 준비 되셨나요?
            </h4>
            <p className="text-xs sm:text-sm text-[#676D82] mt-1">
              배치한 가구 위치가 저장되어 런칭 시 내 아지트로 자동 입고됩니다.
            </p>
          </div>
          <button
            onClick={() => onSaveRoom(placedItems)}
            className="w-full sm:w-auto bg-[#FF6B57] hover:bg-[#E85542] text-white text-sm font-extrabold px-8 py-4 rounded-full shadow-[0_8px_25px_rgba(255,107,87,0.35)] transition-all whitespace-nowrap transform hover:-translate-y-0.5 active:translate-y-0"
          >
            이 방 저장하고 내 방 개설하러 가기 ➔
          </button>
        </div>
      </div>
    </section>
  );
}
