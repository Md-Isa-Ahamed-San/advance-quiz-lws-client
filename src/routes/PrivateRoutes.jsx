import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import Header from "../components/Common/Header/Header.jsx"

const PrivateRoutes = () => {
    const { auth } = useAuth()

console.log(auth)
    return (
        <>
            {auth?.authToken? (
                <>
                        {/* <Header/> */}
                        <main className="mx-auto min-w-screen">
                            <div 
                            // className="container"
                            >
                                <Outlet />
                            </div>
                        </main>
                </>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default PrivateRoutes;
