"use client";
import Skeleton from "@/components/ui/Skeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ShopSkeleton() {
  return (
    <div className="px-4 md:px-10 pt-5 pb-20">

      {/* Titre */}
      <Skeleton className="h-8 w-40 mb-6" />

      {/* Barre de recherche / filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Skeleton className="h-10 w-full md:w-1/2" />
        <Skeleton className="h-10 w-full md:w-1/4" />
      </div>

      {/* Grille produits */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}