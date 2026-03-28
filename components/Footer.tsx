"use client";

import Link from "next/link";
import { useState } from "react";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`Merci pour votre abonnement : ${email}`);
    setEmail("");
  };

  return (
    <footer
      className={`bg-gray-900 text-gray-300 pt-5 pb-10 px-6 ${className}`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 🏷️ Logo + description */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3 transition-transform hover:scale-105">
            Lecodefashion
          </h2>
          <p className="text-sm text-center">
            Boutique de mode tendance à petit prix à Lomé. Trouve ton style avec élégance.
          </p>
        </div>

        {/* 📞 Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Lomé, Togo</li>
            <li>📞 +228 90 80 52 52</li>
            <li>
              <a
                href="https://wa.me/22890805252"
                target="_blank"
                className="text-green-400 hover:text-green-500 transition"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* ✉️ Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-3">Newsletter</h3>
          <p className="text-sm mb-3">
            Abonnez-vous pour recevoir nos nouveautés et promos
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded text-gray-300 outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 hover:scale-105 transition-transform duration-200"
            >
              S'abonner
            </button>
          </form>
        </div>

      </div>

      {/* 🔻 Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        <p>© 2026 Lecodefashion — Tous droits réservés</p>
      </div>
    </footer>
  );
}