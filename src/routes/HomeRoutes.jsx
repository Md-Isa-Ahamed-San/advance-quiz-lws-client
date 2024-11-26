import HomePage from "../pages/HomePage.jsx";
import {useAuth} from "../hooks/useAuth.js";
import {Navigate} from "react-router-dom";

 const HomeRoute = () => {
    const { auth } = useAuth();
    // console.log(auth)

    // If user is logged in and is an admin, redirect to admin dashboard
    if (auth?.user?.role === '1') {
        return <Navigate to="/adminDashboard" replace />;
    }

    // Otherwise, show the home page
    return <HomePage />;
};
export default HomeRoute;