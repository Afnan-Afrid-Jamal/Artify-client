import React from 'react';
import ImgSliderForBanner from '../Components/ImgSliderForBanner';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLoaderData } from 'react-router';
import LatestArtworkCard from '../Components/LatestArtworkCard';
import PremiumCollection from '../Components/PremiumCollection';
import FeatureInfo from '../Components/FeatureInfo';
import TopArtists from '../Components/TopArtist';

// React Awesome Reveal
import { Fade, Slide, Zoom } from "react-awesome-reveal";

const HomePage = () => {
    const latestArtworkData = useLoaderData() || [];

    return (
        <>
            <title>ARTIFY - home</title>
            <div className="space-y-16">
                {/* 1. Banner/Slider */}
                <section className='mt-8'>
                    <Slide direction='right' triggerOnce>
                        <ImgSliderForBanner />
                    </Slide>
                </section>

                {/* 2. Latest Artworks */}
                <section className="max-w-11/12 mx-auto px-4 py-8 md:py-12 lg:py-16">
                    <h1 className="text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-purple-500 mb-12 md:mb-16 lg:mb-16">
                        Latest Artworks
                    </h1>


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                        {latestArtworkData.map((eachLatestArtworkdata, index) => (
                            <Zoom key={eachLatestArtworkdata._id?.$oid || eachLatestArtworkdata._id} triggerOnce delay={index * 100}>
                                <LatestArtworkCard eachLatestArtworkdata={eachLatestArtworkdata} />
                            </Zoom>
                        ))}
                    </div>
                </section>

                {/* 3. Premium Collection */}
                <section className="py-8 md:py-12 lg:py-16">

                    <PremiumCollection />

                </section>

                {/* 4. Top Artists */}
                <section className="py-2 md:py-6 lg:py-8">
                    <Slide direction="up" triggerOnce>
                        <TopArtists />
                    </Slide>
                </section>

                {/* 5. Community Highlights / FeatureInfo */}
                <section className="py-6 md:py-10 lg:py-14">
                    <Fade triggerOnce>
                        <FeatureInfo />
                    </Fade>
                </section>
            </div>
        </>
    );
};

export default HomePage;
