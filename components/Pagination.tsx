"use client";

interface PaginationProps {
  total: number;
  page: number;
  setPage: (p: number) => void;
}

export default function Pagination({ total, page, setPage }: PaginationProps) {
  const pages = Array.from({ length: Math.ceil(total / 8) }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6 gap-2">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1 rounded ${
            p === page ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}