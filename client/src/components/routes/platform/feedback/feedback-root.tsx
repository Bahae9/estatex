import { useAuth } from "@/components/contexts/auth-context";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const FeedbackRoot = () => {
  const { token } = useAuth();
  const { pathname } = useLocation();
  const currentUserId = token
    ? (jwtDecode(token) as { id: number })?.id || -1
    : -1;
  if (
    currentUserId === -1 &&
    ["/feedbacks", "/feedbacks/my-feedbacks"].includes(pathname)
  )
    return <Navigate to={"/feedbacks/clients-feedbacks"} />;

  return (
    <div className="p-6 lg:p-8">
      <Outlet />
    </div>
  );
};

export default FeedbackRoot;
