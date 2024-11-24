import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function ProtectedAction({ action, children }) {
  const { isAuth, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (isAuth) {
      if (user?.role !== "admin") {
        toast.error("Only admin can access this action.");
        return;
      } else {
        if (typeof action === "function") {
          action();
        }
      }
    } else {
      toast.error("To perform the particular action, login first.");
      navigate("/login", { state: { from: location } });
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      {children}
    </div>
  );
}
