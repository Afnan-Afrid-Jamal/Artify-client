import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';

const CTA = () => {
    return (
        <section className="max-w-11/12 mx-auto mb-8">
            <div className="max-w-6xl mx-auto">
                {/* Main Container with Gradient Background */}
                <div className="bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400 rounded-3xl p-8 md:p-16 text-center shadow-2xl overflow-hidden relative">

                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                            Ready to Share Your Vision?
                        </h2>

                        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
                            Create your artist account today and showcase your masterpieces to collectors around the world.
                        </p>

                        {/* Buttons Group */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {/* Primary Button */}
                            <Link
                                to="/explore-artwork"
                                className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-purple-400 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg active:scale-95 border-2 border-white"
                            >
                                Explore Artworks <FaArrowRight />
                            </Link>

                            {/* Secondary Button */}
                            <Link
                                to="/login"
                                className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-black transition-colors duration-300 shadow-lg active:scale-95 border border-white/10"
                            >
                                Login to be a Artist
                            </Link>
                        </div>
                    </div>

                    {/* Subtle Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};

export default CTA;