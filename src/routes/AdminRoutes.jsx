import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import Header from "../components/Common/Header/Header.jsx";
import QuizManageProvider from "../providers/QuizManageProvider.jsx";

const AdminRoutes = () => {
    const { auth } = useAuth()

// console.log(auth)
    return (
        <>
            {auth.authToken && auth?.user?.role==='admin' ? (
                <>
                   
                    <main className="mx-auto max-w-screen">
                        <div
                        //  className="container"
                         >
                            <QuizManageProvider>
                            <Outlet />
                            </QuizManageProvider>
                        </div>
                    </main>
                </>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default AdminRoutes;
