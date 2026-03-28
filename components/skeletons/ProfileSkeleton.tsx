// components/skeleton/ProfileSkeleton.tsx
"use client";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-20 py-10 animate-pulse">

      {/* HEADER */}
      <div className="bg-gray-300 h-32 rounded-2xl mb-10"></div>

      {/* INFOS */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* USER INFO */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow flex gap-6 items-center">
          
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gray-300"></div>

          {/* Text */}
          <div className="flex flex-col gap-3 w-full">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>

        {/* STATS */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-4">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>

          <div className="h-3 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* HISTORIQUE */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-3 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 rounded mb-2"></div>
      </div>

      {/* NOTIFICATIONS */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-3 bg-gray-300 rounded"></div>
      </div>

    </div>
  );
}