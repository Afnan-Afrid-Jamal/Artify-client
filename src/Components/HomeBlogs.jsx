import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router';
import { Fade, Zoom } from 'react-awesome-reveal';
import { FaArrowRight } from 'react-icons/fa';

const HomeBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://artify-server-sigma.vercel.app/eightBlogs")
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBlogs(data.data);
                }
            })
            .catch(err => console.error("Error fetching blogs:", err))
            .finally(() => setLoading(false));
    }, [])

    if (loading) return <LoadingSpinner />;
    if (blogs.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            {/* Header Section */}
            <Fade direction="up">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-purple-500 mb-4 tracking-tight">
                        Latest Artify Blogs
                    </h2>
                    <p className="italic">Explore stories, techniques, and trends from our creative community.</p>
                </div>
            </Fade>

            {/* Grid Layout - Sudhu matro cards thakbe ekhane */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {blogs.map((blog) => (
                    <Zoom key={blog._id}>
                        <div className="rounded-2xl shadow-2xl hover:shadow-purple-500/50 duration-500 overflow-hidden transition-all border-2 border-purple-400 flex flex-col h-full group">
                            {/* Blog Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-64 sm:h-72 md:h-80 object-cover group-hover:scale-110 duration-500 transition-transform"
                                />
                                <div className="absolute top-3 right-3 bg-purple-400 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                    <span className="text-sm font-bold">{blog.date}</span>
                                </div>
                            </div>

                            {/* Blog Content */}
                            <div className="p-5 flex flex-col justify-between flex-1">
                                <div>
                                    <div className="flex items-center mb-3">
                                        <p className="text-sm font-semibold text-purple-500 uppercase tracking-wider">
                                            By {blog.author}
                                        </p>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="mt-4 text-sm leading-relaxed italic line-clamp-3">
                                        "{blog.description}"
                                    </p>
                                </div>
                                <Link to={`/blog-details/${blog._id}`} className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 flex justify-center items-center mx-auto mt-10 w-full break-words">
                                    Read Full Story
                                </Link>
                            </div>
                        </div>
                    </Zoom>
                ))}
            </div>

            {/* View All Button - Grid-er baire niche, tai justify-end ekhon kaj korbe */}
            <div className="w-full flex justify-end mt-12 px-4 lg:px-0">
                <Link
                    to="/blogs"
                    className="group relative inline-flex items-center gap-2 text-lg font-bold text-purple-600 transition-all duration-300"
                >
                    <span className="relative">
                        View All Blogs
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>

                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-50 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-md">
                        <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" size={18} />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default HomeBlogs;