import React, { useContext, useRef } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';

const LoginPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef();

    const { customLoginWithEmailAndPassword, customGoogleSignIn, handleForgetPassword } = useContext(AuthContext);

    const handleLoginWithEmailAndPassword = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        customLoginWithEmailAndPassword(email, password)
            .then(() => {
                location.state ? navigate(location.state) : navigate("/home")
            })
    }

    const handleGoogleLogin = () => {
        customGoogleSignIn()
            .then(() => {
                location.state ? navigate(location.state) : navigate("/home")
            })
    }



    return (
        <>
            <title>ARTIFY - login</title>

            <div className="min-h-screen py-8 px-4 flex justify-center items-start">
                <div className="w-full max-w-xl p-8 rounded-xl border-2 border-violet-500">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-violet-600">
                            Login
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Access your account
                        </p>
                    </div>

                    <form onSubmit={handleLoginWithEmailAndPassword} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block mb-2 font-semibold">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                ref={emailRef}
                                className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-2 font-semibold">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full border-2 border-violet-500 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                            />
                        </div>
                        <div>
                            <button onClick={() => { handleForgetPassword(emailRef.current.value) }} type="button" className="text-sm text-right text-violet-600 font-medium hover:underline hover:cursor-pointer">
                                Forget Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl transition-all duration-300 hover:cursor-pointer"
                            >
                                Login
                            </button>
                        </div>


                        {/* Google Login */}
                        <div className="text-center">
                            <button onClick={handleGoogleLogin}
                                type="button"
                                className="w-full py-3 border-2 border-indigo-400 rounded-xl mt-2 flex items-center justify-center space-x-2 hover:bg-gray-100 hover:text-black hover:cursor-pointer transition-all duration-300"
                            >
                                <FcGoogle size={25} />
                                <span>Continue with Google</span>
                            </button>
                        </div>


                        {/* Register Link */}
                        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-violet-500 font-semibold hover:underline">
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
