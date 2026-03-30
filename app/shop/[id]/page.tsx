import { generateSEO } from "@/lib/seo";
import ProductClient from "./ProductClient";

// ✅ SEO dynamique (SERVER)
export async function generateMetadata({ params }: any) {
  const { id } = await params;

  const baseUrl =
    process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: "no-store",
    });

    const product = await res.json();

    // 🔥 fallback si produit introuvable
    if (!product || product.error) {
      return generateSEO({
        title: "Produit introuvable",
        description: "Ce produit n'existe pas",
        url: `/shop/${id}`,
      });
    }

    return generateSEO({
      title: product.name,
      description: `${product.name} disponible à ${product.price} FCFA à Lomé`,
      image: product.image,
      url: `/shop/${id}`,
    });
  } catch (error) {
    return generateSEO({
      title: "Produit",
      description: "Produit Lecodefashion",
      url: `/shop/${id}`,
    });
  }
}



// ✅ PAGE SERVER
export default function ProductPage() {
  return <ProductClient />;
}