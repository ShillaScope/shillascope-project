import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "경주 관광 가이드 | Gyeongju Tourism Guide",
  description:
    "천년 고도 경주의 아름다운 문화유산을 만나보세요. Discover the beautiful cultural heritage of Gyeongju.",
  keywords:
    "경주, 관광, 문화유산, 불국사, 석굴암, 첨성대, Gyeongju, tourism, cultural heritage",
  authors: [{ name: "경주 관광 가이드" }],
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "경주 관광 가이드",
    description: "천년 고도 경주의 아름다운 문화유산을 만나보세요",
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full">
      <body className="h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          메인 콘텐츠로 건너뛰기
        </a>
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
