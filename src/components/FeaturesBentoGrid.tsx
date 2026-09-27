"use client";

import React, { useEffect, useRef, useState } from "react";
import { Disc, Heart, RefreshCw, Sparkles, Image as ImageIcon } from "lucide-react";
import { showToast } from "./Toast";

export default function FeaturesBentoGrid() {
  // Block 1: Vinyl Player
  const [activeTrack, setActiveTrack] = useState(0);
  const [isVinylSpinning, setIsVinylSpinning] = useState(true);

  const playlist = [
    { title: "01. Midnight in Seongsu (Lo-Fi)", duration: "2:45" },
    { title: "02. Sunset Tangerine (City Pop)", duration: "3:12" },
    { title: "03. Rain on the Terrace (Chill)", duration: "2:20" },
  ];

  // Block 2: Stickers in Guestbook
  const [stickers, setStickers] = useState<{ id: number; emoji: string; x: number; y: number }[]>([
    { id: 1, emoji: "🍒", x: 25, y: 35 },
    { id: 2, emoji: "⭐", x: 70, y: 25 },
  ]);

  const addSticker = (emoji: string) => {
    const newSticker = {
      id: Date.now(),
      emoji,
      x: Math.floor(Math.random() * 65 + 15),
      y: Math.floor(Math.random() * 45 + 30),
    };
    setStickers((prev) => [...prev, newSticker]);
    showToast(`${emoji} 스티커를 방명록에 남겼습니다!`);
  };

  // Block 3: Digital Surfing Shuffler
  const [surfingIdx, setSurfingIdx] = useState(0);
  const surfingList = [
    { user: "@kobe_cozy", title: "코비의 새벽 Lo-Fi 작업실 🌙", desc: "미드센추리 가구와 빈티지 오디오" },
    { user: "@wave_sound", title: "웨이브의 바이닐 레코드 룸 📻", desc: "재즈와 시티팝 LP 컬렉션" },
    { user: "@dohwa_studio", title: "도화의 식물 가득 테라스 룸 🌿", desc: "몬스테라와 올리브 나무 아지트" },
    { user: "@minji_retro", title: "민지의 빈티지 카페 무드 룸 ☕", desc: "따뜻한 조명과 북카페 감성" },
  ];

  const shuffleNextRoom = () => {
    setSurfingIdx((prev) => (prev + 1) % surfingList.length);
    showToast(`${surfingList[(surfingIdx + 1) % surfingList.length].user} 님의 방으로 파도타기! 🌊`);
  };

  // Block 4: 8-bit Pixel Canvas
  const pixelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pixelPreset, setPixelPreset] = useState(0);

  const drawPixelArt = () => {
    const canvas = pixelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palettes = [
      ["#2B3044", "#7D968B", "#FEE589", "#FF6B57"],
      ["#3A506B", "#5BC0BE", "#6FFFE9", "#0B132B"],
      ["#9C6644", "#DDB892", "#EDE0D4", "#7F5539"],
    ];
    const pal = palettes[pixelPreset % palettes.length];

    for (let x = 0; x < 32; x += 4) {
      for (let y = 0; y < 32; y += 4) {
        ctx.fillStyle = pal[(x / 4 + y / 4) % pal.length];
        ctx.fillRect(x, y, 4, 4);
      }
    }
  };

  useEffect(() => {
    drawPixelArt();
  }, [pixelPreset]);

  return (
    <section id="features" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-white/80 rounded-full px-4 py-1.5 shadow-sm text-xs font-extrabold text-[#2B3044] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B57]" />
          <span>핵심 경험의 모던한 시각화</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2B3044] tracking-tight mb-3">
          온전히 나에게 집중하는 아지트 경험
        </h2>
        <p className="text-[#676D82] text-sm sm:text-base">
          과거의 따뜻한 온기와 모던한 비동기 소셜의 매력을 담아낸 4가지 벤토 피처.
        </p>
      </div>

      {/* Bento Grid Layout (12 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Block 1: BGM Player (7 Cols) */}
        <div className="lg:col-span-7 bg-white/85 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-8 shadow-[0_12px_32px_rgba(43,48,68,0.06)] flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-[#587065] bg-[#EBF1EE] px-2.5 py-1 rounded-full uppercase">
              AUDIO ATMOSPHERE
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2B3044] mt-3 mb-2">
              BGM 플레이어: 내 방을 채우는 플레이리스트
            </h3>
            <p className="text-sm text-[#676D82] leading-relaxed mb-6">
              방문한 친구들과 함께 듣는 프라이빗 BGM. 회전하는 감성 바이닐 LP와 큐레이션된 인디 & Lo-Fi 사운드트랙.
            </p>
          </div>

          <div className="bg-[#202433] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-around gap-6">
            {/* Spinning Vinyl */}
            <div
              onClick={() => setIsVinylSpinning(!isVinylSpinning)}
              className="relative w-32 h-32 rounded-full bg-[radial-gradient(circle,#111_25%,#2a2a2a_26%,#111_40%,#333_41%,#111_60%,#444_61%,#111_80%)] shadow-2xl flex items-center justify-center cursor-pointer select-none"
            >
              <div
                className={`w-12 h-12 rounded-full bg-[#FF6B57] border-2 border-white flex items-center justify-center text-[10px] font-extrabold text-white ${
                  isVinylSpinning ? "animate-spin" : ""
                }`}
                style={{ animationDuration: "3.5s" }}
              >
                ON:LP
              </div>
            </div>

            {/* Playlist choices */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              {playlist.map((item, idx) => {
                const isActive = activeTrack === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveTrack(idx);
                      showToast(`${item.title} 선택`);
                    }}
                    className={`text-left text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center justify-between gap-4 ${
                      isActive
                        ? "bg-[#FF6B57] text-white shadow-md"
                        : "bg-white/10 text-white/80 hover:bg-white/15"
                    }`}
                  >
                    <span>{item.title}</span>
                    <span className="font-mono text-[10px] opacity-75">{item.duration}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Block 2: Async Guestbook Rolling Paper (5 Cols) */}
        <div className="lg:col-span-5 bg-white/85 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-8 shadow-[0_12px_32px_rgba(43,48,68,0.06)] flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-[#587065] bg-[#EBF1EE] px-2.5 py-1 rounded-full uppercase">
              WARM SOCIAL
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2B3044] mt-3 mb-2">
              비동기 롤링페이퍼: 다정한 안부
            </h3>
            <p className="text-sm text-[#676D82] leading-relaxed mb-6">
              실시간 피로감 없는 따뜻한 손글씨 쪽지와 스티커를 방명록에 남겨보세요.
            </p>
          </div>

          <div className="relative bg-[#FFFDF5] border border-dashed border-[#2B3044]/20 rounded-2xl p-4 min-h-[170px] shadow-inner">
            <div className="bg-[#FFF275] p-3 rounded-lg shadow-sm text-xs text-[#202433] -rotate-1 font-medium leading-relaxed max-w-[220px]">
              &quot;새로 꾸민 방 너무 예쁘다! 퇴근하고 맥주 한잔 들고 또 올게 ☕&quot; — <strong className="font-bold">수민</strong>
            </div>

            {/* Clicked stickers on the board */}
            {stickers.map((s) => (
              <span
                key={s.id}
                onClick={() => setStickers((prev) => prev.filter((item) => item.id !== s.id))}
                className="absolute text-2xl cursor-pointer hover:scale-125 transition-transform"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                title="클릭하여 떼기"
              >
                {s.emoji}
              </span>
            ))}

            <div className="mt-4 pt-3 border-t border-[#2B3044]/10 flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#676D82]">스티커 붙이기:</span>
              <div className="flex gap-1.5">
                {["🍒", "⭐", "💌", "☕", "🐈"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => addSticker(emoji)}
                    className="p-1.5 bg-white border border-[#2B3044]/10 rounded-lg hover:scale-125 transition-transform shadow-xs text-base"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Block 3: Digital Surfing (5 Cols) */}
        <div className="lg:col-span-5 bg-white/85 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-8 shadow-[0_12px_32px_rgba(43,48,68,0.06)] flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-[#587065] bg-[#EBF1EE] px-2.5 py-1 rounded-full uppercase">
              DIGITAL SURFING
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2B3044] mt-3 mb-2">
              디지털 파도타기: 취향별 유랑
            </h3>
            <p className="text-sm text-[#676D82] leading-relaxed mb-6">
              알고리즘 피드가 아닌, 진짜 취향이 통하는 이웃의 방으로 떠나는 1촌 유랑.
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#2B3044]/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#FF6B57]">
                {surfingList[surfingIdx].user}
              </span>
              <span className="text-[10px] font-bold bg-[#EBF1EE] text-[#587065] px-2 py-0.5 rounded-full">
                ONLINE
              </span>
            </div>
            <h4 className="text-sm font-extrabold text-[#2B3044] mb-1">
              {surfingList[surfingIdx].title}
            </h4>
            <p className="text-xs text-[#676D82]">{surfingList[surfingIdx].desc}</p>

            <button
              onClick={shuffleNextRoom}
              className="mt-4 w-full bg-white hover:bg-[#FEE589] border border-[#2B3044]/10 text-[#2B3044] text-xs font-extrabold py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#FF6B57]" />
              <span>다음 이웃 방으로 파도타기 🌊</span>
            </button>
          </div>
        </div>

        {/* Block 4: Custom Pixel Art Frame (7 Cols) */}
        <div className="lg:col-span-7 bg-white/85 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-8 shadow-[0_12px_32px_rgba(43,48,68,0.06)] flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-[#587065] bg-[#EBF1EE] px-2.5 py-1 rounded-full uppercase">
              CUSTOM OBJECT
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2B3044] mt-3 mb-2">
              커스텀 픽셀 액자: 내 추억을 전시하는 법
            </h3>
            <p className="text-sm text-[#676D82] leading-relaxed mb-6">
              사진을 넣으면 감성적인 8-bit 뉴트로 픽셀 아트로 즉시 변환되어 내 방 벽에 소장 전시됩니다.
            </p>
          </div>

          <div className="bg-[#EBF1EE] rounded-2xl p-5 flex items-center gap-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white border-4 border-white rounded-xl shadow-md overflow-hidden flex items-center justify-center">
              <canvas
                ref={pixelCanvasRef}
                width={32}
                height={32}
                className="w-full h-full [image-rendering:pixelated]"
              />
            </div>

            <div className="flex-1">
              <h5 className="text-sm font-extrabold text-[#2B3044]">실시간 뉴트로 픽셀 변환기</h5>
              <p className="text-xs text-[#676D82] mt-1 mb-3">
                감각적인 Lo-Fi 무드 컬러 팔레트로 자동 렌더링됩니다.
              </p>
              <button
                onClick={() => {
                  setPixelPreset((prev) => prev + 1);
                  showToast("팔레트 프리셋 변경 완료!");
                }}
                className="bg-white hover:border-[#FF6B57] border border-[#2B3044]/15 text-xs font-bold text-[#2B3044] px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#FF6B57]" />
                <span>필터 프리셋 변환</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
