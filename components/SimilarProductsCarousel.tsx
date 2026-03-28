"use client";
import Image from "next/image";
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

  // fetch produits
  useEffect(() => {
    fetch(`/api/products?category=${encodeURIComponent(category)}`)
      .then(res => res.json())
      .then(data => {
        const filtered = excludeId
          ? data.filter((p: Product) => p._id !== excludeId)
          : data;
        setProducts(filtered);
      })
      .catch(console.error);
  }, [category, excludeId]);

  // auto-slide toutes les 3s
  useEffect(() => {
    if (!products.length) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);

  if (!products.length) return null;

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">{title}</h2>

      <div className="relative w-full h-72 md:h-80 overflow-hidden rounded-xl shadow">
        {products.map((product, index) => (
          <Link
            key={product._id}
            href={`/shop/${product._id}`}
            className={`absolute inset-0 transition-transform duration-700 ${
              index === currentIndex ? "translate-x-0 z-10" : "translate-x-full z-0"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 text-white bg-black/50 px-3 py-1 rounded">
                <p className="font-semibold text-sm md:text-base">{product.name}</p>
                <p className="text-green-400 text-sm md:text-base">{product.price} FCFA</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}