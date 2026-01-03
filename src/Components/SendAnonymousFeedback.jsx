import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import Swal from 'sweetalert2';

const SendAnonymousFeedback = () => {
    const [loading, setLoading] = useState(false);

    const handleFeedback = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const message = form.message.value;

        const feedbackData = {
            message,
            date: new Date().toLocaleDateString(),
            timestamp: new Date()
        };

        try {
            const res = await fetch("https://artify-server-sigma.vercel.app/feedbacks", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(feedbackData)
            });

            const data = await res.json();

            if (data.success) {
                Swal.fire({
                    title: "Feedback Sent!",
                    text: "Thank you for your feedback.",
                    icon: "success",
                    confirmButtonColor: "#9333ea"
                });
                form.reset();
            }
        } catch (error) {
            console.error("Feedback error:", error);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left Side: Animation & Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <Fade direction="left">
                            <h2 className="text-3xl md:text-5xl font-black text-purple-600 mb-6">
                                Share Your Thoughts <br /> <span className="underline decoration-purple-300">Anonymously</span>
                            </h2>
                            <p className="text-lg mb-8 italic">
                                "Your identity is a secret, but your feedback is our strength.
                                Tell us how we can make Artify better for you."
                            </p>
                        </Fade>
                    </div>

                    {/* Right Side: Feedback Form */}
                    <div className="w-full lg:w-1/2">
                        <Fade direction="right">
                            <div className="backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-purple-500 relative overflow-hidden">

                                <form onSubmit={handleFeedback} className="relative z-10 space-y-6">
                                    <div>
                                        <label className="block font-bold mb-2 ml-1">Your Message</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows="5"
                                            placeholder="Write your suggestions or complaints here..."
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-purple-500 focus:border-purple-600 outline-none transition-all duration-300 resize-none placeholder-purple-600"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 hover:shadow-purple-200'
                                            }`}
                                    >
                                        {loading ? 'Sending...' : 'Send Feedback Anonymously'}
                                    </button>

                                    <p className="text-center text-xs text-gray-400 mt-4">
                                        🔒 No personal data, IP, or names are collected.
                                    </p>
                                </form>
                            </div>
                        </Fade>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SendAnonymousFeedback;