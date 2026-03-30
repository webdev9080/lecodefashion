import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      
      {/* 🔥 HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center bg-black text-white">
        <Image
          src="/images/hero1.jpg"
          alt="Lecodefashion"
          fill
          priority
          className="object-cover opacity-60"
        />

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Lecodefashion
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Élégance & Style à petit prix
          </p>

          <Link
            href="/shop"
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Voir la boutique
          </Link>
        </div>
      </section>

      {/* 🛍️ PRODUITS POPULAIRES */}
      <section className="py-12 px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Produits populaires
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl p-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-lg object-cover"
              />

              <h3 className="font-semibold mt-2">
                {product.name}
              </h3>

              <p className="text-green-600">
                {product.price.toLocaleString()} FCFA
              </p>
              <Link
                href={product.link}
                className="text-sm text-blue-500"
              >
                Acheter
              </Link>
              
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/shop"
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
          >
            Voir tous les produits
          </Link>
        </div>
      </section>

      {/* 🧥 CATÉGORIES */}
      <section className="py-12 bg-gray-100 px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Catégories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <Link href="/shop"><div className="bg-white p-6 rounded-xl shadow text-center hover:scale-105 transition">
            👖 Pantalons
          </div></Link>

          <Link href="/shop"><div className="bg-white p-6 rounded-xl shadow text-center hover:scale-105 transition">
            👗 Robes
          </div></Link>

          <Link href="/shop"><div className="bg-white p-6 rounded-xl shadow text-center hover:scale-105 transition">
            🧥 Hauts
          </div></Link>

          <Link href="/shop"><div className="bg-white p-6 rounded-xl shadow text-center hover:scale-105 transition">
            ⌚ Accessoires
          </div></Link>

        </div>
      </section>

      {/* 📞 CTA WHATSAPP */}
      <section className="py-12 px-6 text-center bg-black text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Commander rapidement
        </h2>

        <p className="mb-6">
          Contacte-nous directement sur WhatsApp pour passer ta commande
        </p>

        <a
          href="https://wa.me/22890805252"
          target="_blank"
          className="bg-green-500 px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition"
        >
          Commander sur WhatsApp
        </a>
      </section>
      
  </main>
  );
}