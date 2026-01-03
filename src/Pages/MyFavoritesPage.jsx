import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaUserCircle, FaEye, FaRulerCombined, FaTag } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../Provider/AuthContext";
import LoadingSpinner from "../Components/LoadingSpinner";
import Swal from "sweetalert2";

const MyFavoritesPage = () => {
    const { user } = useContext(AuthContext);
    const [userFavouritesData, setUserFavouritesData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch favourites
    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);
        fetch(`https://artify-server-sigma.vercel.app/favourites-data?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUserFavouritesData(data.data || []);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [user]);

    // Unfavourite handler
    const handleUnfavourite = async (id) => {
        const result = await Swal.fire({
            title: "Remove from Favorites?",
            text: "This artwork will be removed from your favorites list.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#8B5CF6",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, remove it",
            cancelButtonText: "Cancel",
            background: '#1F2937',
            color: '#F9FAFB'
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`https://artify-server-sigma.vercel.app/unfavourite/${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${user.accessToken}`
                    }
                });

                const data = await res.json();

                if (data.success || res.ok) {
                    setUserFavouritesData(prev => prev.filter(art => art._id !== id));
                    Swal.fire({
                        title: "Removed!",
                        text: "Artwork removed from favorites.",
                        icon: "success",
                        background: '#1F2937',
                        color: '#F9FAFB',
                        confirmButtonColor: "#8B5CF6",
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: data.message || "Failed to remove artwork.",
                        icon: "error",
                        background: '#1F2937',
                        color: '#F9FAFB',
                        confirmButtonColor: "#8B5CF6",
                    });
                }
            } catch (err) {
                console.error(err);
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong!",
                    icon: "error",
                    background: '#1F2937',
                    color: '#F9FAFB',
                    confirmButtonColor: "#8B5CF6",
                });
            }
        }
    };

    // Loading spinner
    if (loading) return <LoadingSpinner />;

    return (
        <>
            <title>ARTIFY - Favorite Artworks</title>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-8">
                {/* Header */}
                <div className="max-w-7xl mx-auto mb-10">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-purple-600/20 rounded-2xl">
                            <FaHeart className="text-3xl text-purple-400" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            My Favorite Artworks
                        </h1>
                    </div>
                    <p className="text-center text-gray-400 text-lg">
                        {userFavouritesData.length} {userFavouritesData.length === 1 ? 'artwork' : 'artworks'} saved
                    </p>
                </div>

                {userFavouritesData.length === 0 ? (
                    // Empty State
                    <div className="max-w-lg mx-auto mt-20 text-center">
                        <div className="relative mb-8">
                            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center">
                                <FaRegHeart className="w-16 h-16 text-purple-400/50" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                <FaHeart className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">No favorites yet</h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Start building your collection by clicking the heart icon on artworks you love
                        </p>
                        <button
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:opacity-90 transition-all duration-300"
                            onClick={() => window.history.back()}
                        >
                            Browse Artworks
                        </button>
                    </div>
                ) : (
                    // Artworks Grid
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userFavouritesData.map((art) => (
                                <div
                                    key={art._id}
                                    className="group bg-gray-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/20"
                                >
                                    {/* Image Container */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={art.imageURL}
                                            alt={art.title}
                                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                            <FaHeart className="text-red-400" />
                                            <span className="font-bold text-white">{art.likesCount}</span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                            <h3 className="text-xl font-bold text-white truncate">{art.title}</h3>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        {/* Artist Info */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="relative">
                                                <img
                                                    src={art.artistPhotoURL}
                                                    alt={art.artistName}
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                                                />
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                                                    <FaUserCircle className="w-3 h-3 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold truncate">{art.artistName}</p>
                                                <p className="text-sm text-gray-400 truncate">{art.artistEmail}</p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                                            {art.description}
                                        </p>

                                        {/* Details Grid */}
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="p-2 bg-purple-900/30 rounded-lg">
                                                    <FaTag className="text-purple-400" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">Category</p>
                                                    <p className="font-medium">{art.category}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="p-2 bg-purple-900/30 rounded-lg">
                                                    <FaRulerCombined className="text-purple-400" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">Dimensions</p>
                                                    <p className="font-medium truncate">{art.dimensions}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="p-2 bg-purple-900/30 rounded-lg">
                                                    <FaEye className="text-purple-400" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">Visibility</p>
                                                    <p className={`font-medium ${art.visibility === "public" ? "text-green-400" : "text-yellow-400"}`}>
                                                        {art.visibility}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="p-2 bg-purple-900/30 rounded-lg">
                                                    <span className="text-purple-400 font-bold">$</span>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">Price</p>
                                                    <p className="font-medium">${art.price}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Medium Badge */}
                                        <div className="mb-6">
                                            <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                                                {art.medium}
                                            </span>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={() => handleUnfavourite(art._id)}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-600/20 to-red-700/30 hover:from-red-600/30 hover:to-red-700/40 text-red-400 border border-red-500/30 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-900/20"
                                        >
                                            <MdDelete className="text-lg" />
                                            Remove from Favorites
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyFavoritesPage;