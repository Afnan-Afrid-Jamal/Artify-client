import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { FaUserEdit, FaEnvelope, FaCalendarAlt, FaPalette, FaPaintBrush, FaStar, FaGlobe, FaCamera, FaUserCircle } from 'react-icons/fa';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [userPhotoURL, setUserPhotoURL] = useState("");
    const [stats, setStats] = useState({
        artworks: 0,
        favorites: 0,
        likes: 0,
        views: 0
    });

    useEffect(() => {
        if (user) {
            setUserName(user.displayName || "Anonymous User");
            setUserPhotoURL(user.photoURL || "https://i.ibb.co/5GzXkwq/user.png");

            // Fetch user stats from your API
            fetch(`https://artify-server-sigma.vercel.app/user-stats?email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setStats(data.data);
                    }
                })
                .catch(console.error);
        }
    }, [user]);

    const handleEditProfile = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newUserName = form.userName.value;
        const newUserPhotoURL = form.userPhotoURL.value;

        try {
            await updateProfile(user, {
                displayName: newUserName,
                photoURL: newUserPhotoURL
            });

            setUserName(newUserName);
            setUserPhotoURL(newUserPhotoURL);

            document.getElementById('my_modal_5').close();
            toast.success("Profile Updated Successfully!", {
                style: {
                    background: "#1F2937",
                    color: "#F9FAFB",
                    border: "1px solid #4B5563"
                },
                theme: "dark"
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900/20 px-3 sm:px-4 md:px-6 py-6 sm:py-8">
            <div className="max-w-[90rem] mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8 md:mb-10 text-center px-2">
                    <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                        My Profile
                    </h1>
                    <p className="text-gray-400 mt-2 sm:mt-3 text-xs xs:text-sm sm:text-base max-w-2xl mx-auto px-2">
                        Manage your artist profile and showcase your creative journey
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
                    {/* Left Column - Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl sm:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300">
                            <div className="flex flex-col items-center">
                                {/* Profile Image */}
                                <div className="relative mb-4 sm:mb-6">
                                    <div className="w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-3 sm:border-4 border-purple-500/50 p-1 sm:p-1.5 shadow-lg sm:shadow-2xl shadow-purple-500/30">
                                        <img
                                            src={userPhotoURL}
                                            alt="User Profile"
                                            className="w-full h-full rounded-full object-cover bg-gray-900"
                                        />
                                    </div>
                                    <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 right-2 xs:right-3 sm:right-4 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center border-3 sm:border-4 border-gray-900">
                                        <FaUserCircle className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="text-center w-full px-2">
                                    <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 truncate max-w-full">
                                        {userName}
                                    </h2>
                                    <div className="inline-flex items-center gap-1.5 xs:gap-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 px-3 xs:px-4 py-1 xs:py-1.5 rounded-full border border-purple-500/30">
                                        <FaStar className="w-3 h-3 xs:w-4 xs:h-4 text-yellow-400" />
                                        <span className="text-xs xs:text-sm text-purple-300 font-medium truncate">
                                            Verified Artist
                                        </span>
                                    </div>
                                </div>

                                {/* Edit Button */}
                                <button
                                    className="mt-6 sm:mt-8 w-full py-2.5 xs:py-3 sm:py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg sm:rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 hover:cursor-pointer text-sm xs:text-base sm:text-lg"
                                    onClick={() => document.getElementById('my_modal_5').showModal()}
                                >
                                    <div className="flex items-center justify-center gap-2 xs:gap-3">
                                        <FaUserEdit className="w-4 h-4 xs:w-5 xs:h-5" />
                                        <span>Edit Profile</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl sm:shadow-2xl h-full">
                            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 xs:gap-3">
                                <div className="w-1.5 xs:w-2 h-6 xs:h-7 sm:h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full flex-shrink-0"></div>
                                <span>Profile Details</span>
                            </h3>

                            <div className="space-y-4 sm:space-y-6">
                                {/* Email */}
                                <div className="group bg-gray-900/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg sm:rounded-xl flex-shrink-0">
                                            <FaEnvelope className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-purple-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs xs:text-sm font-medium text-gray-400 uppercase tracking-wider mb-1 xs:mb-1.5">
                                                Email Address
                                            </p>
                                            <p className="text-sm xs:text-base sm:text-lg text-white font-medium break-all">
                                                {user?.email}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1.5 xs:mt-2 hidden xs:block">
                                                Primary contact for notifications and account recovery
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Status */}
                                <div className="group bg-gray-900/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg sm:rounded-xl flex-shrink-0">
                                            <FaCalendarAlt className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-pink-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs xs:text-sm font-medium text-gray-400 uppercase tracking-wider mb-1 xs:mb-1.5">
                                                Account Status
                                            </p>
                                            <div className="flex flex-wrap gap-2 xs:gap-3">
                                                <span className="px-2 xs:px-3 py-1 bg-gradient-to-r from-green-900/40 to-green-900/20 text-green-300 rounded-full text-xs xs:text-sm font-medium border border-green-500/30 whitespace-nowrap">
                                                    Active
                                                </span>
                                                <span className="px-2 xs:px-3 py-1 bg-gradient-to-r from-purple-900/40 to-pink-900/20 text-purple-300 rounded-full text-xs xs:text-sm font-medium border border-purple-500/30 whitespace-nowrap">
                                                    Verified
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1.5 xs:mt-2 hidden xs:block">
                                                Your account is fully verified and active
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Member Since */}
                                <div className="group bg-gray-900/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg sm:rounded-xl flex-shrink-0">
                                            <FaGlobe className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-purple-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs xs:text-sm font-medium text-gray-400 uppercase tracking-wider mb-1 xs:mb-1.5">
                                                Member Since
                                            </p>
                                            <p className="text-sm xs:text-base sm:text-lg text-white font-medium">
                                                {user?.metadata?.creationTime
                                                    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })
                                                    : 'Recently joined'
                                                }
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1.5 xs:mt-2 hidden xs:block">
                                                Welcome to the Artify creative community!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <dialog id="my_modal_5" className="modal">
                <div className="modal-box max-w-2xl w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[70vw] bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 p-0 overflow-hidden">
                    <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                                    <FaUserEdit className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">Edit Profile</h3>
                                    <p className="text-xs text-gray-400 hidden xs:block">Update your artist information</p>
                                </div>
                            </div>
                            <button
                                onClick={() => document.getElementById('my_modal_5').close()}
                                className="btn btn-sm btn-ghost text-gray-400 hover:text-white text-lg sm:text-xl"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6">
                        <form onSubmit={handleEditProfile} className="space-y-4 sm:space-y-6">
                            {/* Current Profile Preview */}
                            <div className="flex items-center gap-4 sm:gap-6 bg-gray-800/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 mb-3 sm:mb-4">
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={userPhotoURL}
                                        alt="Current Profile"
                                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-purple-500"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                                        <FaCamera className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-400 mb-1">Current Profile</p>
                                    <p className="text-base sm:text-lg font-bold text-white truncate">{userName}</p>
                                </div>
                            </div>

                            {/* Artist Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2 sm:mb-3">
                                    <div className="flex items-center gap-2">
                                        <FaUserEdit className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
                                        <span>Artist Name</span>
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    name="userName"
                                    defaultValue={userName}
                                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
                                    placeholder="Enter your artist name"
                                />
                            </div>

                            {/* Photo URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2 sm:mb-3">
                                    <div className="flex items-center gap-2">
                                        <FaCamera className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
                                        <span>Profile Photo URL</span>
                                    </div>
                                </label>
                                <input
                                    type="url"
                                    name="userPhotoURL"
                                    defaultValue={userPhotoURL}
                                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
                                    placeholder="https://example.com/your-photo.jpg"
                                />
                                <p className="text-xs text-gray-500 mt-1.5 sm:mt-2">
                                    Provide a direct image URL for your profile picture
                                </p>
                            </div>

                            {/* Modal Actions */}
                            <div className="flex flex-col xs:flex-row gap-3 pt-3 sm:pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-900/30 text-sm sm:text-base"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 bg-gray-800 text-gray-300 font-semibold py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl border border-gray-600 hover:bg-gray-700 transition-all duration-300 text-sm sm:text-base"
                                    onClick={() => document.getElementById('my_modal_5').close()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default MyProfile;