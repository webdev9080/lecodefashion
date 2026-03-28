"use client";

import LogoutButton from "@/components/LogoutButton";

export default function NavbarDashboard() {
  return (
    <header className="bg-white shadow p-1 flex justify-between items-center">
      
      <h1 className="font-bold text-xl text-center">
        Lecodefashion Dashboard
      </h1>

      <div className="flex items-center gap-2 px-2">
        <button className="bg-green-500 text-white text-sm px-2 py-1 rounded hover:bg-green-600 transition">
          Admin
        </button>

        <LogoutButton />
      </div>
    </header>
  );
}