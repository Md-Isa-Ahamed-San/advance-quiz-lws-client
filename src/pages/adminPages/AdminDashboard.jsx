import React from 'react';
import Sidebar from "../../components/Admin/Sidebar.jsx";
import AdminHeader from "../../components/Admin/AdminHeader.jsx";
import QuizGrid from "../../components/Admin/QuizGrid.jsx";


const AdminDashboard = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar Component */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-grow p-10">
                {/* Header Component */}
                <AdminHeader />

                {/* Quiz List Component */}
                <QuizGrid />
            </main>
        </div>
    );
};

export default AdminDashboard;
