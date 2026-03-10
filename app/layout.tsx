import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Noto_Sans_SC } from "next/font/google";
import dynamic from "next/dynamic";
import { personJsonLd } from "@/lib/jsonld";
import { LanguageProvider } from "@/lib/language-context";
import "./globals.css";

const DockWrapper = dynamic(() =>
  import("@/components/shared/dock-wrapper").then((m) => m.DockWrapper),
);

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
    "AI Engineer building RAG & Agent systems in production. 2 NLP Patents. Based in Shanghai.",
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
          <main className="min-h-screen pb-20">{children}</main>
          <DockWrapper />
        </LanguageProvider>
      </body>
    </html>
  );
}
