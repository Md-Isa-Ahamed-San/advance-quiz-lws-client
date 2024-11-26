import logo from "../../../assets/logo.svg"
import {useAuth} from "../../../hooks/useAuth.js";
import {NavLink, useNavigate} from "react-router-dom";

const Header = () => {
    const {auth,setAuth} = useAuth();
const navigate = useNavigate();
const handleLogout = ()=>{
    setAuth({})
    navigate("/login")
}
    return (
        <header className="flex justify-between items-center mb-12">
            <img src={logo} className="h-7"/>
            <div>
                {
                    auth?.user? (

                            <button onClick={handleLogout} className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
                                         style={{fontFamily: 'Jaro'}}>
                        Logout
                            </button>

                            ): (
                        <NavLink to="/login">
                            <button className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
                                    style={{fontFamily: 'Jaro'}}>
                                Login
                            </button>
                        </NavLink>
                    )
                }


            </div>
        </header>
    );
};

export default Header;