import { generateSEO } from "@/lib/seo";
import DashboardClient from "./DashboardClient";

// ✅ SEO ici (SERVER)
export const metadata = generateSEO({
  title: "Dashboard",
  description: "Tableaau de bord general sur lecodefashion",
  url: "/dashboard",
});

export default function DashboardPage() {
  return (
    <div className="items-center">
      <DashboardClient />
    </div>
    )
}