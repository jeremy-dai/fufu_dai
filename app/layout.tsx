import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  JetBrains_Mono,
  Noto_Sans_SC,
  Noto_Serif_SC,
  Outfit,
} from "next/font/google";
import { personJsonLd } from "@/lib/jsonld";
import { LanguageProvider } from "@/lib/language-context";
import { SiteNav } from "@/components/shared/site-nav";
import { SiteFooter } from "@/components/shared/site-footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--jd-font-serif-en",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--jd-font-serif-zh",
  subsets: ["latin"],
  weight: ["700", "900"],
  preload: false,
  display: "swap",
});

const outfit = Outfit({
  variable: "--jd-font-sans-en",
  subsets: ["latin"],
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  variable: "--jd-font-sans-zh",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  preload: false,
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--jd-font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1A1915",
};

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
    <html
      lang="en"
      className={`${fraunces.variable} ${notoSerifSC.variable} ${outfit.variable} ${notoSansSC.variable} ${jetbrains.variable}`}
    >
      <body>
        <LanguageProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
          />
          <div className="jd-shell">
            <SiteNav />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
