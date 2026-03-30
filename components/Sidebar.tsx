"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/contact/messages")
      .then((res) => res.json())
      .then((data) => {
        setCount(data.messages?.length || 0);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <aside className="mt-4 md:mt-4 w-30 bg-gray-900 text-white h-auto p-4 flex flex-col">
      <h2 className="text-xl text-center font-bold mb-6">Dashboard</h2>

      <nav className="flex flex-col gap-3 text-center">
        <Link href="/dashboard" className="hover:bg-gray-700 p-2 rounded">
          Accueil
        </Link>

        <Link href="/dashboard/products" className="hover:bg-gray-700 p-2 rounded">
          Produits
        </Link>

        <Link href="/dashboard/products/create" className="hover:bg-gray-700 p-2 rounded">
          Ajouter Produit
        </Link>
        
        <Link href="/dashboard/notifications/create" className="hover:bg-gray-700 p-2 rounded">
           Send Notifications
        </Link>

        {/* 🔥 Messages avec badge */}
        <Link
          href="/contact/messages"
          className="hover:bg-gray-700 p-2 rounded flex justify-between items-center"
        >
          <span>Messages</span>

          {count > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {count}
            </span>
          )}
        </Link>

        <Link href="/dashboard/orders" className="hover:bg-gray-700 p-2 rounded">
          Commandes
        </Link>
      </nav>
    </aside>
  );
}