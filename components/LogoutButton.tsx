"use client";
import {useUser} from "@/context/UserProvider";

export default function LogoutButton() {
  const { logout } = useUser();

  return (
    <button
      onClick={logout}
      className="bg-red-500 text-center text-white px-1 py-1 rounded hover:bg-red-600 transition"
    >
      Deconnexion
    </button>
  );
}