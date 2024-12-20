import { useEffect } from "react";
import { useProductStore } from "../../store/useProductStore";
import { useLocation } from "react-router-dom";
import { useOrderStore } from "../../store/useOrderStore";
import { FiShoppingBag } from "react-icons/fi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Badge } from "flowbite-react";
import moment from "moment";

export default function AdminDashboard() {
    const { products, getAllProducts } = useProductStore();
    const { getAllOrders, orders } = useOrderStore();
    const location = useLocation();
    useEffect(() => {
        getAllProducts("/api/products?per_page=5");
        getAllOrders();
    }, [location.pathname]);

    return (
        <div className="">
            <p className="text-2xl font-bold text-[#152421] px-10">
                Add Attribute
            </p>
            {/* statistcs */}
            <div className="flex gap-8 p-10 justify-center ">
                {/* chart 1 */}
                <div className="flex max-w-sm w-full items-center shadow-lg rounded-lg p-5 gap-5 bg-white">
                    {/* left */}
                    <div className="bg-[#264c4f] w-12 h-12 flex justify-center items-center text-white text-2xl rounded-full ">
                        <FiShoppingBag />
                    </div>
                    {/* right */}
                    <div className="flex gap-2 justify-between flex-1 items-center">
                        {/* Sales */}
                        <div>
                            <p className="text-gray-600">Total Sales</p>
                            <p className="font-bold text-xl">34,945</p>
                        </div>
                        {/* percent */}
                        <div className="flex gap-2 items-center">
                            <p>
                                <FaArrowTrendUp className="text-green-600" />
                            </p>
                            <p className="font-semibold text-gray-700">1.56%</p>
                        </div>
                    </div>
                </div>
                {/* chart 2 */}
                <div className="flex max-w-sm w-full items-center shadow-lg rounded-lg p-5 gap-5 bg-white">
                    {/* left */}
                    <div className="bg-[#d39e76] w-12 h-12 flex justify-center items-center text-white text-2xl rounded-full ">
                        <FiShoppingBag />
                    </div>
                    {/* right */}
                    <div className="flex gap-2 justify-between flex-1 items-center">
                        {/* Sales */}
                        <div>
                            <p className="text-gray-600">Total Sales</p>
                            <p className="font-bold text-xl">34,945</p>
                        </div>
                        {/* percent */}
                        <div className="flex gap-2 items-center">
                            <p>
                                <FaArrowTrendUp className="text-green-600" />
                            </p>
                            <p className="font-semibold text-gray-700">1.56%</p>
                        </div>
                    </div>
                </div>
                {/* chart 3 */}
                <div className="flex max-w-sm w-full items-center shadow-lg rounded-lg p-5 gap-5 bg-white">
                    {/* left */}
                    <div className="bg-[#a7a29c] w-12 h-12 flex justify-center items-center text-white text-2xl rounded-full ">
                        <FiShoppingBag />
                    </div>
                    {/* right */}
                    <div className="flex gap-2 justify-between flex-1 items-center">
                        {/* Sales */}
                        <div>
                            <p className="text-gray-600">Total Sales</p>
                            <p className="font-bold text-xl">34,945</p>
                        </div>
                        {/* percent */}
                        <div className="flex gap-2 items-center">
                            <p>
                                <FaArrowTrendUp className="text-green-600" />
                            </p>
                            <p className="font-semibold text-gray-700">1.56%</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* tables */}
            <div className="flex w-full gap-10 px-10">
                {/* top selling */}
                <div className="flex-1 rounded-xl shadow-lg bg-white ">
                    <div className="px-6 py-4 flex justify-between">
                        <h2 className="text-xl text-[#264c4f] font-bold">
                            Top selling product
                        </h2>
                        <button className="text-blue-500 hover:text-blue-600 focus:outline-none"></button>
                    </div>
                    <div className="flex gap-10">
                        {/* Top selling product */}
                        <table className="flex-1  table-auto">
                            <thead>
                                <tr className=" border-b">
                                    <th className="px-4 py-3 text-left">
                                        Product
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Category
                                    </th>
                                    <th className="px-4 py-3 text-right">
                                        Total sale
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Stock
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products &&
                                    products.map((product) => (
                                        <tr className="group" key={product.id}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center">
                                                    <img
                                                        src={
                                                            product.image_cover
                                                        }
                                                        alt="Patimax Fragrance"
                                                        className="w-10 h-10 mr-4 rounded transition-transform duration-300 group-hover:scale-x-125"
                                                    />
                                                    <span className="font-semibold">
                                                        {product.title}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-sm">
                                                {/* {product.category.name} */}
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm font-semibold">
                                                ${product.sold * product.price}
                                                .00
                                            </td>
                                            <td className=" py-3  text-center ">
                                                <p className="px-3 w-fit  text-sm rounded-full whitespace-nowrap">
                                                    {product.quantity > 10 && (
                                                        <Badge
                                                            color="info"
                                                            className="font-semibold"
                                                        >
                                                            In Stock
                                                        </Badge>
                                                    )}
                                                    {product.quantity <= 10 && (
                                                        <Badge
                                                            color="warning"
                                                            className="font-semibold"
                                                        >
                                                            only{" "}
                                                            {product.quantity}{" "}
                                                            left
                                                        </Badge>
                                                    )}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Orders */}
                <div className="flex-1 rounded-xl shadow-lg bg-white">
                    <div className="px-6 py-4 flex justify-between">
                        <h2 className="text-xl text-[#264c4f] font-bold">
                            Orders
                        </h2>
                        <button className="text-blue-500 hover:text-blue-600 focus:outline-none"></button>
                    </div>
                    <div className="flex gap-10">
                        {/* Top selling product */}
                        <table className="flex-1 border table-auto">
                            <thead>
                                <tr className=" border-b">
                                    <th className="px-4 py-3 text-left">
                                        Product
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Customer
                                    </th>
                                    <th className="px-4 py-3 text-right">
                                        Price
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        CreateAt
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders &&
                                    orders.map((order) => (
                                        <tr className="" key={order.id}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center">
                                                    <img
                                                        src={
                                                            "https://remosnextjs.vercel.app/images/products/16.png"
                                                        }
                                                        alt="Patimax Fragrance"
                                                        className="w-10 h-10 mr-4 rounded"
                                                    />
                                                    <span className="font-semibold">
                                                        {order.id}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-sm">
                                                {order.user.username
                                                    ? order.user.username
                                                    : "anonymous"}
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm font-semibold">
                                                ${order.total_order_price}.00
                                            </td>
                                            <td className=" py-3  text-center ">
                                                <p className="px-4 py-3 font-semibold text-sm">
                                                    {moment(
                                                        order.created_at
                                                    ).fromNow()}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
