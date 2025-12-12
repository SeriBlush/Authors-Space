import React from 'react';

const BackgroundSketches = () => {
    return (
        <div className="fixed inset-0 z-[-1] opacity-20 text-gray-400 pointer-events-none hidden lg:block" aria-hidden="true">
            <svg className="absolute top-0 left-0" width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-10 50C20 -20 100 20 120 50S180 150 150 180" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="150" cy="50" r="30" stroke="currentColor" strokeWidth="4"/>
            </svg>
            <svg className="absolute bottom-0 right-0" width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M260 200C230 270 150 230 130 200S70 100 100 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <path d="M100 200L150 150" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <path d="M50 150L100 100" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            </svg>
        </div>
    )
};

export default BackgroundSketches;
