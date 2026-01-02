import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqData = [
        {
            question: "How can I upload my artwork to Artify?",
            answer: "First, you need to create an account. Once logged in, go to the 'Add Artwork' page from the navbar, fill in the details like title, image URL, and category, then hit submit!"
        },
        {
            question: "Is it free to showcase my art here?",
            answer: "Yes! Artify is a free platform for artists to showcase their creativity and connect with other art lovers globally."
        },
        {
            question: "How does the 'Public' vs 'Private' visibility work?",
            answer: "If you set an artwork to 'Public', it will appear on the Explore page for everyone. 'Private' artworks are only visible to you in your 'My Gallery' section."
        },
        {
            question: "How can I support or appreciate other artists?",
            answer: "You can appreciate an artist's work by clicking the 'Like' heart icon on their artwork card. This helps the artist gain visibility and motivation."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <Fade direction="up">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-500 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="">Find answers to common questions about using Artify.</p>
                </div>
            </Fade>

            <div className="space-y-4">
                {faqData.map((item, index) => (
                    <Fade key={index} delay={index * 100}>
                        <div className={`border-2 rounded-xl transition-all duration-300 ${activeIndex === index ? 'border-purple-500 shadow-lg shadow-purple-50' : 'border-purple-500 hover:border-purple-700'}`}>
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                            >
                                <span className={`font-bold text-lg ${activeIndex === index ? 'text-purple-600' : ''}`}>
                                    {item.question}
                                </span>
                                {activeIndex === index ? (
                                    <FaChevronUp className="text-purple-600" />
                                ) : (
                                    <FaChevronDown className="text-gray-400" />
                                )}
                            </button>

                            {activeIndex === index && (
                                <div className="px-5 pb-5 italic leading-relaxed border-t border-purple-50 pt-3">
                                    "{item.answer}"
                                </div>
                            )}
                        </div>
                    </Fade>
                ))}
            </div>
        </div>
    );
};

export default FAQ;