"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastProvider";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contact/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // 🔥 SUPPRESSION
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Supprimer ce message ?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/contact/messages/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      // 🔥 update UI instant
      setMessages((prev) => prev.filter((msg) => msg._id !== id));

      showToast("Message supprimé", "green");
    } catch (err) {
      showToast("Erreur lors de la suppression", "red");
    }
  };

  if (loading)
    return <p className="text-center mt-20">Chargement des messages...</p>;

  if (messages.length === 0)
    return <p className="text-center mt-20">Aucun message reçu.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-20">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Messages reçus
      </h1>

      <div className="space-y-6">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="bg-white shadow-md rounded-lg p-6 relative hover:shadow-lg transition"
          >
            {/* 🔥 Bouton supprimer */}
            <button
              onClick={() => handleDelete(msg._id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl"
            >
              🗑️
            </button>

            <h2 className="text-xl font-semibold">{msg.name}</h2>
            <p className="text-gray-500">{msg.email}</p>

            {msg.subject && (
              <p className="text-gray-700 mt-1 font-medium">
                Sujet: {msg.subject}
              </p>
            )}

            <p className="text-gray-700 mt-2">{msg.message}</p>

            <p className="text-sm text-gray-400 mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}