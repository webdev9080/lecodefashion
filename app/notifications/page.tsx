import { generateSEO } from "@/lib/seo";
import NotificationsClient from "./NotificationsClient";

// ✅ SEO ici (SERVER)
export const metadata = generateSEO({
  title: "Notifications",
  description: "Consultez les notifications sur lecodefashion",
  url: "/notifications",
});

export default function NotificationsPage() {
  return (
    
    <div className="h-[90vh]">
      <NotificationsClient />;
    </div>
    )
}