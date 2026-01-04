import React, { useContext, useEffect, useState } from 'react';
import { FaCaretLeft, FaHeart, FaStar } from 'react-icons/fa';
import { FaHeartCrack } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../Provider/AuthContext';
import LoadingSpinner from '../Components/LoadingSpinner';

const ArtworkDetailsPage = () => {
    const [viewDetailsData, setViewDetailsData] = useState({});
    const [likes, setLikes] = useState(0);
    const [likesBtn, setLikesBtn] = useState(true);
    const [isAddFavouritesBtnDisable, setIsAddFavouritesBtnDisable] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {


        setLoading(true);
        fetch(`https://artify-server-sigma.vercel.app/all-artworks/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setViewDetailsData(data);
                setLikes(data.likesCount);
                setLoading(false)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [params.id]);

    const handleAddFavourites = async () => {
        const favouritesData = {
            imageURL: viewDetailsData.imageURL,
            title: viewDetailsData.title,
            category: viewDetailsData.category,
            medium: viewDetailsData.medium,
            description: viewDetailsData.description,
            dimensions: viewDetailsData.dimensions,
            price: viewDetailsData.price,
            visibility: viewDetailsData.visibility,
            artistName: viewDetailsData.artistName,
            artistEmail: viewDetailsData.artistEmail,
            artistPhotoURL: viewDetailsData.artistPhotoURL,
            likesCount: viewDetailsData.likesCount,
            createdAt: viewDetailsData.createdAt,
            username: user.displayName,
            userEmail: user.email
        };

        try {
            const res = await fetch("https://artify-server-sigma.vercel.app/favourites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${user.accessToken}`
                },
                body: JSON.stringify(favouritesData)
            });

            if (res.ok) {
                toast.success("Added to favorites!", {
                    style: { background: "#000", color: "#fff" }
                });
                setIsAddFavouritesBtnDisable(true);
            } else {
                toast.error("Failed to add favourite.", {
                    style: { background: "#000", color: "#fff" }
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!", {
                style: { background: "#000", color: "#fff" }
            });
        }
    };


    const handleToggleLike = async () => {

        try {
            const res = await fetch(
                `https://artify-server-sigma.vercel.app/all-artworks/${viewDetailsData._id}/like`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${user.accessToken}`
                    },
                    body: JSON.stringify({ action: likesBtn ? "inc" : "dec" })
                }
            );

            const updatedData = await res.json();


            setLikes(prev => (likesBtn ? prev + 1 : prev - 1));
            setLikesBtn(!likesBtn);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <>
            <title>ARTIFY - artwork details</title>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="rounded-2xl overflow-hidden shadow-lg w-full h-full">
                        <img
                            src={viewDetailsData.imageURL}
                            alt={viewDetailsData.title}
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>

                    <div className="flex flex-col justify-between border-2 border-purple-500 p-6 rounded-2xl w-full h-full">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-purple-600 mb-4 break-words">
                                {viewDetailsData.title}
                            </h1>
                            <p className="text-lg mb-2 break-words">
                                <span className="font-semibold">Medium:</span> {viewDetailsData.medium}
                            </p>
                            <p className="text-lg mb-6 break-words">
                                <span className="font-semibold">Description:</span> {viewDetailsData.description}
                            </p>

                            <div className="flex items-center mb-6">
                                <img
                                    src={viewDetailsData.artistPhotoURL}
                                    alt={viewDetailsData.artistName}
                                    className="w-16 h-16 rounded-full border-2 p-1 border-purple-400 mr-4 object-cover flex-shrink-0"
                                />
                                <div className="break-words">
                                    <h2 className="text-xl font-semibold">{viewDetailsData.artistName}</h2>
                                    <p className="text-gray-500">{viewDetailsData.totalArtworks} Artworks</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <p className="text-3xl font-bold break-words">${viewDetailsData.price}</p>
                                <div className="flex items-center gap-2">
                                    <FaHeart className="text-red-500 text-2xl" />
                                    <span className="font-medium text-xl break-words">{likes}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleToggleLike}
                                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 break-words hover:cursor-pointer"
                            >
                                {
                                    !user ? <div className="flex items-center justify-center gap-1">
                                        <FaHeart className="text-xl" />
                                        <span className="leading-none">Login to admire</span>
                                    </div> :
                                        likesBtn ? (
                                            <div className="flex items-center justify-center gap-1">
                                                <FaHeart className="text-xl" />
                                                <span className="leading-none">Like</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-1">
                                                <FaHeartCrack className="inline mr-2" />
                                                <span className="leading-none">Dislike</span>
                                            </div>
                                        )}
                            </button>

                            <button
                                onClick={handleAddFavourites}
                                disabled={isAddFavouritesBtnDisable && !user}
                                className={`flex-1 bg-white border border-purple-600 hover:bg-purple-50 text-purple-600 font-semibold py-3 rounded-lg shadow-md transition duration-300 break-words hover:cursor-pointer ${isAddFavouritesBtnDisable ? "opacity-30 cursor-not-allowed" : ""}`}
                            >
                                <FaStar className="inline mr-2" />
                                {!user ? "Login to favorite" : isAddFavouritesBtnDisable ? "Added to Favorites" : "Add to Favorites"}
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 flex justify-center items-center mx-auto mt-15 w-full break-words"
                >
                    <FaCaretLeft size={20} /> Go Back
                </button>
            </div>
        </>
    );
};

export default ArtworkDetailsPage;
