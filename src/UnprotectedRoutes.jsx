import { Navigate, Outlet} from "react-router-dom";
import { Login } from "./pages/Login";

const useAuth = () => {
    const user = {loggedIn: false};
    return user && user.loggedIn;
}

const UnprotectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Navigate to="/" /> : <Outlet/> ;
}

export default UnprotectedRoutes;