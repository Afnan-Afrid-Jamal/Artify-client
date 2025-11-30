import React, { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
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
        fetch(`https://artify-2a0f9.web.app/favourites-data?email=${user.email}`, {
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
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`https://artify-2a0f9.web.app/unfavourite/${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${user.accessToken}`
                    }
                });

                const data = await res.json();

                if (data.success || res.ok) {
                    setUserFavouritesData(prev => prev.filter(art => art._id !== id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your artwork has been removed from favourites.",
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: data.message || "Failed to delete artwork.",
                        icon: "error",
                    });
                }
            } catch (err) {
                console.error(err);
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong!",
                    icon: "error",
                });
            }
        }
    };

    // Loading spinner
    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-11/12 mx-auto px-4 py-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 text-center my-10">
                My Favourite Artworks
            </h1>

            {userFavouritesData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-[#1f1f1f] border border-gray-700 shadow-md">
                        <svg
                            className="w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-semibold text-purple-600">No Data Found</h2>
                    <p className="text-base max-w-sm mt-1">
                        We couldn’t find any favourite artworks. Please add some to your favourites list.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 pb-8">
                    {userFavouritesData.map((art) => (
                        <div
                            key={art._id}
                            className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-purple-400 flex flex-col"
                        >
                            {/* Artwork Image */}
                            <div className="relative">
                                <img
                                    src={art.imageURL}
                                    alt={art.title}
                                    className="w-full h-64 sm:h-72 md:h-80 object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-purple-400 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                    <FaHeart className="text-red-500" />
                                    <span className="text-sm font-bold">{art.likesCount}</span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex flex-col justify-between flex-1">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold truncate">{art.title}</h3>

                                    <div className="flex items-center mt-2">
                                        <img
                                            src={art.artistPhotoURL}
                                            alt={art.artistName}
                                            className="w-9 h-9 rounded-full object-cover mr-3 border border-purple-400 shrink-0"
                                        />
                                        <div className="flex flex-col my-2">
                                            <p className="font-medium truncate">{art.artistName}</p>
                                            <p className="text-sm truncate">{art.artistEmail}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center my-4">
                                        <span className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold truncate">
                                            {art.category} • {art.medium}
                                        </span>
                                    </div>

                                    <p className="text-sm mt-2 line-clamp-3 my-3">{art.description}</p>

                                    <div className="flex justify-between items-center">
                                        <p className="text-sm my-3 truncate">
                                            <span className="font-semibold">Dimensions:</span> {art.dimensions}
                                        </p>
                                        <p
                                            className={`mt-1 text-sm truncate ${art.visibility === "public" ? "text-green-500" : "text-red-500"
                                                }`}
                                        >
                                            Visibility: {art.visibility}
                                        </p>
                                    </div>

                                    <p className="font-semibold text-lg my-3 truncate">Price: ${art.price}</p>
                                </div>

                                <button
                                    onClick={() => handleUnfavourite(art._id)}
                                    className="w-full mt-5 bg-linear-to-r from-purple-400 to-purple-600 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition duration-200 hover:cursor-pointer"
                                >
                                    Unfavorite
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFavoritesPage;
