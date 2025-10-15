// components/LoadingSpinner.jsx
import React from "react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default Loading;
