import React from "react";
import { useLoaderData } from "react-router";
import MyFavouritesPageCard from "../Components/MyFavouritesPageCard";

const MyFavoritesPage = () => {
    const favouritesData = useLoaderData() || [];

    return (
        <div className="min-h-screen py-10 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 text-center mb-6">
                My Favourite Artworks
            </h1>

            {favouritesData.length === 0 && (
                <p className="text-center text-gray-500 text-xl mt-10">
                    You haven't added any artworks to your favorites yet.
                </p>
            )}


            {favouritesData.length > 0 && (
                <div className="max-w-[95%] mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 items-stretch mt-10">
                    {favouritesData.map((art, index) => (
                        <MyFavouritesPageCard art={art} key={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFavoritesPage;
