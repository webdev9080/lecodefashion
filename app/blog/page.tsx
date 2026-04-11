import { generateSEO } from "@/lib/seo";
import BlogClient from "./BlogClient";

export const metadata = generateSEO({
  title: "Blog",
  description: "Découvrez notre page blog pour les videos tendances sur lecodefashion",
  url: "/blog",
});

export default function BlogPage() {
  return(
    <BlogClient />
    )
}