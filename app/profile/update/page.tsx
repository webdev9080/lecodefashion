import { generateSEO } from "@/lib/seo";
import UpdateProfileClient from "./UpdateProfileClient";

// ✅ SEO ici (SERVER)
export const metadata = generateSEO({
  title: "Update profil",
  description: "Gérez la mise à jour de votre profil Lecodefashion",
  url: "/profile/update",
});

export default function ProfilePage() {
  return <UpdateProfileClient />;
}