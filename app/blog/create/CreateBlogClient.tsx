"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlogClient() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const router = useRouter();

  const handleVideoChange = (file: File | null) => {
    setVideo(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!title || !category || !description)
      return alert("Remplis tous les champs !");
    if (!video) return alert("Ajoute une vidéo");

    setLoading(true);

    try {
      // 1. Upload vidéo
      const formData = new FormData();
      formData.append("video", video);

      const uploadRes = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.url) throw new Error("Upload échoué");

      // 2. Sauvegarde blog
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          description,
          type: "video",
          videoUrl: uploadData.url,
        }),
      });

      if (!res.ok) throw new Error("Erreur sauvegarde blog");

      router.push("/blog");
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-2">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-4 md:p-10">

        {/* HEADER */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          🎬 Créer un post vidéo
        </h1>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Titre de la vidéo"
          className="w-full border border-gray-200 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* CATEGORY */}
        <input
          type="text"
          placeholder="Catégorie (ex: mode, lifestyle...)"
          className="w-full border border-gray-200 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setCategory(e.target.value)}
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description de la vidéo..."
          className="w-full border border-gray-200 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none h-28"
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* UPLOAD */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center mb-4 hover:border-green-400 transition">
          <input
            type="file"
            accept="video/*"
            className="w-full"
            onChange={(e) =>
              handleVideoChange(e.target.files?.[0] || null)
            }
          />
        </div>

        {/* PREVIEW VIDEO */}
        {preview && (
          <video
            src={preview}
            controls
            className="w-full rounded-lg mb-4 shadow"
          />
        )}

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "⏳ Publication..." : "🚀 Publier la vidéo"}
        </button>
      </div>
    </div>
  );
}