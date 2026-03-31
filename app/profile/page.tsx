import { generateSEO } from "@/lib/seo";
import ProfileClient from "./ProfileClient";

// ✅ SEO ici (SERVER)
export const metadata = generateSEO({
  title: "Mon profil",
  description: "Gérez votre profil Lecodefashion",
  url: "/profile",
});

export default function ProfilePage() {
  return (
    <div className="items-center">
      <ProfileClient />
    </div>
    )
}