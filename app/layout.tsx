// app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/UserProvider";
import { ToastProvider } from "@/context/ToastProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lecodefashion",
  description: "Boutique de mode tendance à petit prix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable} h-full`}>
      <body className="flex flex-col min-h-screen font-[var(--font-inter)] bg-gray-50">

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