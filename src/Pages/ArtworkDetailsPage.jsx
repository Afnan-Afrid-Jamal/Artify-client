import React from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import { useLoaderData } from 'react-router';

const ArtworkDetailsPage = () => {

    const viewDetailsData = useLoaderData();
    console.log(viewDetailsData)

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Artwork Image */}
                <div className="rounded-2xl overflow-hidden shadow-lg w-full h-full">
                    <img
                        src={viewDetailsData.imageURL}
                        alt={viewDetailsData.title}
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>

                {/* Artwork Details */}
                <div className="flex flex-col justify-between border-2 border-purple-500 p-6 rounded-2xl w-full h-full">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-purple-600 mb-4">
                            {viewDetailsData.title}
                        </h1>
                        <p className="text-lg mb-2"><span className="font-semibold">Medium:</span> {viewDetailsData.medium}</p>
                        <p className="text-lg mb-6"><span className="font-semibold">Description:</span> {viewDetailsData.description}</p>

                        {/* Artist Info */}
                        <div className="flex items-center mb-6">
                            <img
                                src={viewDetailsData.artistPhotoURL}
                                alt={viewDetailsData.artistName}
                                className="w-16 h-16 rounded-full border-2 p-1 border-purple-400 mr-4 object-cover"
                            />
                            <div>
                                <h2 className="text-xl font-semibold">{viewDetailsData.artistName}</h2>
                                <p className="text-gray-500">{viewDetailsData.totalArtworks} Artworks</p>
                            </div>
                        </div>

                        {/* Price & Likes */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-3xl font-bold">${viewDetailsData.price}</p>
                            <div className="flex items-center gap-2">
                                <FaHeart className="text-red-500 text-2xl" />
                                <span className="font-medium text-xl">{viewDetailsData.likesCount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300">
                            <FaHeart className="inline mr-2" /> Like
                        </button>
                        <button className="flex-1 bg-white border border-purple-600 hover:bg-purple-50 text-purple-600 font-semibold py-3 rounded-lg shadow-md transition duration-300">
                            <FaStar className="inline mr-2" /> Add to Favorites
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ArtworkDetailsPage;
