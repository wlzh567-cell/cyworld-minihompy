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
  themeColor: "#090D16",
};

export const metadata: Metadata = {
  title: "kudoworks | B2B 사내 동료 인정 및 조직 문화 인텔리전스",
  description:
    "동료의 인정과 온기를 데이터로, 건강한 조직 문화를 만드는 B2B 피어 레코그니션 & 컬처 인텔리전스 SaaS kudoworks.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "kudoworks",
  },
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
