"use client";
import Skeleton from "@/components/ui/Skeleton";

export default function ProductPageSkeleton() {
  return (
    <div className="min-h-screen px-4 md:px-10 pt-5">
      <div className="grid md:grid-cols-2 gap-8">

        {/* Image */}
        <Skeleton className="w-full h-80 md:h-[500px] rounded-xl" />

        {/* Infos */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />

          <Skeleton className="h-10 w-full mt-4" />
          <Skeleton className="h-10 w-full" />

          <Skeleton className="h-20 w-full mt-6" />
        </div>
      </div>
    </div>
  );
}