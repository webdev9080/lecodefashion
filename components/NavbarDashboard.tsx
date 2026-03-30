"use client";

import LogoutButton from "@/components/LogoutButton";

export default function NavbarDashboard() {
  return (
    <header className="mt-4 bg-gray-900 py-4 shadow flex justify-between items-center">
      
      {/*}<h1 className="font-bold text-small text-center">
        Lecodefashion
      </h1>*/}

      <div className="flex items-center gap-2 px-2 py-2 md:py-4">
        {/*}<button className="text-white text-sm px-2 py-1 rounded hover:bg-green-600 transition">
          Admin
        </button>*/}
        <div>
          <LogoutButton />
        </div>
        
      </div>
    </header>
  );
}