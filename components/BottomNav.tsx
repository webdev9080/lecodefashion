"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface BottomNavProps {
  className?: string; // 🔹 Ajouter className en prop
}

export default function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname();
  const [notifCount, setNotifCount] = useState<number>(0);
  const [pulse, setPulse] = useState(false);
  const prevCount = useRef<number>(0);

  const fetchNotifCount = async () => {
    try {
      const res = await fetch("/api/notifications/count");
      if (!res.ok) throw new Error("Erreur fetch count");
      const data = await res.json();
      const count = data.count || 0;

      if (count !== prevCount.current && prevCount.current !== 0) {
        setPulse(true);
        setTimeout(() => setPulse(false), 5000);
      }

      prevCount.current = count;
      setNotifCount(count);
    } catch (err) {
      console.error("Erreur fetch notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifCount();
    const interval = setInterval(fetchNotifCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const links = [
    { name: "Accueil", href: "/", icon: "🏠" },
    { name: "Boutique", href: "/shop", icon: "🛍️" },
    { name: "Notification", href: "/notifications", icon: "🔔", badge: notifCount },
    { name: "Blog", href: "/blog", icon: "▶️" },
  ];

  return (
    <nav className={`bg-white border-t shadow-inner z-50 ${className || ""}`}>
      <div className="flex justify-around py-3 text-sm relative">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center relative ${
              pathname === link.href
                ? "text-black font-semibold"
                : "text-gray-500"
            }`}
          >
            <span className="relative">
              {link.icon}
              {link.badge && link.badge > 0 && (
                <span
                  className={`absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transition-transform ${
                    pulse ? "animate-pulse scale-125" : ""
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </span>
            <span>{link.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}