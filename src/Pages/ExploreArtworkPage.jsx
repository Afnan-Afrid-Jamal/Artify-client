import React, { useContext, useEffect, useState } from 'react';
import ExploreArtworkPageCard from '../Components/ExploreArtworkPageCard';
import LoadingSpinner from '../Components/LoadingSpinner';
import { AuthContext } from '../Provider/AuthContext';

const ExploreArtworkPage = () => {
    const { user } = useContext(AuthContext);

    const [allPublicData, setAllPublicData] = useState([]);
    const [showData, setShowData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Proti page-e 6-ti card dekhabe

    useEffect(() => {
        setLoading(true);
        fetch("https://artify-server-sigma.vercel.app/all-artworks/public")
            .then(res => res.json())
            .then(data => {
                setAllPublicData(data);
                setShowData(data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    // Pagination Calculation
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = showData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(showData.length / itemsPerPage);

    const handleSearch = async (event) => {
        event.preventDefault();
        const searchText = event.target.search.value.trim();
        setCurrentPage(1); // Search korle 1st page-e niye jabe

        if (!searchText) {
            setShowData(allPublicData);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`https://artify-server-sigma.vercel.app/all-artworks/search?search=${encodeURIComponent(searchText)}`)
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
        setCurrentPage(1); // Filter korle 1st page-e niye jabe
        if (radioValue === "") {
            setShowData(allPublicData);
            return;
        }
        setShowData(allPublicData.filter(data => data.category === radioValue));
    };

    return (
        <>
            <title>ARTIFY - explore artwork</title>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="max-w-11/12 min-h-screen mx-auto px-4 sm:px-6 lg:px-0 py-10 mt-5 md:mt-20 lg:mt-20">

                    {/* Title and Search */}
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
                                        className='text-purple-600 px-4 py-1 rounded-l-full outline-none'
                                    />
                                    <button type="submit" className="bg-purple-500 text-white px-4 py-1 rounded-r-full hover:bg-purple-600 transition">
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className='flex justify-center items-center my-10'>
                        <form className="filter flex flex-wrap gap-2 justify-center items-center">
                            <input className="btn btn-square bg-purple-500 text-white border-purple-400 font-medium" type="reset" value="×" onClick={() => handleFilter("")} />
                            {['painting', 'digital', 'photography', 'drawing', 'sculpture', 'other'].map(cat => (
                                <input key={cat} className="btn bg-purple-500 text-white border-purple-400 font-medium" type="radio" name="filter" aria-label={cat.charAt(0).toUpperCase() + cat.slice(1)} value={cat} onChange={(e) => handleFilter(e.target.value)} />
                            ))}
                        </form>
                    </div>

                    {/* Grid of Artworks */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {currentItems && currentItems.length > 0 ? (
                            currentItems.map(singlePublicData => (
                                <ExploreArtworkPageCard key={singlePublicData._id} singlePublicData={singlePublicData} />
                            ))
                        ) : (
                            <p className="text-left text-gray-500 text-xl font-medium col-span-full">No artworks found!</p>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-16 gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white disabled:opacity-50 transition-all font-bold"
                            >
                                Prev
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`w-10 h-10 rounded-lg font-bold transition-all ${currentPage === index + 1 ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-purple-50 text-purple-600 hover:bg-purple-200'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white disabled:opacity-50 transition-all font-bold"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ExploreArtworkPage;