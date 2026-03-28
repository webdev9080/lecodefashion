import Sidebar from "@/components/Sidebar";
import NavbarDashboard from "@/components/NavbarDashboard";
import Footer from "@/components/Footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <NavbarDashboard />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}