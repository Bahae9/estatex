import { CircleGauge, Package2, Power, Settings } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isActiveSideBar } from "@/utils/paths";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { SIDEBAR_ITEMS } from "./data";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { isAuth, clearToken } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="hidden border-r bg-muted/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2 px-2 lg:px-4 lg:gap-4">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>EstateX</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid gap-1 items-start font-medium w-full">
            {SIDEBAR_ITEMS.map(({ Icon, label, to }) => (
              <NavLink
                key={label}
                to={to}
                end
                className={cn(
                  buttonVariants({
                    variant: isActiveSideBar(pathname, to)
                      ? "default"
                      : "ghost",
                  }),
                  "justify-start gap-2 items-center",
                  !isActiveSideBar(pathname, to) && "hover:bg-primary/10"
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </NavLink>
            ))}
            {isAuth && (
              <NavLink
                to={"/dashboard"}
                end
                className={cn(
                  buttonVariants({
                    variant: isActiveSideBar(pathname, "/dashboard")
                      ? "default"
                      : "ghost",
                  }),
                  "justify-start gap-2 items-center",
                  !isActiveSideBar(pathname, "/dashboard") &&
                    "hover:bg-primary/10"
                )}
              >
                <CircleGauge className="h-5 w-5" />
                Dashboard
              </NavLink>
            )}
          </nav>
        </div>
        <div className="mt-auto pb-4 w-full space-y-1">
          {isAuth ? (
            <>
              <NavLink
                to={"/edit-profile"}
                end
                className={cn(
                  buttonVariants({
                    variant: isActiveSideBar(pathname, "/edit-profile")
                      ? "default"
                      : "ghost",
                  }),
                  "justify-start gap-2 items-center w-full",
                  !isActiveSideBar(pathname, "/edit-profile") &&
                    "hover:bg-primary/10"
                )}
              >
                <Settings className="h-5 w-5" />
                Edite profile
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
            </>
          ) : (
            <Button className="w-full py-2" variant={"link"} asChild>
              <Link to={"/signup"}>Sign up</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
