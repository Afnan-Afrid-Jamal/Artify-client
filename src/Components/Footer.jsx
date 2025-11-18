import React from 'react';

const Footer = () => {
    return (
        <div className="bg-gradient-to-r from-[#6366F1] via-[#7D7AF4] to-[#14B8A6] shadow-sm">
            <footer className="footer sm:footer-horizontal text-base-content p-10 text-white">

                {/* Logo & Tagline */}
                <aside className='flex flex-col justify-center items-center'>
                    <p className='logo-font text-3xl text-white text-center border-2 p-1'>
                        ARTIFY
                    </p>
                    <p className='poppins-font text-base text-center text-gray-300'>
                        Showcase and explore creative artworks
                    </p>
                </aside>

                {/* Explore Section */}
                <nav className='font-semibold'>
                    <h6 className="footer-title">Explore</h6>
                    <a href="/home" className="link link-hover">Home</a>
                    <a href="/explore-artwork" className="link link-hover">Explore Artworks</a>
                    <a href="/my-gallery" className="link link-hover">My Gallery</a>
                    <a href="/my-favourites" className="link link-hover">My Favorites</a>
                </nav>

                {/* Contact & Social */}
                <nav className='font-semibold'>
                    <h6 className="footer-title">Contact</h6>
                    <p className="text-gray-300">Email: info@artify.com</p>
                    <p className="text-gray-300">Phone: +880 1234 567890</p>

                    <div className="flex gap-3 mt-2">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="link link-hover">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="link link-hover">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="link link-hover">Instagram</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="link link-hover">LinkedIn</a>
                    </div>
                </nav>

            </footer>
            <p>copy right</p>
        </div>
    );
};

export default Footer;
