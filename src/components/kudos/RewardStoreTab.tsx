"use client";

import React, { useState } from "react";
import { ShoppingBag, Gift, Sparkles, Check, Copy, Tag, ExternalLink, Ticket, QrCode } from "lucide-react";
import confetti from "canvas-confetti";
import { User, StoreItem, RedeemedCoupon, StoreCategory } from "../../types/kudos";

interface RewardStoreTabProps {
  currentUser: User;
  storeItems: StoreItem[];
  redeemedCoupons: RedeemedCoupon[];
  onRedeemItem: (item: StoreItem) => void;
}

export default function RewardStoreTab({
  currentUser,
  storeItems,
  redeemedCoupons,
  onRedeemItem,
}: RewardStoreTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | StoreCategory>("all");
  const [activeSubTab, setActiveSubTab] = useState<"shop" | "myCoupons">("shop");
  const [viewingCoupon, setViewingCoupon] = useState<RedeemedCoupon | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const filteredItems = storeItems.filter((item) =>
    selectedCategory === "all" ? true : item.category === selectedCategory
  );

  const handleBuy = (item: StoreItem) => {
    if (currentUser.earnedPoints < item.price) {
      alert(`교환 가능 포인트가 부족합니다. (현재: ${currentUser.earnedPoints.toLocaleString()}P / 필요: ${item.price.toLocaleString()}P)`);
      return;
    }

    if (confirm(`'${item.name}'을(를) ${item.price.toLocaleString()}P로 교환하시겠습니까?`)) {
      onRedeemItem(item);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {}
    }
  };

  const handleCopyBarcode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Wallet Balance Hero Card */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-5 rounded-3xl shadow-xl">
        <span className="text-xs font-bold text-emerald-200 block mb-1">
          리워드 교환 가능 포인트 (Earned Points)
        </span>
        <div className="text-3xl font-black tracking-tight flex items-baseline gap-1">
          <span>{currentUser.earnedPoints.toLocaleString()}</span>
          <span className="text-sm font-bold text-emerald-200">P</span>
        </div>
        <p className="text-[11px] sm:text-xs text-emerald-100/90 mt-1.5 whitespace-nowrap tracking-tight">
          쌓인 칭찬 포인트로 기프티콘을 즉시 교환하세요!
        </p>
      </div>

      {/* Sub Tabs: Shop vs My Coupons */}
      <div className="flex bg-neutral-200/70 p-1 rounded-2xl">
        <button
          onClick={() => setActiveSubTab("shop")}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === "shop" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>리워드 스토어 (B2B 복지몰)</span>
        </button>
        <button
          onClick={() => setActiveSubTab("myCoupons")}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === "myCoupons" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
          }`}
        >
          <Ticket className="w-3.5 h-3.5" />
          <span>내 쿠폰함 ({redeemedCoupons.length})</span>
        </button>
      </div>

      {activeSubTab === "shop" ? (
        <>
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: "all", label: "전체" },
              { id: "custom", label: "🏢 사내 커스텀 복지" },
              { id: "coffee", label: "☕ 카페/베이커리" },
              { id: "voucher", label: "💳 모바일 상품권" },
              { id: "food", label: "🍔 배달/외식" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredItems.map((item) => {
              const canAfford = currentUser.earnedPoints >= item.price;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl p-4 border transition-all flex flex-col justify-between ${
                    item.isCustomBenefit
                      ? "border-amber-200/80 bg-gradient-to-b from-amber-50/30 to-white shadow-xs"
                      : "border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                  }`}
                >
                  <div>
                    {/* Image and Badge */}
                    <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-3 bg-neutral-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                      {item.badge && (
                        <span
                          className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-xs ${
                            item.isCustomBenefit ? "bg-amber-600" : "bg-neutral-900"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-bold text-white">
                        {item.brand}
                      </span>
                    </div>

                    <h5 className="font-extrabold text-neutral-900 text-sm mb-1 leading-snug">
                      {item.name}
                    </h5>
                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 font-bold block">필요 포인트</span>
                      <span className="text-base font-black text-neutral-900">
                        {item.price.toLocaleString()} <span className="text-xs text-neutral-500">P</span>
                      </span>
                    </div>

                    <button
                      onClick={() => handleBuy(item)}
                      disabled={!canAfford}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                        canAfford
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 active:scale-95"
                          : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                      }`}
                    >
                      {canAfford ? "즉시 교환" : "포인트 부족"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* My Coupons List */
        <div className="space-y-3">
          {redeemedCoupons.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-neutral-100">
              <Ticket className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <h5 className="font-bold text-neutral-700 text-sm mb-1">아직 교환한 쿠폰이 없어요</h5>
              <p className="text-xs text-neutral-400 mb-4">
                동료들에게 받은 칭찬 포인트를 모아 기프티콘으로 교환해보세요!
              </p>
              <button
                onClick={() => setActiveSubTab("shop")}
                className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
              >
                스토어 둘러보기
              </button>
            </div>
          ) : (
            redeemedCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-xs flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {coupon.brand}
                  </span>
                  <h5 className="text-sm font-extrabold text-neutral-900 mt-1">{coupon.name}</h5>
                  <span className="text-[11px] text-neutral-400">교환일: {coupon.redeemedAt}</span>
                </div>

                <button
                  onClick={() => setViewingCoupon(coupon)}
                  className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span>바코드 보기</span>
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Barcode Viewer Modal */}
      {viewingCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden p-6 border border-neutral-100 text-center">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              모바일 기프티콘 즉시 사용
            </span>
            <h4 className="text-lg font-black text-neutral-900 mt-3 mb-1">{viewingCoupon.name}</h4>
            <p className="text-xs text-neutral-400 mb-6">{viewingCoupon.brand}</p>

            {/* Realistic Barcode Graphic */}
            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/80 mb-4 flex flex-col items-center">
              {/* CSS Barcode Lines */}
              <div className="h-16 flex items-center gap-1.5 w-full justify-center py-1">
                {[3, 1, 4, 2, 5, 1, 3, 2, 4, 1, 2, 5, 2, 3, 1, 4, 2, 3, 1, 4, 2, 5, 1, 3, 2].map(
                  (width, idx) => (
                    <div
                      key={idx}
                      className="h-full bg-neutral-900"
                      style={{ width: `${width * 2}px` }}
                    />
                  )
                )}
              </div>
              <div className="font-mono text-sm font-black tracking-widest text-neutral-800 mt-3">
                {viewingCoupon.barcode}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-neutral-100 rounded-xl mb-6 text-xs">
              <span className="text-neutral-500 font-bold">쿠폰 핀번호: {viewingCoupon.pinCode}</span>
              <button
                onClick={() => handleCopyBarcode(viewingCoupon.barcode)}
                className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
              >
                {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copySuccess ? "복사됨!" : "번호 복사"}</span>
              </button>
            </div>

            <button
              onClick={() => setViewingCoupon(null)}
              className="w-full py-3 bg-neutral-900 text-white font-extrabold rounded-2xl hover:bg-neutral-800 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
