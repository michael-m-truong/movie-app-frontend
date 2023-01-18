import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Login } from "./pages/Login";

const useAuth = () => {
    const user = {loggedIn: false};
    return user && user.loggedIn;
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to="/login" />;
}

export default ProtectedRoutes;