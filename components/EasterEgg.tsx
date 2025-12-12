import React from 'react';

const FountainPenIcon: React.FC<{className: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M54.3431 9.65685C50.4379 5.75161 44.1062 5.75161 40.201 9.65685L12.9289 36.9289C11.3668 38.491 10.7426 40.6653 11.2193 42.7279L12.9896 51.579C13.4663 53.6416 15.2416 55.2416 17.3023 55.5451L26.495 56.7847C28.5576 57.0882 30.7319 56.464 32.294 54.9019L59.5661 27.6298C63.4713 23.7246 63.4713 17.3929 59.5661 13.5877L54.3431 9.65685Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M38.1213 11.7373L52.2635 25.8794" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.9289 36.9289L27.0711 51.0711" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const Sparkle: React.FC<{className: string, style: React.CSSProperties}> = ({ className, style }) => (
    <svg className={`absolute ${className}`} style={style} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"/>
    </svg>
);

interface EasterEggProps {
    onClose: () => void;
}

const EasterEgg: React.FC<EasterEggProps> = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="sketch-card bg-white p-8 space-y-4 text-center max-w-lg w-full relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative h-24">
                   <FountainPenIcon className="w-24 h-24 absolute left-1/2 -translate-x-1/2 animate-writing"/>
                   <Sparkle className="text-yellow-400 w-6 h-6 animate-sparkle" style={{'--delay': '0.5s'} as React.CSSProperties} />
                   <Sparkle className="text-yellow-400 w-4 h-4 animate-sparkle" style={{'--delay': '0.8s'} as React.CSSProperties} />
                   <Sparkle className="text-yellow-400 w-5 h-5 animate-sparkle" style={{'--delay': '1.2s'} as React.CSSProperties} />
                </div>
                <h2 className="text-4xl font-heading text-gray-800">
                    Every great story starts with a single word.
                </h2>
                <p className="font-alt text-2xl">
                    Keep writing yours...
                </p>
                <button 
                    onClick={onClose} 
                    className="sketch-button bg-gray-200 px-6 py-2 text-lg mt-4"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default EasterEgg;
