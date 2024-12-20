import { Breadcrumb, TextInput, Drawer } from "flowbite-react";
import { LuArrowUpDown } from "react-icons/lu";
import { useEffect, useState } from "react";
import UserProductCard from "./UserProductCard";
import { IoSearch } from "react-icons/io5";
import { TbColorFilter } from "react-icons/tb";
import { useProductStore } from "../../store/useProductStore";

export default function UserListing() {
    const { products, getAllProducts, getDataColors, dataColors } =
        useProductStore();

    // State for filters
    const [formQuery, setFormQuery] = useState({
        sort: "",
        category: "",
        colors: [],
    });

    const [keyword, setKeyword] = useState("");
    const [checkedCategory, setCheckedCategory] = useState({});
    const [selectedColors, setSelectedColors] = useState({});
    const [numOfPages, setNumOfPages] = useState(1);
    const [colorCounts, setColorCounts] = useState({});
    const [pagination, setPagination] = useState({});

    const [count, setCount] = useState(0);
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    // Fetch products on component mount
    useEffect(() => {
        getAllProducts(`/api/products`);
        getDataColors();
    }, []);

    // Update filters and trigger API call
    const applyFilters = () => {
        const query = new URLSearchParams();

        if (keyword) query.append("title", keyword);

        const selectedCategories = Object.keys(checkedCategory).filter(
            (key) => checkedCategory[key]
        );
        if (selectedCategories.length > 0) {
            query.append("category", selectedCategories.join(","));
        }

        const selectedColorsArray = Object.keys(selectedColors).filter(
            (key) => selectedColors[key]
        );
        if (selectedColorsArray.length > 0) {
            selectedColorsArray.forEach((color) =>
                query.append("colors[]", color)
            );
        }

        // Apply sort if necessary
        if (formQuery.sort) {
            query.append("sort_by", formQuery.sort);
            query.append("sort_direction", "asc"); // Change if needed
        }

        getAllProducts(`/api/products?${query.toString()}`);
    };
    // Handle changes for keyword search
    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleKeywordSubmit = (e) => {
        e.preventDefault();
        applyFilters();
    };

    // Handle changes for category filter
    const handleCategoryChange = (e) => {
        const { name, checked } = e.target;
        setCheckedCategory((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    // Handle changes for color filter
    const handleColorChange = (color) => {
        setSelectedColors((prev) => ({
            ...prev,
            [color]: !prev[color],
        }));
    };

    // Utility function to build the query string
    const buildQueryString = (params) => {
        const { sort, colors, category, keyword, page } = params;
        const queryParts = [];

        if (sort) queryParts.push(`sort=${sort}`);
        if (category) queryParts.push(`category[in]=${category}`);
        if (colors) queryParts.push(`colors[in]=${colors}`);
        if (keyword) queryParts.push(`keyword=${keyword}`);
        if (page) queryParts.push(`page=${page}`);

        return `/api/v1/product${
            queryParts.length ? "?" + queryParts.join("&") : ""
        }`;
    };

    // Update filters whenever state changes
    useEffect(() => {
        applyFilters();
    }, [checkedCategory, selectedColors, formQuery.sort]);

    const handleNextPage = () => {
        if (pagination.page < numOfPages) {
            const updatedFormQuery = {
                ...formQuery,
                page: (pagination.page || 1) + 1,
            };

            const queryString = buildQueryString({
                ...updatedFormQuery,
                keyword,
            });

            setFormQuery(updatedFormQuery);
            getAllProducts(queryString);
        }
    };
    const handlePreviousPage = () => {
        if (pagination.page > 1) {
            const updatedFormQuery = {
                ...formQuery,
                page: (pagination.page || 1) - 1,
            };

            const queryString = buildQueryString({
                ...updatedFormQuery,
                keyword,
            });

            setFormQuery(updatedFormQuery);
            getAllProducts(queryString);
        }
    };
    const handleSpecificPage = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= numOfPages) {
            const updatedFormQuery = {
                ...formQuery,
                page: pageNumber,
            };

            const queryString = buildQueryString({
                ...updatedFormQuery,
                keyword,
            });

            setFormQuery(updatedFormQuery);
            getAllProducts(queryString);
        }
    };

    // Handle sorting change
    const sortChange = (e) => {
        const selectedOption = e.target.value;
        setFormQuery((prevQuery) => ({
            ...prevQuery,
            sort: selectedOption,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const queryString = buildQueryString({
            ...formQuery,
            keyword,
        });
        getAllProducts(queryString);
    };

    const handleClose = () => setIsOpenFilter(false);
    return (
        <>
            {/* banner  section */}
            <div className="flex justify-center items-center relative mx-5 md:mx-7 lg:mx-9 xl:mx-12">
                <div className="max-w-[1700px] w-full my-16 relative  h-[300px] lg:h-[400px]">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-50 rounded-3xl"></div>

                    {/* Image */}
                    <img
                        src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/shop-hero-image.webp"
                        alt=""
                        className="rounded-3xl  h-[300px] lg:h-[400px] w-full object-cover"
                    />

                    {/* Centered Text */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-3xl font-bold">
                        <p className="pb-6">Shop</p>
                        <Breadcrumb
                            aria-label="Default breadcrumb example"
                            className="text-white"
                        >
                            <Breadcrumb.Item href="#">
                                <p className="text-white">Home</p>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="#" className="text-white">
                                <p className="text-white">Projects</p>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
            </div>
            {/* brands */}
            <div className="md:grid-cols-3 md:gap-4 lg:grid-cols-6  py-10 md:max-w-2xl lg:max-w-7xl mx-auto hidden md:grid lg:px-10">
                {/* brand */}
                <div className="flex gap-3">
                    <img
                        src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/armchairs-category-hero-image.webp"
                        alt=""
                        className="rounded-full w-16 h-16 object-cover"
                    />
                    <div>
                        <p className="lg:text-[19px] text-[16px]  font-semibold ">
                            Armchairs
                        </p>
                        <p className="text-gray-500 text-base lg:text-base  whitespace-nowrap">
                            5 products
                        </p>
                    </div>
                </div>
                {/* brand */}
                <div className="flex gap-3">
                    <img
                        src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/chairs-category-hero-image.webp"
                        alt=""
                        className="rounded-full w-16 h-16 object-cover"
                    />
                    <div>
                        <p className="lg:text-[19px] text-[16px] font-semibold ">
                            Chairs
                        </p>
                        <p className="text-gray-500 text-base lg:text-lg whitespace-nowrap">
                            6 products
                        </p>
                    </div>
                </div>
                {/* brand */}
                <div className="flex gap-3">
                    <img
                        src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/storage-category-hero-image.webp"
                        alt=""
                        className="rounded-full w-16 h-16 object-cover"
                    />
                    <div>
                        <p className="lg:text-[19px] text-[16px] font-semibold ">
                            Storage
                        </p>
                        <p className="text-gray-500 text-base lg:text-lg whitespace-nowrap">
                            6 products
                        </p>
                    </div>
                </div>
                {/* brand */}
                <div className="flex gap-3">
                    <img
                        src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/sofas-category-hero-image.webp"
                        alt=""
                        className="rounded-full w-16 h-16 object-cover"
                    />
                    <div>
                        <p className="lg:text-[19px] text-[16px] font-semibold ">
                            Sofas
                        </p>
                        <p className="text-gray-500 text-base lg:text-lg whitespace-nowrap">
                            5 products
                        </p>
                    </div>
                </div>
                {/* brand */}
                <div className="flex gap-3">
                    <img
                        src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/decor-category-hero-image.webp"
                        alt=""
                        className="rounded-full w-16 h-16 object-cover"
                    />
                    <div>
                        <p className="lg:text-[19px] text-[16px] font-semibold ">
                            Decor
                        </p>
                        <p className="text-gray-500 text-base lg:text-lg whitespace-nowrap">
                            8 products
                        </p>
                    </div>
                </div>
                {/* brand */}
                <div className="flex gap-3">
                    <img
                        src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/tables-category-hero-image.webp"
                        alt=""
                        className="rounded-full w-16 h-16 object-cover"
                    />
                    <div>
                        <p className="lg:text-[19px] text-[16px] font-semibold ">
                            Tables
                        </p>
                        <p className="text-gray-500 text-base lg:text-lg whitespace-nowrap">
                            5 products
                        </p>
                    </div>
                </div>
            </div>

            {/* main section */}
            <div className="min-h-screen flex py-10 max-w-7xl mx-auto">
                {/* filter sidebar */}
                <div className="w-[300px] p-10  flex-col gap-3 hidden lg:flex">
                    {/* Keyword Search */}
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            id="keyword"
                            rightIcon={IoSearch}
                            className="mb-7 text-3xl"
                            placeholder="Search"
                            value={keyword}
                            onChange={handleKeywordChange}
                        />
                    </form>

                    {/* Filter by Color */}
                    <div>
                        <p className="text-xl font-semibold text-[#212b28]">
                            Filter by color
                        </p>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        {dataColors.map(({ color, product_count }) => (
                            <div
                                key={color}
                                className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full`}
                                onClick={() => handleColorChange(color)}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full bg-[${color.toLowerCase()}] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[${color.toLowerCase()}] transition-all duration-200`}
                                    style={{
                                        backgroundColor: color.toLowerCase(),
                                    }} // Dynamically set the background color
                                ></div>
                                <span className="text-gray-700">{color}</span>
                                <span
                                    className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                                        selectedColors[color]
                                            ? "bg-[#fecd06] text-white border-[#fecd06]"
                                            : ""
                                    }`}
                                >
                                    {product_count}{" "}
                                    {/* Display the product count for each color */}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Filter by Category */}
                    <div className="my-5">
                        <p className="text-xl font-semibold text-[#212b28]">
                            Filter by category
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 pb-6">
                        {[
                            "Armchairs",
                            "Beds",
                            "Chairs",
                            "Decor",
                            "Sofas",
                            "Storage",
                            "Tables",
                        ].map((category) => (
                            <div key={category}>
                                <input
                                    id={`checkbox-${category}`}
                                    type="checkbox"
                                    name={category}
                                    className="rounded mr-2 border-[#bfc5c3]"
                                    checked={checkedCategory[category] || false}
                                    onChange={handleCategoryChange}
                                />
                                <label
                                    className="text-gray-700"
                                    htmlFor={`checkbox-${category}`}
                                >
                                    {category}
                                </label>
                            </div>
                        ))}
                    </div>
                    {/* best selling products */}
                    <div className="flex flex-col gap-2 mt-5 ">
                        <p className="text-xl font-semibold text-[#212b28] mb-3">
                            Best selling products
                        </p>
                        <div className="flex flex-col gap-4">
                            {/* product */}
                            <div className="flex gap-2 items-center">
                                <img
                                    src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-35.webp"
                                    alt=""
                                    className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                                />
                                <div>
                                    <p className="font-semibold text-lg">
                                        Aliquam Blandit
                                    </p>
                                    <p>$320.00</p>
                                </div>
                            </div>
                            {/* product */}
                            <div className="flex gap-2 items-center">
                                <img
                                    src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-24.webp"
                                    alt=""
                                    className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                                />
                                <div>
                                    <p className="font-semibold text-lg">
                                        Porta Non
                                    </p>
                                    <p>$320.00</p>
                                </div>
                            </div>
                            {/* product */}
                            <div className="flex gap-2 items-center">
                                <img
                                    src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-25.webp"
                                    alt=""
                                    className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                                />
                                <div>
                                    <p className="font-semibold text-lg">
                                        Diam Volutpat
                                    </p>
                                    <p>$320.00</p>
                                </div>
                            </div>
                            {/* product */}
                            <div className="flex gap-2 items-center">
                                <img
                                    src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-26.webp"
                                    alt=""
                                    className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                                />
                                <div>
                                    <p className="font-semibold text-lg">
                                        Porttitor Massa
                                    </p>
                                    <p>$320.00</p>
                                </div>
                            </div>
                            {/* product */}
                            <div className="flex gap-2 items-center">
                                <img
                                    src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-27.webp"
                                    alt=""
                                    className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                                />
                                <div>
                                    <p className="font-semibold text-lg">
                                        Senectus Netus
                                    </p>
                                    <p>$320.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* all products */}
                <div className="w-full flex flex-col  flex-1 ">
                    <div className="flex justify-between items-center px-5 pt-8 pb-2 border-b">
                        <p className="text-sm flex items-center gap-2">
                            <button
                                className="border rounded-2 flex items-center gap-2 px-4 py-1 hover:bg-[#274b4f] hover:text-white transition-all duration-300 lg:hidden"
                                // onClick={() => setIsOpen(true)}
                            >
                                <TbColorFilter /> FILTER
                            </button>
                            SHOWING 1–
                            {numOfPages} OF {count} RESULTS
                        </p>
                        <div className="flex gap-3 items-center">
                            <div className="w-fit border flex items-center gap-1 px-2 py-1">
                                <LuArrowUpDown />
                                <select
                                    className="h-[40px] border border-gray-300 text-gray-500 text-sm"
                                    onChange={sortChange}
                                    value={formQuery.sort} // Bind value to formQuery.sort
                                >
                                    <option value="">Default Sorting</option>
                                    <option value="Sort by Latest">
                                        Sort by Latest
                                    </option>
                                    <option value="Sort by Price Low to High">
                                        Sort by Price Low to High
                                    </option>
                                    <option value="Sort by Price High to Low">
                                        Sort by Price High to Low
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 flex flex-wrap gap-5 justify-center">
                        {/*product card  */}
                        {products &&
                            products.map((product) => (
                                <UserProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                    </div>
                    {/* pagination */}
                    <div className="w-full  flex justify-between items-center">
                        {/* prev */}
                        <div>
                            {pagination.prev ? (
                                <button
                                    className="border-2 border-gray-400 uppercase rounded-md flex items-center gap-2 px-6 py-2 text-xs hover:bg-white hover:text-[#fecd06] hover:border-[#fecd06]  transition-all duration-300"
                                    onClick={handlePreviousPage}
                                >
                                    {"Previous"}
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                        {/* pages */}
                        <div className="flex gap-2">
                            {Array.from(
                                { length: pagination.pages },
                                (_, index) => (
                                    <button
                                        key={index}
                                        className={`border-2 border-white rounded-md flex items-center gap-2 px-4 py-2 hover:bg-white hover:text-[#fecd06] hover:border-[#fecd06]  transition-all duration-300 ${
                                            index + 1 === pagination.page
                                                ? "!bg-[#fecd06] !text-white"
                                                : "bg-white text-black"
                                        } `}
                                        onClick={() =>
                                            handleSpecificPage(index + 1)
                                        }
                                    >
                                        {index + 1}
                                    </button>
                                )
                            )}
                        </div>
                        {/* next */}
                        <div>
                            {pagination.next ? (
                                <button
                                    className="border-2 border-gray-400 uppercase rounded-md flex items-center gap-2 px-6 py-2 text-xs hover:bg-white hover:text-[#fecd06] hover:border-[#fecd06]  transition-all duration-300"
                                    onClick={handleNextPage}
                                >
                                    {"Next"}
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                open={isOpenFilter}
                onClose={handleClose}
                position="right"
                className="w-[440px]"
            >
                <Drawer.Header
                    title="Available Filters"
                    titleIcon={() => <></>}
                />
                <Drawer.Items>
                    {/* filter sidebar */}
                    <div className="flex-col gap-3 pt-5 px-2">
                        {/* Keyword Search */}
                        <form onSubmit={handleKeywordSubmit}>
                            <TextInput
                                id="keyword"
                                rightIcon={IoSearch}
                                className="mb-7 text-3xl"
                                placeholder="Search"
                                value={keyword}
                                onChange={handleKeywordChange}
                            />
                        </form>

                        {/* Filter by Color */}
                        <div>
                            <p className="text-xl font-semibold text-[#212b28]">
                                Filter by color
                            </p>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            {dataColors.map(({ color, product_count }) => (
                                <div
                                    key={color}
                                    className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full`}
                                    onClick={() => handleColorChange(color)}
                                >
                                    <div
                                        className={`w-4 h-4 rounded-full bg-[${color.toLowerCase()}] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[${color.toLowerCase()}] transition-all duration-200`}
                                        style={{
                                            backgroundColor:
                                                color.toLowerCase(),
                                        }} // Dynamically set the background color
                                    ></div>
                                    <span className="text-gray-700">
                                        {color}
                                    </span>
                                    <span
                                        className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                                            selectedColors[color]
                                                ? "bg-[#fecd06] text-white border-[#fecd06]"
                                                : ""
                                        }`}
                                    >
                                        {product_count}{" "}
                                        {/* Display the product count for each color */}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Filter by Category */}
                        <div className="my-5">
                            <p className="text-xl font-semibold text-[#212b28]">
                                Filter by category
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 pb-6">
                            {[
                                "Armchairs",
                                "Beds",
                                "Chairs",
                                "Decor",
                                "Sofas",
                                "Storage",
                                "Tables",
                            ].map((category) => (
                                <div key={category}>
                                    <input
                                        id={`checkbox-${category}`}
                                        type="checkbox"
                                        name={category}
                                        className="rounded mr-2 border-[#bfc5c3]"
                                        checked={
                                            checkedCategory[category] || false
                                        }
                                        onChange={handleCategoryChange}
                                    />
                                    <label
                                        className="text-gray-700"
                                        htmlFor={`checkbox-${category}`}
                                    >
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {/* best selling products */}
                        <div className="flex flex-col gap-2 mt-5 ">
                            <p className="text-base font-semibold text-[#212b28] mb-3">
                                Best selling products
                            </p>
                            <div className="flex flex-col gap-4">
                                {/* product */}
                                <div className="flex gap-2 items-center">
                                    <img
                                        src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-35.webp"
                                        alt=""
                                        className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                                    />
                                    <div>
                                        <p className="font-semibold text-base">
                                            Aliquam Blandit
                                        </p>
                                        <p className="text-sm">$320.00</p>
                                    </div>
                                </div>
                                {/* product */}
                                <div className="flex gap-2 items-center">
                                    <img
                                        src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-24.webp"
                                        alt=""
                                        className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                                    />
                                    <div>
                                        <p className="font-semibold text-base">
                                            Porta Non
                                        </p>
                                        <p className="text-sm">$320.00</p>
                                    </div>
                                </div>
                                {/* product */}
                                <div className="flex gap-2 items-center">
                                    <img
                                        src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-25.webp"
                                        alt=""
                                        className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                                    />
                                    <div>
                                        <p className="font-semibold text-base">
                                            Diam Volutpat
                                        </p>
                                        <p className="text-sm">$320.00</p>
                                    </div>
                                </div>
                                {/* product */}
                                <div className="flex gap-2 items-center">
                                    <img
                                        src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-26.webp"
                                        alt=""
                                        className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                                    />
                                    <div>
                                        <p className="font-semibold text-base">
                                            Porttitor Massa
                                        </p>
                                        <p className="text-sm">$320.00</p>
                                    </div>
                                </div>
                                {/* product */}
                                <div className="flex gap-2 items-center">
                                    <img
                                        src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-27.webp"
                                        alt=""
                                        className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                                    />
                                    <div>
                                        <p className="font-semibold text-base">
                                            Senectus Netus
                                        </p>
                                        <p className="text-sm">$320.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Drawer.Items>
            </Drawer>
        </>
    );
}
