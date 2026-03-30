"use client";
import { useState } from "react";
import { useToast } from "@/context/ToastProvider";

export default function ContactClient() {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      showToast("Veuillez remplir tous les champs obligatoires.", "red");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Erreur lors de l'envoi", "red");
      } else {
        showToast("Message envoyé avec succès !", "green");
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      showToast("Erreur réseau", "red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🔥 HERO */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contactez Lecodefashion
        </h1>
        <p className="text-lg opacity-90">
          Une question ? Une commande ? On vous répond rapidement 🚀
        </p>
      </div>

      <div className="px-4 md:px-20 py-12 grid md:grid-cols-2 gap-10">

        {/* 📨 FORMULAIRE */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Envoyer un message</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              placeholder="Nom complet"
              value={form.name}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />

            <input
              name="subject"
              placeholder="Sujet"
              value={form.subject}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />

            <textarea
              name="message"
              placeholder="Votre message..."
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none resize-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition font-medium"
            >
              {loading ? "Envoi..." : "Envoyer"}
            </button>
          </form>
        </div>

        {/* 📍 INFOS */}
        <div className="flex flex-col gap-6">

          {/* Carte */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📍 Adresse</h3>
            <p className="text-gray-600">Agbalepedo, Lomé, Togo</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📞 Téléphone</h3>
            <p className="text-gray-600">+228 90 80 52 52</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">✉️ Email</h3>
            <p className="text-gray-600">webdev9080@gmail.com</p>
          </div>

          {/* Réseaux */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
            <div className="flex gap-4">
              <span className="bg-blue-500 text-white px-4 py-2 rounded-full">Facebook</span>
              <span className="bg-pink-500 text-white px-4 py-2 rounded-full">Instagram</span>
              <span className="bg-black text-white px-4 py-2 rounded-full">TikTok</span>
            </div>
          </div>

        </div>
      </div>

      {/* ❓ FAQ */}
      <div className="px-4 md:px-20 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Questions fréquentes</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h4 className="font-semibold mb-2">⏱️ Délai de réponse ?</h4>
            <p className="text-gray-600">Nous répondons en moins de 24h.</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h4 className="font-semibold mb-2">🚚 Livraison ?</h4>
            <p className="text-gray-600">Disponible partout à Lomé.</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h4 className="font-semibold mb-2">💳 Paiement ?</h4>
            <p className="text-gray-600">Paiement mobile money accepté.</p>
          </div>
        </div>
      </div>

    </div>
  );
}