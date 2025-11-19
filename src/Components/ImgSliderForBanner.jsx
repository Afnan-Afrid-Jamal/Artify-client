import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImgSliderForBanner = () => {
    const [artworks, setArtworks] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true
    };

    useEffect(() => {
        fetch('http://localhost:3000/trending-artwork')
            .then(res => res.json())
            .then(data => setArtworks(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Heading */}
            <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-purple-500 mb-6 sm:mb-8">
                Discover the Most Stunning and Popular Artworks Capturing Everyone’s Attention
            </h1>

            {/* Slider */}
            <div className="w-11/12 mx-auto">
                <Slider {...settings}>
                    {artworks.length > 0 ? (
                        artworks.map((art, index) => (
                            <div key={index} className="px-1 sm:px-2">
                                <img
                                    src={art.imageURL}
                                    alt={art.title || `Artwork ${index + 1}`}
                                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 object-cover rounded-xl shadow-lg"
                                />
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center items-center h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96">
                            <p>Loading...</p>
                        </div>
                    )}
                </Slider>
            </div>
        </div>
    );
};

export default ImgSliderForBanner;