"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import StarRating from "./StarRating";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProductReviews({ productId }: { productId: string }) {
  const { data: reviews, mutate } = useSWR(
    `/api/reviews?productId=${productId}`,
    fetcher
  );

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  // 🔥 Moyenne des notes
  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({
        productId,
        name,
        comment,
        rating,
      }),
    });

    setName("");
    setComment("");
    setRating(5);

    mutate(); // refresh
  };

  return (
    <div className="mt-12">

      {/* 🔥 HEADER AVIS */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Avis clients</h2>

        <div className="flex items-center gap-2">
          <StarRating rating={Math.round(Number(averageRating))} />
          <span className="text-gray-600 text-sm">
            {averageRating} / 5 ({reviews?.length || 0} avis)
          </span>
        </div>
      </div>

      {/* FORMULAIRE */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8">
        <input
          type="text"
          placeholder="Votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <textarea
          placeholder="Votre avis..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {[5,4,3,2,1].map(n => (
            <option key={n} value={n}>{n} ⭐</option>
          ))}
        </select>

        <button className="bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Envoyer
        </button>
      </form>

      {/* LISTE AVIS */}
      <div className="flex flex-col gap-4">
        {reviews?.length > 0 ? (
          reviews.map((r: any) => (
            <div key={r._id} className="border p-4 rounded-xl shadow-sm">
              
              <div className="flex justify-between items-center mb-1">
                <strong>{r.name}</strong>
                <StarRating rating={r.rating} />
              </div>

              <p className="text-gray-600">{r.comment}</p>

              <span className="text-xs text-gray-400">
                {new Date(r.createdAt).toLocaleDateString()}
              </span>

            </div>
          ))
        ) : (
          <p className="text-gray-500">Aucun avis pour ce produit.</p>
        )}
      </div>

    </div>
  );
}