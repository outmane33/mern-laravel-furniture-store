import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LayoutForAdmin from "./components/user/LayoutForAdmin";
// import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import UserOrder from "./pages/UserOrder";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import LayoutForAdmin from "./components/user/LayoutForAdmin";
import AdminPage from "./pages/AdminPage";

function App() {
    // const user = useSelector((state) => state.auth.user);
    const { checkAuth } = useAuthStore();
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<LayoutForAdmin />}>
                        <Route path="/admin/:content" element={<AdminPage />} />
                        <Route
                            path="/admin/:content/:orderId"
                            element={<AdminPage />}
                        />
                    </Route>
                    <Route path="/" element={<UserPage />} />
                    <Route path="/:content" element={<UserPage />} />
                    <Route path="/:content/:category" element={<UserPage />} />
                    <Route path="/order/:orderId" element={<UserOrder />} />
                    <Route path="*" element={<UserPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
