import React from "react";
import { FaPalette, FaUsers, FaHeart } from "react-icons/fa";

const FeatureInfo = () => {
    return (
        <section className="max-w-11/12 mx-auto my-20 px-4 py-12 bg-gradient-to-r from-purple-700 via-purple-800 to-violet-900 rounded-3xl shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-15">
                Community Highlights
            </h2>

            <div className="flex flex-col md:flex-row justify-around items-center gap-10">
                {/* Section 1 */}
                <div className="flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2">
                    <FaPalette className="w-14 h-14 mb-4 text-yellow-400 animate-pulse" />
                    <h3 className="text-xl font-semibold text-white mb-2">Showcase Your Art</h3>
                    <p className="text-gray-200 text-sm sm:text-base max-w-xs">
                        Upload your creative works and share them with the world.
                    </p>
                </div>

                {/* Section 2 */}
                <div className="flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2">
                    <FaUsers className="w-14 h-14 mb-4 text-blue-400 animate-pulse" />
                    <h3 className="text-xl font-semibold text-white mb-2">Connect with Artists</h3>
                    <p className="text-gray-200 text-sm sm:text-base max-w-xs">
                        Explore galleries and connect with other talented artists.
                    </p>
                </div>

                {/* Section 3 */}
                <div className="flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2">
                    <FaHeart className="w-14 h-14 mb-4 text-red-400 animate-pulse" />
                    <h3 className="text-xl font-semibold text-white mb-2">Get Appreciated</h3>
                    <p className="text-gray-200 text-sm sm:text-base max-w-xs">
                        Receive likes, favorites, and recognition for your artworks.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeatureInfo;
