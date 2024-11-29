import React from 'react';
import WhiteLogo from "../../assets/logo-white.svg"
import avater from "../../assets/avater.webp"
const Sidebar = () => {
    return (
        <aside className="w-64 bg-primary p-6 flex flex-col">
            <Logo />
            <NavigationMenu />
            <UserProfile />
        </aside>
    );
};

const Logo = () => (
    <div className="mb-10">
        <img src={WhiteLogo} className="h-7" alt="App Logo" />
    </div>
);

const NavigationMenu = () => (
    <nav className="flex-grow">
        <ul className="space-y-2">
            {["Quizzes", "Settings", "Manage Users", "Manage Roles", "Logout"].map((item, index) => (
                <li key={index}>
                    <a href={`${item==="Logout"? "/login" :"#"}`} className={`block py-2 px-4 rounded-lg ${index === 0 ? 'bg-white text-primary font-bold' : 'text-gray-100 hover:bg-gray-100 hover:text-primary'}`}>
                        {item}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);

const UserProfile = () => (
    <div className="mt-auto flex items-center">
        <img src={avater} alt="Mr Hasan" className="w-10 h-10 rounded-full mr-3 object-cover" />
        <span className="text-white font-semibold">Saad Hasan</span>
    </div>
);

export default Sidebar;
