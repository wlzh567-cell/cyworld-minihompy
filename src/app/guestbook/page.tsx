"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GuestbookSection from "@/components/GuestbookSection";
import PreRegistrationModal from "@/components/PreRegistrationModal";
import Toast from "@/components/Toast";

export default function GuestbookPage() {
  const [isPreRegOpen, setIsPreRegOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-[#F9F8F5]">
      <Toast />
      <Navbar onOpenPreReg={() => setIsPreRegOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 flex-1 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#676D82] hover:text-[#FF6B57] transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>메인 랜딩페이지로 돌아가기</span>
        </Link>
      </div>

      <GuestbookSection />

      <Footer />
      <PreRegistrationModal
        isOpen={isPreRegOpen}
        onClose={() => setIsPreRegOpen(false)}
        onComplete={() => {}}
      />
    </main>
  );
}
