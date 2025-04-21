import React from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

const ActivationPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="container h-full flex justify-center items-center text-center border border-red-500">
            <div>
                <h1 className="text-5xl font-medium">Your account has been successfully activated</h1>
                <span className="block text-9xl mt-10 mb-10">😎</span>
                <h3 className="font-thin text-2xl mb-2.5">You can go to the authentication page and log in</h3>
                <Button
                    className="px-20 py-6 cursor-pointer"
                    onClick={() => navigate('/signIn')}
                >
                    Sign In
                </Button>
            </div>
        </div>
    )
}

export default ActivationPage;