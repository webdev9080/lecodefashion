"use client";
import { useState, useEffect } from "react";
import { IUser } from "@/context/UserProvider";
import toast from "react-hot-toast";

interface Props {
  user: IUser;
  onUpdate: () => void;
}

export default function ProfileForm({ user, onUpdate }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: null as File | null,
  });

  const [preview, setPreview] = useState("/images/user1.jpg");
  const [loading, setLoading] = useState(false);

  // ✅ synchronise avec user (important)
  useEffect(() => {
    setFormData({
      name: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
      avatar: null,
    });

    setPreview(user.avatar || "/images/user1.jpeg");
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];

      setFormData(prev => ({ ...prev, avatar: file }));

      // 🔥 preview instantané
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({ ...prev, [name]: value || "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      if (formData.avatar) data.append("avatar", formData.avatar);

      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Erreur lors de la mise à jour");

      toast.success("Profil mis à jour !");

      // 🔥 recharge propre (évite spam API)
      setTimeout(() => {
        onUpdate();
      }, 300);

    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">

      {/* 🔥 Avatar preview */}
      <div className="flex flex-col items-center gap-2">
        <img
          src={preview}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <input
          type="file"
          name="avatar"
          onChange={handleChange}
          accept="image/*"
        />
      </div>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nom"
        className="input"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="input"
      />

      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Téléphone"
        className="input"
      />

      <button
        type="submit"
        disabled={loading}
        className={`bg-green-500 text-white px-4 py-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Mise à jour..." : "Mettre à jour"}
      </button>
    </form>
  );
}