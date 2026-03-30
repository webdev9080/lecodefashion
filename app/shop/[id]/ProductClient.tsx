"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SimilarProductsCarousel from "@/components/SimilarProductsCarousel";
import ProductPageSkeleton from "@/components/skeletons/ProductPageSkeleton";
import ProductReviews from "@/components/ProductReviews";


interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  details?: { key: string; value: string }[];
}

export default function ProductClient() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const whatsappNumber = "22890805252";

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <ProductPageSkeleton />;
  if (!product)
    return <p className="text-center mt-10">Produit introuvable</p>;

  // 🔥 Optimisation Cloudinary
  const optimizedImage = product.image
    ? product.image.replace("/upload/", "/upload/f_auto,q_auto/")
    : "/images/placeholder.png";

  const whatsappMessage = `Bonjour, je suis intéressé par ce produit :

Nom: ${product.name}
Prix: ${product.price} FCFA
Lien: ${typeof window !== "undefined" ? window.location.href : ""}

Est-il disponible ?`;

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 pt-6 pb-20">
      
      {/* 🔥 Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">Accueil</Link> &gt;{" "}
        <Link href="/shop" className="hover:underline">Boutique</Link> &gt;{" "}
        <span className="font-semibold text-gray-800">
          {product.name}
        </span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        
        {/* 🖼️ IMAGE */}
        <div className="relative w-full h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-lg group">
          <Image
            src={optimizedImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/images/placeholder.png";
            }}
          />
        </div>

        {/* 📦 INFOS */}
        <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow">
          
          <h1 className="text-2xl md:text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-green-600 text-2xl font-bold">
            {product.price} FCFA
          </p>

          <p className="text-gray-500">
            Catégorie : {product.category}
          </p>

          {/* 🛒 ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              className="bg-green-500 text-white px-6 py-3 rounded-xl text-center font-semibold hover:bg-green-600 transition flex-1 shadow"
            >
              Acheter sur WhatsApp
            </a>

            <Link
              href="/shop"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl text-center hover:bg-gray-300 transition flex-1"
            >
              Retour boutique
            </Link>
          </div>

          {/* 📝 DESCRIPTION */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">
              Description
            </h2>
            <p className="text-center text-gray-700 leading-relaxed">
              {product.description ||
                "Produit de qualité disponible chez Lecodefashion."}
            </p>
          </div>

          {/* 📋 DETAILS */}
          {product.details && product.details.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">
                Détails du produit
              </h2>
              <ul className="text-gray-700 space-y-1">
                {product.details.map((d, idx) => (
                  <li key={idx}>
                    <strong>{d.key} :</strong> {d.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 🔥 PRODUITS SIMILAIRES */}
      {product.category && (
        <div className="mt-12">
          <SimilarProductsCarousel
            category={product.category}
            excludeId={product._id}
            title="Produits similaires"
          />
        </div>
      )}

      {/* ⭐ AVIS */}
      <div className="mt-12">
        <ProductReviews productId={product._id} />
      </div>
    </div>
  );
}