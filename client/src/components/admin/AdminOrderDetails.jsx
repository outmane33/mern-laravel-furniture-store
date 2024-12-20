import { useEffect } from "react";
import { useOrderStore } from "../../store/useOrderStore";
import { useLocation, useParams } from "react-router-dom";
import { FiTrash } from "react-icons/fi";

export default function AdminOrderDetails() {
    const { orderId } = useParams();
    const { getOrderDetails, order, details } = useOrderStore();
    const location = useLocation();
    useEffect(() => {
        getOrderDetails(orderId);
    }, location.pathname);

    return (
        <div className="flex flex-col gap-10 py-10 max-w-7xl mx-5 xl:mx-auto">
            <p className=" text-3xl lg:text-4xl font-bold">Order Details</p>
            <div className="w-full flex flex-col lg:flex-row items-center ">
                {/* left */}
                <div className="flex-1">
                    <div className="max-w-3xl mx-auto p-4">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left text-lg py-4 font-medium text-gray-700">
                                        <p className="">Product</p>
                                    </th>
                                    <th className="text-left text-lg py-4 font-medium text-gray-700">
                                        <p className="hidden lg:block">
                                            Quantity
                                        </p>
                                    </th>
                                    <th className="text-right text-lg py-4 font-medium text-gray-700">
                                        <p className="hidden lg:block">
                                            Subtotal
                                        </p>
                                    </th>
                                    <th className="w-10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* First Product Row */}
                                {details &&
                                    details.map((item) => (
                                        <tr
                                            className="border-b "
                                            key={item.product.id}
                                        >
                                            <td className="py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-20 h-20 bg-gray-100 rounded">
                                                        <img
                                                            src={
                                                                item.product
                                                                    .image_cover
                                                            }
                                                            alt="Product"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">
                                                            {item.product.title}
                                                        </h3>
                                                        <p className="text-gray-600">
                                                            ${item.price}
                                                            .00
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                {/* quantity */}
                                                <div className="flex gap-2 w-fit px-2 items-center justify-center  py-[7px] rounded-md">
                                                    <p className="text-gray-600 text-sm">
                                                        {item.quantity}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-4 text-right font-medium text-gray-800">
                                                ${item.price * item.quantity}
                                                .00
                                            </td>
                                            <td className="py-4 pl-4"></td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* right */}
                <div className="lg:flex-1/2 mx-10">
                    {/* Cart Totals */}
                    <div className="mt-8 max-w-md ml-auto">
                        <div className="bg-white rounded-3xl shadow-sm border px-16 py-6 flex flex-col gap-8 ">
                            <h2 className="text-base lg:text-lg font-bold lg:font-medium mb-4">
                                Order totals
                            </h2>

                            <div className="flex justify-between items-center pb-3 ">
                                <span className="text-gray-800 lg:font-bold text-base">
                                    Subtotal
                                </span>
                                <span className="font-medium text-gray-600">
                                    ${order && order.total_order_price}.00
                                </span>
                            </div>
                            <hr />
                            <div className="flex justify-between items-center pb-3">
                                <span className="text-gray-800 lg:font-bold text-base">
                                    Total
                                </span>
                                <span className="font-medium">
                                    ${order && order.total_order_price}.00
                                </span>
                            </div>

                            <div className="py-3 text-base lg:text-base text-gray-600 whitespace-nowrap w-[250px]">
                                {/* Congratulations! You got free shipping 🎉 */}
                            </div>

                            {/* <button className="bg-[#264c4f] whitespace-nowrap hover:bg-[#446a6d] text-white px-6 py-4 rounded-md transition-all duration-500 mr-2 font-semibold text-base">
                                <Link to={"/checkout"} className="w-full">
                                    Proceed to checkout
                                </Link>
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
