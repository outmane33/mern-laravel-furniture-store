import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { MdLogout } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";
import { PiSealCheckThin } from "react-icons/pi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";

export default function AdminHeader() {
    const { logout } = useAuthStore();
    const path = useLocation().pathname;
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout();
    };
    return (
        <Navbar className="border-b">
            <Navbar.Toggle className="bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black" />
            <span></span>
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar
                        alt="User settings"
                        img={FaRegCircleUser}
                        rounded
                        size="xs"
                        className="text-[#1c2b26]"
                    />
                }
            >
                <Dropdown.Header>
                    <p className="font-semibold text-sm">
                        Logged in as John Doe
                    </p>
                </Dropdown.Header>
                <Dropdown.Item
                    className="flex gap-2"
                    onClick={() => navigate("/shop/acount")}
                >
                    <FaUserCog className="text-lg" />
                    Acount
                </Dropdown.Item>
                <Dropdown.Item className="flex gap-2" onClick={handleLogout}>
                    <MdLogout className="text-lg" />
                    Logout
                </Dropdown.Item>
            </Dropdown>

            <Navbar.Collapse className="md:hidden">
                <Navbar.Link as={"div"} active={path === "/admin/dashboard"}>
                    <Link
                        to="/admin/dashboard"
                        className="flex gap-2 items-center"
                    >
                        <MdOutlineDashboard /> Dashboard
                    </Link>
                </Navbar.Link>
                <Navbar.Link as={"div"} active={path === "/admin/products"}>
                    <Link
                        to="/admin/products"
                        className="flex gap-2 items-center"
                    >
                        <RiShoppingCartLine /> Products
                    </Link>
                </Navbar.Link>
                <Navbar.Link as={"div"} active={path === "/admin/orders"}>
                    <Link
                        to="/admin/orders"
                        className="flex gap-2 items-center"
                    >
                        <PiSealCheckThin /> Orders
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
