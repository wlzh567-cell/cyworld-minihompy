import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#F9F8F5",
};

export const metadata: Metadata = {
  title: "ON:ROOM (온룸) | 취향과 온기가 켜지는 나만의 디지털 방",
  description:
    "복잡한 피드에서 벗어나 온전히 나로 머무는 곳. 모던 뉴트로 감성의 2.5D 인터랙티브 소셜 룸 플랫폼 ON:ROOM 사전 예약 중! 지금 가입 시 한정판 빈티지 오브제 & 1,500 페블 100% 증정.",
  keywords: [
    "ONROOM",
    "온룸",
    "싸이월드",
    "미니홈피",
    "방꾸미기",
    "데스크테리어",
    "소셜룸",
    "Lo-Fi",
    "아이소메트릭",
    "디지털아지트",
  ],
  authors: [{ name: "ON:ROOM Team" }],
  openGraph: {
    title: "ON:ROOM (온룸) - 차세대 감성 소셜 룸 플랫폼",
    description:
      "나만의 가구와 Lo-Fi 음악으로 채우는 디지털 아지트. 사전 예약하고 1,500 페블과 한정판 오브제를 받으세요.",
    url: "https://onroom.me",
    siteName: "ON:ROOM",
    images: [
      {
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "ON:ROOM Preview",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ON:ROOM (온룸) | 취향과 온기가 켜지는 나만의 디지털 방",
    description: "나만의 가구와 Lo-Fi 음악으로 채우는 감성 아지트",
    images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${jakarta.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased selection:bg-[#FEE589] selection:text-[#2B3044]">
        {children}
      </body>
    </html>
  );
}
