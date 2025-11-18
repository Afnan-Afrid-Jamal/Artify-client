import React from 'react';

const AddArtworkPage = () => {
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

                <form className="space-y-6">

                    {/* Artist Name & Email (first) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 font-semibold">Artist Name</label>
                            <input
                                type="text"
                                readOnly
                                value="John Doe"
                                className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">Contact Email</label>
                            <input
                                type="email"
                                readOnly
                                value="john@example.com"
                                className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block mb-2 font-semibold">Image URL</label>
                        <input
                            type="text"
                            placeholder="https://example.com/your-artwork.jpg"
                            className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block mb-2 font-semibold">Artwork Title</label>
                        <input
                            type="text"
                            placeholder="Enter a captivating title"
                            className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category */}
                        <div>
                            <label className="block mb-2 font-semibold">Category</label>
                            <select className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-300">
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
                                className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">Price (optional)</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                            />
                        </div>
                    </div>

                    {/* Visibility */}
                    <div>
                        <label className="block mb-2 font-semibold">Visibility</label>
                        <select className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-300">
                            <option value="public">Public</option>
                            <option value="private">Private</option>
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
