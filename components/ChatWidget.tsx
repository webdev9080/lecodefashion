// components/ChatWidget.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const toggleOpen = () => setOpen(!open);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", content: "Je n'ai pas pu répondre." }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", content: "Erreur serveur." }]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-24 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
      >
        💬
      </button>

      {/* Fenêtre de chat */}
      {open && (
        <div className="fixed bottom-20 right-5 w-80 max-w-sm bg-white border rounded-xl shadow-lg flex flex-col z-50">
          <div className="bg-blue-600 text-white p-3 rounded-t-xl font-semibold flex justify-between items-center">
            Lecodefashion Assistant IA
            <button onClick={toggleOpen} className="ml-2 font-bold hover:text-gray-200">
              ✕
            </button>
          </div>
          <div className="flex-grow p-3 overflow-y-auto space-y-2 h-64">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg ${
                  msg.role === "user" ? "bg-blue-100 text-right self-end" : "bg-gray-100"
                }`}
              >
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t flex">
            <input
              type="text"
              placeholder="Écrire un message..."
              className="flex-grow border rounded-full px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="text-black px-2 py-1 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "..." : <FiSend size={20} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}