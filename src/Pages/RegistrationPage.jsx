import React from 'react';
import { Link } from 'react-router';

const RegistrationPage = () => {
    return (
        <div className="min-h-screen py-8 px-4 flex justify-center items-start">
            <div className="w-full max-w-3xl p-8 rounded-xl border-2 border-violet-500">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-violet-600">
                        Register New Account
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Create your account to get started
                    </p>
                </div>

                <form className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block mb-2 font-semibold">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 font-semibold">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block mb-2 font-semibold">Photo URL</label>
                        <input
                            type="text"
                            placeholder="https://example.com/your-photo.jpg"
                            className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-2 font-semibold">Password</label>
                        <input
                            type="password"
                            placeholder="Enter a strong password"
                            className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl transition-all duration-300 hover:cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </div>
                    <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-violet-500 font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
