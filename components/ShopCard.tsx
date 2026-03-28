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

  const handleWhatsAppBuy = () => {
    const message = `Bonjour, je suis intéressé par ce produit :

Nom : ${product.name}
Prix : ${product.price} FCFA
Image : https://tonsite.com${product.image}

Est-il toujours disponible ?`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition flex flex-col">
      
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
  src={product.image}
  alt={product.name || "Produit Lecodefashion"}
  fill
  sizes="(max-width: 768px) 100vw, 
         (max-width: 1024px) 50vw, 
         25vw"
  className="object-cover rounded-lg"
/>
      </div>

      {/* Infos */}
      <h3 className="font-semibold mt-3">{product.name}</h3>
      <p className="text-green-600 font-bold">{product.price} FCFA</p>

      {/* Boutons */}
      <div className="flex gap-2 mt-3">
        
        {/* WhatsApp Buy */}
        <button
          onClick={handleWhatsAppBuy}
          className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 transition"
        >
          <FaWhatsapp />
          Buy
        </button>

        {/* Voir plus*/}
        <Link
          href={`/shop/${product._id}`}
          className="flex-1 text-center bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition"
        >
          Voir plus
        </Link>

      </div>
    </div>
  );
}