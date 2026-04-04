"use client";
import { useState, useEffect } from "react";

interface Filter {
  category?: string;
  search?: string;
}

interface ShopFilterProps {
  onFilter: (filters: Filter) => void;
}

export default function ShopFilter({ onFilter }: ShopFilterProps) {
  const [category, setCategory] = useState<string | "">("");
  const [search, setSearch] = useState("");

  const categories = ["Robes", "Pantalons", "Hauts", "Accessoires", "Jupes", "Jeans", "Boyfriends", "Combinaisons", "Vestes"];

  useEffect(() => {
    const delay = setTimeout(() => {
      onFilter({
        category: category || undefined,
        search: search || undefined,
      });
    }, 300);

    return () => clearTimeout(delay);
  }, [category, search]);

  return (
    <aside className="bg-white p-4 rounded-xl shadow-md w-full md:w-64">
      <h2 className="font-semibold text-center text-2xl mb-2">Filtrage Par</h2>

      <div className="mb-4">
        <h4 className="font-medium text-center text-2xl mb-2">Catégorie</h4>
        <ul className="space-y-1 text-sm">
          <li>
            <button
              className={`hover:text-black transition ${
                category === "" ? "font-semibold text-black" : "text-gray-500"
              }`}
              onClick={() => setCategory("")}
            >
              Toutes
            </button>
          </li>

          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`hover:text-black transition ${
                  category === cat
                    ? "font-semibold text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
    </aside>
  );
}