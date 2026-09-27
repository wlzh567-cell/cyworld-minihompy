"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CassettePlayer from "@/components/CassettePlayer";
import HeroSection from "@/components/HeroSection";
import InteractiveSandbox, { PlacedFurniture } from "@/components/InteractiveSandbox";
import GuestbookSection from "@/components/GuestbookSection";
import FeaturesBentoGrid from "@/components/FeaturesBentoGrid";
import MilestoneSection from "@/components/MilestoneSection";
import ShareableRoomGenerator from "@/components/ShareableRoomGenerator";
import StickyBottomCta from "@/components/StickyBottomCta";
import Footer from "@/components/Footer";
import PreRegistrationModal from "@/components/PreRegistrationModal";
import Toast from "@/components/Toast";

export default function Home() {
  const [isPreRegOpen, setIsPreRegOpen] = useState(false);
  const [prefillContact, setPrefillContact] = useState("");
  const [userNickname, setUserNickname] = useState("kobe");
  const [totalCount, setTotalCount] = useState(74820);
  const [currentMood, setCurrentMood] = useState<"noon" | "sunset" | "dawn">("noon");

  // Shared Sandbox & Story Generator: Initialized packed with lively Cyworld Minimis and Party Props!
  const [placedItems, setPlacedItems] = useState<PlacedFurniture[]>([
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
    { id: "mac", x: 6, y: 5 },
    { id: "poster", x: 0, y: 3 },
    { id: "beach_set", x: 6, y: 7 },
    { id: "minimi_surf", x: 7, y: 7, bubble: "파도타기 최고! 🏄‍♂️" },
  ]);

  const handleOpenPreReg = (contact?: string) => {
    if (contact) setPrefillContact(contact);
    setIsPreRegOpen(true);
  };

  const handleRegistrationComplete = (nickname: string) => {
    setUserNickname(nickname);
    setTotalCount((prev) => prev + 1);
  };

  return (
    <main className="flex-1 flex flex-col relative w-full overflow-hidden">
      {/* Toast Notification Container */}
      <Toast />

      {/* Floating Cassette Lo-Fi Player */}
      <CassettePlayer />

      {/* Navigation */}
      <Navbar onOpenPreReg={() => handleOpenPreReg()} />

      {/* Section 1: Hero */}
      <HeroSection onOpenPreReg={handleOpenPreReg} />

      {/* Section 2: Expansive Packed Cyworld Miniroom Sandbox */}
      <InteractiveSandbox
        onSaveRoom={() => handleOpenPreReg()}
        placedItems={placedItems}
        setPlacedItems={setPlacedItems}
        currentMood={currentMood}
        setCurrentMood={setCurrentMood}
      />

      {/* Section 2.5: Interactive Mobile-Optimized Guestbook Rolling Paper */}
      <GuestbookSection />

      {/* Section 3: Features Bento Grid */}
      <FeaturesBentoGrid />

      {/* Section 4: Live Milestone & Creator Showcase */}
      <MilestoneSection totalCount={totalCount} />

      {/* Section 5: Shareable Room Generator (1080x1920 Instagram Story) */}
      <ShareableRoomGenerator
        placedItems={placedItems}
        currentMood={currentMood}
        userNickname={userNickname}
      />

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom Bar CTA */}
      <StickyBottomCta onOpenPreReg={() => handleOpenPreReg()} />

      {/* Pre-Registration & Reward Modal */}
      <PreRegistrationModal
        isOpen={isPreRegOpen}
        onClose={() => setIsPreRegOpen(false)}
        prefillContact={prefillContact}
        onComplete={handleRegistrationComplete}
      />
    </main>
  );
}
