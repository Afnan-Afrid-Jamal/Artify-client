// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import LightAndDarkMode from './LightAndDarkMode';

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('');

    // Set active link and update data attributes
    const handleSetActive = (path) => {
        setActiveLink(path);

        // Update data attributes for all links
        const allLinks = document.querySelectorAll('[data-navlink]');
        allLinks.forEach(link => {
            link.setAttribute('data-active', link.getAttribute('data-path') === path ? 'true' : 'false');
        });
    };

    // Initialize dark mode on component mount
    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        if (isDark) {
            document.body.style.backgroundColor = '#111827';
            document.body.style.color = '#ffffff';
        }
    }, []);

    return (
        <div
            data-navbar
            className="shadow-sm"
            style={{
                background: 'linear-gradient(to right, #6366F1, #7D7AF4, #14B8A6)'
            }}
        >
            <div className="navbar max-w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-[#E5E7EB] h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>

                        <ul tabIndex={-1} className="menu menu-sm dropdown-content z-1 mt-3 w-52 p-2 shadow poppins-font bg-white/90 backdrop-blur-md flex flex-col gap-y-3 rounded-box">
                            {['/home', '/explore-artwork', '/add-artwork', '/my-gallery', '/my-favourites'].map(path => (
                                <NavLink
                                    key={path}
                                    to={path}
                                    data-navlink
                                    data-path={path}
                                    onClick={() => handleSetActive(path)}
                                    className={({ isActive }) => {
                                        if (isActive) handleSetActive(path);
                                        return isActive ? "text-[#6366F1] font-semibold" : "text-gray-800 opacity-80 hover:opacity-100";
                                    }}
                                >
                                    {path === '/home' && 'Home'}
                                    {path === '/explore-artwork' && 'Explore Artworks'}
                                    {path === '/add-artwork' && 'Add Artwork'}
                                    {path === '/my-gallery' && 'My Gallery'}
                                    {path === '/my-favourites' && 'My Favorites'}
                                </NavLink>
                            ))}
                        </ul>
                    </div>

                    <Link
                        to="/home"
                        data-logo
                        className="text-3xl logo-font text-[#E5E7EB] border-2 p-1"
                    >
                        ARTIFY
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 poppins-font flex gap-8">
                        {['/home', '/explore-artwork', '/add-artwork', '/my-gallery', '/my-favourites'].map(path => (
                            <NavLink
                                key={path}
                                to={path}
                                data-navlink
                                data-path={path}
                                onClick={() => handleSetActive(path)}
                                className={({ isActive }) => {
                                    if (isActive) handleSetActive(path);
                                    return isActive
                                        ? "text-[#F9FAFB] font-semibold border-y-1 border-dashed"
                                        : "text-[#E5E7EB] opacity-80 hover:opacity-100";
                                }}
                            >
                                {path === '/home' && 'Home'}
                                {path === '/explore-artwork' && 'Explore Artworks'}
                                {path === '/add-artwork' && 'Add Artwork'}
                                {path === '/my-gallery' && 'My Gallery'}
                                {path === '/my-favourites' && 'My Favorites'}
                            </NavLink>
                        ))}
                    </ul>
                </div>

                <div className="navbar-end">
                    <LightAndDarkMode />
                </div>
            </div>
        </div>
    );
};

export default Navbar;