import React from "react";
import Marquee from "react-fast-marquee";
import { FaStar } from "react-icons/fa";

const TopArtists = () => {
    const artists = [
        {
            name: "John Doe",
            artworks: 12,
            photo: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            name: "Jane Smith",
            artworks: 18,
            photo: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            name: "Alice Johnson",
            artworks: 9,
            photo: "https://randomuser.me/api/portraits/women/55.jpg",
        },
        {
            name: "Michael Lee",
            artworks: 15,
            photo: "https://randomuser.me/api/portraits/men/65.jpg",
        },
        {
            name: "Emma Brown",
            artworks: 10,
            photo: "https://randomuser.me/api/portraits/women/68.jpg",
        },
    ];

    return (
        <div className="max-w-11/12 mx-auto px-4 py-12">
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-purple-500 mb-8 md:mb-16 lg:mb-16">
                Top Artists of the Week
            </h2>

            <Marquee gradient={false} speed={60} pauseOnHover={true}>
                {artists.map((artist, index) => (
                    <div
                        key={index}
                        className="relative flex flex-col items-center space-x-4 bg-gradient-to-b from-purple-50 to-purple-100 border border-purple-200 rounded-3xl shadow-xl p-6 mx-4 hover:scale-105 transform transition duration-500"
                    >
                        {/* Premium Golden Badge */}
                        <div className="absolute -top-2 -right-2 bg-gradient-to-tr from-yellow-400 to-yellow-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center animate-pulse">
                            <FaStar size={16} />
                        </div>

                        <img
                            src={artist.photo}
                            alt={artist.name}
                            className="w-28 h-28 rounded-full border-4 border-purple-400 mb-4 object-cover shadow-lg"
                        />

                        <h3 className="text-lg md:text-xl font-semibold text-purple-700 mb-1">{artist.name}</h3>
                        <p className="text-gray-600 font-medium">{artist.artworks} Artworks</p>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default TopArtists;
