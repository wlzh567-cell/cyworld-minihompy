"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Music, Volume2, VolumeX } from "lucide-react";
import { showToast } from "./Toast";

export default function CassettePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const synthTimerRef = useRef<NodeJS.Timeout | null>(null);

  const tracks = [
    { title: "Midnight in Seongsu", genre: "Lo-Fi Beats", rootFreq: 220, chordProg: [0, 4, 7, 11] },
    { title: "Sunset Tangerine", genre: "City Pop Chill", rootFreq: 261.63, chordProg: [0, 4, 7, 9] },
    { title: "Rain on the Terrace", genre: "Ambient Piano", rootFreq: 174.61, chordProg: [0, 3, 7, 10] },
  ];

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.18, ctx.currentTime);
      master.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = master;
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playWarmChords = (freq: number) => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(750, now);
    filter.Q.setValueAtTime(1.5, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current);

    osc.start(now);
    osc.stop(now + 1.9);
  };

  const togglePlay = () => {
    initAudio();
    if (isPlaying) {
      setIsPlaying(false);
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
      showToast("BGM 일시정지");
    } else {
      setIsPlaying(true);
      showToast(`♪ Lo-Fi BGM 재생 중: ${tracks[currentTrackIndex].title}`);
      let step = 0;
      const track = tracks[currentTrackIndex];
      synthTimerRef.current = setInterval(() => {
        const semitone = track.chordProg[step % track.chordProg.length];
        const noteFreq = track.rootFreq * Math.pow(2, semitone / 12);
        playWarmChords(noteFreq);
        step++;
      }, 1050);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!masterGainRef.current || !audioCtxRef.current) return;
    if (isMuted) {
      masterGainRef.current.gain.setValueAtTime(0.18, audioCtxRef.current.currentTime);
      setIsMuted(false);
      showToast("음소거 해제");
    } else {
      masterGainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      setIsMuted(true);
      showToast("음소거 됨");
    }
  };

  useEffect(() => {
    return () => {
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <aside 
      aria-label="Lo-Fi BGM 플레이어"
      onClick={togglePlay}
      className={`fixed top-20 right-4 sm:right-6 z-40 cursor-pointer select-none transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 ${
        isPlaying ? "shadow-[0_8px_25px_rgba(255,107,87,0.3)]" : "shadow-[0_6px_20px_rgba(43,48,68,0.12)]"
      }`}
    >
      <div className="bg-white/85 backdrop-blur-xl border border-white/70 rounded-full px-4 py-2 sm:px-4.5 sm:py-2.5 flex items-center gap-3">
        {/* Cassette Graphic / Spools */}
        <div className="w-8 h-5 bg-[#2B3044] rounded flex items-center justify-around px-1 relative">
          <div
            className={`w-2.5 h-2.5 rounded-full border-2 border-dashed border-[#FEE589] ${
              isPlaying ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className={`w-2.5 h-2.5 rounded-full border-2 border-dashed border-[#FEE589] ${
              isPlaying ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "3s" }}
          ></div>
        </div>

        {/* Track Info */}
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-extrabold text-[#2B3044] tracking-tight whitespace-nowrap">
            {tracks[currentTrackIndex].title}
          </span>
          <span className="text-[9px] font-mono font-bold text-[#FF6B57]">
            {isPlaying ? "NOW PLAYING ♫" : "CLICK TO PLAY"}
          </span>
        </div>

        {/* Equalizer Bars */}
        <div className="flex items-end gap-0.5 h-3.5 px-0.5">
          <div
            className={`w-1 bg-[#FF6B57] rounded-sm transition-all ${
              isPlaying ? "h-3 animate-pulse" : "h-1"
            }`}
          ></div>
          <div
            className={`w-1 bg-[#FF6B57] rounded-sm transition-all ${
              isPlaying ? "h-3.5 animate-pulse" : "h-1"
            }`}
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className={`w-1 bg-[#FF6B57] rounded-sm transition-all ${
              isPlaying ? "h-2 animate-pulse" : "h-1"
            }`}
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>

        {/* Mute Toggle */}
        <button
          onClick={toggleMute}
          className="p-1 text-[#676D82] hover:text-[#2B3044] rounded-full transition-colors ml-0.5"
          title={isMuted ? "소리 켜기" : "소리 끄기"}
          aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#FF6B57]" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </aside>
  );
}
