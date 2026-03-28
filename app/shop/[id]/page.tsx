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

export default function ProductPage() {
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
      });
  }, [id]);
  
  {/*<p className="text-center mt-10">Chargement...</p>;*/}
  
  if (loading) return <ProductPageSkeleton />;
  if (!product) return <p className="text-center mt-10">Produit introuvable</p>;

  const whatsappMessage = `Bonjour, je suis intéressé par ce produit :
Nom: ${product.name}
Prix: ${product.price} FCFA`;

  return (
    <div className="min-h-screen bg-white px-4 md:px-10 pt-5 pb-20">
      
      {/* Fil d'Ariane */}
      <nav className="text-sm text-gray-500 mb-4">
        <span className="hover:underline cursor-pointer"><Link href="/">Accueil</Link></span> &gt;{" "}
        <span className="hover:underline cursor-pointer"><Link href="/shop">Boutique</Link></span> &gt;{" "}
        <span className="font-semibold text-gray-800">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* IMAGE PRINCIPALE */}
        <div className="w-full h-80 md:h-[500px] overflow-hidden rounded-xl shadow">
          <Image
            src={product.image}
            alt={product.name || "Lecodefashion image"}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        {/* INFOS */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          <p className="text-green-600 text-xl md:text-2xl font-semibold">{product.price} FCFA</p>
          <p className="text-gray-500">Catégorie : {product.category}</p>

          {/* Boutons d'achat */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              className="bg-green-500 text-white px-6 py-3 rounded-lg text-center hover:bg-green-600 transition flex-1"
            >
              Acheter sur WhatsApp
            </a>
            {/*<button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition flex-1">
              Ajouter au panier
            </button>*/}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">
              {product.description || "Produit de qualité disponible chez Lecodefashion."}
            </p>
          </div>

          {/* Détails */}
          {product.details && product.details.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Détails du produit</h2>
              <ul className="text-gray-700 list-disc list-inside">
                {product.details.map((d, idx) => (
                  <li key={idx}>
                    <strong>{d.key}:</strong> {d.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Produits similaires */}
      
      {product.category &&
      <SimilarProductsCarousel
        category={product.category}
        excludeId={product._id}
        title="Produits similaires"
      />}
      
      <ProductReviews productId={product._id} />
    </div>
  );
}