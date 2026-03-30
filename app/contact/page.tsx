import { generateSEO } from "@/lib/seo";
import ContactClient from "./ContactClient";

// ✅ SEO ici (SERVER)

export const metadata = generateSEO({
  title: "Contact",
  description: "Découvrez les differents moyens de contacter lecodefashion",
  url: "/contact",
});
export default function ContactPage() {
  return <ContactClient />;
}