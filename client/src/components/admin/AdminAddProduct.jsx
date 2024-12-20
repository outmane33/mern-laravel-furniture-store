import { FaShoppingBag } from "react-icons/fa";
import { RiDraftLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useProductStore } from "../../store/useProductStore";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import AddCategoryModal from "./AddCategoryModal ";
import AddBrandModal from "./AddBrandModal ";

export default function AdminAddProduct() {
    const [formData, setFormData] = useState({
        sold: 11,
        ratings_average: 0,
        ratings_quantity: 0,
        sku: "NA/NA",
        brand_id: 1,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenBrand, setIsModalOpenBrand] = useState(false);

    const handleBrandChange = (brandId) => {
        setFormData({ ...formData, brand_id: brandId });
    };
    const ref = useRef(null);
    const { getAllCategories, categories, getAllBrands, brands, addProduct } =
        useProductStore();
    const location = useLocation();
    useEffect(() => {
        getAllCategories();
        getAllBrands();
    }, [location.pathname]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result;
                setFormData({ ...formData, image_cover: base64String });
            };
            reader.readAsDataURL(file);
        }
    };
    const handleChage = (e) => {
        const value = e.target.value;
        const id = e.target.id;

        // Convert numeric fields to numbers
        if (["price", "quantity", "price_after_discount"].includes(id)) {
            setFormData({ ...formData, [id]: Number(value) });
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };

    const handleCategoryChange = (value) => {
        setFormData({ ...formData, category_id: Number(value) });
    };
    const handleAddProduct = async (e) => {
        e.preventDefault();

        try {
            // Log the data being sent
            console.log("Sending data:", formData);

            // Basic validation
            if (!formData.brand_id) {
                alert("Please select a brand");
                return;
            }

            if (!formData.category_id) {
                alert("Please select a category");
                return;
            }

            // Make sure all required fields are numbers
            const dataToSend = {
                ...formData,
                price: Number(formData.price),
                quantity: Number(formData.quantity),
                price_after_discount:
                    Number(formData.price_after_discount) || 0,
                category_id: Number(formData.category_id),
                brand_id: Number(formData.brand_id),
                ratings_average: Number(formData.ratings_average),
                ratings_quantity: Number(formData.ratings_quantity),
                sold: Number(formData.sold),
            };

            // Log the transformed data
            console.log("Transformed data:", dataToSend);

            const result = await addProduct(dataToSend);
            console.log("Success:", result);
        } catch (error) {
            console.error("Full error:", error);
            console.error("Error response:", error.response?.data);
            alert(
                `Failed to add product: ${
                    error.response?.data?.message || error.message
                }`
            );
        }
    };
    return (
        <div className="w-full h-full b flex flex-col gap-6 p-6">
            <div className="flex justify-between">
                {/* left */}
                <div className="flex items-center gap-2 font-semibold">
                    <FaShoppingBag />
                    <p>Add New Product</p>
                </div>
                {/* roight */}
                <div className="flex items-center gap-4">
                    <div className="border-2 flex items-center gap-4 px-4 py-2 rounded-full">
                        <RiDraftLine className="text-lg" />
                        <p className="font-semibold">Save Draft</p>
                    </div>
                    <div
                        className="border-2 flex items-center gap-4 px-4 py-2 rounded-full bg-[#9feda8] cursor-pointer"
                        onClick={handleAddProduct}
                    >
                        <FaCheck className="text-lg" />
                        <p className="font-semibold ">Add Product</p>
                    </div>
                </div>
            </div>
            {/* details */}
            <div className="flex gap-6">
                {/* left */}
                <div className="flex-1 flex flex-col gap-4 bg-[#f9f9f9] p-6 rounded-2xl">
                    <p className="font-semibold text-lg">General information</p>
                    <div className="flex flex-col">
                        <label className="font-semibold">Name Product</label>
                        <input
                            className="bg-[#eeeeee] py-3 rounded-xl px-4"
                            placeholder="Name Product"
                            id="title"
                            onChange={handleChage}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold">
                            Small Description Product
                        </label>
                        <textarea
                            className="bg-[#eeeeee] py-3 rounded-xl px-4 border-none"
                            placeholder="Write Description Product"
                            rows={4}
                            id="small_description"
                            onChange={handleChage}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold">
                            Long Description Product
                        </label>
                        <textarea
                            className="bg-[#eeeeee] py-3 rounded-xl px-4 border-none"
                            placeholder="Write Description Product"
                            rows={4}
                            id="long_description"
                            onChange={handleChage}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="font-semibold">Brand</label>
                            <label className="Pick Available Brand text-sm text-gray-500">
                                Pick Available Brand
                            </label>
                        </div>
                        <div className="grid grid-cols-8 gap-10">
                            {brands &&
                                brands.map((brand) => (
                                    <div
                                        className={`p-4 rounded-xl cursor-pointer ${
                                            formData.brand_id === brand.id
                                                ? "bg-[#9feda7]"
                                                : "bg-[#eeeeee] hover:bg-[#9feda7]"
                                        } transition-all duration-300`}
                                        key={brand.id}
                                        onClick={() =>
                                            handleBrandChange(brand.id)
                                        }
                                    >
                                        <img src={brand.name} alt="" />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                {/* right */}
                <div className="w-[450px] bg-[#f9f9f9] p-6 rounded-2xl flex flex-col gap-10 justify-center items-center">
                    <div className="w-full rounded-xl flex flex-col gap-2">
                        <p className="font-semibold text-lg">Upload Img</p>
                        <input
                            type="file"
                            className="hidden"
                            ref={ref}
                            onChange={handleFileChange}
                        />
                        <div
                            onClick={() => ref.current.click()}
                            className="cursor-pointer"
                        >
                            {formData.image_cover ? (
                                <img
                                    src={formData.image_cover}
                                    alt=""
                                    className="rounded-xl"
                                />
                            ) : (
                                <div className="w-full h-[400px] rounded-xl border-2 border-dashed flex justify-center items-center">
                                    <FaPlus className="text-4xl bg-[#9feda7] rounded-full text-white p-1 cursor-pointer" />
                                </div>
                            )}
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-4 gap-4">
                        <div className=" hover:border-2 hover:border-gray-500 border-2 rounded-xl transition-all duration-300 cursor-pointer">
                            <img
                                src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                                alt=""
                                className="w-[100px] h-[100px] rounded-xl"
                            />
                        </div>
                        <div className=" hover:border-2 hover:border-gray-500 border-2 rounded-xl transition-all duration-300 cursor-pointer">
                            <img
                                src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                                alt=""
                                className="w-[100px] h-[100px] rounded-xl"
                            />
                        </div>
                        <div className=" hover:border-2 hover:border-gray-500 border-2 rounded-xl transition-all duration-300 cursor-pointer">
                            <img
                                src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                                alt=""
                                className="w-[100px] h-[100px] rounded-xl"
                            />
                        </div>
                        <div className="w-[100px] h-[100px] rounded-xl border-2 border-dashed flex justify-center items-center">
                            <FaPlus className="text-2xl bg-[#9feda7] rounded-full text-white p-1 cursor-pointer" />
                        </div>
                    </div> */}
                </div>
            </div>
            {/* second */}
            <div className="flex gap-6">
                {/* left */}
                <div className="flex-1 flex flex-col gap-4 bg-[#f9f9f9] p-6 rounded-2xl">
                    <p className="font-semibold text-lg">Pricing And Stock</p>
                    <div className="w-full flex gap-4">
                        <div className="flex flex-col flex-1">
                            <label className="font-semibold">
                                Base Pricing
                            </label>
                            <input
                                className="bg-[#eeeeee] py-3 rounded-xl px-4"
                                placeholder="0"
                                id="price"
                                onChange={handleChage}
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="font-semibold">Stock</label>
                            <input
                                className="bg-[#eeeeee] py-3 rounded-xl px-4"
                                placeholder="0"
                                id="quantity"
                                onChange={handleChage}
                            />
                        </div>
                    </div>
                    <div className="w-full flex gap-4">
                        <div className="flex flex-col flex-1">
                            <label className="font-semibold">Discount</label>
                            <input
                                className="bg-[#eeeeee] py-3 rounded-xl px-4"
                                placeholder="10%"
                                id="price_after_discount"
                                onChange={handleChage}
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="font-semibold">
                                Discount Type
                            </label>
                            <select className="bg-[#eeeeee] py-3 rounded-xl px-4 border-none">
                                <option>Fixed</option>
                                <option>Percentage</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* right */}
                <div className="w-[450px] bg-[#f9f9f9] p-6 rounded-2xl flex flex-col gap-10">
                    <p className="font-semibold text-lg">Category</p>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">
                            Product Category
                        </label>
                        <select
                            className="bg-[#eeeeee] py-3 rounded-xl px-4 border-none"
                            id="category_id"
                            onChange={(event) =>
                                handleCategoryChange(event.target.value)
                            }
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/*  */}
                    <div
                        className="border-2 flex items-center gap-4 px-4 py-2 rounded-full bg-[#9feda8] cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <FaCheck className="text-lg" />
                        <p className="font-semibold">Add Category</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-6">
                <div className="flex-1"></div>
                <div className="w-[450px] bg-[#f9f9f9] p-6 rounded-2xl flex flex-col gap-10">
                    <p className="font-semibold text-lg">Brand</p>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Product Brand</label>
                        <div
                            className="border-2 flex items-center gap-4 px-4 py-2 rounded-full bg-[#9feda8] cursor-pointer"
                            onClick={() => setIsModalOpenBrand(true)}
                        >
                            <FaCheck className="text-lg" />
                            <p className="font-semibold">Add Brand</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <AddCategoryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
            <div>
                <AddBrandModal
                    isOpen={isModalOpenBrand}
                    onClose={() => setIsModalOpenBrand(false)}
                />
            </div>
        </div>
    );
}
