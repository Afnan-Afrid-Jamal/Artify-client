import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { FaHeart, FaEye, FaTag, FaRulerCombined, FaDollarSign, FaPaintBrush } from 'react-icons/fa';
import { MdDelete, MdTipsAndUpdates, MdEdit } from 'react-icons/md';
import { IoPersonCircle } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import LoadingSpinner from '../Components/LoadingSpinner';

const MyGalleryPage = () => {
    const { user } = useContext(AuthContext);
    const [myGalleryPageData, setMyGalleryPageData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user.email) return;
        setLoading(true);
        fetch(`https://artify-server-sigma.vercel.app/my-gallery?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setMyGalleryPageData(data.data);
                setLoading(false);
            });
    }, []);

    // DELETE
    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Artwork?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8B5CF6",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            background: '#1F2937',
            color: '#F9FAFB',
            iconColor: '#EF4444'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`https://artify-server-sigma.vercel.app/delete-artworks/${id}`, {
                        method: "DELETE",
                        headers: {
                            authorization: `Bearer ${user.accessToken}`
                        }
                    });
                    const data = await res.json();

                    if (data.success) {
                        setMyGalleryPageData(myGalleryPageData.filter(prev => prev._id !== id));
                        Swal.fire({
                            title: "Deleted!",
                            text: data.message,
                            icon: "success",
                            background: '#1F2937',
                            color: '#F9FAFB',
                            confirmButtonColor: "#8B5CF6",
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: data.message,
                            icon: "error",
                            background: '#1F2937',
                            color: '#F9FAFB',
                            confirmButtonColor: "#8B5CF6",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong.",
                        icon: "error",
                        background: '#1F2937',
                        color: '#F9FAFB',
                        confirmButtonColor: "#8B5CF6",
                    });
                }
            }
        });
    };

    // Update
    const handleUpdate = (event, id) => {
        event.preventDefault();
        const updatedData = {
            imageURL: event.target.imageURL.value,
            title: event.target.title.value,
            category: event.target.category.value,
            medium: event.target.medium.value,
            description: event.target.description.value,
            dimensions: event.target.dimensions.value,
            price: event.target.price.value,
            visibility: event.target.visibility.value
        };

        fetch(`https://artify-server-sigma.vercel.app/update-artwork/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.accessToken}`
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {
                setMyGalleryPageData(myGalleryPageData =>
                    myGalleryPageData.map(item =>
                        item._id === id ? { ...item, ...updatedData } : item
                    )
                );
                document.getElementById(`modal_${id}`).close();
                toast.success("Artwork updated successfully!", {
                    style: {
                        background: "#1F2937",
                        color: "#F9FAFB",
                        border: "1px solid #4B5563"
                    },
                    theme: "dark"
                });
            })
            .catch(err => toast.error(`Update failed: ${err}`));
    };

    if (loading) return <LoadingSpinner></LoadingSpinner>;

    return (
        <>
            <title>ARTIFY - My Gallery</title>

            {myGalleryPageData.length === 0 ? (
                <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4">
                    <div className="text-center">
                        <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center">
                            <FaPaintBrush className="w-20 h-20 text-purple-400/60" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">Your Gallery is Empty</h2>
                        <p className="text-gray-400 max-w-md">
                            Start creating and uploading your artworks to build your personal gallery.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black px-4 py-8">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto mb-12">
                        <div className="flex flex-col items-center justify-center mb-6">
                            <div className="relative mb-4">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                                    <MdEdit className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">{myGalleryPageData.length}</span>
                                </div>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
                                My Gallery
                            </h1>
                            <p className="text-gray-400 mt-3 text-center">
                                Manage and showcase your {myGalleryPageData.length} {myGalleryPageData.length === 1 ? 'artwork' : 'artworks'}
                            </p>
                        </div>
                    </div>

                    {/* Artworks Grid */}
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myGalleryPageData.map((art) => (
                                <div
                                    key={art._id}
                                    className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/20"
                                >
                                    {/* Image with Overlay */}
                                    <div className="relative overflow-hidden h-64">
                                        <img
                                            src={art.imageURL}
                                            alt={art.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                        {/* Top Badges */}
                                        <div className="absolute top-4 left-4 flex items-center gap-2">
                                            <div className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                                <FaHeart className="text-red-400" />
                                                <span className="font-bold text-white text-sm">{art.likesCount}</span>
                                            </div>
                                            <div className={`px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm ${art.visibility === "Public" ? 'bg-green-900/70 text-green-300' : 'bg-yellow-900/70 text-yellow-300'}`}>
                                                {art.visibility}
                                            </div>
                                        </div>

                                        {/* Title Overlay */}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h2 className="text-xl font-bold text-white truncate">{art.title}</h2>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="px-2 py-1 bg-purple-900/70 backdrop-blur-sm rounded-lg text-xs text-purple-300">
                                                    {art.category}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-5">
                                        {/* Description */}
                                        <p className="text-gray-300 text-sm line-clamp-2 mb-5">
                                            {art.description}
                                        </p>

                                        {/* Info Grid */}
                                        <div className="grid grid-cols-2 gap-4 mb-5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg">
                                                    <FaTag className="text-purple-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400">Medium</p>
                                                    <p className="text-sm font-medium text-white truncate">{art.medium}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg">
                                                    <FaRulerCombined className="text-purple-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400">Dimensions</p>
                                                    <p className="text-sm font-medium text-white truncate">{art.dimensions}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg">
                                                    <FaDollarSign className="text-purple-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400">Price</p>
                                                    <p className="text-sm font-medium text-white">${art.price}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg">
                                                    <FaEye className="text-purple-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400">Category</p>
                                                    <p className="text-sm font-medium text-white truncate">{art.category}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Artist Info */}
                                        <div className="flex items-center gap-3 p-3 bg-gray-800/40 rounded-xl mb-5">
                                            <div className="relative">
                                                <img
                                                    src={art.artistPhotoURL}
                                                    alt={art.artistName}
                                                    className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
                                                />
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                                                    <IoPersonCircle className="w-3 h-3 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">{art.artistName}</p>
                                                <p className="text-xs text-gray-400 truncate">{art.artistEmail}</p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => document.getElementById(`modal_${art._id}`).showModal()}
                                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30"
                                            >
                                                <MdTipsAndUpdates className="text-lg" />
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(art._id)}
                                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-600/20 to-red-700/30 text-red-400 border border-red-500/30 rounded-xl font-medium hover:bg-gradient-to-r hover:from-red-600/30 hover:to-red-700/40 transition-all duration-300"
                                            >
                                                <MdDelete className="text-lg" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for each artwork */}
            {myGalleryPageData.map((art) => (
                <dialog key={art._id} id={`modal_${art._id}`} className="modal">
                    <div className="modal-box max-w-4xl bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 p-0 overflow-hidden">
                        <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                                        <MdTipsAndUpdates className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Update Artwork</h3>
                                </div>
                                <button
                                    onClick={() => document.getElementById(`modal_${art._id}`).close()}
                                    className="btn btn-sm btn-ghost text-gray-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <form onSubmit={(event) => handleUpdate(event, art._id)}>
                                <div className="space-y-5">
                                    {/* Image Preview and URL */}
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block mb-3 font-medium text-gray-300">
                                                Current Image Preview
                                            </label>
                                            <div className="relative h-48 rounded-xl overflow-hidden border border-gray-700">
                                                <img
                                                    src={art.imageURL}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block mb-3 font-medium text-gray-300">
                                                Image URL
                                            </label>
                                            <input
                                                type="text"
                                                name="imageURL"
                                                defaultValue={art.imageURL}
                                                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <label className="block mb-3 font-medium text-gray-300">
                                            Artwork Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            defaultValue={art.title}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                            placeholder="Enter artwork title"
                                        />
                                    </div>

                                    {/* Category + Medium */}
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block mb-3 font-medium text-gray-300">
                                                Category
                                            </label>
                                            <select
                                                name='category'
                                                defaultValue={art.category}
                                                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                            >
                                                <option value="painting">Painting</option>
                                                <option value="digital">Digital Art</option>
                                                <option value="photography">Photography</option>
                                                <option value="sculpture">Sculpture</option>
                                                <option value="drawing">Drawing</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block mb-3 font-medium text-gray-300">
                                                Medium/Tools
                                            </label>
                                            <input
                                                type="text"
                                                name="medium"
                                                defaultValue={art.medium}
                                                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                                placeholder="e.g., Oil on Canvas, Digital"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block mb-3 font-medium text-gray-300">
                                            Description
                                        </label>
                                        <textarea
                                            rows="4"
                                            name="description"
                                            defaultValue={art.description}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                                            placeholder="Describe your artwork..."
                                        />
                                    </div>

                                    {/* Dimensions + Price */}
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block mb-3 font-medium text-gray-300">
                                                Dimensions
                                            </label>
                                            <input
                                                type="text"
                                                name="dimensions"
                                                defaultValue={art.dimensions}
                                                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                                placeholder="e.g., 24x36 inches"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-3 font-medium text-gray-300">
                                                Price ($)
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                defaultValue={art.price}
                                                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>

                                    {/* Visibility */}
                                    <div>
                                        <label className="block mb-3 font-medium text-gray-300">
                                            Visibility
                                        </label>
                                        <select
                                            name="visibility"
                                            defaultValue={art.visibility}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                        >
                                            <option value="Public">Public</option>
                                            <option value="Private">Private</option>
                                        </select>
                                    </div>

                                    {/* Modal Actions */}
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all duration-300"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            className="flex-1 bg-gray-800 text-gray-300 font-semibold py-3 rounded-xl border border-gray-600 hover:bg-gray-700 transition-all duration-300"
                                            onClick={() => document.getElementById(`modal_${art._id}`).close()}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            ))}
        </>
    );
};

export default MyGalleryPage;