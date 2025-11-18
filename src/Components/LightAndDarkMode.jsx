// LightAndDarkMode.jsx
import React, { useState, useEffect } from "react";

const LightAndDarkMode = () => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        // Check if dark mode is enabled in localStorage
        const isDark = localStorage.getItem('darkMode') === 'true';
        setChecked(isDark);
        toggleDarkMode(isDark);
    }, []);

    const toggleDarkMode = (isDark) => {
        const body = document.body;

        if (isDark) {
            // Dark mode - শুধু body-র background change
            body.style.backgroundColor = '#111827';
            body.style.color = '#ffffff';
        } else {
            // Light mode - শুধু body-র background change
            body.style.backgroundColor = '#ffffff';
            body.style.color = '#000000';
        }

        localStorage.setItem('darkMode', isDark);
    };

    const handleToggle = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        toggleDarkMode(newChecked);
    };

    return (
        <label className="relative inline-block cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={handleToggle}
                className="sr-only"
            />
            <div className={`relative w-16 h-8 rounded-full transition-colors duration-500 ${checked ? "bg-gray-800" : "bg-blue-400"}`}>
                <div className={`absolute top-1 w-6 h-6 rounded-full shadow-md transition-all duration-500 flex items-center justify-center ${checked ? "left-8 bg-gray-300" : "left-1 bg-yellow-400"}`}>
                    {checked && (
                        <>
                            <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-gray-500"></div>
                            <div className="absolute top-2 left-3 w-1 h-1 rounded-full bg-gray-500"></div>
                            <div className="absolute top-1 left-2 w-0.5 h-0.5 rounded-full bg-gray-500"></div>
                        </>
                    )}
                </div>
            </div>
        </label>
    );
};

export default LightAndDarkMode;