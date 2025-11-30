import React, { useEffect, useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";

const PremiumCollection = () => {
    const [premiumData, setPremiumData] = useState([]);

    useEffect(() => {
        fetch("https://artify-server-sigma.vercel.app/premium-collection")
            .then(res => res.json())
            .then(data => setPremiumData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-5 py-10">
            <h1 className="text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-purple-500 mb-8 md:mb-16 lg:mb-16">
                Premium Collection
            </h1>

            {premiumData.length === 0 ? (
                <p className="text-center text-gray-400 text-lg">Loading premium artworks...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {premiumData.map((artwork) => (
                        <Slide direction='left'>
                            <div
                                key={artwork._id}
                                className="rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 overflow-hidden border-3 border-yellow-500 flex flex-col bg-linear-to-b from-black to-purple-950"
                            >
                                {/* Artwork Image + Badges */}
                                <div className="relative group">

                                    {/* Premium Badge */}
                                    <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1 rounded-full font-semibold text-sm shadow-lg border border-yellow-300/50 backdrop-blur-sm">
                                        PREMIUM
                                    </div>

                                    <img
                                        src={artwork.imageURL}
                                        alt={artwork.title}
                                        className="w-full h-64 sm:h-72 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* dark hover overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>

                                    {/* Likes Badge */}
                                    <div className="absolute top-3 right-3 bg-purple-600 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg border border-purple-300/30">
                                        <FaHeart className="text-pink-400" />
                                        <span className="text-sm font-bold text-white">{artwork.likesCount}</span>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-5 flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-purple-300 truncate drop-shadow-md">
                                            {artwork.title}
                                        </h3>

                                        <div className="flex items-center mt-3">
                                            <img
                                                src={artwork.artistPhotoURL}
                                                alt={artwork.artistName}
                                                className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-purple-400"
                                            />
                                            <p className="text-sm sm:text-base font-medium text-gray-300 truncate">
                                                {artwork.artistName}
                                            </p>
                                        </div>

                                        <div className="flex justify-start items-center mt-4">
                                            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold truncate shadow-md">
                                                {artwork.category}
                                            </span>
                                        </div>
                                    </div>

                                    <Link to={`/artwork-details/${artwork._id}`}>
                                        <button className="w-full mt-5 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-purple-400/50 hover:scale-105 transition-all duration-300">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </Slide>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PremiumCollection;
