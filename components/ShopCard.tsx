"use client";

import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  link?: string;
}

export default function ShopCard({ product }: { product: Product }) {
  const whatsappNumber = "22890805252";

  // ✅ Optimisation Cloudinary (auto format + qualité)
  const optimizedImage = product.image
    ? product.image.replace("/upload/", "/upload/f_auto,q_auto/")
    : "/images/placeholder.png";

  const handleWhatsAppBuy = () => {
    const message = `Bonjour, je suis intéressé par ce produit :

Nom : ${product.name}
Prix : ${product.price} FCFA
Image : ${product.image}

Est-il toujours disponible ?`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 flex flex-col overflow-hidden group">
      
      {/* 🖼️ Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={optimizedImage}
          alt={product.name || "Produit Lecodefashion"}
          fill
          sizes="(max-width: 768px) 100vw, 
                 (max-width: 1024px) 50vw, 
                 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/images/placeholder.png";
          }}
        />
      </div>

      {/* 📦 Infos */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold text-sm md:text-base line-clamp-2">
          {product.name}
        </h3>

        <p className="text-green-600 font-bold mt-1">
          {product.price} FCFA
        </p>

        {/* 🛒 Actions */}
        <div className="flex gap-2 mt-auto pt-3">
          
          {/* WhatsApp */}
          <button
            onClick={handleWhatsAppBuy}
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition"
          >
            <FaWhatsapp />
            Acheter
          </button>

          {/* Voir */}
          <Link
            href={`/shop/${product._id}`}
            className="flex-1 text-center bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition"
          >
            Voir
          </Link>

        </div>
      </div>
    </div>
  );
}