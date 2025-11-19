import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router';

const LatestArtworkCard = ({ eachLatestArtworkdata }) => {
    const {
        imageURL,
        title,
        artistName,
        artistPhotoURL,
        likesCount,
        category,
        price
    } = eachLatestArtworkdata;

    return (
        <div className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-purple-400">
            {/* Artwork Image */}
            <div className="relative">
                <img
                    src={imageURL}
                    alt={title}
                    className="w-full h-64 sm:h-72 md:h-80 object-cover"
                />
                {/* Likes Badge */}
                <div className="absolute top-3 right-3 bg-purple-400 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <FaHeart className="text-red-500" />
                    <span className="text-sm font-bold">{likesCount}</span>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-5">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold truncate">{title}</h3>

                {/* Artist Info */}
                <div className="flex items-center mt-3">
                    <img
                        src={artistPhotoURL}
                        alt={artistName}
                        className="w-9 h-9 rounded-full object-cover mr-3 border border-purple-400"
                    />
                    <p className="text-sm sm:text-base font-medium">{artistName}</p>
                </div>

                {/* Category & Price */}
                <div className="flex justify-between items-center mt-4">
                    <span className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">{category}</span>
                    <span className="font-bold text-xl">${price}</span>
                </div>
                <Link to="/artwork-details">
                    <button className="w-full mt-5 bg-purple-600 text-white font-semibold py-2.5 rounded-lg shadow-md 
        hover:bg-purple-700 hover:shadow-lg active:bg-purple-800 active:shadow-inner 
        transition-all duration-200 hover:cursor-pointer">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LatestArtworkCard;
