export function generateSEO({
  title,
  description,
  image,
  url,
}: SEOProps): Metadata {
  const baseUrl = "https://lecodefashion.vercel.app";

  const defaultTitle = "Lecodefashion - Boutique de vêtements à Lomé";
  const defaultDescription =
    "Découvrez des vêtements tendance pour femmes et accessoires hommes à petit prix à Lomé.";

  const seoTitle = title ? `${title} | Lecodefashion` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || `${baseUrl}/images/hero1.jpg`;
  const seoUrl = url ? `${baseUrl}${url}` : baseUrl;

  return {
    metadataBase: new URL(baseUrl), // 🔥 important

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
          width: 1200,
          height: 630,
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