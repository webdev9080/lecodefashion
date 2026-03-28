"use client";

import ProfileForm from "@/components/ProfileForm";
import { useUser } from "@/context/UserProvider";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function UpdateProfilePage() {
  const { user, fetchUser, loading } = useUser();
  const router = useRouter();

  const handleUpdate = async () => {
    await fetchUser();
    router.push("/profile");
  };

  if (loading)
    return <p className="text-center mt-20">Chargement...</p>;

  if (!user)
    return <p className="text-center mt-20">Utilisateur introuvable</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-20 py-10">

      <Toaster />

      {/* 🔙 RETOUR */}
      <button
        onClick={() => router.back()}
        className="mb-6 text-gray-500 hover:text-black transition"
      >
        ← Retour
      </button>

      {/* 🔥 HEADER MODERNE */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Modifier votre profil ✏️
        </h1>
        <p className="opacity-90 mt-2">
          Mettez à jour vos informations personnelles en toute sécurité
        </p>
      </div>

      {/* 📦 CONTENU PRINCIPAL */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* 👤 PREVIEW PROFIL */}
        <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center text-center">
          
          {/* Avatar */}
          {user.avatar && (
            <img
              src={`${user.avatar}?t=${user.updatedAt || Date.now()}`}
              alt={user.username}
              className="w-24 h-24 rounded-full object-cover border mb-4"
            />
          )}

          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-gray-500">{user.email}</p>

          {user.phone && (
            <p className="text-gray-500 mt-1">📞 {user.phone}</p>
          )}

          <span className="mt-3 text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full">
            {user.role || "user"}
          </span>
        </div>

        {/* ✏️ FORMULAIRE */}
        <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-6">
            Informations personnelles
          </h2>

          <ProfileForm user={user} onUpdate={handleUpdate} />

        </div>
      </div>

      {/* 🔐 SECTION SÉCURITÉ */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Sécurité</h2>

        <div className="flex flex-col gap-4">
          <button className="text-left p-3 rounded-lg hover:bg-gray-100 transition">
            🔑 Changer le mot de passe
          </button>

          <button className="text-left p-3 rounded-lg hover:bg-gray-100 transition">
            📧 Vérifier l’email
          </button>
        </div>
      </div>

    </div>
  );
}