import type { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const baseUrl = "https://lecodefashion.vercel.app";

export function generateSEO({
  title,
  description,
  image,
  url,
}: SEOProps): Metadata {
  const defaultTitle = "Lecodefashion - Boutique de vêtements à Lomé";
  const defaultDescription =
    "Découvrez des vêtements tendance pour femmes et accessoires hommes à petit prix à Lomé.";

  const seoTitle = title ? `${title} | Lecodefashion` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || `${baseUrl}/images/logo2.png`;
  const seoUrl = url ? `${baseUrl}${url}` : baseUrl;

  return {
    title: seoTitle,
    description: seoDescription,

    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      siteName: "Lecodefashion",
      images: [
        {
          url: seoImage,
          width: 800,
          height: 600,
          alt: seoTitle,
        },
      ],
      locale: "fr_FR",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
    },
  };
}