import React from 'react';

const AdminHeader = () => (
    <header className="mb-8">
        <WelcomeMessage />
    </header>
);

const WelcomeMessage = () => (
    <>
        <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
        <h1 className="text-4xl font-bold">Welcome Back To Your Quiz Hub!</h1>
    </>
);

export default AdminHeader;
