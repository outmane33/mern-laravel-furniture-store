import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { TbArrowsShuffle } from "react-icons/tb";
import { GoEye } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useAuthStore } from "../../store/useAuthStore";
import LoginModal from "./LoginModal";

export default function UserProductCard({ product }) {
    const { addProductToCart } = useCartStore();
    const {
        wishlist,
        userWishlist,
        addProductToWishlist,
        removeProductFromWishlist,
    } = useWishlistStore();

    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const { user } = useAuthStore();

    const handleAddToCard = async () => {
        if (!user) {
            setIsOpenLogin(true);
            return;
        }

        addProductToCart({ product_id: product.id, quantity });
    };

    //check if product is in wishlist
    const isProductInWishlist = wishlist.some((item) => item.id === product.id);

    const getUserWishlist = async () => {
        userWishlist();
    };

    useEffect(() => {
        getUserWishlist();
    }, [location.pathname]);

    const handleWishlist = async () => {
        if (!user) {
            setIsOpenLogin(true);
            return;
        }
        if (isProductInWishlist) {
            removeProductFromWishlist(product.id);
        } else {
            addProductToWishlist({ product_id: product.id });
        }
    };
    const handleIncerementQuantity = () => {
        setQuantity(quantity + 1);
    };
    const handleDecrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const Modal = ({ isOpen, onClose, title }) => {
        if (!isOpen) return null;
        return (
            <>
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                    onClick={onClose}
                />

                {/* Modal */}
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-[1000px] relative ">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
                        >
                            <FaTimes className="h-5 w-5" />
                        </button>

                        {/* Content */}
                        <div className="flex flex-col md:flex-row min-h-[600px] ">
                            {/* Left side - Image */}
                            <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-gray-50">
                                <img
                                    src={product.image_cover}
                                    alt="Product"
                                    className="max-w-full h-auto object-contain"
                                />
                            </div>

                            {/* Right side - Details */}
                            <div className="w-full md:w-1/2 p-8 flex flex-col gap-2">
                                <h2 className="text-3xl font-bold mb-4 text-[#162321]">
                                    {title}
                                </h2>
                                <div className="text-base text-gray-600 mb-6">
                                    ${product.price}.00
                                </div>

                                <p className="text-gray-600 mb-6">
                                    {product.small_description
                                        ? product.small_description.split(
                                              "<br/>"
                                          )[0]
                                            ? product.small_description.split(
                                                  "<br/>"
                                              )[0]
                                            : ""
                                        : ""}
                                </p>
                                <p className="text-gray-600 mb-6">
                                    {product.small_description
                                        ? product.small_description.split(
                                              "<br/>"
                                          )[1]
                                            ? product.small_description.split(
                                                  "<br/>"
                                              )[1]
                                            : ""
                                        : ""}
                                </p>

                                {/* Quantity and Add to Cart */}
                                <div className="flex gap-2 items-center border-b pb-5">
                                    {/* quantity */}
                                    <div className="flex items-center text-lg gap-2 border border-[#264c4f] px-4 py-2   rounded-full w-fit">
                                        <p
                                            className="hover:bg-[#264c4f] flex items-center justify-center  rounded-full px-3 py-1 hover:text-white cursor-pointer transition-all duration-300"
                                            onClick={handleIncerementQuantity}
                                        >
                                            +
                                        </p>
                                        <p
                                            className="text-gray-600"
                                            id="quantity"
                                        >
                                            {quantity}
                                        </p>

                                        <p
                                            className="hover:bg-[#264c4f] flex-1 rounded-full px-4 py-1 hover:text-white cursor-pointer"
                                            onClick={handleDecrementQuantity}
                                        >
                                            -
                                        </p>
                                    </div>
                                    <button
                                        className="bg-[#264c4f] w-full whitespace-nowrap  hover:bg-teal-700 text-white px-14 py-4 rounded-full transition-colors duration-200 mr-2 font-semibold text-base"
                                        onClick={handleAddToCard}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                {/* Action buttons */}
                                <div className=" text-gray-600 mt-4 border-b pb-5">
                                    <button
                                        className="flex items-center gap-2"
                                        onClick={handleWishlist}
                                    >
                                        <FaRegHeart
                                            className={`${
                                                isProductInWishlist && "hidden"
                                            }`}
                                        />{" "}
                                        <FaHeart
                                            className={`${
                                                !isProductInWishlist && "hidden"
                                            }`}
                                        />{" "}
                                        Wishlist
                                    </button>
                                </div>
                                {/* category */}
                                <div className="pt-4">
                                    <p className="text-gray-600 font-bold text-sm">
                                        CATEGORY:{" "}
                                        <span
                                            className="text-gray-400  hover:text-[#264c4f] cursor-pointer uppercase font-semibold transition-all duration-200 "
                                            onClick={() =>
                                                navigate(
                                                    `/product-category/${product.category}`
                                                )
                                            }
                                        >
                                            {product.category}
                                        </span>
                                    </p>
                                </div>

                                <button
                                    className="w-full mt-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200"
                                    onClick={() => {
                                        navigate(`/product/${product.slug}`);
                                    }}
                                >
                                    Go to product page
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="max-w-[300px] w-full group cursor-pointer ">
            {/* img */}
            <div className="w-[300px] relative overflow-hidden rounded-tl-xl rounded-tr-xl">
                <img
                    src={product.image_cover}
                    alt=""
                    onClick={() => {
                        navigate(`/product/${product.slug}`);
                    }}
                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute top-0 right-0 p-3 flex flex-col gap-3">
                    <span
                        className={`bg-white p-2 flex items-center justify-center rounded-full hover:text-white hover:bg-[#264c50] cursor-pointer transition-all duration-100 ease-in-out ${
                            isProductInWishlist && "!bg-[#264c50]"
                        }`}
                        onClick={handleWishlist}
                    >
                        <FaRegHeart
                            className={`text-base  ${
                                isProductInWishlist && "hidden"
                            }`}
                        />
                        <FaHeart
                            className={`text-sm text-white ${
                                !isProductInWishlist && "hidden"
                            }`}
                        />
                    </span>
                    <span className="block bg-white p-2 rounded-full hover:text-white hover:bg-[#264c50] cursor-pointer transition-all duration-100 ease-in-out">
                        <TbArrowsShuffle className="text-base  " />
                    </span>
                    <span className="block bg-white p-2 rounded-full hover:text-white hover:bg-[#264c50] cursor-pointer transition-all duration-100 ease-in-out ">
                        <GoEye
                            className="text-base "
                            onClick={() => {
                                setIsOpen(true);
                            }}
                        />
                    </span>
                </div>
            </div>
            {/* title & category */}
            <div className="text-center py-3 border border-gray-100">
                <p className="font-semibold text-lg">{product.title}</p>
                <p>{product.category}</p>
            </div>
            {/* price & add to cart */}
            <div className="flex ">
                <div className="flex-1 flex justify-center items-center font-semibold text-base border border-gray-100 h-[55px] rounded-bl-xl">
                    ${product.price}
                </div>
                <div
                    className="flex-1 flex justify-center items-center font-semibold text-base border border-gray-100 rounded-br-xl"
                    onClick={handleAddToCard}
                >
                    Add to cart
                </div>
            </div>
            {/* moadl */}
            <div className="p-4">
                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={product.title}
                />
            </div>
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
        </div>
    );
}
