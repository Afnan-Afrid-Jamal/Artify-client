// FULL CODE WITH ONLY defaultValue FIXED
// NOTHING ELSE CHANGED!

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { FaHeart } from 'react-icons/fa';
import { MdDelete, MdTipsAndUpdates } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const MyGalleryPage = () => {
    const { user } = useContext(AuthContext);
    const [myGalleryPageData, setMyGalleryPageData] = useState([]);

    useEffect(() => {
        if (!user.email) return;
        fetch(`https://artify-2a0f9.web.app/my-gallery?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setMyGalleryPageData(data.data);
            });
    }, []);

    // DELETE
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`https://artify-2a0f9.web.app/delete-artworks/${id}`, {
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
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: data.message,
                            icon: "error"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong.",
                        icon: "error"
                    });
                }
            }
        });
    };

    // Update
    const handleUpdate = (event, id) => {
        window.location.reload();

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

        fetch(`https://artify-2a0f9.web.app/update-artwork/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.accessToken}`
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success(data.message);
                } else {
                    toast.info(data.message);
                }
            })
            .catch(err => toast.error(`Something went wrong: ${err}`));
    };

    return (
        <>
            {myGalleryPageData.length === 0 ? (
                <p className="min-h-screen text-center mt-10 text-gray-500 text-2xl sm:text-lg md:text-xl lg:text-2xl font-medium">
                    No artworks found!
                </p>
            ) : (
                <div className="max-w-11/12 mx-auto py-10 px-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400 text-center mb-10">
                        My Gallery
                    </h1>

                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                        {myGalleryPageData.map((art, index) => (
                            <div
                                key={index}
                                className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-purple-400 flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative">
                                    <img
                                        src={art.imageURL}
                                        alt={art.title}
                                        className="w-full h-64 sm:h-72 md:h-80 object-cover"
                                    />

                                    {/* Likes Badge */}
                                    <div className="absolute top-3 right-3 bg-purple-400 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                        <FaHeart className="text-red-500" />
                                        <span className="text-sm font-bold">{art.likesCount}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex-1">
                                        <p className="text-sm italic truncate">
                                            {art.category} • {art.medium}
                                        </p>
                                        <h2 className="text-xl font-semibold  my-1 truncate">
                                            {art.title}
                                        </h2>
                                        <p className="text-sm mb-2 break-words line-clamp-3">
                                            {art.description}
                                        </p>

                                        <p className=" text-sm break-words">
                                            <span className="font-semibold ">Dimensions:</span>{" "}
                                            {art.dimensions}
                                        </p>

                                        <p className="text-purple-500 font-semibold text-lg mt-2">
                                            Price: ${art.price}
                                        </p>

                                        <p
                                            className={`mt-1 text-sm font-semibold ${art.visibility === "public"
                                                ? "text-green-400"
                                                : "text-red-400"
                                                }`}
                                        >
                                            Visibility: {art.visibility}
                                        </p>

                                        {/* Artist Info */}
                                        <div className="flex items-center gap-3 mt-4">
                                            <img
                                                src={art.artistPhotoURL}
                                                alt={art.artistName}
                                                className="w-12 h-12 object-cover rounded-full border border-purple-400 flex-shrink-0"
                                            />
                                            <div className="break-words max-w-[150px]">
                                                <p className=" font-medium truncate">{art.artistName}</p>
                                                <p className=" text-sm truncate">
                                                    {art.artistEmail}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-3 mt-5">

                                        {/* UPDATE BTN */}
                                        <button
                                            className="btn flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition duration-200 hover:cursor-pointer"
                                            onClick={() => document.getElementById(`modal_${art._id}`).showModal()}
                                        >
                                            <MdTipsAndUpdates size={20} className='text-white' />
                                            Update
                                        </button>

                                        {/* MODAL (ID FIXED) */}
                                        <dialog id={`modal_${art._id}`} className="modal modal-middle">
                                            <div className="modal-box max-w-4xl w-11/12 sm:w-full mx-auto p-4 sm:p-6 bg-black">
                                                <h3 className="font-bold text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 text-purple-500 text-center">
                                                    Update Your Artwork
                                                </h3>

                                                <div className="modal-action">
                                                    <form
                                                        onSubmit={(event) => handleUpdate(event, art._id)}
                                                        method="dialog"
                                                        className="w-full"
                                                    >
                                                        <div className="space-y-4 sm:space-y-6 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto pr-2">

                                                            {/* Image URL */}
                                                            <div>
                                                                <label className="block mb-2 font-semibold text-sm sm:text-base text-gray-400">
                                                                    Image URL
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="imageURL"
                                                                    defaultValue={art.imageURL}
                                                                    className="w-full border-2 border-violet-500 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-400"
                                                                />
                                                            </div>

                                                            {/* Title */}
                                                            <div>
                                                                <label className="block mb-2 font-semibold text-sm sm:text-base text-gray-400">
                                                                    Artwork Title
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="title"
                                                                    defaultValue={art.title}
                                                                    className="w-full border-2 border-violet-500 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-400"
                                                                />
                                                            </div>

                                                            {/* Category + Medium */}
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                                                                <div>
                                                                    <label className="block mb-2 font-semibold text-sm sm:text-base text-gray-400">
                                                                        Category
                                                                    </label>
                                                                    <select
                                                                        name='category'
                                                                        defaultValue={art.category}
                                                                        className="w-full border-2 border-violet-500 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-400"
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
                                                                    <label className="block mb-2 font-semibold text-sm sm:text-base text-gray-400">
                                                                        Medium/Tools
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="medium"
                                                                        defaultValue={art.medium}
                                                                        className="w-full border-2 border-violet-500 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-400"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Description */}
                                                            <div>
                                                                <label className="block mb-2 font-semibold text-sm sm:text-base text-gray-400">
                                                                    Description
                                                                </label>
                                                                <textarea
                                                                    rows="3"
                                                                    name="description"
                                                                    defaultValue={art.description}
                                                                    className="w-full border-2 border-violet-500 rounded-xl px-3 sm:px-4 py-2 sm:py-3 resize-none text-sm sm:text-base text-gray-400"
                                                                />
                                                            </div>

                                                            {/* Dimensions + Price */}
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                                                                <div>
                                                                    <label className="block mb-2 font-semibold text-sm sm:text-base text-gray-400">
                                                                        Dimensions
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="dimensions"
                                                                        defaultValue={art.dimensions}
                                                                        className="w-full border-2 border-violet-500 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-400"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label className="block mb-2 font-semibold text-sm sm:text-base text-gray-400">
                                                                        Price
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="price"
                                                                        defaultValue={art.price}
                                                                        className="w-full border-2 border-violet-500 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-400"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Visibility */}
                                                            <div>
                                                                <label className="block mb-2 font-semibold text-sm sm:text-base text-gray-400">
                                                                    Visibility
                                                                </label>
                                                                <select
                                                                    name="visibility"
                                                                    defaultValue={art.visibility}
                                                                    className="w-full border-2 border-violet-500 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-400"
                                                                >
                                                                    <option value="Public">Public</option>
                                                                    <option value="Private">Private</option>
                                                                </select>
                                                            </div>

                                                            {/* Buttons */}
                                                            <div className='flex justify-between items-center gap-3 sm:gap-4 pt-2'>
                                                                <button
                                                                    type='submit'
                                                                    className="w-full flex-1 sm:w-auto bg-purple-600 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition duration-200 hover:cursor-pointer text-sm sm:text-base"
                                                                >
                                                                    Confirm
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="w-full flex-1 sm:w-auto border-2 border-purple-500 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:bg-purple-20 hover:shadow-lg transition duration-200 hover:cursor-pointer text-sm sm:text-base"
                                                                    onClick={() => document.getElementById(`modal_${art._id}`).close()}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>

                                        {/* DELETE BUTTON */}
                                        <button
                                            onClick={() => handleDelete(art._id)}
                                            className="flex-1 flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 font-semibold rounded-lg shadow-md hover:bg-red-700/40 hover:shadow-lg transition duration-200 hover:cursor-pointer"
                                        >
                                            <MdDelete size={20} />
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default MyGalleryPage;
