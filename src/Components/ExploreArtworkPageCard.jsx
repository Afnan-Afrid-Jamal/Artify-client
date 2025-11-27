import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router';

const ExploreArtworkPageCard = ({ singlePublicData }) => {
    return (
        <Fade triggerOnce>
            <div className="rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 overflow-hidden border-2 border-purple-400 flex flex-col">
                {/* Artwork Image */}
                <div className="relative">
                    <img
                        src={singlePublicData.imageURL}
                        alt={singlePublicData.title}
                        className="w-full h-64 sm:h-72 md:h-80 object-cover"
                    />
                    {/* Likes Badge */}
                    <div className="absolute top-3 right-3 bg-purple-400 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <FaHeart className="text-red-500" />
                        <span className="text-sm font-bold">{singlePublicData.likesCount}</span>
                    </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold truncate">
                            {singlePublicData.title}
                        </h3>

                        {/* Artist Info */}
                        <div className="flex items-center mt-3">
                            <img
                                src={singlePublicData.artistPhotoURL}
                                alt={singlePublicData.artistName}
                                className="w-9 h-9 rounded-full object-cover mr-3 border border-purple-400 flex-shrink-0"
                            />
                            <p className="text-sm sm:text-base font-medium truncate">
                                {singlePublicData.artistName}
                            </p>
                        </div>

                        {/* Category */}
                        <div className="flex justify-between items-center mt-4">
                            <span className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold truncate">
                                {singlePublicData.category}
                            </span>
                        </div>
                    </div>

                    {/* Button Always at Bottom */}
                    <Link to={`/artwork-details/${singlePublicData._id}`}>
                        <button className="w-full mt-5 bg-purple-600 text-white font-semibold py-2.5 rounded-lg shadow-md
                hover:bg-purple-700 hover:shadow-lg active:bg-purple-800 active:shadow-inner 
                transition-all duration-200 hover:cursor-pointer truncate">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </Fade>


    );
};

export default ExploreArtworkPageCard;