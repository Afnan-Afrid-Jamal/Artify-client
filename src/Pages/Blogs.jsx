import React, { useEffect, useState } from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import LoadingSpinner from '../Components/LoadingSpinner';
import { Link } from 'react-router';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination States
    // 4 column layout er jonno 8 ba 12 blogs per page dewa standard (jate row purn thake)
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 8;

    useEffect(() => {
        fetch("https://artify-server-sigma.vercel.app/blogs")
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBlogs(data.data);
                }
            })
            .catch(err => console.error("Error fetching blogs:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingSpinner />;
    if (blogs.length === 0) return <p className="text-center py-20 text-gray-500 font-bold">No Blogs Found!!</p>;

    // Pagination Logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="max-w-11/12 mx-auto px-4 py-20">
            {/* Header Section */}
            <Fade direction="up">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-purple-600 mb-4 tracking-tight">
                        Latest Artify Blogs
                    </h2>
                    <p className="italic">Explore stories, techniques, and trends from our creative community.</p>
                </div>
            </Fade>

            {/* Grid Layout - lg:grid-cols-4 add kora hoyeche */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentBlogs.map((blog) => (
                    <Zoom key={blog._id}>
                        <div className="rounded-2xl shadow-xl hover:shadow-purple-500/40 duration-500 overflow-hidden transition-all border border-purple-200 flex flex-col h-full group">

                            {/* Blog Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-56 object-cover group-hover:scale-110 duration-500 transition-transform"
                                />
                                <div className="absolute top-3 right-3 bg-purple-500 px-3 py-1 rounded-full flex items-center shadow-md">
                                    <span className="text-xs font-bold">{blog.date}</span>
                                </div>
                            </div>

                            {/* Blog Content */}
                            <div className="p-5 flex flex-col justify-between flex-1">
                                <div>
                                    <div className="flex items-center mb-3">
                                        <p className="text-xs font-bold text-purple-500 uppercase tracking-widest">
                                            By {blog.author}
                                        </p>
                                    </div>
                                    <h3 className="text-lg font-bold group-hover:text-purple-600 transition-colors duration-300 line-clamp-2 leading-snug">
                                        {blog.title}
                                    </h3>
                                    <p className="mt-3 text-sm italic line-clamp-3">
                                        "{blog.description}"
                                    </p>
                                </div>

                                <Link
                                    to={`/blog-details/${blog._id}`}
                                    className="mt-6 w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-center font-bold rounded-lg transition-all duration-300 shadow-md active:scale-95"
                                >
                                    Read Full Story
                                </Link>
                            </div>
                        </div>
                    </Zoom>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-20 gap-3">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-5 py-2 rounded-xl font-bold transition-all border-2 ${currentPage === 1
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                            : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white shadow-sm'
                            }`}
                    >
                        Prev
                    </button>

                    <div className="flex gap-2">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`w-11 h-11 rounded-xl font-bold transition-all border-2 ${currentPage === index + 1
                                    ? 'bg-purple-600 border-purple-600 text-white shadow-lg scale-110'
                                    : 'border-purple-100 text-purple-600 hover:border-purple-600'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-5 py-2 rounded-xl font-bold transition-all border-2 ${currentPage === totalPages
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                            : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white shadow-sm'
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Blogs;