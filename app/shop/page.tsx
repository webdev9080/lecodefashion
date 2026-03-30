import { generateSEO } from "@/lib/seo";
import ShopClient from "./ShopClient";

// ✅ SEO ici (SERVER)
export const metadata = generateSEO({
  title: "Boutique",
  description: "Découvrez nos vêtements tendance à Lomé",
  url: "/shop",
});

export default function ShopPage() {
  return(
    <div className="mt-2 md:mt-4">
      <ShopClient />
    </div>
    ) 
}