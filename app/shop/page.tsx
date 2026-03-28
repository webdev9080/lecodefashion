"use client";

import useSWR from "swr";
import { useState } from "react";
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

// 🔥 Fetcher SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ShopPage() {
  const { data: products, isLoading } = useSWR("/api/products", fetcher, {
    revalidateOnFocus: false, // ❌ évite reload quand tu changes d’onglet
    dedupingInterval: 60000, // 🔥 cache pendant 60s
  });

  const [filters, setFilters] = useState<{
    category?: string;
    search?: string;
  }>({});
  const [page, setPage] = useState(1);

  // 🔍 Filtrage
  const filtered = (products || []).filter((p: Product) => {
    const matchCategory = filters.category
      ? p.category === filters.category
      : true;

    const matchSearch = filters.search
      ? p.name.toLowerCase().includes(filters.search.toLowerCase())
      : true;

    return matchCategory && matchSearch;
  });

  // 📄 Pagination
  const perPage = 8;
  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // ✅ Skeleton intelligent
  if (isLoading && !products) {
    return (
      <main className="min-h-screen px-4 md:px-8 pt-5 pb-20 bg-gray-50">
        <ShopSkeleton />
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-8 pt-5 pb-20 bg-gray-50">
      
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* 🎯 FILTRE */}
        <ShopFilter
          onFilter={(f) => {
            setFilters(f);
            setPage(1);
          }}
        />

        {/* 🛍️ PRODUITS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
          
          {paginated.length > 0 ? (
            paginated.map((product: Product) => (
              <ShopCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center mt-10">
              Aucun produit trouvé.
            </p>
          )}

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