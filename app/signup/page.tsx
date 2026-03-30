import { generateSEO } from "@/lib/seo";
import SignUpClient from "./SignUpClient";

// ✅ SEO ici (SERVER)
export const metadata = generateSEO({
  title: "Signup",
  description: "Gérez l'inscription sur lecodefashion",
  url: "/signup",
});

export default function SignUpPage() {
  return <SignUpClient />;
}