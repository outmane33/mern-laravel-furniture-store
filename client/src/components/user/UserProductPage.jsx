import {
    Alert,
    Breadcrumb,
    Button,
    Label,
    Modal,
    Rating,
} from "flowbite-react";
import { FaHeart } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Tabs } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import moment from "moment";
import { useCartStore } from "../../store/useCartStore";
import { useProductStore } from "../../store/useProductStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useReviewStore } from "../../store/useReviewStore";
import { useAuthStore } from "../../store/useAuthStore";

export default function UserProductPage() {
    const { addProductToCart } = useCartStore();
    let { getProduct, product } = useProductStore();

    const {
        addProductToWishlist,
        removeProductFromWishlist,
        wishlist,
        userWishlist,
    } = useWishlistStore();
    const { getProductColors } = useProductStore();
    const { addReview, reviews, getReviewsForProduct, deleteReview } =
        useReviewStore();
    const { user } = useAuthStore();
    const location = useLocation();
    const { category } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [formComment, setFormComment] = useState({
        title: "",
        content: "",
        rating: 0,
    });
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    const handleRatingChange = (value) => {
        setFormComment((prev) => ({
            ...prev,
            rating: value,
        }));
    };

    useEffect(() => {
        getProduct(category);
        getProductColors(category);
        getReviewsForProduct(category);
    }, [location.pathname]);

    useEffect(() => {
        // const getComments = async () => {
        //     if (!product?._id) return; // Don't fetch if no product ID
        //     try {
        //         const res = await fetch(
        //             `/api/v1/comment?product=${product._id}`,
        //             {
        //                 method: "GET",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                 },
        //             }
        //         );
        //         const data = await res.json();
        //         if (data.status === "success") {
        //             setComments(data.comments);
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // };
        // const getRelatedProducts = async () => {
        //     try {
        //         const res = await fetch(
        //             `/api/v1/product?category[in]=${product.category}&limit=4`,
        //             {
        //                 method: "GET",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                 },
        //             }
        //         );
        //         const data = await res.json();
        //         if (data.status === "success") {
        //             setRelatedProducts(data.products);
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // };
        // getRelatedProducts();
        // getComments();
    }, [product]);

    const handleAddToCard = async () => {
        addProductToCart({ product_id: product.id, quantity });
    };

    const handleWishlist = async () => {
        if (!user) {
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

    const handleChange = (e) => {
        setFormComment({
            ...formComment,
            [e.target.id]: e.target.value,
            productId: product._id,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formComment.content || !formComment.title) {
            setError("All fields are required");
            return;
        }
        if (!user) {
            setError("You must be logged in to comment");
            return;
        }
        addReview({
            product_id: product.id,
            rating: formComment.rating,
            content: formComment.content,
            title: formComment.title,
        });
        setFormComment({ title: "", content: "" });
        setError(null);
    };

    const handleDelete = async () => {
        deleteReview(selectedComment.id);
        setShowModal(false);
    };

    const isProductInWishlist =
        Array.isArray(wishlist) && product?.id
            ? wishlist.some((item) => item.id === product.id)
            : false;

    useEffect(() => {
        userWishlist();
    }, [location.pathname]);

    return (
        <div className="w-full py-28">
            {/* imng & little description section */}
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
                {/* left */}
                <div className="flex-1 mx-5 lg:mx-0">
                    <img
                        src={product && product.image_cover}
                        alt=""
                        className="w-[6 00px]"
                    />
                </div>
                {/* right */}
                <div className="flex-1 flex gap-8 pl-10 pt-4 flex-col ">
                    <Breadcrumb
                        aria-label="Default breadcrumb example"
                        className="text-[#234e54]"
                    >
                        <Breadcrumb.Item href="#">
                            <p className="text-[#234e54] text-xs ">HOME</p>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="#" className="text-white">
                            <p className="text-[#234e54] text-xs">SHOP</p>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="#" className="text-white">
                            <p className="text-[#234e54] text-xs uppercase">
                                {product?.category
                                    ? product.category.name
                                    : "Unknown Category"}
                            </p>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="#" className="text-white">
                            <p className="text-[#234e54] text-xs uppercase">
                                {product ? product.title : "undefinded"}
                            </p>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="flex flex-col gap-4">
                        <p className="text-3xl font-bold">
                            {product ? product.title : "undefinded"}
                        </p>
                        <p className="text-xl font-bold text-[#162320]">
                            ${product ? product.price : "undefinded"}.00
                        </p>
                    </div>
                    <p className="text-gray-500">
                        {product?.small_description?.split("<br/>")[0] || ""}
                    </p>
                    <p className="text-gray-500">
                        {product?.small_description?.split("<br/>")[1] || ""}
                    </p>
                    <hr />
                    <div className="flex gap-2 items-center">
                        {/* quantity */}
                        <div className="flex items-center text-lg gap-2 border border-[#264c4f] px-6 py-2   rounded-full w-fit">
                            <p
                                className="hover:bg-[#264c4f] flex items-center justify-center  rounded-full px-3 py-1 hover:text-white cursor-pointer transition-all duration-200 "
                                onClick={handleIncerementQuantity}
                            >
                                +
                            </p>
                            <p className="text-gray-600" id="quantity">
                                {quantity}
                            </p>

                            <p
                                className="hover:bg-[#264c4f] rounded-full px-4 py-1 hover:text-white cursor-pointer transition-all duration-200"
                                onClick={handleDecrementQuantity}
                            >
                                -
                            </p>
                        </div>
                        <button
                            className="bg-[#264c4f] w-full lg:w-fit whitespace-nowrap  hover:bg-teal-700 text-white px-14 py-4 rounded-full transition-colors duration-200 mr-2 font-semibold text-base"
                            onClick={handleAddToCard}
                        >
                            Add to Cart
                        </button>
                    </div>
                    <div
                        className="flex gap-2 items-center  font-semibold cursor-pointer"
                        onClick={handleWishlist}
                    >
                        <FaHeart className="text-gray-400 hover:text-[#456a6d]" />
                        <p className="text-[#456a6d]">Wishlist</p>
                    </div>
                    <hr />
                    <img
                        src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/06/brand-goldline.svg"
                        alt=""
                        className="w-20"
                    />
                    <hr />
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2 text-sm">
                            <strong className="text-[#46585a] ">
                                CATEGORY:
                            </strong>
                            <p className="text-gray-500">TABLES</p>
                        </div>
                        <div className="flex text-[#456a6d] gap-5 text-base">
                            <FaFacebook />
                            <FaInstagramSquare />
                            <FaSquareXTwitter />
                            <FaLinkedin />
                        </div>
                    </div>
                </div>
            </div>
            {/* product details */}
            <div className=" flex pt-16 items-center justify-center max-w-7xl mx-auto ">
                <div className="flex justify-center w-full">
                    <Tabs
                        variant="default"
                        className="flex items-center justify-center"
                    >
                        <Tabs.Item active title="DESCRIPTION" id="mytab">
                            <div className="w-full flex flex-col text-[17px] gap-6 text-gray-600 px-4 md:px-6 lg:px-8 text-center md:text-left">
                                <p>
                                    Sit amet nulla facilisi morbi tempus
                                    iaculis. Phasellus vestibulum lorem sed
                                    risus ultricies tristique. Urna neque
                                    viverra justo nec ultrices dui sapien eget
                                    mi. Dignissim sodales ut eu sem integer
                                    vitae justo.
                                </p>
                                <p>
                                    Porttitor lacus luctus accumsan tortor
                                    posuere ac ut. Amet luctus venenatis lectus
                                    magna fringilla urna. At erat pellentesque
                                    adipiscing commodo elit at imperdiet dui.
                                </p>
                                <p>
                                    Quis varius quam quisque id. Facilisis
                                    gravida neque convallis a cras semper auctor
                                    neque vitae. Proin sagittis nisl rhoncus
                                    mattis rhoncus urna neque viverra. Dolor
                                    magna eget est lorem ipsum. Integer quis
                                    auctor elit sed vulputate mi sit amet
                                    mauris. Egestas egestas fringilla phasellus
                                    faucibus scelerisque eleifend donec pretium.
                                    Duis ut diam quam nulla. Aliquet lectus
                                    proin nibh nisl condimentum id venenatis.
                                    Mauris nunc congue nisi vitae suscipit.
                                </p>
                                <p>
                                    Augue interdum velit euismod in pellentesque
                                    massa placerat duis. Porttitor massa id
                                    neque aliquam vestibulum morbi blandit
                                    cursus risus.
                                </p>
                            </div>
                        </Tabs.Item>

                        <Tabs.Item
                            title="ADDITIONAL INFORMATION"
                            className="w-full"
                        >
                            <div className="xl:w-[1200px] lg:w-[900px] md:w-[600px] w-[300px]">
                                <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                                    <tbody>
                                        {/* First Row */}
                                        <tr className="border-b border-gray-100  hover:bg-gray-50 700 transition-colors">
                                            <td className="py-4 px-6 lg:text-lg text-base font-medium text-[#212012] dark:text-white">
                                                Colors
                                            </td>
                                            <td className="py-4 px-6 text-base text-gray-600 dark:text-gray-500">
                                                {product &&
                                                    product.colors
                                                        .map((e) => {
                                                            return e.name;
                                                        })
                                                        .join(", ")}
                                            </td>
                                        </tr>

                                        {/* Second Row */}
                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="py-4 px-6 lg:text-lg text-base font-medium text-[#212012] dark:text-white">
                                                Material
                                            </td>
                                            <td className="py-4 px-6 text-base text-gray-500 ">
                                                {product && product.material}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Tabs.Item>

                        <Tabs.Item title={`REVIEWS (${reviews.length})`}>
                            <div className="lg:w-[1000px] md:w-[800px]  w-[450px] flex flex-col lg:flex-row py-6 gap-14 lg:gap-20">
                                {/* left */}
                                <div className="flex flex-col gap-5 flex-1">
                                    <p className="text-[#212012] font-semibold lg:text-2xl text-xl">
                                        Reviews
                                    </p>
                                    <p className="text-gray-500 text-sm lg:text-base">
                                        There are no reviews yet.
                                    </p>
                                    {/* reviews */}
                                    {reviews &&
                                        reviews.map((review) => (
                                            <div
                                                className="flex gap-3"
                                                key={review.id}
                                            >
                                                {/* left */}
                                                <img
                                                    src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/user-avatar-150x150.jpg"
                                                    alt=""
                                                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
                                                />
                                                {/* right */}
                                                <div className="flex-1 flex flex-col gap-4">
                                                    {/* name & rating */}
                                                    <div className="flex justify-between gap-4">
                                                        <div className="flex items-center gap-3">
                                                            <p className="font-bold lg:text-base text-sm">
                                                                {
                                                                    review.user
                                                                        .username
                                                                }
                                                            </p>
                                                            <p className="text-gray-500 lg:text-sm text-xs">
                                                                –{" "}
                                                                {moment(
                                                                    review.created_at
                                                                ).fromNow()}
                                                            </p>
                                                        </div>
                                                        <Rating>
                                                            {[
                                                                1, 2, 3, 4, 5,
                                                            ].map((value) => (
                                                                <Rating.Star
                                                                    key={value}
                                                                    filled={
                                                                        value <=
                                                                        review.rating
                                                                    }
                                                                    className="cursor-pointer"
                                                                />
                                                            ))}
                                                        </Rating>
                                                    </div>
                                                    {/* title */}
                                                    <div>
                                                        <p className="font-bold lg:text-base text-sm">
                                                            {review?.title ??
                                                                "No Title"}
                                                        </p>
                                                    </div>
                                                    {/* review */}
                                                    <div>
                                                        <p className="text-gray-700 lg:text-[15px] text-[14px]">
                                                            {review.content}
                                                        </p>
                                                    </div>
                                                    <hr />
                                                    {/* likes */}
                                                    <div className="flex items-center gap-5">
                                                        {/* <button
                                                            className={`text-gray-400 hover:text-blue-500 ${
                                                                loggedUser &&
                                                                review.likes.includes(
                                                                    loggedUser._id
                                                                )
                                                                    ? "!text-blue-500"
                                                                    : "text-gray-400"
                                                            }`}
                                                            onClick={() => {
                                                                handleLike(
                                                                    review._id
                                                                );
                                                            }}
                                                        >
                                                            <FaThumbsUp className="text-base" />
                                                        </button> */}
                                                        <p className="text-gray-400 text-sm">
                                                            {review.number_of_likes >
                                                                0 &&
                                                                review.number_of_likes +
                                                                    " " +
                                                                    (review.number_of_likes >
                                                                    1
                                                                        ? "likes"
                                                                        : "like")}
                                                        </p>
                                                        {user &&
                                                            (user.id ===
                                                                review.user
                                                                    .id ||
                                                                user.role ===
                                                                    "admin") && (
                                                                <>
                                                                    <button
                                                                        className="text-gray-400 hover:text-red-500 text-sm"
                                                                        onClick={() => {
                                                                            setShowModal(
                                                                                true
                                                                            );
                                                                            setSelectedComment(
                                                                                review
                                                                            );
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                {/* right */}
                                <div className="flex-1 flex flex-col gap-6">
                                    {reviews.length === 0 && (
                                        <p className="text-[#212012] font-semibold lg:text-lg text-base">
                                            Be the first to review “
                                            {product?.title ?? "No Title"}
                                        </p>
                                    )}

                                    <div className="flex gap-2">
                                        <p className="text-xs text-[#465550] font-semibold">
                                            YOUR RATING *
                                        </p>
                                        <div>
                                            <Rating>
                                                {[1, 2, 3, 4, 5].map(
                                                    (value) => (
                                                        <Rating.Star
                                                            key={value}
                                                            filled={
                                                                value <=
                                                                formComment.rating
                                                            }
                                                            onClick={() =>
                                                                handleRatingChange(
                                                                    value
                                                                )
                                                            }
                                                            className="cursor-pointer"
                                                        />
                                                    )
                                                )}
                                            </Rating>
                                        </div>
                                    </div>
                                    <form
                                        className="flex flex-col gap-5"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="flex flex-col">
                                            <Label
                                                className="text-[#989d91] lg:text-lg text-base"
                                                htmlFor="default-search"
                                            >
                                                Review Title
                                            </Label>
                                            <input
                                                type="text"
                                                id="title"
                                                onChange={handleChange}
                                                value={formComment.title}
                                                className="!rounded-md border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <Label
                                                className="text-[#989d91] lg:text-lg text-base"
                                                htmlFor="default-search"
                                            >
                                                Your Review
                                            </Label>

                                            <textarea
                                                className="w-full border-[3px] border-gray-100 rounded-md p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200 resize-none"
                                                rows={4}
                                                id="content"
                                                value={formComment.content}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <button
                                            className="bg-[#264c4f] text-white hover:bg-[#446a6d] lg:px-10 px-8 py-3 rounded-md w-fit text-base font-semibold"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                    {error && (
                                        <Alert className="text-sm text-white font-semibold bg-[#e44b5f]">
                                            {error}
                                        </Alert>
                                    )}
                                </div>
                            </div>
                        </Tabs.Item>
                    </Tabs>
                </div>
            </div>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size="md"
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3>Are you sure you want to delete this comment?</h3>
                        <div className="mt-4 flex justify-center gap-6">
                            <Button color="failure" onClick={handleDelete}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => setShowModal(false)}
                            >
                                {"No, Cancel"}{" "}
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
