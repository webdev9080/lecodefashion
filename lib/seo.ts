// lib/seo.ts
import type { Metadata } from "next";

// ✅ TYPE DEFINI ICI
interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

// 🔥 FONCTION SEO GLOBALE
export function generateSEO({
  title,
  description,
  image,
  url,
}: SEOProps): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const defaultTitle = "Lecodefashion - Boutique de vêtements à Lomé";
  const defaultDescription =
    "Découvrez les dernières tendances de mode à petit prix chez Lecodefashion.";

  const finalTitle = title ? `${title} | Lecodefashion` : defaultTitle;
  const finalDescription = description || defaultDescription;

  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image
    ? image.startsWith("http")
      ? image
      : `${baseUrl}${image}`
    : `${baseUrl}/images/logo2.png`;

  return {
    title: finalTitle,
    description: finalDescription,

    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: fullUrl,
      siteName: "Lecodefashion",
      images: [
        {
          url: fullImage,
          width: 800,
          height: 600,
          alt: finalTitle,
        },
      ],
      locale: "fr_FR",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [fullImage],
    },

    metadataBase: new URL(baseUrl),
  };
}