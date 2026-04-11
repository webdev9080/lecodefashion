"use client";

import useSWR from "swr";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogClient() {
  const { data, isLoading } = useSWR("/api/blog", fetcher);

  if (isLoading) {
    return (
      <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <BlogSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((post: any) => (
        <VideoCard key={post._id} post={post} />
      ))}
    </div>
  );
}

function VideoCard({ post }: any) {
  const [error, setError] = useState(false);
  const [play, setPlay] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition">
      
      {/* 🎥 VIDEO CONTAINER */}
      <div className="relative w-full h-52 overflow-hidden">
        
        {!error && post.videoUrl ? (
          <>
            {/* VIDEO */}
            {play ? (
              <video
                controls
                autoPlay
                className="w-full h-full object-cover"
                onError={() => setError(true)}
              >
                <source src={post.videoUrl} />
              </video>
            ) : (
              <>
                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                  
                  {/* BOUTON PLAY */}
                  <button
                    onClick={() => setPlay(true)}
                    className="bg-white/90 hover:bg-white text-black p-4 rounded-full shadow-lg transition transform hover:scale-110"
                  >
                    <FaPlay />
                  </button>
                </div>

                {/* IMAGE FALLBACK */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  Aperçu vidéo
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500">
            <span className="text-3xl mb-2">🎥</span>
            Vidéo indisponible
          </div>
        )}
      </div>

      {/* INFOS */}
      <div className="p-4">
        <h2 className="font-semibold text-lg line-clamp-1">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {post.category}
        </p>
        {/* DESCRIPTION */}
        {post.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            
            {post.description}
          </p>
)}
      </div>
    </div>
  );
}

function BlogSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      
      {/* IMAGE */}
      <div className="w-full h-52 bg-gray-200"></div>

      {/* TEXTE */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}