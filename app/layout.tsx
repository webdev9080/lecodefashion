// app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/UserProvider";
import { ToastProvider } from "@/context/ToastProvider";

// 🔥 IMPORT SEO
import { generateSEO } from "@/lib/seo";
import ChatWidget from "@/components/ChatWidget";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// 🔥 SEO GLOBAL
export const metadata: Metadata = generateSEO({
  title: "Home",
  description:
    "Boutique de vêtements tendance à Lomé (Agbalépédo). Friperie femme, accessoires homme à petit prix.",
  url: "/",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable} h-full`}>
      <body className="flex flex-col min-h-screen font-[var(--font-inter)] bg-gray-50">
        <ChatWidget />
        
        {/* Analytics de Vercel */}
        <Analytics />
        <SpeedInsights/>

        <UserProvider>
          <ToastProvider>

            {/* 🔝 NAVBAR */}
            <Navbar />

            {/* 🔥 MAIN (prend tout l’espace) */}
            <main className="flex-grow pt-20 pb-24">
              {children}
              
            </main>

            {/* 📱 BOTTOM NAV (fixe mobile) */}
            <BottomNav className="fixed bottom-0 left-0 w-full z-50" />

            {/* 🔻 FOOTER toujours en bas */}
            <Footer />

          </ToastProvider>
        </UserProvider>

      </body>
    </html>
  );
}