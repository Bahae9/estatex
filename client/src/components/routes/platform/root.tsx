import { Navbar, Sidebar } from "@/components/navbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ScrollArea } from "../../ui/scroll-area";
import { useAuth } from "@/components/contexts/auth-context";
import { jwtDecode } from "jwt-decode";

export default function Root() {
  const { token } = useAuth();
  const { pathname } = useLocation();
  const data = token ? (jwtDecode(token) as { roles: string }) : null;

  if (data && data.roles === "ADMIN") return <Navigate to={"/admin"} />;
  if (pathname === "/edit-profile" && !data) return <Navigate to={"/"} />;
  if (pathname.startsWith("/dashboard") && !data) return <Navigate to={"/"} />;
  return (
    <ScrollArea className="w-screen h-screen">
      <div className="grid h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Navbar />
          <ScrollArea className="w-full h-[calc(100vh-56px)] lg:h-[calc(100vh-60px)]">
            <main className="flex flex-1 flex-col min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-60px)]">
              <Outlet />
            </main>
          </ScrollArea>
        </div>
      </div>
    </ScrollArea>
  );
}
