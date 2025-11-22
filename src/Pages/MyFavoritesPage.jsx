import React from "react";
import { FaHeart } from "react-icons/fa";
import { useLoaderData } from "react-router";

const MyFavoritesPage = () => {
    const favouritesData = useLoaderData();

    return (
        <div className="min-h-screen bg-[#0f0f0f] py-10 px-4">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
                My Favourite Artworks
            </h1>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {favouritesData.map((art, index) => (
                    <div
                        key={index}
                        className="bg-[#1a1a1a] rounded-2xl shadow-lg p-4 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="w-full h-52 overflow-hidden rounded-xl mb-3">
                            <img
                                src={art.imageURL}
                                alt={art.title}
                                className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                            />
                        </div>

                        {/* Category, Medium */}
                        <p className="text-sm text-gray-300 italic">
                            {art.category} • {art.medium}
                        </p>

                        {/* Title */}
                        <h2 className="text-xl font-semibold text-white my-1">
                            {art.title}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-400 text-sm mb-2">{art.description}</p>

                        {/* Dimensions */}
                        <p className="text-gray-300 text-sm">
                            <span className="font-semibold text-white">Dimensions:</span>{" "}
                            {art.dimensions}
                        </p>

                        {/* Price */}
                        <p className="text-white font-semibold text-lg mt-2">
                            Price: ${art.price}
                        </p>

                        {/* Visibility */}
                        <p
                            className={`mt-1 text-sm ${art.visibility === "public"
                                ? "text-green-400"
                                : "text-red-400"
                                }`}
                        >
                            Visibility: {art.visibility}
                        </p>

                        {/* Artist Info */}
                        <div className="flex items-center gap-3 mt-4">
                            <img
                                src={art.artistPhotoURL}
                                alt={art.artistName}
                                className="w-12 h-12 object-cover rounded-full border border-gray-500"
                            />
                            <div>
                                <p className="text-white font-medium">{art.artistName}</p>
                                <p className="text-gray-400 text-sm">{art.artistEmail}</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center mt-5">
                            {/* Likes */}
                            <div className="flex items-center gap-1 text-gray-300">
                                <FaHeart size={18} className="text-red-500" />
                                <span>{art.likesCount}</span>
                            </div>

                            {/* CreatedAt */}
                            <p className="text-gray-400 text-xs">
                                {new Date(art.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFavoritesPage;
