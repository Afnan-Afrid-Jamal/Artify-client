import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router';

const ImgSliderForBanner = () => {
    const [artworks, setArtworks] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6500,
        arrows: false
    };

    useEffect(() => {
        fetch('https://artify-server-sigma.vercel.app/all-artworks/trending-artwork')
            .then(res => res.json())
            .then(data => setArtworks(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-11/12 mx-auto px-4 py-8">
            <Slider {...settings}>
                {artworks.map((art, index) => (
                    <div key={index} className="relative px-1 sm:px-2">
                        {/* Artwork Image */}
                        <img
                            src={art.imageURL}
                            alt={art.title}
                            className="w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-96 2xl:h-[28rem] object-cover rounded-xl shadow-lg"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent flex flex-col justify-end items-start px-6 sm:px-12 pb-10">
                            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                <Typewriter
                                    words={[
                                        `Discover "${art.title}" by "${art.artistName}"`
                                    ]}
                                    loop={3}
                                    cursor
                                    cursorStyle="|"
                                    typeSpeed={80}
                                    deleteSpeed={10}
                                    delaySpeed={2000}
                                />
                            </h1>

                            {/* Button */}
                            <Link to={`/artwork-details/${art._id}`} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md transition duration-300">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImgSliderForBanner;
