import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { BiLogOut } from 'react-icons/bi';

const UserProfileDropdown = () => {
    const { user, handleLogout } = useContext(AuthContext);

    const handleLogoutBtn = () => {
        handleLogout()
    }

    if (!user) return null;

    const userImageSrc = user.photoURL ||
        `https://ui-avatars.com/api/?name=${user.displayName || user.email || "User"}&background=7e22ce&color=fff`;

    return (
        <div className="dropdown dropdown-end relative dropdown-hover delay-500">

            {/* Avatar */}
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar focus:outline-none group">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 transition-all duration-300 group-hover:ring-2 group-hover:ring-purple-400">
                    <img
                        src={userImageSrc}
                        alt={user.displayName || "User Avatar"}
                        className="object-cover w-full h-full"
                    />
                </div>
            </label>


            <ul
                tabIndex={0}

                className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl shadow-xl mt-2 w-44 p-2 flex flex-col gap-2 border border-gray-200 dark:border-gray-700 z-50"
            >
                {/* User Name/Email */}
                <li className="px-3 py-2 rounded font-medium text-center truncate">
                    {user.displayName || user.email || "User"}
                </li>
                <hr className='opacity-20 my-1' />

                {/* Logout Button */}
                <li>
                    <button
                        onClick={handleLogoutBtn}
                        className="
                            w-full
                            flex items-center justify-center gap-2
                            font-semibold
                            bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700
                            text-white
                            rounded-lg
                            px-4 py-2
                            shadow-md hover:shadow-lg
                            transition-all duration-200
                            transform hover:-translate-y-0.5
                        "
                    >
                        <BiLogOut size={20} />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default UserProfileDropdown;