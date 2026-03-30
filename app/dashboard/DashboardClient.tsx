"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserProvider";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

// Skeleton pour les statistiques
function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {Array(3).fill(0).map((_, i) => (
        <div key={i} className="bg-gray-200 h-24 rounded-xl"></div>
      ))}
    </div>
  );
}

// Skeleton pour les produits récents
function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 animate-pulse mt-4">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="bg-gray-200 h-60 rounded-xl"></div>
      ))}
    </div>
  );
}

export default function DashboardClient() {
  const { user, loading: userLoading } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (userLoading) return <p className="text-center mt-20">Chargement...</p>;

  if (!user || user.role !== "admin")
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-2">
        <div>
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="text-gray-500">
            Vous n'avez pas les permissions pour accéder à cette page.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );

  return (
    <div className="p-6 md:p-6 flex flex-col gap-4">
      {/* 🔥 TITRE */}
      <h1 className="text-xl md:text-3xl font-bold">Dashboard Lecodefashion</h1>

      {/* 📊 STATISTIQUES */}
      {loading ? <StatsSkeleton /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-2 rounded-xl shadow text-center">
            <h2 className="text-2xl font-bold">{products.length}</h2>
            <p className="text-gray-500">Produits</p>
          </div>
          <div className="bg-white p-2 rounded-xl shadow text-center">
            <h2 className="text-2xl">💰</h2>
            <p className="text-gray-500">Ventes</p>
          </div>
          <div className="bg-white p-2 rounded-xl shadow text-center">
            <h2 className="text-2xl">📦</h2>
            <p className="text-gray-500">Commandes</p>
          </div>
        </div>
      )}

      {/* ➕ AJOUT PRODUIT */}
      <div className="flex justify-center md:justify-end mt-4">
        <Link
          href="/dashboard/products/create"
          className="w-full md:w-auto text-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          + Ajouter un produit
        </Link>
      </div>

      {/* 🛍️ PRODUITS RÉCENTS */}
      <div className="mt-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Produits récents
        </h2>

        {loading ? <ProductsSkeleton /> : (
          products.length === 0 ? (
            <p className="text-center text-gray-500">Aucun produit ajouté.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {products.slice(0, 8).map((p) => (
                <div
                  key={p._id}
                  className="bg-white p-3 rounded-xl shadow hover:shadow-md transition flex flex-col"
                >
                  <div className="w-full h-30 sm:h-40 overflow-hidden rounded-lg">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2 flex flex-col flex-1">
                    <h3 className="font-semibold text-sm md:text-base">{p.name}</h3>
                    <p className="text-green-600 font-bold text-sm">{p.price} FCFA</p>
                    <p className="text-gray-500 text-xs">{p.category}</p>
                    <Link
                      href={`/dashboard/products`}
                      className="mt-auto text-center text-sm text-blue-500 underline"
                    >
                      Voir
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}