import React from 'react';

interface PrivacyPopupProps {
  onDismiss: () => void;
}

const PrivacyPopup: React.FC<PrivacyPopupProps> = ({ onDismiss }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="sketch-card bg-white p-8 space-y-4 text-center max-w-md w-full">
                <h2 className="text-3xl font-heading">You're Browsing Anonymously!</h2>
                <p className="text-lg text-gray-800">
                    Welcome! Just so you know, your visit is completely anonymous. We don't collect or store any of your personal data. 
                    Feel free to explore, comment, and share ideas without leaving a trace.
                </p>
                <p className="font-alt text-xl">Happy creating!</p>
                <button 
                    onClick={onDismiss} 
                    className="sketch-button bg-green-300 px-6 py-2 text-lg"
                >
                    Got it!
                </button>
            </div>
        </div>
    );
};

export default PrivacyPopup;
