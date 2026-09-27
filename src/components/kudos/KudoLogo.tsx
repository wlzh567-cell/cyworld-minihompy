"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface KudoLogoProps {
  size?: "xs" | "sm" | "md" | "lg";
  withText?: boolean;
  className?: string;
}

export default function KudoLogo({ size = "md", withText = false, className = "" }: KudoLogoProps) {
  const sizeMap = {
    xs: {
      box: "w-6 h-6 rounded-lg",
      icon: "w-3.5 h-3.5",
      text: "text-sm",
    },
    sm: {
      box: "w-7 h-7 rounded-xl",
      icon: "w-4 h-4",
      text: "text-base",
    },
    md: {
      box: "w-9 h-9 rounded-2xl",
      icon: "w-5 h-5",
      text: "text-lg",
    },
    lg: {
      box: "w-12 h-12 rounded-3xl",
      icon: "w-6 h-6",
      text: "text-2xl",
    },
  };

  const { box, icon, text } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Signature Logo Mark: Blue Gradient + Golden Sparkle */}
      <div
        className={`${box} bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-amber-300 shadow-md shadow-blue-500/30 border border-white/20 relative overflow-hidden shrink-0 group`}
      >
        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/20 pointer-events-none" />
        <Sparkles className={`${icon} text-amber-300 fill-amber-300/20 drop-shadow-[0_1px_3px_rgba(245,158,11,0.5)] transition-transform group-hover:scale-110`} />
      </div>

      {withText && (
        <span className={`font-black tracking-tight text-neutral-900 lowercase ${text}`}>
          kudoworks
        </span>
      )}
    </div>
  );
}
