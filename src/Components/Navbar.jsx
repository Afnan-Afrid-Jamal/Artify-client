// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import LightAndDarkMode from './LightAndDarkMode';

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('');

    const handleSetActive = (path) => {
        setActiveLink(path);
        const allLinks = document.querySelectorAll('[data-navlink]');
        allLinks.forEach(link => {
            link.setAttribute('data-active', link.getAttribute('data-path') === path ? 'true' : 'false');
        });
    };

    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        if (isDark) {
            document.body.style.backgroundColor = '#111827';
            document.body.style.color = '#ffffff';
        }
    }, []);

    const navLinks = [
        { path: '/home', label: 'Home' },
        { path: '/explore-artwork', label: 'Explore Artworks' },
        { path: '/add-artwork', label: 'Add Artwork' },
        { path: '/my-gallery', label: 'My Gallery' },
        { path: '/my-favourites', label: 'My Favorites' }
    ];

    const renderNavLink = (path, label, isMobile = false) => (
        <NavLink
            key={path}
            to={path}
            data-navlink
            data-path={path}
            onClick={() => handleSetActive(path)}
            className={({ isActive }) => {
                if (isActive) handleSetActive(path);
                if (isMobile) {
                    return isActive
                        ? "text-[#6366F1] font-semibold"
                        : "text-gray-800 opacity-80 hover:opacity-100";
                }
                return isActive
                    ? "text-[#F9FAFB] font-semibold border-y-1 border-dashed"
                    : "text-[#E5E7EB] opacity-80 hover:opacity-100";
            }}
        >
            {label}
        </NavLink>
    );

    return (
        <div
            data-navbar
            className="shadow-sm bg-gradient-to-r from-purple-600 via-purple-700 to-violet-800 backdrop-blur-lg bg-opacity-95 border-b border-white/20 relative z-50"
        >
            <div className="navbar px-4 md:px-0 lg:px-0 max-w-full md:max-w-11/12 lg:max-w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-[#E5E7EB] h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-white/90 backdrop-blur-md flex flex-col gap-y-3 rounded-box z-50"
                        >
                            {navLinks.map(({ path, label }) => renderNavLink(path, label, true))}

                            <LightAndDarkMode />
                            <Link to="/login" className='btn bg-gradient-to-r from-purple-600 via-purple-700 to-violet-800 text-[#E5E7EB] hover:text-white hover:bg-white/10 w-full'>Login</Link>
                            <Link to="/register" className='btn bg-gradient-to-r from-purple-600 via-purple-700 to-violet-800 text-[#E5E7EB] hover:text-white hover:bg-white/10 w-full'>Register</Link>
                        </ul>
                    </div>

                    <Link
                        to="/home"
                        data-logo
                        className="text-2xl lg:text-3xl logo-font text-[#E5E7EB] border-2 p-1"
                    >
                        ARTIFY
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 poppins-font flex gap-6">
                        {navLinks.map(({ path, label }) => renderNavLink(path, label))}
                    </ul>
                </div>

                <div className="navbar-end flex items-center gap-4">
                    {/* Theme Toggle - Visible on desktop */}
                    <div className="hidden lg:block">
                        <LightAndDarkMode />
                    </div>

                    <div className="hidden lg:flex items-center gap-3">
                        <Link to="/login" className="btn border-1 border-purple-300 btn-ghost text-[#E5E7EB] hover:text-white hover:bg-white/10">
                            Login
                        </Link>
                        <Link to="/register" className="btn bg-white text-purple-700 hover:bg-gray-100">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;