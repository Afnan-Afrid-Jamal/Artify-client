import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import ExploreArtworkPageCard from '../Components/ExploreArtworkPageCard';
import LoadingSpinner from '../Components/LoadingSpinner';

const ExploreArtworkPage = () => {

    const allPublicData = useLoaderData();
    const [showData, setShowData] = useState(allPublicData);
    const [loading, setLoading] = useState(false);


    const handleSearch = async (event) => {
        event.preventDefault();
        const searchText = event.target.search.value;
        setLoading(true);

        try {
            const res = await fetch(`http://localhost:3000/all-artworks/search?search=${searchText}`);
            const data = await res.json();
            setShowData(data);
        } finally {
            setLoading(false);
        }
    };




    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="max-w-11/12 mx-auto min-h-screen mx-auto px-4 sm:px-6 lg:px-0 py-10 mt-5 md:mt-20 lg:mt-20">
                    {/* Section Title and Search */}
                    <div className="flex flex-col md:flex-row justify-between items-center w-full mx-auto gap-4 md:gap-5 mb-5 md:mb-20 lg:mb-20">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 text-center md:text-left flex-1">
                            Explore Artworks Around You
                        </h2>
                        <div className="mt-4 md:mt-0 shrink-0">
                            <form onSubmit={handleSearch}>
                                <div className="search border-2 border-purple-500 rounded-full">
                                    <input placeholder="Search Artwork" type="text" name="search" />
                                    <button type="submit">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Grid of Artworks */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {showData && showData.length > 0 ? (
                            showData.map(singlePublicData => (
                                <ExploreArtworkPageCard
                                    key={singlePublicData._id}
                                    singlePublicData={singlePublicData}
                                />
                            ))
                        ) : (
                            <p>No Data Found!</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ExploreArtworkPage;
