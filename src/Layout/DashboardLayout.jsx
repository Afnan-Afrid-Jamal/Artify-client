import React, { useContext } from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { RiGalleryLine, RiHeartFill } from 'react-icons/ri';
import { NavLink, Outlet } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';
import { MdOutlineAnalytics } from "react-icons/md";
import { FaPlus } from 'react-icons/fa';
const DashboardLayout = () => {

    const { user, handleLogout } = useContext(AuthContext)

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-[#111827]">
                {/* Navbar */}
                <nav className="navbar w-full bg-purple-700 text-white shadow-md">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block size-6"><path d="M4 6l16 0"></path><path d="M4 12l16 0"></path><path d="M4 18l16 0"></path></svg>
                    </label>
                    <div className="px-4 flex flex-col leading-tight">
                        <span className="text-xs uppercase tracking-[0.2em] text-purple-300 font-medium">Overview</span>
                        <h2 className="text-xl font-black tracking-tight">
                            <span className="text-pink-400">{user?.displayName?.split(' ')[0]}</span>'s Dashboard
                        </h2>
                    </div>
                </nav>

                {/* Page content here */}
                <div className="p-6">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-purple-900 text-purple-50 w-64">
                    {/* Sidebar Header */}
                    <div className="p-6 text-2xl font-black border-b border-purple-800 w-full mb-4">
                        ARTIFY
                    </div>

                    {/* Sidebar content here */}
                    <ul className="menu w-full grow px-3 space-y-2">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `py-3 rounded-xl transition-all font-semibold flex items-center gap-3 ${isActive ? 'bg-purple-700 text-white' : 'hover:bg-purple-700'}`
                                }
                            >
                                <IoHomeOutline size={24} />
                                <span>Homepage</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/add-artwork"
                                className={({ isActive }) =>
                                    `py-3 rounded-xl transition-all font-semibold flex items-center gap-3 ${isActive ? 'bg-purple-700 text-white' : 'hover:bg-purple-700'}`
                                }
                            >
                                <FaPlus size={24} />
                                <span>Add Artwork</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/my-gallery"
                                className={({ isActive }) =>
                                    `py-3 rounded-xl transition-all font-semibold flex items-center gap-3 ${isActive ? 'bg-purple-700 text-white' : 'hover:bg-purple-700'}`
                                }
                            >
                                <RiGalleryLine size={24} />
                                <span>My Gallery</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/my-favorites"
                                className={({ isActive }) =>
                                    `py-3 rounded-xl transition-all font-semibold flex items-center gap-3 ${isActive ? 'bg-purple-700 text-white' : 'hover:bg-purple-700'}`
                                }
                            >
                                <RiHeartFill size={24} />
                                <span>My Favorites</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/my-profile"
                                className={({ isActive }) =>
                                    `py-3 rounded-xl transition-all font-semibold flex items-center gap-3 ${isActive ? 'bg-purple-700 text-white' : 'hover:bg-purple-700'}`
                                }
                            >
                                <CgProfile size={24} />
                                <span>My Profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/statistics"
                                className={({ isActive }) =>
                                    `py-3 rounded-xl transition-all font-semibold flex items-center gap-3 ${isActive ? 'bg-purple-700 text-white' : 'hover:bg-purple-700'}`
                                }
                            >
                                <MdOutlineAnalytics size={24} />
                                <span>Statistics</span>
                            </NavLink>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    handleLogout();
                                }}
                                className={({ isActive }) =>
                                    `py-3 rounded-xl transition-all font-semibold flex items-center gap-3 ${isActive ? 'bg-purple-700 text-white' : 'hover:bg-purple-700'}`
                                }
                            >
                                <MdLogout size={24} />
                                <span>Log Out</span>
                            </button>
                        </li>
                    </ul>

                    {/* Sidebar Footer */}
                    <div className="p-6 text-xs text-purple-400">
                        © 2026 ARTIFY Platform
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;