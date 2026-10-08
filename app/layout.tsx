import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Noto_Sans_SC } from "next/font/google";
import { personJsonLd } from "@/lib/jsonld";
import { LanguageProvider } from "@/lib/language-context";
import { SiteNav } from "@/components/shared/site-nav";
import { SiteFooter } from "@/components/shared/site-footer";
import { MotionProvider } from "@/components/shared/motion-provider";
import { AuroraBackground } from "@/components/ui/aurora-background";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans-main",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-main",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Jeremy Dai — AI Engineer",
    template: "%s | Jeremy Dai",
  },
  description:
    "GenAI Forward Deployed Engineer at Google. Building Agent & RAG systems in production, and writing about what breaks.",
  metadataBase: new URL("https://fufu.dev"),
  alternates: {
    canonical: "https://fufu.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Jeremy Dai",
    url: "https://fufu.dev",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} ${notoSansSC.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
          />
          <MotionProvider>
            <AuroraBackground />
            <SiteNav />
            <main className="min-h-screen">{children}</main>
            <SiteFooter />
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
