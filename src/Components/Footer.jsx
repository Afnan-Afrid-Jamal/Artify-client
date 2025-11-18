import React from 'react';
import { CiFacebook, CiInstagram, CiLinkedin, CiTwitter } from "react-icons/ci";

const Footer = () => {
    return (
        <div className="bg-gradient-to-r from-purple-700 via-purple-800 to-violet-900 shadow-sm">
            <footer className="footer text-base-content p-10 text-white flex flex-col md:flex-row lg:flex-row items-center justify-around">

                {/* Logo & Tagline */}
                <aside className='flex flex-col justify-center items-center text-center md:text-left lg:text-left'>
                    <p className='logo-font text-3xl text-white border-2 p-1'>
                        ARTIFY
                    </p>
                    <p className='poppins-font text-base text-gray-300 mt-2'>
                        Showcase and explore creative artworks
                    </p>
                </aside>

                {/* Explore Section */}
                <nav className='font-semibold flex flex-col items-center md:items-start lg:items-start text-center md:text-left lg:text-left'>
                    <h6 className="text-white text-lg font-bold mb-4 text-center md:text-left lg:text-left w-full">Explore</h6>
                    <div className="flex flex-col items-center md:items-start lg:items-start space-y-2">
                        <a href="/home" className="link link-hover text-gray-300 block text-center md:text-left lg:text-left">Home</a>
                        <a href="/explore-artwork" className="link link-hover text-gray-300 block text-center md:text-left lg:text-left">Explore Artworks</a>
                        <a href="/my-gallery" className="link link-hover text-gray-300 block text-center md:text-left lg:text-left">My Gallery</a>
                        <a href="/my-favourites" className="link link-hover text-gray-300 block text-center md:text-left lg:text-left">My Favorites</a>
                    </div>
                </nav>

                {/* Contact & Social */}
                <nav className='font-semibold flex flex-col items-center md:items-start lg:items-start text-center md:text-left lg:text-left'>
                    <h6 className="text-white text-lg font-bold mb-4 text-center md:text-left lg:text-left w-full">Contact</h6>
                    <div className="flex flex-col items-center md:items-start lg:items-start space-y-2">
                        <p className="text-gray-300 text-center md:text-left lg:text-left">Email: info@artify.com</p>
                        <p className="text-gray-300 text-center md:text-left lg:text-left">Phone: +880 1234 567890</p>
                        <div className="flex gap-3 mt-2 justify-center md:justify-start lg:justify-start">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="link link-hover">
                                <CiFacebook size={40} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="link link-hover">
                                <CiTwitter size={40} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="link link-hover">
                                <CiInstagram size={40} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="link link-hover">
                                <CiLinkedin size={40} />
                            </a>
                        </div>
                    </div>
                </nav>

            </footer>

            <div className="border-t border-purple-500 py-4 bg-purple-700">
                <div className="mx-auto px-4">
                    <p className="text-center text-purple-200 text-sm">
                        ©{new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;