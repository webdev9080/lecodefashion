"use client";

import Link from "next/link";
import { useUser } from "@/context/UserProvider";

interface Props {
  size?: number;
  className?: string;
  showName?: boolean; // 🔹 Ajouté
}

export default function UserAvatar({
  size = 50,
  className = "",
  showName = false, // 🔹 Par défaut false
}: Props) {
  const { user } = useUser();

  if (!user) return null;

  // 🔥 Cache-busting avec updatedAt ou timestamp
  const avatarSrc =
    user.avatar && user.avatar !== ""
      ? `${user.avatar}?t=${user.updatedAt || Date.now()}`
      : "/images/user1.jpeg";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Link href="/profile">
        <div
          className="rounded-full overflow-hidden bg-gray-200"
          style={{ width: size, height: size }}
        >
          <img
            src={avatarSrc}
            alt={user.username}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/images/user1.jpeg";
            }}
          />
        </div>
      </Link>

      {/* Affiche le nom si showName est true */}
      {showName && <span className="font-medium">{user.username}</span>}
    </div>
  );
}