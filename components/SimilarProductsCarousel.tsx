"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CarouselProps {
  category: string;
  excludeId?: string;
  title?: string;
}

export default function SimilarProductsCarousel({
  category,
  excludeId,
  title = "Produits similaires",
}: CarouselProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔥 FETCH
  useEffect(() => {
    fetch(`/api/products?category=${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = excludeId
          ? data.filter((p: Product) => p._id !== excludeId)
          : data;

        setProducts(filtered);
      })
      .catch(console.error);
  }, [category, excludeId]);

  // 🔄 AUTO SLIDE
  useEffect(() => {
    if (!products.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [products]);

  // ⬅️➡️ MANUAL NAV
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % products.length
    );
  };

  if (!products.length) return null;

  return (
    <div className="mt-10 max-w-xl mx-auto">
      
      {/* TITLE */}
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
        {title}
      </h2>

      {/* CAROUSEL */}
      <div className="relative w-full h-72 md:h-80 overflow-hidden rounded-2xl shadow-lg">

        {products.map((product, index) => (
          <Link
            key={product._id}
            href={`/shop/${product._id}`}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentIndex
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-105 z-0"
            }`}
          >
            <div className="relative w-full h-full">

              {/* 🔥 IMAGE CLOUDINARY SAFE */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/images/fallback.jpg";
                }}
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/30" />

              {/* INFOS */}
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-bold text-lg">{product.name}</p>
                <p className="text-green-400 font-semibold">
                  {product.price} FCFA
                </p>
              </div>
            </div>
          </Link>
        ))}

        {/* ⬅️➡️ BUTTONS */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full"
        >
          ›
        </button>

        {/* 🔵 DOTS */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {products.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentIndex
                  ? "bg-white"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}