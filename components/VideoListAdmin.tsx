"use client";

import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface Blog {
  _id: string;
  title: string;
  type: "video" | "article";
  category: string;
  videoUrl: string;
  content?: string;
}

export default function VideoListAdmin() {
  const [videos, setVideos] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 charger les vidéos
  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();

      const onlyVideos = data.filter(
        (item: Blog) => item.type === "video"
      );

      setVideos(onlyVideos);
    } catch (error) {
      console.error("Erreur fetch videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // 🗑️ supprimer vidéo
  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette vidéo ?")) return;

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setVideos((prev) => prev.filter((v) => v._id !== id));
      }
    } catch (error) {
      console.error("Erreur delete:", error);
    }
  };

  if (loading) return <p className="text-center">Chargement...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div
          key={video._id}
          className="bg-white rounded-xl shadow p-3 relative"
        >
          {/* 🎥 VIDEO */}
          <div className="w-full h-48">
            <iframe
              src={video.videoUrl}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>

          {/* TITLE */}
          <h3 className="font-semibold mt-3">{video.title}</h3>
          <p className="text-sm text-gray-500">{video.category}</p>

          {/* 🗑️ DELETE */}
          <button
            onClick={() => handleDelete(video._id)}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
}