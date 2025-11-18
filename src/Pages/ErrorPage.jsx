import React from 'react';
import { Link } from 'react-router';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-100 dark:from-gray-900 dark:to-purple-900">
            <div className="text-center px-4">
                {/* Error Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                            <FaExclamationTriangle className="text-white text-6xl" />
                        </div>
                        <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-xl animate-ping"></div>
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-8xl md:text-9xl font-bold text-gray-800 dark:text-white mb-4">
                    404
                </h1>

                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                    Oops! Page Not Found
                </h2>

                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back to creating amazing art!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/home"
                        className="bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                        <FaHome />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="border-2 border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-gray-900 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Go Back
                    </button>
                </div>

                {/* Creative Element */}
                <div className="mt-12 text-gray-500 dark:text-gray-500">
                    <p className="text-sm">
                        Meanwhile, why not explore some amazing artworks?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;