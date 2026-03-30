// app/dashboard/notifications/create/page.tsx
"use client";

import { useState } from "react";
import { useToast } from "@/context/ToastProvider";
import NotificationsList from "@/components/NotificationsList";

export default function CreateNotificationPage() {
  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "announcement",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      showToast("Notification envoyée 🔔", "green");
      setForm({ title: "", message: "", type: "announcement" });
    } else {
      showToast("Erreur envoi ❌", "red");
    }
  };

  return (
    <div className="p-2 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Envoyer une notification</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-57">
        <input
          placeholder="Titre"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="p-2 border rounded"
        />

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="p-2 border rounded"
        />

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="announcement">Annonce</option>
          <option value="promotion">Promotion</option>
          <option value="update">Mise à jour</option>
        </select>

        <button className="bg-green-500 text-white py-2 rounded">
          Envoyer
        </button>
      </form>
      
      <div className="mt-4 bg-transparent items-center">
        <h2 className="text-center text-xl">Liste des Notification 🔔</h2>
        <NotificationsList />
      </div>
      
      
    </div>
  );
}