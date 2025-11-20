// HomePage.jsx
import React from 'react';
import ImgSliderForBanner from '../Components/ImgSliderForBanner';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLoaderData } from 'react-router';
import LatestArtworkCard from '../Components/LatestArtworkCard'; // নিশ্চিত করো import ঠিক আছে

const HomePage = () => {
    // Safe fallback: loader data না থাকলে empty array
    const latestArtworkData = useLoaderData() || [];

    return (
        <div>
            <div>
                <ImgSliderForBanner />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 my-4 md:my-16 lg:my-16">
                <h1 className="text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-purple-500 mb-8 md:mb-16 lg:mb-16">
                    Latest Artworks
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {latestArtworkData.map((eachLatestArtworkdata) => (
                        <LatestArtworkCard
                            key={eachLatestArtworkdata._id?.$oid || eachLatestArtworkdata._id}
                            eachLatestArtworkdata={eachLatestArtworkdata}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
