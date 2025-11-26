import React, { useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";

const PremiumCollection = () => {
    const [premiumData, setPremiumData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/premium-collection")
            .then(res => res.json())
            .then(data => setPremiumData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-5 py-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 text-center my-10">
                Premium Collection
            </h2>

            {premiumData.length === 0 ? (
                <p className="text-center text-gray-400 text-lg">Loading premium artworks...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {premiumData.map((artwork) => (
                        <div
                            key={artwork._id}
                            className="rounded-2xl shadow-2xl hover:shadow-yellow-500/50 transition-all duration-500 overflow-hidden border-2 border-yellow-400 flex flex-col"
                        >
                            {/* Artwork Image */}
                            <div className="relative group">
                                <img
                                    src={artwork.imageURL}
                                    alt={artwork.title}
                                    className="w-full h-64 sm:h-72 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Dark overlay on hover */}
                                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-50 transition-opacity duration-300 scale-105"></div>

                                {/* Likes Badge */}
                                <div className="absolute top-3 right-3 bg-yellow-400 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                    <FaHeart className="text-red-500" />
                                    <span className="text-sm font-bold text-black">{artwork.likesCount}</span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="bg-black p-5 flex flex-col justify-between flex-1">
                                <div>
                                    {/* Title */}
                                    <h3 className="text-lg sm:text-xl font-bold text-yellow-400 truncate">
                                        {artwork.title}
                                    </h3>

                                    {/* Artist Info */}
                                    <div className="flex items-center mt-3">
                                        <img
                                            src={artwork.artistPhotoURL}
                                            alt={artwork.artistName}
                                            className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-yellow-400 shrink-0"
                                        />
                                        <p className="text-sm sm:text-base font-medium text-gray-300 truncate">
                                            {artwork.artistName}
                                        </p>
                                    </div>

                                    {/* Category */}
                                    <div className="flex justify-start items-center mt-4">
                                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold truncate">
                                            {artwork.category}
                                        </span>
                                    </div>
                                </div>

                                {/* View Details Button */}
                                <Link to={`/artwork-details/${artwork._id}`}>
                                    <button className="w-full mt-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 rounded-lg shadow-lg hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PremiumCollection;
