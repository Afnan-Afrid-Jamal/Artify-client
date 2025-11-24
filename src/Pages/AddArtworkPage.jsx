import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { toast } from 'react-toastify';

const AddArtworkPage = () => {

    const { user } = useContext(AuthContext);

    const handleAddArtwork = (event) => {
        event.preventDefault();

        const artworkData = {
            imageURL: event.target.imageURL.value,
            title: event.target.title.value,
            category: event.target.category.value,
            medium: event.target.medium.value,
            description: event.target.description.value,
            dimensions: event.target.dimensions.value,
            price: event.target.price.value,
            visibility: event.target.visibility.value,
            artistName: user.displayName,
            artistEmail: user.email,
            artistPhotoURL: user.photoURL,
            likesCount: 0,
            createdAt: new Date(),
        };

        fetch("http://localhost:3000/all-artworks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(artworkData)
        })
            .then(res => res.json())
            .then(data => {
                toast.success("Artwork uploaded successfully!", {
                    style: {
                        background: "black",
                        color: "white"
                    }
                })
                event.target.reset();
            })
            .catch(err => toast.error(`Something went wrong! (${err})`));

    };



    return (
        <div className="min-h-screen py-8 px-4 flex justify-center items-start">
            <div className="w-full max-w-3xl p-8 rounded-xl border-3 border-violet-500 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-indigo-500">
                        Add New Artwork
                    </h2>
                    <p className="mt-2 text-gray-400">
                        Share your creative masterpiece with the world
                    </p>
                </div>

                <form onSubmit={handleAddArtwork} className="space-y-6">

                    {/* Artist Name & Email (first) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 font-semibold">Artist Name</label>
                            <input
                                type="text"
                                readOnly
                                value={user.displayName}
                                className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">Contact Email</label>
                            <input
                                type="email"
                                readOnly
                                value={user.email}
                                className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block mb-2 font-semibold">Image URL</label>
                        <input
                            type="text"
                            name="imageURL"
                            placeholder="https://example.com/your-artwork.jpg"
                            className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block mb-2 font-semibold">Artwork Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter a captivating title"
                            className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category */}
                        <div>
                            <label className="block mb-2 font-semibold">Category</label>
                            <select name='category' className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-300">
                                <option value="">Select Category</option>
                                <option value="painting">Painting</option>
                                <option value="digital">Digital Art</option>
                                <option value="photography">Photography</option>
                                <option value="sculpture">Sculpture</option>
                                <option value="drawing">Drawing</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Medium/Tools */}
                        <div>
                            <label className="block mb-2 font-semibold">Medium/Tools</label>
                            <input
                                type="text"
                                name="medium"
                                placeholder="Oil Paint, Photoshop, etc."
                                className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2 font-semibold">Description</label>
                        <textarea
                            rows="4"
                            placeholder="Tell the story behind your artwork..."
                            name="description"
                            className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none"
                        />
                    </div>

                    {/* Dimensions & Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 font-semibold">Dimensions (optional)</label>
                            <input
                                type="text"
                                placeholder="24x36 inches"
                                name="dimensions"
                                className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">Price (optional)</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                name="price"
                                className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                            />
                        </div>
                    </div>

                    {/* Visibility */}
                    <div>
                        <label className="block mb-2 font-semibold">Visibility</label>
                        <select name="visibility" className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-300">
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl transition-all duration-300 hover:cursor-pointer"
                        >
                            🎨 Add Artwork
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddArtworkPage;