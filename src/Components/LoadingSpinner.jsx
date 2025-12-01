import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-brightness-50 bg-black/60 z-50">
            <div className="p-4 animate-spin drop-shadow-2xl bg-linear-to-bl from-pink-500 via-purple-500 to-indigo-500 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full flex justify-center items-center">
                <div className="rounded-full h-full w-full bg-black/80 backdrop-blur-md"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
