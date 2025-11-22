import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router';
import LightAndDarkMode from './LightAndDarkMode';
import { AuthContext } from '../Provider/AuthContext';
import UserProfileDropdown from './UserProfileDropdown';

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('');
    const { user } = useContext(AuthContext);

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
            <div className="navbar px-4 md:px-0 max-w-7xl mx-auto">

                {/* LEFT PART */}
                <div className="navbar-start">
                    {/* Mobile Menu Button */}
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-[#E5E7EB]"
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

                        {/* Mobile Menu */}
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 w-52 p-3 shadow bg-white/90 backdrop-blur-md rounded-box z-50 flex flex-col gap-y-3"
                        >
                            {renderNavLink('/home', 'Home', true)}
                            {renderNavLink('/explore-artwork', 'Explore Artworks', true)}
                            {renderNavLink('/add-artwork', 'Add Artwork', true)}
                            {renderNavLink('/my-gallery', 'My Gallery', true)}
                            {renderNavLink('/my-favourites', 'My Favorites', true)}

                            <LightAndDarkMode />

                            {/* If NOT logged in show buttons */}
                            {!user && (
                                <>
                                    <Link to="/login" className="btn bg-purple-700 text-white w-full">Login</Link>
                                    <Link to="/register" className="btn bg-purple-700 text-white w-full">Register</Link>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link
                        to="/home"
                        data-logo
                        className="text-2xl lg:text-3xl logo-font text-[#E5E7EB] border-2 p-1"
                    >
                        ARTIFY
                    </Link>
                </div>

                {/* CENTER PART — Desktop Only */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 poppins-font flex gap-6">
                        {renderNavLink('/home', 'Home')}
                        {renderNavLink('/explore-artwork', 'Explore Artworks')}
                        {renderNavLink('/add-artwork', 'Add Artwork')}
                        {renderNavLink('/my-gallery', 'My Gallery')}
                        {renderNavLink('/my-favourites', 'My Favorites')}
                    </ul>
                </div>

                {/* RIGHT PART */}
                <div className="navbar-end flex items-center gap-3">

                    {/* Desktop Theme Toggle */}
                    <div className="hidden lg:block">
                        <LightAndDarkMode />
                    </div>

                    {/* Desktop User Buttons */}
                    <div className="hidden md:flex lg:flex items-center gap-4">
                        {user ? (
                            <UserProfileDropdown />
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-ghost text-white border border-purple-300">
                                    Login
                                </Link>
                                <Link to="/register" className="btn bg-white text-purple-700 hover:bg-gray-100">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile User Profile (right corner) */}
                    <div className="lg:hidden pr-5">
                        {user && <UserProfileDropdown />}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Navbar;
