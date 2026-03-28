"use client";

import useSWR from "swr";
import { useState, useMemo } from "react";
import ShopCard from "@/components/ShopCard";
import ShopFilter from "@/components/ShopFilter";
import Pagination from "@/components/Pagination";
import ShopSkeleton from "@/components/skeletons/ShopSkeleton";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

// 🔥 Fetcher amélioré
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erreur fetch produits");
  return res.json();
};

export default function ShopPage() {
  const { data: products, isLoading, error } = useSWR(
    "/api/products",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const [filters, setFilters] = useState<{
    category?: string;
    search?: string;
  }>({});

  const [page, setPage] = useState(1);

  // 🔥 Filtrage optimisé (useMemo)
  const filtered = useMemo(() => {
    if (!products) return [];

    return products.filter((p: Product) => {
      const matchCategory = filters.category
        ? p.category === filters.category
        : true;

      const matchSearch = filters.search
        ? p.name.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      return matchCategory && matchSearch;
    });
  }, [products, filters]);

  // 📄 Pagination
  const perPage = 8;

  const paginated = useMemo(() => {
    return filtered.slice((page - 1) * perPage, page * perPage);
  }, [filtered, page]);

  // 🔥 Reset page si filtre change
  const handleFilter = (f: any) => {
    setFilters(f);
    setPage(1);
  };

  // ✅ Loading
  if (isLoading && !products) {
    return (
      <main className="min-h-screen px-4 md:px-8 pt-5 pb-20 bg-gray-50">
        <ShopSkeleton />
      </main>
    );
  }

  // ❌ Erreur
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          Une erreur est survenue lors du chargement des produits.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-10 pt-6 pb-20 bg-gray-50">

      {/* 🔥 HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Boutique 🛍️
        </h1>
        <p className="text-gray-500 text-sm">
          Découvrez nos articles tendance
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* 🎯 FILTRE */}
        <ShopFilter onFilter={handleFilter} />

        {/* 🛍️ PRODUITS */}
        <div className="flex-1">
          
          {/* 🔥 Résultats */}
          <p className="text-sm text-gray-500 mb-4">
            {filtered.length} produit(s) trouvé(s)
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            
            {paginated.length > 0 ? (
              paginated.map((product: Product) => (
                <ShopCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center mt-10 text-gray-500">
                <p className="text-lg">😕 Aucun produit trouvé</p>
                <p className="text-sm">Essayez un autre filtre</p>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* 📄 PAGINATION */}
      {filtered.length > perPage && (
        <Pagination
          total={filtered.length}
          page={page}
          setPage={setPage}
        />
      )}
    </main>
  );
}