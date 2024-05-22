import AdminSidebarMobile from "./admin-sidebar-mobile";
import NavBreadcrumb from "./nav-breadcrumb";

const AdminNavbar = () => {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6 lg:px-8">
      <AdminSidebarMobile />
      <NavBreadcrumb />
    </header>
  );
};

export default AdminNavbar;
