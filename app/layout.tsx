import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-lisa-cursive",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://formationlisa.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LISA — La formation pour débuter avec l'IA",
    template: "%s · LISA",
  },
  description:
    "Apprends à utiliser l'intelligence artificielle au quotidien en 30 sessions, sans prérequis technique. Paiement unique de 147€, accès à vie. Session découverte gratuite.",
  applicationName: "LISA",
  keywords: [
    "formation IA",
    "apprendre l'intelligence artificielle",
    "formation ChatGPT",
    "formation Claude",
    "IA débutant",
    "formation en ligne IA",
  ],
  authors: [{ name: "N.F." }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/icons/icon-pwa-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-pwa-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-apple-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/icons/icon-apple-167x167.png", sizes: "167x167", type: "image/png" },
      { url: "/icons/icon-apple-152x152.png", sizes: "152x152", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "LISA",
    title: "LISA — La formation pour débuter avec l'IA",
    description:
      "Apprends à utiliser l'intelligence artificielle au quotidien en 30 sessions, sans prérequis technique. Paiement unique, accès à vie.",
    images: [{ url: "/logo-lisa-email.png", width: 512, height: 512, alt: "LISA" }],
  },
  twitter: {
    card: "summary",
    title: "LISA — La formation pour débuter avec l'IA",
    description: "30 sessions pour apprendre à utiliser l'IA au quotidien. Sans prérequis technique.",
    images: ["/logo-lisa-email.png"],
  },
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LISA",
  },
};

export const viewport: Viewport = {
  themeColor: "#070014",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}