import { generateSEO } from "@/lib/seo";
import LoginClient from "./LoginClient";

// ✅ SEO ici (SERVER)
export const metadata = generateSEO({
  title: "Login",
  description: "Gérez la connexion sur lecodefashion",
  url: "/login",
});

export default function LoginPage() {
  return <LoginClient />;
}