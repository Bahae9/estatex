import { useAuth } from "@/components/contexts/auth-context";
import AdminNavbar from "@/components/navbar/admin-navbar";
import AdminSidebar from "@/components/navbar/admin-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoot() {
  const { token } = useAuth();
  const isAdmin = token
    ? (jwtDecode(token) as { roles: string })?.roles === "ADMIN"
      ? true
      : false
    : false;
  if (!isAdmin) return <Navigate to={"/"} />;
  return (
    <ScrollArea className="w-screen h-screen">
      <div className="grid h-screen w-full lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div className="flex flex-col">
          <AdminNavbar />
          <ScrollArea className="w-full h-[calc(100vh-56px)] lg:h-[calc(100vh-60px)] relative">
            <main className="flex flex-1 flex-col min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-60px)] p-6 lg:p-8">
              <Outlet />
            </main>
          </ScrollArea>
        </div>
      </div>
    </ScrollArea>
  );
}
