"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Sun,
  Sunset,
  Moon,
  RotateCcw,
  Sparkles,
  Users,
  Armchair,
  Palette,
  Heart,
  PartyPopper,
  Flame,
  Volume2,
} from "lucide-react";
import { showToast } from "./Toast";

export interface FurnitureItem {
  id: string;
  name: string;
  category: "character" | "furniture" | "decor";
  badge: string;
  gradient: string;
  iconBg: string;
  icon: string;
}

export interface PlacedFurniture {
  id: string;
  x: number;
  y: number;
  bubble?: string;
}

interface SandboxProps {
  onSaveRoom: (items: PlacedFurniture[]) => void;
  placedItems: PlacedFurniture[];
  setPlacedItems: React.Dispatch<React.SetStateAction<PlacedFurniture[]>>;
  currentMood: "noon" | "sunset" | "dawn";
  setCurrentMood: (mood: "noon" | "sunset" | "dawn") => void;
}

export const PACKED_FURNITURE_LIST: FurnitureItem[] = [
  // 1. 미니미 & 동물 캐릭터 (Cyworld Minimi & Pets)
  {
    id: "minimi_me",
    name: "주인공 미니미 (코비)",
    category: "character",
    badge: "ME",
    gradient: "from-amber-400/20 to-orange-400/20",
    iconBg: "bg-gradient-to-tr from-amber-500 to-orange-400 text-white",
    icon: "🙋‍♂️",
  },
  {
    id: "minimi_guitar",
    name: "기타 치는 미니미",
    category: "character",
    badge: "MUSIC",
    gradient: "from-rose-400/20 to-pink-400/20",
    iconBg: "bg-gradient-to-tr from-rose-500 to-pink-400 text-white",
    icon: "🎸",
  },
  {
    id: "minimi_piano",
    name: "피아노 연주 미니미",
    category: "character",
    badge: "CLASSIC",
    gradient: "from-indigo-400/20 to-blue-400/20",
    iconBg: "bg-gradient-to-tr from-indigo-500 to-blue-400 text-white",
    icon: "🎹",
  },
  {
    id: "minimi_cheer",
    name: "건배하는 친구들 (2인)",
    category: "character",
    badge: "FRIENDS",
    gradient: "from-emerald-400/20 to-teal-400/20",
    iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400 text-white",
    icon: "🍻",
  },
  {
    id: "pet_dog",
    name: "꼬리치는 강아지 (흰둥이)",
    category: "character",
    badge: "PET",
    gradient: "from-amber-400/20 to-yellow-400/20",
    iconBg: "bg-gradient-to-tr from-yellow-500 to-amber-400 text-white",
    icon: "🐶",
  },
  {
    id: "minimi_surf",
    name: "서핑 타는 서퍼 미니미",
    category: "character",
    badge: "SURF",
    gradient: "from-cyan-400/20 to-blue-400/20",
    iconBg: "bg-gradient-to-tr from-cyan-500 to-blue-400 text-white",
    icon: "🏄‍♂️",
  },

  // 2. 대형 파티 가구 (Party & Living)
  {
    id: "grand_piano",
    name: "클래식 그랜드 피아노",
    category: "furniture",
    badge: "LUXURY",
    gradient: "from-slate-600/20 to-zinc-800/20",
    iconBg: "bg-gradient-to-tr from-zinc-800 to-slate-700 text-white",
    icon: "🎼",
  },
  {
    id: "party_table",
    name: "풍성한 만찬 파티 테이블",
    category: "furniture",
    badge: "FEAST",
    gradient: "from-red-400/20 to-amber-400/20",
    iconBg: "bg-gradient-to-tr from-red-500 to-amber-400 text-white",
    icon: "🍷",
  },
  {
    id: "cake_table",
    name: "생일 축하 케이크 테이블",
    category: "furniture",
    badge: "CAKE",
    gradient: "from-pink-400/20 to-rose-400/20",
    iconBg: "bg-gradient-to-tr from-pink-500 to-rose-400 text-white",
    icon: "🎂",
  },
  {
    id: "sofa",
    name: "세이지 패브릭 라운지 소파",
    category: "furniture",
    badge: "SOFA",
    gradient: "from-teal-400/20 to-emerald-400/20",
    iconBg: "bg-gradient-to-tr from-teal-600 to-emerald-500 text-white",
    icon: "🛋️",
  },
  {
    id: "turntable",
    name: "아날로그 바이닐 턴테이블",
    category: "furniture",
    badge: "AUDIO",
    gradient: "from-orange-400/20 to-red-400/20",
    iconBg: "bg-gradient-to-tr from-[#FF6B57] to-amber-500 text-white",
    icon: "📻",
  },

  // 3. 조명 & 감성 데코 (Decor & Props)
  {
    id: "lamp",
    name: "미드센추리 플로어 조명",
    category: "decor",
    badge: "LIGHT",
    gradient: "from-yellow-400/20 to-amber-400/20",
    iconBg: "bg-gradient-to-tr from-amber-500 to-yellow-400 text-white",
    icon: "💡",
  },
  {
    id: "plant",
    name: "보태니컬 대형 몬스테라 화분",
    category: "decor",
    badge: "PLANT",
    gradient: "from-emerald-400/20 to-green-400/20",
    iconBg: "bg-gradient-to-tr from-emerald-600 to-green-500 text-white",
    icon: "🌿",
  },
  {
    id: "mac",
    name: "레트로 매킨토시 PC 데스크",
    category: "decor",
    badge: "DESK",
    gradient: "from-slate-400/20 to-zinc-400/20",
    iconBg: "bg-gradient-to-tr from-slate-700 to-zinc-600 text-white",
    icon: "🖥️",
  },
  {
    id: "poster",
    name: "바우하우스 대형 아트 액자",
    category: "decor",
    badge: "ART",
    gradient: "from-purple-400/20 to-indigo-400/20",
    iconBg: "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white",
    icon: "🖼️",
  },
  {
    id: "beach_set",
    name: "해변 모래성과 불가사리",
    category: "decor",
    badge: "BEACH",
    gradient: "from-blue-400/20 to-cyan-400/20",
    iconBg: "bg-gradient-to-tr from-blue-500 to-cyan-400 text-white",
    icon: "🏖️",
  },
];

// 싸이월드처럼 꽉 찬 프리셋 데이터 (Packed Preset)
const FULLY_PACKED_PRESET: PlacedFurniture[] = [
  // Party & Living
  { id: "grand_piano", x: 1, y: 1, bubble: "쇼팽 녹턴 연주 중 🎶" },
  { id: "minimi_piano", x: 1, y: 2 },
  { id: "party_table", x: 0, y: 4, bubble: "맛있는 음식 가득! 🍷" },
  { id: "minimi_me", x: 2, y: 4, bubble: "온룸에 오신 걸 환영해요! 🌸" },
  { id: "minimi_cheer", x: 3, y: 4, bubble: "다 같이 짠~ 건배! 🥂" },
  { id: "cake_table", x: 5, y: 1, bubble: "생일 축하합니다! 🎂" },
  { id: "minimi_guitar", x: 6, y: 1, bubble: "기타 솔로 연주 🎸" },
  { id: "pet_dog", x: 3, y: 6, bubble: "멍멍! 반가워요 꼬리 붕붕 🐾" },
  { id: "sofa", x: 4, y: 3 },
  { id: "turntable", x: 6, y: 3 },
  { id: "lamp", x: 0, y: 1 },
  { id: "plant", x: 2, y: 0 },
  { id: "plant", x: 4, y: 0 },
  { id: "mac", x: 6, y: 5 },
  { id: "poster", x: 0, y: 3 },
  { id: "beach_set", x: 6, y: 7 },
  { id: "minimi_surf", x: 7, y: 7, bubble: "파도타기 최고! 🏄‍♂️" },
];

export default function InteractiveSandbox({
  onSaveRoom,
  placedItems,
  setPlacedItems,
  currentMood,
  setCurrentMood,
}: SandboxProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedFurniture, setSelectedFurniture] = useState("minimi_me");
  const [activeCategory, setActiveCategory] = useState<"all" | "character" | "furniture" | "decor">("all");
  const [hoverTile, setHoverTile] = useState<{ gx: number; gy: number } | null>(null);
  const [activeSpeechBubble, setActiveSpeechBubble] = useState<{ x: number; y: number; text: string } | null>({
    x: 480,
    y: 280,
    text: "싸이월드처럼 왁자지껄 꽉 찬 미니룸에 오신 것을 환영합니다! 🌸",
  });

  // Large Cyworld Grid: 8x8 with 76x38 tiles
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
    const oy = canvas.height / 2 - 80;

    const topCorner = gridToIso(0, 0, ox, oy);
    const leftCorner = gridToIso(0, GRID_SIZE, ox, oy);
    const rightCorner = gridToIso(GRID_SIZE, 0, ox, oy);
    const bottomCorner = gridToIso(GRID_SIZE, GRID_SIZE, ox, oy);
    const wallH = 185;

    // 1. Ambient Wall Depth
    ctx.save();
    ctx.shadowColor = "rgba(43, 48, 68, 0.15)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 18;

    // Left Wall (Warm Living Wall)
    ctx.fillStyle = currentMood === "dawn" ? "#222738" : currentMood === "sunset" ? "#E8D0CD" : "#EBE6DB";
    ctx.beginPath();
    ctx.moveTo(topCorner.x, topCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y - wallH);
    ctx.lineTo(topCorner.x, topCorner.y - wallH);
    ctx.closePath();
    ctx.fill();

    // Right Wall (Sunroom / Terrace Wall with large Glass Doors)
    ctx.fillStyle = currentMood === "dawn" ? "#2C3247" : currentMood === "sunset" ? "#F5DDD8" : "#F6F2E8";
    ctx.beginPath();
    ctx.moveTo(topCorner.x, topCorner.y);
    ctx.lineTo(rightCorner.x, rightCorner.y);
    ctx.lineTo(rightCorner.x, rightCorner.y - wallH);
    ctx.lineTo(topCorner.x, topCorner.y - wallH);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 2. Left Wall Scenic Big Window (Cyworld Iconic Glass Window)
    const winX = topCorner.x - 190;
    const winY = topCorner.y - 150;
    const winW = 100;
    const winH = 115;

    const skyGrad = ctx.createLinearGradient(winX, winY, winX, winY + winH);
    if (currentMood === "sunset") {
      skyGrad.addColorStop(0, "#FF6B57");
      skyGrad.addColorStop(0.5, "#FEE589");
      skyGrad.addColorStop(1, "#FFE3D6");
    } else if (currentMood === "dawn") {
      skyGrad.addColorStop(0, "#0F172A");
      skyGrad.addColorStop(0.6, "#1E293B");
      skyGrad.addColorStop(1, "#334155");
    } else {
      skyGrad.addColorStop(0, "#60A5FA");
      skyGrad.addColorStop(0.6, "#93C5FD");
      skyGrad.addColorStop(1, "#E0F2FE");
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(winX, winY, winW, winH);

    // Sun / Moon in window
    if (currentMood === "dawn") {
      ctx.fillStyle = "#FEF08A";
      ctx.beginPath();
      ctx.arc(winX + 28, winY + 34, 10, 0, Math.PI * 2);
      ctx.fill();
    } else if (currentMood === "sunset") {
      ctx.fillStyle = "#EF4444";
      ctx.beginPath();
      ctx.arc(winX + 55, winY + 75, 20, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "#FACC15";
      ctx.beginPath();
      ctx.arc(winX + 55, winY + 35, 14, 0, Math.PI * 2);
      ctx.fill();
    }

    // White Window Trim
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 6;
    ctx.strokeRect(winX, winY, winW, winH);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(winX + winW / 2, winY);
    ctx.lineTo(winX + winW / 2, winY + winH);
    ctx.moveTo(winX, winY + winH / 2);
    ctx.lineTo(winX + winW, winY + winH / 2);
    ctx.stroke();

    // 3. Right Terrace Glass Door (Overlooking beach / garden)
    const doorX = topCorner.x + 40;
    const doorY = topCorner.y - 145;
    const doorW = 120;
    const doorH = 135;
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillRect(doorX, doorY, doorW, doorH);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 4;
    ctx.strokeRect(doorX, doorY, doorW, doorH);
    ctx.beginPath();
    ctx.moveTo(doorX + doorW / 2, doorY);
    ctx.lineTo(doorX + doorW / 2, doorY + doorH);
    ctx.stroke();

    // 4. Floor: Dual Zone (Terrace Wooden Deck + Beach Sandy Shore on bottom right!)
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        const pt = gridToIso(x, y, ox, oy);
        const isBeachZone = x >= 6 && y >= 6; // Cyworld seaside beach extension!

        if (isBeachZone) {
          // Sandy beach with sparkling foam
          ctx.fillStyle = currentMood === "dawn" ? "#5C5642" : currentMood === "sunset" ? "#EAD3B3" : "#F4DCB7";
        } else {
          // Warm Parquet Oak Wood Terrace
          const isAlt = (x + y) % 2 === 0;
          if (currentMood === "dawn") {
            ctx.fillStyle = isAlt ? "#2A3044" : "#343B52";
          } else if (currentMood === "sunset") {
            ctx.fillStyle = isAlt ? "#FBE6E0" : "#F5DDD5";
          } else {
            ctx.fillStyle = isAlt ? "#FAF7F0" : "#F1EDE1";
          }
        }

        // Hover Glow
        if (hoverTile && hoverTile.gx === x && hoverTile.gy === y) {
          ctx.fillStyle = "rgba(255, 107, 87, 0.55)";
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

    // 5. Draw All Packed Objects with Depth Sorting
    const sorted = [...placedItems].sort((a, b) => a.x + a.y - (b.x + b.y));
    sorted.forEach((item) => {
      drawPackedObject(ctx, item.id, item.x, item.y, ox, oy, item.bubble);
    });
  };

  // Rendering packed Cyworld items (Minimi characters, Grand Piano, Party Feasts, Pets)
  const drawPackedObject = (
    ctx: CanvasRenderingContext2D,
    id: string,
    gx: number,
    gy: number,
    ox: number,
    oy: number,
    bubbleText?: string
  ) => {
    const pt = gridToIso(gx, gy, ox, oy);
    const cx = pt.x;
    const cy = pt.y + TILE_H / 2;

    ctx.save();
    ctx.translate(cx, cy);

    // Cast Shadow
    ctx.fillStyle = "rgba(32, 36, 51, 0.16)";
    ctx.beginPath();
    ctx.ellipse(0, 5, 24, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    switch (id) {
      // 1. Minimi Me (주인공 코비 미니미)
      case "minimi_me":
        // Body / Red Sweater
        ctx.fillStyle = "#E11D48";
        ctx.beginPath();
        ctx.roundRect(-8, -26, 16, 20, 4);
        ctx.fill();
        // Denim Jeans & Shoes
        ctx.fillStyle = "#2563EB";
        ctx.fillRect(-6, -6, 5, 8);
        ctx.fillRect(1, -6, 5, 8);
        ctx.fillStyle = "#1E293B";
        ctx.fillRect(-7, 2, 6, 4);
        ctx.fillRect(1, 2, 6, 4);
        // Face & Hair
        ctx.fillStyle = "#FCD34D";
        ctx.beginPath();
        ctx.arc(0, -34, 11, 0, Math.PI * 2);
        ctx.fill();
        // Cyworld iconic black hair
        ctx.fillStyle = "#1E293B";
        ctx.beginPath();
        ctx.arc(0, -36, 11.5, Math.PI * 0.9, Math.PI * 2.1);
        ctx.fill();
        // Waving Hand
        ctx.fillStyle = "#FCD34D";
        ctx.beginPath();
        ctx.arc(10, -28, 3.5, 0, Math.PI * 2);
        ctx.fill();
        break;

      // 2. Guitar Minimi
      case "minimi_guitar":
        ctx.fillStyle = "#0284C7";
        ctx.beginPath();
        ctx.roundRect(-7, -25, 14, 19, 4);
        ctx.fill();
        ctx.fillStyle = "#334155";
        ctx.fillRect(-5, -6, 4, 8);
        ctx.fillRect(1, -6, 4, 8);
        ctx.fillStyle = "#FCD34D";
        ctx.beginPath();
        ctx.arc(0, -33, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#78350F";
        ctx.beginPath();
        ctx.arc(0, -35, 10.5, Math.PI * 0.9, Math.PI * 2.1);
        ctx.fill();
        // Acoustic Guitar
        ctx.fillStyle = "#D97706";
        ctx.beginPath();
        ctx.ellipse(5, -18, 9, 6, 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#92400E";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(12, -22);
        ctx.lineTo(-4, -14);
        ctx.stroke();
        break;

      // 3. Piano Minimi
      case "minimi_piano":
        ctx.fillStyle = "#059669";
        ctx.beginPath();
        ctx.roundRect(-7, -24, 14, 18, 4);
        ctx.fill();
        ctx.fillStyle = "#FCD34D";
        ctx.beginPath();
        ctx.arc(0, -32, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#1E293B";
        ctx.beginPath();
        ctx.arc(0, -34, 10.5, Math.PI * 0.9, Math.PI * 2.1);
        ctx.fill();
        break;

      // 4. Friends Cheering (2 Minimis)
      case "minimi_cheer":
        // Friend 1
        ctx.fillStyle = "#4F46E5";
        ctx.beginPath();
        ctx.roundRect(-16, -24, 13, 18, 4);
        ctx.fill();
        ctx.fillStyle = "#FCD34D";
        ctx.beginPath();
        ctx.arc(-10, -32, 9, 0, Math.PI * 2);
        ctx.fill();
        // Friend 2
        ctx.fillStyle = "#D946EF";
        ctx.beginPath();
        ctx.roundRect(3, -24, 13, 18, 4);
        ctx.fill();
        ctx.fillStyle = "#FCD34D";
        ctx.beginPath();
        ctx.arc(9, -32, 9, 0, Math.PI * 2);
        ctx.fill();
        // Beer Mugs / Toast
        ctx.fillStyle = "#FBBF24";
        ctx.fillRect(-3, -22, 6, 7);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(-3, -24, 6, 3);
        break;

      // 5. Dog (흰둥이 강아지)
      case "pet_dog":
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.roundRect(-10, -14, 20, 12, 5);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(-11, -16, 7, 0, Math.PI * 2);
        ctx.fill();
        // Ears & Nose
        ctx.fillStyle = "#1E293B";
        ctx.beginPath();
        ctx.arc(-15, -19, 3, 0, Math.PI * 2);
        ctx.arc(-17, -14, 2, 0, Math.PI * 2);
        ctx.fill();
        // Wagging Tail
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(10, -10);
        ctx.lineTo(16, -17);
        ctx.stroke();
        break;

      // 6. Surfer Minimi
      case "minimi_surf":
        // Surfboard
        ctx.fillStyle = "#F43F5E";
        ctx.beginPath();
        ctx.ellipse(0, 0, 24, 7, 0.2, 0, Math.PI * 2);
        ctx.fill();
        // Sea waves splash
        ctx.strokeStyle = "#38BDF8";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(-6, 2, 12, 0, Math.PI);
        ctx.stroke();
        // Surfer body
        ctx.fillStyle = "#EA580C";
        ctx.beginPath();
        ctx.roundRect(-6, -26, 12, 18, 3);
        ctx.fill();
        ctx.fillStyle = "#FCD34D";
        ctx.beginPath();
        ctx.arc(0, -34, 9, 0, Math.PI * 2);
        ctx.fill();
        break;

      // 7. Grand Piano
      case "grand_piano":
        ctx.fillStyle = "#0F172A";
        ctx.beginPath();
        ctx.roundRect(-36, -45, 72, 45, 10);
        ctx.fill();
        // Gold Brand Stamp
        ctx.fillStyle = "#FCD34D";
        ctx.fillRect(-10, -42, 20, 2);
        // Piano Keys (Black & White)
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(-28, -20, 56, 12);
        ctx.fillStyle = "#000000";
        for (let k = -24; k < 24; k += 6) {
          ctx.fillRect(k, -20, 4, 7);
        }
        // Piano Stand legs
        ctx.fillStyle = "#0F172A";
        ctx.fillRect(-32, -4, 5, 8);
        ctx.fillRect(27, -4, 5, 8);
        break;

      // 8. Party Feast Dining Table
      case "party_table":
        // Wooden Long Table
        ctx.fillStyle = "#78350F";
        ctx.beginPath();
        ctx.roundRect(-42, -26, 84, 28, 6);
        ctx.fill();
        // White Linen Tablecloth
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.roundRect(-40, -28, 80, 24, 4);
        ctx.fill();
        // Feast items: Wine bottle, plates, bread, glasses
        ctx.fillStyle = "#059669";
        ctx.fillRect(-28, -38, 5, 12); // Wine bottle
        ctx.fillStyle = "#EF4444";
        ctx.beginPath();
        ctx.arc(-14, -22, 6, 0, Math.PI * 2); // Dish
        ctx.arc(14, -22, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#D97706";
        ctx.fillRect(-2, -24, 10, 4); // Bread
        break;

      // 9. Cake Table
      case "cake_table":
        ctx.fillStyle = "#FEF3C7";
        ctx.beginPath();
        ctx.ellipse(0, -10, 26, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        // Birthday Cake with Candle
        ctx.fillStyle = "#F472B6";
        ctx.beginPath();
        ctx.roundRect(-14, -24, 28, 15, 6);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.ellipse(0, -24, 14, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        // Candle & Flame
        ctx.fillStyle = "#FCD34D";
        ctx.fillRect(-1.5, -34, 3, 10);
        ctx.fillStyle = "#EF4444";
        ctx.beginPath();
        ctx.arc(0, -36, 3, 0, Math.PI * 2);
        ctx.fill();
        break;

      // 10. Lounge Sofa
      case "sofa":
        ctx.fillStyle = "#738C82";
        ctx.beginPath();
        ctx.roundRect(-30, -34, 60, 32, 8);
        ctx.fill();
        ctx.fillStyle = "#5E776D";
        ctx.beginPath();
        ctx.roundRect(-26, -18, 52, 16, 6);
        ctx.fill();
        ctx.fillStyle = "#FEE589";
        ctx.beginPath();
        ctx.roundRect(-22, -28, 12, 14, 3);
        ctx.fill();
        break;

      // 11. Turntable
      case "turntable":
        ctx.fillStyle = "#6B4226";
        ctx.beginPath();
        ctx.roundRect(-20, -18, 40, 20, 4);
        ctx.fill();
        ctx.fillStyle = "#18181B";
        ctx.beginPath();
        ctx.ellipse(-4, -8, 10, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FF6B57";
        ctx.beginPath();
        ctx.ellipse(-4, -8, 4, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        break;

      // 12. Floor Lamp
      case "lamp":
        ctx.fillStyle = "rgba(254, 229, 137, 0.35)";
        ctx.beginPath();
        ctx.ellipse(0, 4, 32, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#B38728";
        ctx.fillRect(-2, -68, 4, 68);
        ctx.fillStyle = "#FEE589";
        ctx.beginPath();
        ctx.arc(8, -66, 16, Math.PI, 0);
        ctx.fill();
        break;

      // 13. Plant
      case "plant":
        ctx.fillStyle = "#E7D6C4";
        ctx.beginPath();
        ctx.roundRect(-12, -18, 24, 18, 4);
        ctx.fill();
        ctx.fillStyle = "#2D6A4F";
        ctx.beginPath();
        ctx.arc(-6, -26, 12, 0, Math.PI * 2);
        ctx.arc(6, -28, 14, 0, Math.PI * 2);
        ctx.arc(0, -36, 13, 0, Math.PI * 2);
        ctx.fill();
        break;

      // 14. Macintosh
      case "mac":
        ctx.fillStyle = "#E6E2D8";
        ctx.beginPath();
        ctx.roundRect(-15, -34, 30, 34, 5);
        ctx.fill();
        ctx.fillStyle = "#1E293B";
        ctx.fillRect(-11, -30, 22, 16);
        ctx.fillStyle = "#38BDF8";
        ctx.fillRect(-7, -24, 7, 2);
        break;

      // 15. Bauhaus Poster
      case "poster":
        ctx.fillStyle = "#18181B";
        ctx.beginPath();
        ctx.roundRect(-16, -48, 32, 46, 4);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(-13, -45, 26, 40);
        ctx.fillStyle = "#FF6B57";
        ctx.beginPath();
        ctx.arc(0, -28, 8, 0, Math.PI * 2);
        ctx.fill();
        break;

      // 16. Beach Sandcastle & Shells
      case "beach_set":
        ctx.fillStyle = "#EAB308";
        ctx.beginPath();
        ctx.roundRect(-14, -18, 28, 18, 3);
        ctx.fill();
        ctx.fillStyle = "#F43F5E";
        ctx.beginPath();
        ctx.arc(8, -4, 4, 0, Math.PI * 2); // Starfish
        ctx.fill();
        break;
    }

    // Cyworld Speech Bubble above character
    if (bubbleText) {
      ctx.save();
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#2B3044";
      ctx.lineWidth = 1.5;
      const textW = Math.min(160, ctx.measureText(bubbleText).width + 18);
      ctx.beginPath();
      ctx.roundRect(-textW / 2, -68, textW, 22, 6);
      ctx.fill();
      ctx.stroke();

      // Tail
      ctx.beginPath();
      ctx.moveTo(-4, -46);
      ctx.lineTo(0, -40);
      ctx.lineTo(4, -46);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.stroke();

      // Text
      ctx.fillStyle = "#2B3044";
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(bubbleText, 0, -53);
      ctx.restore();
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
    const oy = canvas.height / 2 - 80;
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

    // Check if clicked an existing item to trigger speech bubble
    const existing = placedItems.find((item) => item.x === gx && item.y === gy);
    if (existing) {
      const bubbleMessages: Record<string, string> = {
        minimi_me: "안녕! 내 미니룸에 온 걸 환영해 ✨",
        minimi_guitar: "오늘의 선곡 어때? 🎸",
        minimi_piano: "피아노 즉흥곡 들려줄게 🎹",
        minimi_cheer: "축하해! 다 같이 짠~ 🥂",
        pet_dog: "멍멍! 꼬리 살랑살랑 🐾",
        minimi_surf: "바다 파도타기 최고야 🌊",
        party_table: "와인이랑 맛있는 파티 만찬 🍷",
        cake_table: "소원을 빌어봐! 🎂",
      };
      const text = bubbleMessages[existing.id] || "다정한 온룸 미니홈피 🌸";
      setPlacedItems((prev) =>
        prev.map((item) => (item.x === gx && item.y === gy ? { ...item, bubble: text } : item))
      );
      showToast(`${text}`);
      return;
    }

    // Place selected furniture
    setPlacedItems((prev) => [...prev, { id: selectedFurniture, x: gx, y: gy }]);

    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(15);
    }

    showToast("새로운 오브제가 배치되었습니다!");
  };

  // Preset 1: Cyworld Packed Party Full Pack
  const loadFullPartyPreset = () => {
    setPlacedItems(FULLY_PACKED_PRESET);
    showToast("🎉 싸이월드 감성 왁자지껄 꽉 찬 파티룸이 로드되었습니다!");
  };

  // Preset 2: Cozy Lo-Fi Room
  const loadCozyPreset = () => {
    setPlacedItems([
      { id: "lamp", x: 1, y: 1 },
      { id: "sofa", x: 2, y: 4 },
      { id: "turntable", x: 4, y: 2 },
      { id: "minimi_me", x: 3, y: 4, bubble: "조용히 LP 음악 듣는 중 🎧" },
      { id: "pet_dog", x: 4, y: 5 },
      { id: "plant", x: 6, y: 6 },
      { id: "mac", x: 5, y: 3 },
      { id: "poster", x: 0, y: 3 },
    ]);
    showToast("☕ 아늑한 새벽 Lo-Fi 작업실 모드!");
  };

  const handleReset = () => {
    setPlacedItems([]);
    showToast("방이 깨끗하게 비워졌습니다.");
  };

  const filteredFurniture =
    activeCategory === "all"
      ? PACKED_FURNITURE_LIST
      : PACKED_FURNITURE_LIST.filter((item) => item.category === activeCategory);

  return (
    <section id="sandbox" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-white/80 rounded-full px-4 py-1.5 shadow-sm text-xs font-extrabold text-[#2B3044] mb-3">
          <PartyPopper className="w-3.5 h-3.5 text-[#FF6B57]" />
          <span>CYWORLD MINIROOM REBORN • 꽉 찬 인터랙티브 룸</span>
        </div>
        <h2 className="text-2xl sm:text-5xl font-extrabold text-[#2B3044] tracking-tight mb-3">
          미니미와 가구로 꽉 채우는 대형 미니룸
        </h2>
        <p className="text-[#676D82] text-sm sm:text-base leading-relaxed">
          피아노 연주, 파티 만찬, 서핑하는 미니미와 댕댕이까지! 왁자지껄 생동감 넘치는 나만의 공간을 만들어보세요.
        </p>
      </div>

      {/* Main Big Cyworld Stage Card */}
      <div className="bg-white/85 backdrop-blur-2xl border border-white/80 rounded-[36px] p-5 sm:p-10 shadow-[0_20px_60px_rgba(43,48,68,0.08)]">
        {/* Top Controls & Preset Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={loadFullPartyPreset}
              className="bg-gradient-to-r from-[#FF6B57] to-[#E85542] hover:brightness-105 text-white text-xs font-extrabold px-4.5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(255,107,87,0.35)] transition-all flex items-center gap-1.5 transform active:scale-95"
            >
              <PartyPopper className="w-3.5 h-3.5 text-[#FEE589]" />
              <span>🎉 꽉 찬 파티룸 보기 (추천)</span>
            </button>
            <button
              onClick={loadCozyPreset}
              className="bg-white hover:bg-neutral-50 border border-[#2B3044]/15 text-xs font-extrabold text-[#2B3044] px-4 py-2.5 rounded-full shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>☕ 아늑한 작업실</span>
            </button>
            <button
              onClick={handleReset}
              className="bg-white hover:bg-neutral-50 border border-[#2B3044]/10 text-xs font-bold text-[#676D82] px-3.5 py-2.5 rounded-full transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Mood Filters */}
          <div className="flex items-center bg-[#2B3044]/5 p-1 rounded-full border border-black/5">
            <button
              onClick={() => {
                setCurrentMood("noon");
                showToast("정오의 햇살 ☀️");
              }}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                currentMood === "noon" ? "bg-white text-[#2B3044] shadow-xs" : "text-[#676D82]"
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>정오</span>
            </button>
            <button
              onClick={() => {
                setCurrentMood("sunset");
                showToast("노을 핑크 🌇");
              }}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                currentMood === "sunset" ? "bg-white text-[#2B3044] shadow-xs" : "text-[#676D82]"
              }`}
            >
              <Sunset className="w-3.5 h-3.5 text-rose-500" />
              <span>노을</span>
            </button>
            <button
              onClick={() => {
                setCurrentMood("dawn");
                showToast("새벽 앰버 🌙");
              }}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                currentMood === "dawn" ? "bg-white text-[#2B3044] shadow-xs" : "text-[#676D82]"
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span>새벽</span>
            </button>
          </div>
        </div>

        {/* EXPANSIVE 1000x640 CYWORLD MINIROOM STAGE */}
        <div className="relative w-full h-[480px] sm:h-[640px] bg-gradient-to-br from-[#FAF8F5] via-[#EDE7DB] to-[#E3DCCF] rounded-3xl overflow-hidden shadow-inner flex items-center justify-center touch-none border border-black/5">
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

          {/* Top Cyworld Status Bar */}
          <div className="absolute top-4 left-4 bg-white/85 backdrop-blur-md border border-white/70 text-[#2B3044] text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>TODAY: 221명 방문 중 • 미니미를 클릭하면 말풍선이 뜹니다!</span>
          </div>

          <div className="absolute bottom-4 right-4 bg-[#2B3044]/80 backdrop-blur-md text-white text-[10px] font-mono px-3 py-1 rounded-full pointer-events-none">
            CYWORLD MINIROOM 1000×640
          </div>
        </div>

        {/* Toss & Apple Style Categorized Object Dock */}
        <div className="mt-8">
          {/* Category Tabs */}
          <div className="flex items-center justify-between gap-4 mb-4 overflow-x-auto pb-1">
            <div className="flex items-center bg-[#2B3044]/5 p-1 rounded-2xl">
              {[
                { id: "all", label: "전체 오브제 (16)" },
                { id: "character", label: "👥 미니미 & 펫" },
                { id: "furniture", label: "🛋️ 파티 & 가구" },
                { id: "decor", label: "🌿 조명 & 소품" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                  className={`text-xs font-extrabold px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeCategory === tab.id
                      ? "bg-white text-[#2B3044] shadow-sm"
                      : "text-[#676D82] hover:text-[#2B3044]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-[11px] text-[#676D82] hidden sm:inline font-medium">
              선택 후 룸 타일을 누르면 배치됩니다
            </span>
          </div>

          {/* SQUIRCLE CARDS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
            {filteredFurniture.map((item) => {
              const isSelected = selectedFurniture === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedFurniture(item.id);
                    showToast(`${item.name} 선택 완료!`);
                  }}
                  className={`relative flex flex-col items-center p-3 rounded-2xl border text-center transition-all duration-200 transform hover:-translate-y-1 active:scale-95 ${
                    isSelected
                      ? "bg-white border-[#FF6B57] shadow-[0_10px_24px_rgba(255,107,87,0.25)] ring-2 ring-[#FF6B57]/30"
                      : "bg-[#FAFAFA] hover:bg-white border-[#2B3044]/8 hover:border-[#2B3044]/20 shadow-xs"
                  }`}
                >
                  {/* Apple Squircle Icon Box */}
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl mb-2 shadow-sm transition-transform ${
                      item.iconBg
                    } ${isSelected ? "scale-105" : ""}`}
                  >
                    {item.icon}
                  </div>

                  <span className="text-[9px] font-mono font-bold tracking-wider text-[#587065] bg-[#EBF1EE] px-1.5 py-0.5 rounded mb-1">
                    {item.badge}
                  </span>

                  <span className="text-xs font-extrabold text-[#2B3044] leading-tight line-clamp-1">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="mt-8 bg-gradient-to-r from-[#FFF6F3] to-[#FFF0EC] border border-[#FF6B57]/25 rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-extrabold text-[#2B3044]">
              ✨ 꽉 찬 나만의 미니룸 그대로 입주 신청하기
            </h4>
            <p className="text-xs sm:text-sm text-[#676D82] mt-1">
              미니미 캐릭터와 가구 배치가 저장되어 정식 런칭 시 그대로 생성됩니다.
            </p>
          </div>
          <button
            onClick={() => onSaveRoom(placedItems)}
            className="w-full sm:w-auto bg-[#FF6B57] hover:bg-[#E85542] text-white text-sm font-extrabold px-8 py-4 rounded-full shadow-[0_8px_25px_rgba(255,107,87,0.35)] transition-all whitespace-nowrap transform hover:-translate-y-0.5 active:translate-y-0"
          >
            이 룸 저장하고 사전 등록 ➔
          </button>
        </div>
      </div>
    </section>
  );
}
