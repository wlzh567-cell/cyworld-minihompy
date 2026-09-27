"use client";

import React, { useEffect, useState } from "react";

export interface ToastMessage {
  id: number;
  text: string;
}

let toastListener: ((msg: string) => void) | null = null;

export function showToast(message: string) {
  if (toastListener) {
    toastListener(message);
  }
}

export default function Toast() {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    toastListener = (text: string) => {
      const id = Date.now();
      setToast({ id, text });
      setTimeout(() => {
        setToast((current) => (current?.id === id ? null : current));
      }, 2600);
    };

    return () => {
      toastListener = null;
    };
  }, []);

  if (!toast) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none transition-all duration-300 transform animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-[#2B3044]/95 text-white backdrop-blur-md px-6 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-2xl border border-white/10 flex items-center gap-2">
        <span className="text-[#FF6B57]">✦</span>
        <span>{toast.text}</span>
      </div>
    </div>
  );
}
