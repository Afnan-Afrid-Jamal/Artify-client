import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router';

const ExploreArtworkPageCard = ({ singlePublicData }) => {
    return (
        <div className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-purple-400 flex flex-col h-full">
            {/* Artwork Image - Fixed Height */}
            <div className="relative flex-shrink-0 h-64">
                <img
                    src={singlePublicData.imageURL}
                    alt={singlePublicData.title}
                    className="w-full h-full object-cover"
                />
                {/* Likes Badge */}
                <div className="absolute top-3 right-3 bg-purple-400 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <FaHeart className="text-red-500" />
                    <span className="text-sm font-bold">{singlePublicData.likesCount}</span>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold h-12 overflow-hidden line-clamp-2 mb-2">{singlePublicData.title}</h3>

                {/* Artist Info */}
                <div className="flex items-center mt-2">
                    <img
                        src={singlePublicData.artistPhotoURL}
                        alt={singlePublicData.artistName}
                        className="w-9 h-9 rounded-full object-cover mr-3 border border-purple-400 flex-shrink-0"
                    />
                    <p className="text-sm sm:text-base font-medium truncate">{singlePublicData.artistName}</p>
                </div>

                {/* Category & Price */}
                <div className="flex justify-between items-center mt-4 mb-2">
                    <span className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold truncate max-w-[70%]">{singlePublicData.category}</span>
                </div>

                {/* Button at the bottom */}
                <div className="mt-auto pt-4">
                    <Link to={`/artwork-details/${singlePublicData._id}`}>
                        <button className="w-full bg-purple-600 text-white font-semibold py-2.5 rounded-lg shadow-md
                    hover:bg-purple-700 hover:shadow-lg active:bg-purple-800 active:shadow-inner 
            transition-all duration-200 hover:cursor-pointer">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ExploreArtworkPageCard;