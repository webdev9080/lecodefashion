"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastProvider"; // 🔥

export default function LoginClient() {
  const router = useRouter();
  const { showToast } = useToast(); // 🔥

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Erreur login", "red");
      } else {
        localStorage.setItem("token", data.token);

        window.dispatchEvent(new Event("userChanged"));

        showToast("Connexion réussie 👋", "green");

        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err) {
      showToast("Erreur réseau", "red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Se connecter</h1>

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          type="email"
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <input
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          type="password"
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Pas encore de compte ?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            S'inscrire
          </a>
        </p>
      </form>
    </div>
  );
}