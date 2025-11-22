import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import { FcGoogle } from 'react-icons/fc';

const RegistrationPage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { customCreateUserWithEmailAndPassword, customGoogleSignIn } = useContext(AuthContext);

    const handleRegisterWithEmailAndPassword = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const photoURL = event.target.photoURL.value;
        const password = event.target.password.value;
        customCreateUserWithEmailAndPassword(email, password, name, photoURL)
            .then(() => {
                location.state ? navigate(location.state) : navigate("/home")
            })
    }

    const handleGoogleSignIn = () => {
        customGoogleSignIn()
            .then(() => {
                location.state ? navigate(location.state) : navigate("/home")
            })
    }


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

                <form onSubmit={handleRegisterWithEmailAndPassword} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block mb-2 font-semibold">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            required
                            className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                            className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block mb-2 font-semibold">Photo URL</label>
                        <input
                            type="text"
                            name="photoURL"
                            placeholder="https://example.com/your-photo.jpg"
                            className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-2 font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter a strong password"
                            required
                            className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className='flex flex-col gap-y-4'>
                        <button
                            type="submit"
                            className="w-full py-3 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl transition-all duration-300 hover:cursor-pointer"
                        >
                            Sign Up
                        </button>
                        <button onClick={handleGoogleSignIn}
                            type="button"
                            className="w-full py-3 border-2 border-indigo-400 rounded-xl mt-2 flex items-center justify-center space-x-2 hover:bg-gray-100 hover:text-black hover:cursor-pointer transition-all duration-300"
                        >
                            <FcGoogle size={25} />
                            <span>Continue with Google</span>
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
