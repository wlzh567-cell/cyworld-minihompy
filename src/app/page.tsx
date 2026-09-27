"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CassettePlayer from "@/components/CassettePlayer";
import HeroSection from "@/components/HeroSection";
import InteractiveSandbox, { PlacedFurniture } from "@/components/InteractiveSandbox";
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

  // Shared Sandbox & Story Generator Furniture state
  const [placedItems, setPlacedItems] = useState<PlacedFurniture[]>([
    { id: "lamp", x: 1, y: 1 },
    { id: "sofa", x: 2, y: 4 },
    { id: "turntable", x: 4, y: 2 },
    { id: "plant", x: 6, y: 6 },
    { id: "mac", x: 5, y: 3 },
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

      {/* Section 2: Interactive Sandbox */}
      <InteractiveSandbox
        onSaveRoom={() => handleOpenPreReg()}
        placedItems={placedItems}
        setPlacedItems={setPlacedItems}
        currentMood={currentMood}
        setCurrentMood={setCurrentMood}
      />

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
