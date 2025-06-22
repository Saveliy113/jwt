import React from "react";

import LoginForm from "@/components/loginForm/AuthModule";

const AuthPage: React.FC = () => {
    return (
        <div className="flex gap-12 items-center">
            <LoginForm className="flex-1" />
            <div className="h-[500px] mr-10 flex-2 border flex justify-center items-center rounded-xl overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src="../gallery_1.jpg"
                    alt="Slider image 1"
                />
            </div>
        </div>
    )
}

export default AuthPage;