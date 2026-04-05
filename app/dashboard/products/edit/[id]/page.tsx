"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export default function EditProductPage() {
  
  const router = useRouter();
  const params = useParams<{ id: string }>();

  if (!params || !params.id) {
  return <p>Erreur : ID manquant</p>;
}

  const id = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", price: "", category: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Récupérer le produit depuis l'API
  useEffect(() => {
  if (!id) return;

  async function fetchProduct() {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) return alert("Produit non trouvé !");
    const data = await res.json();
    setProduct(data);
    setForm({
      name: data.name,
      price: data.price.toString(),
      category: data.category,
    });
    setPreview(data.image);
    setLoading(false);
  }

  fetchProduct();
}, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    if (imageFile) formData.append("image", imageFile);

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) return alert("Erreur lors de la mise à jour !");
    alert("Produit mis à jour avec succès !");
    router.push("/dashboard"); // Retour au dashboard
  };

  if (loading) return <p>Chargement du produit...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white p-2 rounded shadow">
      <h2 className="text-2xl text-center font-bold mb-4">Modifier le produit</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          required
          className="p-2 w-30 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={form.price}
          onChange={handleChange}
          required
          className="p-2 w-30 border rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Catégorie"
          value={form.category}
          onChange={handleChange}
          required
          className="p-2 w-30 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="p-2 w-30 border rounded"
        />

        {/* Aperçu image */}
        {preview && (
          <img
            src={preview}
            alt="Aperçu"
            className="w-full h-48 object-cover rounded mt-2 border"
          />
        )}

        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Mettre à jour
        </button>
      </form>
    </div>
  );
}