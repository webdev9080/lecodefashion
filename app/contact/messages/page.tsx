import { generateSEO } from "@/lib/seo";
import MessagesClient from "./MessagesClient";

// ✅ SEO ici (SERVER)
export const metadata = generateSEO({
  title: "Messages",
  description: "Gérez les messages des utilisateurs sur Lecodefashion",
  url: "/contact/messages",
});

export default function MessagesPage() {
  return <MessagesClient />;
}