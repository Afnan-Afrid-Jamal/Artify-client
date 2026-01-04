import React from 'react';
import { Zoom } from 'react-awesome-reveal'; // [cite: 119]
import { FaPaintBrush, FaRocket, FaUsers, FaHeart } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Section Heading */}
            <div className="text-center mb-16">

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 text-center mb-3">
                    About ARTIFY
                </h2>
                <p className="max-w-2xl mx-auto text-lg italic">
                    ARTIFY is a creative artwork showcase platform dedicated to bringing artists and art enthusiasts together.
                </p>

            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 my-20">

                {/* Card 1: Our Mission */}
                <Zoom>
                    <div className="relative group">
                        <div className=" rounded-2xl shadow-2xl hover:shadow-purple-500/50 duration-500 transition-all border-2 border-purple-400 flex flex-col h-full min-h-[300px]">
                            <div className="p-8 pt-10 flex flex-col justify-between flex-1">
                                <div>
                                    <h3 className="text-2xl font-bold text-purple-500 mb-4 uppercase mt-6">Our Mission</h3>
                                    <p className="leading-relaxed italic">
                                        "To create an online art-sharing platform where artists can upload and display their creative works globally."
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-purple-600 flex items-center justify-between">
                                    <span className="text-purple-600 font-bold text-sm">ARTIFY</span>
                                    <FaHeart className="text-red-500 animate-pulse text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-6 left-6  p-4 rounded-xl shadow-lg border-2 border-purple-400 group-hover:scale-110 transition-transform duration-300 bg-purple-600">
                            <FaRocket className="text-3xl text-purple-100" />
                        </div>
                    </div>
                </Zoom>

                {/* Card 2: Creative Community */}
                <Zoom>
                    <div className="relative group">
                        <div className=" rounded-2xl shadow-2xl hover:shadow-purple-500/50 duration-500 transition-all border-2 border-purple-400 flex flex-col h-full min-h-[300px]">
                            <div className="p-8 pt-10 flex flex-col justify-between flex-1">
                                <div>
                                    <h3 className="text-2xl font-bold text-purple-500 mb-4 uppercase mt-6">Creative Community</h3>
                                    <p className="leading-relaxed italic">
                                        "Explore other artists' galleries, curate favorites, and connect through appreciation and interaction."
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-purple-600 flex items-center justify-between">
                                    <span className="text-purple-600 font-bold text-sm">ARTIFY</span>
                                    <FaHeart className="text-red-500 animate-pulse text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-6 left-6  p-4 rounded-xl shadow-lg border-2 border-purple-400 group-hover:scale-110 transition-transform duration-300 bg-purple-600">
                            <FaUsers className="text-3xl text-purple-100" />
                        </div>
                    </div>
                </Zoom>

                {/* Card 3: Modern Experience */}
                <Zoom>
                    <div className="relative group">
                        <div className=" rounded-2xl shadow-2xl hover:shadow-purple-500/50 duration-500 transition-all border-2 border-purple-400 flex flex-col h-full min-h-[300px]">
                            <div className="p-8 pt-10 flex flex-col justify-between flex-1">
                                <div>
                                    <h3 className="text-2xl font-bold text-purple-500 mb-4 uppercase mt-6">Modern Experience</h3>
                                    <p className="leading-relaxed italic">
                                        "We emphasize creativity, modern UI, and clean navigation for a seamless art-loving experience."
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-purple-600 flex items-center justify-between">
                                    <span className="text-purple-600 font-bold text-sm">ARTIFY</span>
                                    <FaHeart className="text-red-500 animate-pulse text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-6 left-6  p-4 rounded-xl shadow-lg border-2 border-purple-400 group-hover:scale-110 transition-transform duration-300 bg-purple-600">
                            <FaPaintBrush className="text-3xl text-purple-100" />
                        </div>
                    </div>
                </Zoom>

            </div>

            {/* Added Section: How Artify Works */}
            <div className="mt-24 text-center">
                <Zoom>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 text-center mb-3">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-15 mb-10">
                        <div className="p-6 rounded-xl border-l-4 border-l-4 border-purple-600 shadow-md">
                            <h4 className="font-bold text-xl mb-2 text-purple-500">1. Join Us</h4>
                            <p className="">Create your account and become part of our creative world.</p>
                        </div>
                        <div className="p-6 rounded-xl border-l-4 border-purple-600 shadow-md">
                            <h4 className="font-bold text-xl mb-2 text-purple-500">2. Share Art</h4>
                            <p className="">Upload your masterpieces and showcase your talent to the world.</p>
                        </div>
                        <div className="p-6 rounded-xl border-l-4 border-purple-600 shadow-md">
                            <h4 className="font-bold text-xl mb-2 text-purple-500">3. Get Appreciated</h4>
                            <p className="">Receive likes and appreciation from art lovers globally.</p>
                        </div>
                    </div>
                </Zoom>
            </div>
            {/* Terms and Conditions Section - List Style */}
            <div className="mt-24 max-w-4xl mx-auto px-4">
                <Zoom>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-8 border-purple-200 pb-2 text-center">
                        Terms & Conditions
                    </h2>

                    <div className="space-y-6 border-2 p-8">
                        {/* Rule 1 */}
                        <div className="flex gap-4 mb-16">
                            <span className="text-purple-500 font-bold text-xl">01.</span>
                            <div>
                                <h4 className="font-bold text-lg text-purple-500 uppercase tracking-wide">Artwork Ownership</h4>
                                <p className="mt-1 italic leading-relaxed">
                                    Artists must only upload their original creative works. By uploading, you confirm that you own the full intellectual property rights to the display.
                                </p>
                            </div>
                        </div>

                        {/* Rule 2 */}
                        <div className="flex gap-4 mb-16">
                            <span className="text-purple-500 font-bold text-xl">02.</span>
                            <div>
                                <h4 className="font-bold text-lg text-purple-500 uppercase tracking-wide">Community Interaction</h4>
                                <p className="mt-1 italic leading-relaxed">
                                    ARTIFY is built on appreciation. Users must maintain a positive and respectful environment while connecting through interactions and exploring galleries.
                                </p>
                            </div>
                        </div>

                        {/* Rule 3 */}
                        <div className="flex gap-4">
                            <span className="text-purple-500 font-bold text-xl">03.</span>
                            <div>
                                <h4 className="font-bold text-lg text-purple-500 uppercase tracking-wide">Private Access & Security</h4>
                                <p className="mt-1 italic leading-relaxed">
                                    Access to specific features like "Add Artwork" and "My Gallery" are private routes reserved for registered users. Your account security is handled via Firebase.
                                </p>
                            </div>
                        </div>

                        {/* Rule 4 */}
                        <div className="flex gap-4 mt-16">
                            <span className="text-purple-500 font-bold text-xl">04.</span>
                            <div>
                                <h4 className="font-bold text-lg text-purple-500 uppercase tracking-wide">Content Visibility</h4>
                                <p className="mt-1 italic leading-relaxed">
                                    Users have the right to set their artwork visibility to either Public or Private. Public artworks will be displayed on the Explore page for all users.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Closing Note */}
                    <p className="mt-10 text-sm text-center border-t border-gray-200 pt-4">
                        * By using Artify, you agree to uphold these creative community standards and emphasize modern, clean navigation.
                    </p>
                </Zoom>
            </div>

        </div>
    );
};

export default AboutUs;