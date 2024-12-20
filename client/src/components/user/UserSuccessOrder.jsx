import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function UserSuccessOrder({ orderId }) {
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await fetch(`/api/v1/order/${orderId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                if (data.status === "success") {
                    setOrderItems(data.order.cartItems);
                    setTotalPrice(data.order.totalOrderPrice);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getOrder();
    }, [orderId]);

    console.log(orderItems);
    return (
        <div className="min-h-screen flex justify-center items-center bg-[#fbfdfc]">
            <div className="flex flex-col justify-center items-center gap-7 max-w-[900px] w-full">
                {orderId === "cancel" ? (
                    <img
                        src="https://img.freepik.com/free-psd/cross-mark-isolated_23-2151478816.jpg?semt=ais_hybrid"
                        className="w-32 h-32"
                    />
                ) : (
                    <FaCircleCheck className="text-8xl text-green-500" />
                )}
                <h2 className="text-5xl font-bold text-[#1e2215] ">
                    {orderId === "cancel"
                        ? "Order Canceled"
                        : "Thank you for your purchase"}
                </h2>
                <p className="text-gray-600 text-lg font-semibold max-w-lg w-full text-center">
                    {orderId === "cancel"
                        ? ""
                        : ` We've received your order will ship in 5-7 days business
                    days. Your order number is ${orderId}`}
                </p>
                <div className="flex flex-col gap-2 bg-white p-5 rounded-lg max-w-[600px] w-full">
                    <p className="text-2xl font-semibold text-[#112428]">
                        Order Summary
                    </p>
                    {/* product */}
                    <table>
                        {orderItems &&
                            orderItems.map((item) => (
                                <tr className="border-b " key={item._id}>
                                    <td className="py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 bg-gray-100 rounded">
                                                <img
                                                    src={
                                                        item.product.image_cover
                                                    }
                                                    alt="Product"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h3 className="font-medium text-gray-800">
                                                    {item.product.title}
                                                </h3>
                                                <p className="text-gray-600">
                                                    ${item.product.price}.00
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        {/* quantity */}
                                        <div className="flex gap-2 w-fit px-2 items-center justify-center    py-[7px] rounded-full">
                                            <p>{item.quantity}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 text-right font-medium text-gray-800">
                                        ${item.product.price * item.quantity}.00
                                    </td>
                                </tr>
                            ))}
                    </table>
                    {/* total price */}
                    <div className="flex justify-between pt-3">
                        <p className="font-semibold text-xl text-[#112428]">
                            Total
                        </p>
                        <p className="font-semibold text-xl">
                            {totalPrice} MAD
                        </p>
                    </div>
                    {/* back home */}
                </div>
                <button
                    className="bg-[#264c4f]  whitespace-nowrap hover:bg-teal-700 text-white px-6 py-3 rounded-full transition-colors duration-200 mr-2 font-semibold text-base mt-10"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}
