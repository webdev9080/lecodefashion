"use client";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  link: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const whatsappNumber = "22890805252"; // Ton numéro WhatsApp

  const handleWhatsAppBuy = () => {
    const message = `Bonjour, le produit "${product.name}" (${product.price} FCFA) est-il toujours disponible ? Voici l'image : ${window.location.origin}${product.image}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="border rounded-xl p-3 shadow-md hover:shadow-lg transition bg-white flex flex-col">
      <Image
        src={product.image.startsWith("/") ? product.image : `/uploads/${product.image}`}
        alt={product.name}
        width={300}
        height={300}
        className="rounded-lg object-cover mb-3"
      />

      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-green-600 mb-3">{product.price} FCFA</p>

      {/* Deux boutons sur la même ligne */}
      <div className="flex gap-2 mt-auto">
        {/* WhatsApp Buy */}
        <button
          onClick={handleWhatsAppBuy}
          className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 hover:scale-105 shadow-md transition transform"
        >
          <FaWhatsapp className="text-xl" />
          Buy
        </button>

        {/* Voir plus */}
        <Link
          href={product.link}
          className="flex-1 flex items-center justify-center text-center bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 hover:scale-105 transition transform"
        >
          Voir plus
        </Link>
      </div>
    </div>
  );
}