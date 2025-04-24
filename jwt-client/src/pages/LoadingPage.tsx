import React from "react";

const LoadingPage: React.FC = () => {
    return (
        <div className="w-full h-full bg-slate-100 flex justify-center items-center">
            <div className="w-25 h-25 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export default LoadingPage;