import { useParams } from "react-router-dom";
import UserSuccessOrder from "../components/user/UserSuccessOrder";

export default function UserOrder() {
    const { orderId } = useParams();
    return (
        <div>
            <UserSuccessOrder orderId={orderId} />
        </div>
    );
}
