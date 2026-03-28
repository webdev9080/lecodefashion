"use client";
import { useState } from "react";

export default function CreateProductPage() {
  const [form, setForm] = useState({ name: "", price: "", category: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Veuillez sélectionner une image !");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("image", imageFile);

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      alert("Produit ajouté avec succès !");
      setForm({ name: "", price: "", category: "" });
      setImageFile(null);
      setPreview(null);
    } catch (error) {
      alert("Erreur lors de l'ajout du produit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-8">
      
      {/* CARD */}
      <div className="w-full max-w-md md:max-w-lg bg-white p-5 md:p-6 rounded-xl shadow">

        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
          Ajouter un produit
        </h2>

        <form onSubmit={handleSubmit} className="flex w-40 flex-col gap-2">

          {/* NOM */}
          <input
            type="text"
            name="name"
            placeholder="Nom du produit"
            value={form.name}
            onChange={handleChange}
            required
            className="p-1 w-30 border rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* PRIX */}
          <input
            type="number"
            name="price"
            placeholder="Prix"
            value={form.price}
            onChange={handleChange}
            required
            className="p-1 w-30 border rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* CATÉGORIE */}
          <input
            type="text"
            name="category"
            placeholder="Catégorie"
            value={form.category}
            onChange={handleChange}
            required
            className="p-1 w-30 border rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="p-1 w-30 border rounded-lg text-sm"
          />

          {/* PREVIEW */}
          {preview && (
            <div className="w-full h-40 md:h-48 overflow-hidden rounded-lg border">
              <img
                src={preview}
                alt="Aperçu du produit"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Ajout en cours..." : "Ajouter le produit"}
          </button>

        </form>
      </div>
    </div>
  );
}