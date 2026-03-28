"use client";
import Skeleton from "@/components/ui/Skeleton";

export default function CarouselSkeleton() {
  return (
    <div className="mt-10 max-w-xl mx-auto">
      <Skeleton className="h-6 w-1/2 mx-auto mb-4" />
      <Skeleton className="w-full h-72 md:h-80 rounded-xl" />
    </div>
  );
}