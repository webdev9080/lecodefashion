"use client";

import { useState } from "react";

export default function SendNotifications() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget; // type = HTMLFormElement

    try {
      const formData = new FormData(form);

      const title = formData.get("title") as string;
      const body = formData.get("body") as string;

      const res = await fetch("/api/send-notifications", {
        method: "POST",
        body: JSON.stringify({ title, body }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Erreur envoi");

      alert("✅ Notifications envoyées !");
      form.reset(); // ✔️ maintenant safe
    } catch (error) {
      console.error(error);
      alert("❌ Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-4 bg-white rounded shadow max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold text-center">
        Envoyer une notification
      </h2>

      <input
        name="title"
        placeholder="Titre"
        required
        className="p-2 border rounded"
      />

      <textarea
        name="body"
        placeholder="Message"
        required
        className="p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className={`py-2 rounded text-white transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "⏳ Envoi en cours..." : "📤 Envoyer"}
      </button>
    </form>
  );
}