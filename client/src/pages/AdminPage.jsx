import { useParams } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminAddProduct from "../components/admin/AdminAddProduct";
import AdminProductList from "../components/admin/AdminProductList";
import AdminOders from "../components/admin/AdminOders";
import AdminOrderDetails from "../components/admin/AdminOrderDetails";
import AdminAllUsers from "../components/admin/AdminAllUsers";
import AdminAddUser from "../components/admin/AdminAddUser";

export default function AdminPage() {
    const { content } = useParams();
    const { orderId } = useParams();
    return (
        <div className="flex min-h-screen">
            {/* sidebar */}
            <div className="">
                <AdminSidebar />
            </div>
            {/* main */}
            <div className="w-full">
                {/* header */}
                <div className="w-full ">
                    <AdminHeader />
                </div>
                {/* content */}
                <div className="w-full p-3">
                    {content === "dashboard" ? (
                        <AdminDashboard />
                    ) : content === "add-product" ? (
                        <AdminAddProduct />
                    ) : content === "list-products" ? (
                        <AdminProductList />
                    ) : content === "orders" ? (
                        <AdminOders />
                    ) : content === "order-details" && orderId ? (
                        <AdminOrderDetails />
                    ) : content === "users" ? (
                        <AdminAllUsers />
                    ) : content === "add-user" ? (
                        <AdminAddUser />
                    ) : (
                        <AdminDashboard />
                    )}
                </div>
            </div>
        </div>
    );
}
