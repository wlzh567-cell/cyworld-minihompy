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
    "kudoworks",
    "쿠도웍스",
    "동료인정",
    "사내칭찬",
    "피어레코그니션",
    "B2B SaaS",
    "조직문화",
    "HR대시보드",
    "컬처인텔리전스",
    "리워드스토어",
  ],
  authors: [{ name: "kudoworks Team" }],
  openGraph: {
    title: "kudoworks (쿠도웍스) - 사내 동료 인정 및 조직 문화 인텔리전스",
    description:
      "칭찬과 보상이 흐르는 건강한 사내 문화. B2B 피어 레코그니션 & 컬처 인텔리전스 솔루션.",
    url: "https://kudoworks.vercel.app",
    siteName: "kudoworks",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kudoworks (쿠도웍스) | 동료 인정과 성장의 조직 문화 인텔리전스",
    description: "칭찬과 보상이 흐르는 건강한 사내 문화 솔루션",
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
