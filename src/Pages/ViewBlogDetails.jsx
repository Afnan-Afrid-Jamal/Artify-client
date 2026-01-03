import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Fade } from 'react-awesome-reveal';
import { FaArrowLeft, FaCalendarAlt, FaUser } from 'react-icons/fa';
import LoadingSpinner from '../Components/LoadingSpinner';

const ViewBlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Dynamic ID diye data fetch
        fetch(`https://artify-server-sigma.vercel.app/blogs/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBlog(data.data);
                }
            })
            .catch(err => console.error("Error fetching blog details:", err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <LoadingSpinner />;
    if (!blog) return <div className="text-center py-20 font-bold text-red-500">Blog Not Found!</div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-20 min-h-screen">
            <Fade direction="down">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-purple-500 font-bold mb-8 hover:gap-4 transition-all duration-300"
                >
                    <FaArrowLeft /> Back to Blogs
                </button>
            </Fade>

            <Fade>
                <div className="rounded-3xl border-2 border-purple-400 overflow-hidden shadow-2xl">
                    {/* Header Image Section */}
                    <div className="relative h-64 md:h-[500px]">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Floating Date Badge like your cards */}
                        <div className="absolute bottom-6 left-6 bg-purple-600 px-6 py-2 rounded-full flex items-center gap-2 shadow-lg border-2 border-white/20 backdrop-blur-sm">
                            <FaCalendarAlt />
                            <span className="font-bold">{blog.date}</span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-16">
                        {/* Author Info */}
                        <div className="flex items-center gap-2 text-purple-500 font-bold uppercase tracking-widest text-sm mb-6">
                            <FaUser />
                            <span>Published By {blog.author}</span>
                        </div>

                        {/* Blog Title */}
                        <h1 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                            {blog.title}
                        </h1>

                        {/* Blog Description */}
                        <div className="border-l-4 border-purple-400 pl-6 mb-10">
                            <p className="text-xl md:text-2xl italic leading-relaxed font-medium">
                                "{blog.description}"
                            </p>
                        </div>

                        {/* Extra Reading Content (Static for UI Look) */}
                        <div className="leading-relaxed text-lg space-y-6">
                            <p>
                                At ARTIFY, we believe that art is not just a hobby, but a way of living. This particular piece
                                discusses the inner workings of the creative mind and how the artist behind this story
                                navigated their journey through the world of modern aesthetics.
                            </p>
                            <p>
                                Whether you are a professional or just starting, stories like these remind us that every
                                masterpiece begins with a simple idea. We hope this blog inspires you to pick up your brush,
                                lens, or stylus and create something extraordinary today.
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <Link onClick={() => { navigate(-1) }} className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 flex justify-center items-center mx-auto mt-15 w-full break-words">Go Back</Link>
                </div>
            </Fade>
        </div>
    );
};

export default ViewBlogDetails;