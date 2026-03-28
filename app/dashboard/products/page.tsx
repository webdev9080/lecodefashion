"use client";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch produits
  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // 🔥 SUPPRESSION
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Supprimer ce produit ?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      // update UI
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        Liste des produits
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p => (
          <div
            key={p._id}
            className="bg-white p-3 rounded-xl shadow hover:shadow-md transition flex flex-col"
          >
            {/* IMAGE */}
            <div className="w-full h-40 overflow-hidden rounded-lg">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* INFOS */}
            <div className="mt-2 flex flex-col flex-1">
              <h3 className="font-semibold text-sm md:text-base">
                {p.name}
              </h3>

              <p className="text-green-600 font-bold text-sm">
                {p.price} FCFA
              </p>

              <p className="text-gray-500 text-xs">
                {p.category}
              </p>

              {/* ACTIONS */}
              <div className="flex justify-between items-center mt-auto pt-2">
                
                {/* EDIT */}
                <Link
                  href={`/dashboard/products/edit/${p._id}`}
                  className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                >
                  <FaEdit />
                </Link>

                {/* DELETE */}
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                >
                  <FaTrash />
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}