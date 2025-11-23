import React, { useState } from 'react';
import { FaHeart, FaRulerCombined, FaDollarSign, FaCalendar, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MyFavouritesPageCard = ({ art }) => {

    const [isVisible, setIsVisible] = useState(true);

    const handleRemoveBtn = (id) => {
        fetch(`http://localhost:3000/delete-favorite-artwork/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(() => {

                setIsVisible(false);
                toast.success("Artwork removed from favorites!", {
                    style: {
                        background: "black",
                        color: "white"
                    }
                });
            })
            .catch(err => {
                toast.success(`Failed to remove artwork!, ${err}`, {
                    style: {
                        background: "black",
                        color: "white"
                    }
                });
            });
    };

    if (!isVisible) return <p></p>;

    return (
        <div className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-purple-400 flex flex-col h-full">

            {/* Artwork Image */}
            <div className="relative shrink-0 h-64">
                <img
                    src={art.imageURL}
                    alt={art.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-purple-400 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <FaHeart className="text-red-500" />
                    <span className="text-sm font-bold">{art.likesCount}</span>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex flex-col grow">

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold h-12 overflow-hidden line-clamp-2 mb-2">
                    {art.title}
                </h3>

                {/* Category & Medium */}
                <div className="flex justify-between items-center mb-3">
                    <span className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {art.category}
                    </span>
                    <span className="text-sm">{art.medium}</span>
                </div>

                {/* Description */}
                <p className="text-sm mb-4 line-clamp-2 h-10 overflow-hidden">
                    {art.description}
                </p>

                {/* Dimensions & Price */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <FaRulerCombined className="text-purple-400 text-sm" />
                        <span className="text-sm">{art.dimensions}</span>
                    </div>

                    <div className="flex items-center">
                        <FaDollarSign className="text-green-500 text-xl" />
                        <span className="font-bold text-lg">{art.price}</span>
                    </div>
                </div>

                {/* Artist Info */}
                <div className="flex items-center mt-2 mb-4">
                    <img
                        src={art.artistPhotoURL}
                        alt={art.artistName}
                        className="w-9 h-9 rounded-full object-cover mr-3 border border-purple-400 shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{art.artistName}</p>
                        <p className="text-xs truncate">{art.artistEmail}</p>
                    </div>

                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${art.visibility === "public"
                            ? "bg-green-300 text-green-800"
                            : "bg-red-300 text-red-800"
                            }`}
                    >
                        {art.visibility}
                    </span>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-gray-300">
                    <div className="flex justify-between items-center">

                        <div className="flex items-center gap-2">
                            <FaCalendar className="text-sm" />
                            <span className="text-xs">
                                {new Date(art.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <button
                            onClick={() => handleRemoveBtn(art._id)}
                            className="flex items-center gap-2 bg-purple-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg active:bg-purple-800 active:shadow-inner transition-all duration-200 text-white hover:cursor-pointer"
                        >
                            <FaTrash size={14} />
                            Remove
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyFavouritesPageCard;
