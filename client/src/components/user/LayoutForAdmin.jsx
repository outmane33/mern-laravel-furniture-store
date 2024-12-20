import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function LayoutForAdmin() {
    const { user } = useAuthStore();
    if (!user) {
        return;
    }
    return (
        <>{user.role === "admin" ? <Outlet /> : <Navigate to="/listing" />}</>
    );
}
