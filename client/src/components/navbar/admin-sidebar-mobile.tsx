import { CircleGauge, Power, Settings, Menu } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ADMIN_SIDEBAR_ITEMS } from "./data";
import { isActiveAdminSideBar } from "@/utils/paths";
import { useAuth } from "../contexts/auth-context";
import { useState } from "react";

const AdminSidebarMobile = () => {
  const { pathname } = useLocation();
  const { clearToken } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet
      open={isOpen}
      onOpenChange={(e) => {
        setIsOpen(e);
      }}
    >
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col w-full xs:max-w-sm p-4 lg:hidden"
        overlayClassName="lg:hidden"
      >
        <nav className="grid gap-8 text-lg font-medium">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold px-4"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <CircleGauge className="h-6 w-6" />
            <span>Admin Panel</span>
          </Link>
          <div className="flex flex-col gap-1">
            {ADMIN_SIDEBAR_ITEMS.map(({ Icon, label, to }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => {
                  setIsOpen(false);
                }}
                end
                className={cn(
                  buttonVariants({
                    variant: isActiveAdminSideBar(pathname, to)
                      ? "default"
                      : "ghost",
                  }),
                  "justify-start gap-2 items-center",
                  !isActiveAdminSideBar(pathname, to) && "hover:bg-primary/10"
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
        <div className="mt-auto w-full space-y-1">
          <NavLink
            to={"/admin/edit-profile"}
            onClick={() => {
              setIsOpen(false);
            }}
            end
            className={cn(
              buttonVariants({
                variant: isActiveAdminSideBar(pathname, "/admin/edit-profile")
                  ? "default"
                  : "ghost",
              }),
              "justify-start gap-2 items-center w-full",
              !isActiveAdminSideBar(pathname, "/admin/edit-profile") &&
                "hover:bg-primary/10"
            )}
          >
            <Settings className="h-5 w-5" />
            Modifier le profil
          </NavLink>
          <Button
            variant={"ghost"}
            className="justify-start gap-2 items-center w-full hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => {
              clearToken();
              navigate("/login");
              setIsOpen(false);
            }}
          >
            <Power className="h-5 w-5" />
            Déconnexion
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminSidebarMobile;
