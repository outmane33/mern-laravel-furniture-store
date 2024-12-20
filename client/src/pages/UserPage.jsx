import { useParams } from "react-router-dom";
import UserHeader from "../components/user/UserHeader";
import UserBanner from "../components/user/UserBanner";
import UserHome from "../components/user/UserHome";
import UserListing from "../components/user/UserListing";
import UserCheckout from "../components/user/UserCheckout";
import UserWishlist from "../components/user/UserWishlist";
import UserContactUs from "../components/user/UserContactUs";
import UserAboutUs from "../components/user/UserAboutUs";
import UserNews from "../components/user/UserNews";
import UserCart from "../components/user/UserCart";
import UserProductCategory from "../components/user/UserProductCategory";
import UserProductPage from "../components/user/UserProductPage";
import UserFooter from "../components/user/UserFooter";

export default function UserPage() {
    const { content, category } = useParams();

    return (
        <div className="flex flex-col">
            <UserHeader />
            <UserBanner />
            <div>
                {content === undefined && <UserHome />}
                {content === "listing" && <UserListing />}
                {content === "checkout" && <UserCheckout />}
                {content === "wishlist" && <UserWishlist />}
                {content === "contact-us" && <UserContactUs />}
                {content === "about-us" && <UserAboutUs />}
                {content === "news" && <UserNews />}
                {content === "cart" && <UserCart />}
                {content === "product-category" && category && (
                    <UserProductCategory />
                )}
                {content === "product" && category && <UserProductPage />}
            </div>
            <UserFooter />
        </div>
    );
}
