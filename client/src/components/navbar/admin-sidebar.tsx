import { CircleGauge, Power, Settings } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isActiveAdminSideBar } from "@/utils/paths";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { ADMIN_SIDEBAR_ITEMS } from "./data";

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const { clearToken } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="hidden border-r bg-muted/40 lg:block font-semibold">
      <div className="flex h-full max-h-screen flex-col gap-2 px-2 lg:px-4 lg:gap-4">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
          <Link to="/admin" className="flex items-center gap-2">
            <CircleGauge className="h-6 w-6" />
            <span>Admin Panel</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid gap-1 items-start w-full">
            {ADMIN_SIDEBAR_ITEMS.map(({ Icon, label, to }) => (
              <NavLink
                key={label}
                to={to}
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
          </nav>
        </div>
        <div className="mt-auto pb-4 w-full space-y-1">
          <NavLink
            to={"/admin/edit-profile"}
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
            Edit Profile
          </NavLink>
          <Button
            variant={"ghost"}
            className="justify-start gap-2 items-center w-full hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => {
              clearToken();
              navigate("/login");
            }}
          >
            <Power className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
