import React, { useContext, useEffect, useState } from 'react';
import ExploreArtworkPageCard from '../Components/ExploreArtworkPageCard';
import LoadingSpinner from '../Components/LoadingSpinner';
import { AuthContext } from '../Provider/AuthContext';

const ExploreArtworkPage = () => {

    const { user } = useContext(AuthContext);

    const [allPublicData, setAllPublicData] = useState([]);
    const [showData, setShowData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all public artworks
    useEffect(() => {
        if (!user?.accessToken) return;

        setLoading(true);
        fetch("http://localhost:3000/all-artworks/public", {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setAllPublicData(data);
                setShowData(data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [user]);

    // Handle search
    const handleSearch = async (event) => {
        event.preventDefault();
        const searchText = event.target.search.value.trim();

        if (!searchText) {
            setShowData(allPublicData);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/all-artworks/search?search=${encodeURIComponent(searchText)}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            });
            const data = await res.json();
            setShowData(data);
        } catch (err) {
            console.error(err);
            setShowData([]);
        } finally {
            setLoading(false);
        }
    };


    const handleFilter = (radioValue) => {

        if (radioValue === "") {
            setShowData(allPublicData);
            return;
        }

        setShowData(
            allPublicData.filter(data =>
                data.category === radioValue
            )
        );
    };


    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="max-w-11/12 min-h-screen mx-auto px-4 sm:px-6 lg:px-0 py-10 mt-5 md:mt-20 lg:mt-20">

                    {/* Section Title and Search */}
                    <div className="flex flex-col md:flex-row justify-between items-center w-full mx-auto gap-4 md:gap-5 mb-5 md:mb-20 lg:mb-20">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 text-center md:text-left flex-1">
                            Explore Artworks Around You
                        </h2>
                        <div className="mt-4 md:mt-0 shrink-0">
                            <form onSubmit={handleSearch}>
                                <div className="search border-2 border-purple-500 rounded-full flex items-center">
                                    <input
                                        placeholder="Search Artwork"
                                        type="text"
                                        name="search"
                                        className='text-purple-500 px-4 py-1 rounded-l-full outline-none'
                                    />
                                    <button
                                        type="submit"
                                        className="bg-purple-500 text-white px-4 py-1 rounded-r-full hover:bg-purple-600 transition"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>

                    <div className='flex justify-center items-center mb-16'>
                        <form className="filter flex gap-2 md:gap-3">

                            {/* Reset Button */}
                            <input
                                className="btn btn-square bg-purple-500 text-white border-purple-400 font-medium hover:bg-purple-600 shadow-md transition-all duration-300"
                                type="reset"
                                value="×"
                                onClick={() => handleFilter("")}
                            />

                            {/* Painting */}
                            <input
                                className="btn bg-purple-500 text-white border-purple-400 font-medium hover:bg-purple-600 shadow-md transition-all duration-300 focus:ring-2 focus:ring-purple-300"
                                type="radio"
                                name="filter"
                                aria-label="Painting"
                                value="painting"
                                onChange={(e) => handleFilter(e.target.value)}
                            />

                            {/* Digital Art */}
                            <input
                                className="btn bg-purple-500 text-white border-purple-400 font-medium hover:bg-purple-600 shadow-md transition-all duration-300 focus:ring-2 focus:ring-purple-300"
                                type="radio"
                                name="filter"
                                aria-label="Digital Art"
                                value="digitalArt"
                                onChange={(e) => handleFilter(e.target.value)}
                            />

                            {/* Photography */}
                            <input
                                className="btn bg-purple-500 text-white border-purple-400 font-medium hover:bg-purple-600 shadow-md transition-all duration-300 focus:ring-2 focus:ring-purple-300"
                                type="radio"
                                name="filter"
                                aria-label="Photography"
                                value="photography"
                                onChange={(e) => handleFilter(e.target.value)}
                            />

                            {/* Drawing */}
                            <input
                                className="btn bg-purple-500 text-white border-purple-400 font-medium hover:bg-purple-600 shadow-md transition-all duration-300 focus:ring-2 focus:ring-purple-300"
                                type="radio"
                                name="filter"
                                aria-label="Drawing"
                                value="drawing"
                                onChange={(e) => handleFilter(e.target.value)}
                            />

                            {/* Sculpture */}
                            <input
                                className="btn bg-purple-500 text-white border-purple-400 font-medium hover:bg-purple-600 shadow-md transition-all duration-300 focus:ring-2 focus:ring-purple-300"
                                type="radio"
                                name="filter"
                                aria-label="Sculpture"
                                value="sculpture"
                                onChange={(e) => handleFilter(e.target.value)}
                            />

                            {/* Others */}
                            <input
                                className="btn bg-purple-500 text-white border-purple-400 font-medium hover:bg-purple-600 shadow-md transition-all duration-300 focus:ring-2 focus:ring-purple-300"
                                type="radio"
                                name="filter"
                                aria-label="Others"
                                value="other"
                                onChange={(e) => handleFilter(e.target.value)}
                            />

                        </form>
                    </div>


                    {/* Grid of Artworks */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {showData && showData.length > 0 ? (
                            showData.map(singlePublicData => (
                                <ExploreArtworkPageCard
                                    key={singlePublicData._id}
                                    singlePublicData={singlePublicData}
                                />
                            ))
                        ) : (
                            <p className="text-left text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl font-medium">
                                No artworks found!
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ExploreArtworkPage;
