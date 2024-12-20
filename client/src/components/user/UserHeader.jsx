import { Avatar, Drawer, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdOutlineChair } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import { AiOutlineShopping } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiChair } from "react-icons/pi";
import { GrStorage } from "react-icons/gr";
import { TbArmchair } from "react-icons/tb";
import { LuSofa } from "react-icons/lu";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { GiMirrorMirror } from "react-icons/gi";
import { useAuthStore } from "../../store/useAuthStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useCartStore } from "../../store/useCartStore";
import LoginModal from "./LoginModal";

export default function UserHeader() {
    const { user, logout, loading } = useAuthStore();
    const {
        cart,
        getUserCart,
        updateCartItemQuantity,
        deleteProductFromCart,
        total_cart_price,
    } = useCartStore();
    const { wishlist, userWishlist } = useWishlistStore();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenToggle, setIsOpenToggle] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleClose = () => setIsOpen(false);
    const handleMobileClose = () => setIsOpenToggle(false);
    const fetchCartData = async () => {
        getUserCart();
    };
    useEffect(() => {
        fetchCartData();
    }, [location.pathname]);

    const handleQuantity = async (id, quantity) => {
        updateCartItemQuantity({ product_id: id, quantity });
    };

    const handleIncrementQuantity = (id, quantity) => {
        if (!loading) handleQuantity(id, quantity + 1);
    };

    const handleDecrementQuantity = (id, quantity) => {
        if (!loading && quantity > 1) handleQuantity(id, quantity - 1);
    };

    const handleRemoveFromCart = async (id) => {
        deleteProductFromCart({ product_id: id });
    };

    const handleLogout = async () => {
        logout();
    };

    useEffect(() => {
        const getUserWishlist = async () => {
            userWishlist();
        };
        getUserWishlist();
    }, [location.pathname]);

    return (
        <>
            <Navbar className="sticky top-0 z-10 py-6 shadow-sm">
                <Link to="/">
                    <div className="order-1 flex items-center gap-2 px-3">
                        <MdOutlineChair className="text-3xl md:text-4xl" />
                        <p className="text-xl  md:text-2xl font-semibold">
                            Furniture
                        </p>
                    </div>
                </Link>
                <Navbar.Collapse className="order-3 sm:order-2 hidden md:flex">
                    <Navbar.Link as={"div"}>
                        <Link to="/" className="text-base">
                            Home
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link as={"div"}>
                        <Link to={"/listing"} className="text-base">
                            Shop
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link as={"div"}>
                        <Link to={"/about-us"} className="text-base">
                            About Us
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link as={"div"}>
                        <Link to={"/news"} className="text-base">
                            News
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link as={"div"}>
                        <Link to={"/contact-us"} className="text-base">
                            Contact Us
                        </Link>
                    </Navbar.Link>
                </Navbar.Collapse>
                <div className="flex gap-3 order-2 sm:order-3">
                    <button
                        className=" py-2 px-2 rounded-lg hover:bg-gray-50"
                        disabled={loading}
                    >
                        <Link className="relative">
                            <AiOutlineShopping
                                className="text-xl text-[#1c2b26]"
                                onClick={() => setIsOpen(true)}
                            />
                            <span
                                className={`absolute top-[-5px] right-[-10px] text-xs bg-[#264c4f] text-white font-semibold rounded-full w-4 h-4 flex items-center justify-center ${
                                    cart.length <= 0 && "hidden"
                                }`}
                            >
                                {cart.length}
                            </span>
                        </Link>
                    </button>
                    <button
                        className=" py-2 px-2 rounded-lg hover:bg-gray-50"
                        disabled={loading}
                    >
                        <Link to="/wishlist" className="relative">
                            <IoIosHeartEmpty className="text-xl text-[#1c2b26]" />
                            <span
                                className={`absolute top-[-5px] right-[-10px] text-xs bg-[#264c4f] text-white font-semibold rounded-full w-4 h-4 flex items-center justify-center ${
                                    wishlist.length <= 0 && "hidden"
                                }`}
                            >
                                {wishlist.length}
                            </span>
                        </Link>
                    </button>
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User settings"
                                img={FaRegCircleUser}
                                rounded
                                size="xs"
                                className="text-[#1c2b26] hidden md:block"
                                onClick={() => setIsOpenLogin(true)}
                            />
                        }
                    >
                        {user ? (
                            <>
                                <Dropdown.Header>
                                    <p className="font-semibold text-sm">
                                        {user.username
                                            ? `Logged in as ${user.username}`
                                            : ""}
                                    </p>
                                </Dropdown.Header>

                                <Dropdown.Item
                                    className="flex gap-2"
                                    onClick={handleLogout}
                                >
                                    <MdLogout className="text-lg" />
                                    Logout
                                </Dropdown.Item>
                            </>
                        ) : (
                            ""
                        )}
                    </Dropdown>
                    <Navbar.Toggle onClick={() => setIsOpenToggle(true)} />
                </div>
            </Navbar>
            {/* cart drawer */}
            <Drawer
                className="w-[400px] md:w-[500px] "
                open={isOpen}
                onClose={handleClose}
                position="right"
            >
                <Drawer.Header title="Shopping Cart" titleIcon={() => <></>} />
                <Drawer.Items className="h-full">
                    <div className="flex flex-col justify-between h-modal">
                        <div className="flex flex-1 flex-col gap-6">
                            {cart &&
                                cart.map((item) => (
                                    <div
                                        key={item.product_id}
                                        className="flex items-center gap-10 px-5"
                                    >
                                        {/* image */}
                                        <img
                                            src={item.image_cover}
                                            alt=""
                                            className="w-20 h-20"
                                        />
                                        {/* content */}
                                        <div className="flex flex-col gap-2 flex-1">
                                            <p className="font-semibold text-lg cursor-pointer hover:text-[#446a6d]">
                                                {item.title}
                                            </p>
                                            <div className="flex items-center gap-8">
                                                {/* quantity */}
                                                <div className="flex gap-2 border border-[#446a6d] px-2 py-[6px] rounded-md">
                                                    <p
                                                        className="hover:bg-[#446a6d] flex items-center justify-center rounded-md px-2 hover:text-white cursor-pointer transition-all duration-300"
                                                        onClick={() =>
                                                            handleIncrementQuantity(
                                                                item.product_id,
                                                                item.quantity
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {item.quantity}
                                                    </p>
                                                    <p
                                                        className="hover:bg-[#446a6d] rounded-md flex items-center justify-center px-2 hover:text-white cursor-pointer transition-all duration-300"
                                                        onClick={() =>
                                                            handleDecrementQuantity(
                                                                item.product_id,
                                                                item.quantity
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </p>
                                                </div>
                                                <p>${item.price}.00</p>
                                            </div>
                                        </div>
                                        {/* remove */}
                                        <div>
                                            <FiTrash
                                                className="text-lg cursor-pointer hover:text-[#446a6d] transition-all duration-300"
                                                onClick={() =>
                                                    handleRemoveFromCart(
                                                        item.product_id
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="">
                            <hr />
                            <div className="flex w-full justify-between py-5">
                                <p className="text-sm text-[#264c4f] font-semibold">
                                    SUBTOTAL:
                                </p>
                                <p className="text-sm text-[#264c4f] font-semibold">
                                    {total_cart_price} MAD
                                </p>
                            </div>

                            <div className="flex">
                                <button
                                    className="bg-[#264c4f] text-white hover:bg-[#446a6d] flex-1  px-6 py-4 rounded-md transition-colors duration-200 mr-2 font-semibold text-base"
                                    onClick={() => {
                                        navigate("/cart");
                                        setIsOpen(false);
                                    }}
                                >
                                    View Cart
                                </button>
                                <button
                                    className="bg-[#264c4f] text-white hover:bg-[#446a6d]  flex-1  px-6 py-4 rounded-md transition-colors duration-200 mr-2 font-semibold text-base"
                                    onClick={() => {
                                        navigate("/checkout");
                                        setIsOpen(false);
                                    }}
                                >
                                    Checout
                                </button>
                            </div>
                        </div>
                    </div>
                </Drawer.Items>
            </Drawer>
            {/* mobile drawer */}
            <Drawer
                open={isOpenToggle}
                onClose={handleMobileClose}
                position="right"
                className="bg-[#14171c] text-[#9a9b9d] flex flex-col gap-4 font-bold text-[17px]"
            >
                <Drawer.Header titleIcon={() => <></>} />
                <Drawer.Items>
                    <Link to="/">
                        <div className="pb-5 flex items-center gap-2">
                            <MdOutlineChair className="text-4xl text-white" />
                            <p className="text-2xl font-semibold text-white">
                                Furniture
                            </p>
                        </div>
                    </Link>
                </Drawer.Items>
                <Drawer.Items>
                    <Link
                        to="/"
                        className="hover:text-white transition-all duration-200"
                    >
                        Home
                    </Link>
                </Drawer.Items>
                <Drawer.Items>
                    <Link
                        to="/listing"
                        className="hover:text-white transition-all duration-200"
                    >
                        Shop
                    </Link>
                </Drawer.Items>
                <Drawer.Items>
                    <Link
                        to="/about-us"
                        className="hover:text-white transition-all duration-200"
                    >
                        About Us
                    </Link>
                </Drawer.Items>
                <Drawer.Items>
                    <Link
                        to="/news"
                        className="hover:text-white transition-all duration-200"
                    >
                        News
                    </Link>
                </Drawer.Items>
                <Drawer.Items>
                    <Link
                        to="/contact-us"
                        className="hover:text-white transition-all duration-200"
                    >
                        Contact Us
                    </Link>
                </Drawer.Items>
                <Drawer.Items>
                    <div className="w-full h-[1px] bg-[#2d2e31] my-5"></div>
                </Drawer.Items>
                {/* categories */}
                <div className="flex flex-col gap-3 ">
                    <Drawer.Items>
                        <Link
                            to="/product-category/Chairs"
                            className="hover:text-white transition-all duration-200 flex items-center gap-2"
                        >
                            <PiChair className="text-xl" />
                            <p className="text-base text-[18px] ">Chairs</p>
                        </Link>
                    </Drawer.Items>
                    <Drawer.Items>
                        <Link
                            to="/product-category/Storage"
                            className="hover:text-white transition-all duration-200 flex items-center gap-2"
                        >
                            <GrStorage className="text-xl" />
                            <p className="text-base text-[18px] ">Storage</p>
                        </Link>
                    </Drawer.Items>
                    <Drawer.Items>
                        <Link
                            to="/product-category/Armchairs"
                            className="hover:text-white transition-all duration-200 flex items-center gap-2"
                        >
                            <TbArmchair className="text-xl" />
                            <p className="text-base text-[18px] ">Armchairs</p>
                        </Link>
                    </Drawer.Items>
                    <Drawer.Items>
                        <Link
                            to="/product-category/Sofas"
                            className="hover:text-white transition-all duration-200 flex items-center gap-2"
                        >
                            <LuSofa className="text-xl" />
                            <p className="text-base text-[18px] ">Sofas</p>
                        </Link>
                    </Drawer.Items>
                    <Drawer.Items>
                        <Link
                            to="/product-category/Beds"
                            className="hover:text-white transition-all duration-200 flex items-center gap-2"
                        >
                            <IoBedOutline className="text-xl" />
                            <p className="text-base text-[18px] ">Beds </p>
                        </Link>
                    </Drawer.Items>
                    <Drawer.Items>
                        <Link
                            to="/product-category/Tables"
                            className="hover:text-white transition-all duration-200 flex items-center gap-2"
                        >
                            <MdOutlineTableRestaurant className="text-xl" />
                            <p className="text-base text-[18px] ">Tables </p>
                        </Link>
                    </Drawer.Items>
                    <Drawer.Items>
                        <Link
                            to="/product-category/Decor"
                            className="hover:text-white transition-all duration-200 flex items-center gap-2"
                        >
                            <GiMirrorMirror className="text-xl" />
                            <p className="text-base text-[18px] ">Decor</p>
                        </Link>
                    </Drawer.Items>
                </div>
            </Drawer>
            {/* Login moadl */}
            {!user && (
                <div className="p-4">
                    <LoginModal
                        isOpenLogin={isOpenLogin}
                        onClose={() => setIsOpenLogin(false)}
                        title={"title"}
                    />
                </div>
            )}
            {/* {showToast ? (
                <Toast className="absolute bottom-5 right-5">
                    <div className="text-sm font-normal">
                        Logged in successfully
                    </div>
                    <div className="ml-auto flex items-center space-x-2"></div>
                    <Toast.Toggle />
                </Toast>
            ) : (
                ""
            )} */}
        </>
    );
}
