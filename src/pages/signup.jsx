import React, { useState } from "react";
import { MessageCircle, MessageSquareText } from "lucide-react";
import { DotsLoader } from "@/components/ui/dots";
import { Link, } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signUp, isSigningUp } = useAuthStore();
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    });



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp(formData);
    };


    return (
        <div className=" min-h-screen grid lg:grid-cols-2 ">
            {/* Left Section */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-[#0a0a0a] min-h-screen">
                <div className="w-full max-w-md space-y-8 bg-primary px-[5%] py-[5%] md:py-[4%] rounded-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-3 group">
                            <div
                                className="size-12 rounded-xl bg-white flex items-center justify-center
            group-hover:bg-[#3070ca]/10 transition-colors"
                            >
                                <MessageCircle className="size-6 text-[#3070ca] transition-colors" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mt-2 tracking-wide">Create an account</h1>
                            <p className="text-[#aeb8c4]">
                                Get started with your free account
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium text-[#d7e0ea]">Full Name</label>
                            <input
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="w-full px-4 py-2 border border-[#3070ca]/50 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3070ca] transition"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium text-[#d7e0ea]">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-2 border border-[#3070ca]/50 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3070ca] transition"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium text-[#d7e0ea]">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-2 border border-[#3070ca]/50 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3070ca] transition"
                            />
                            <label
                                className="block mb-1 font-medium mt-[2%] cursor-pointer text-[#79a8f9] hover:text-[#3070ca] transition"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide password" : "Show password"}
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-[#3070ca] text-white py-[7px] md:py-2 rounded-lg hover:bg-[#255da3] transition-colors font-semibold"
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? (
                                <DotsLoader />
                            ) : (
                                <span className="text-xl tracking-wide">Create Account</span>
                            )}
                        </button>

                        <p className="text-center tracking-wide text-[15px] md:text-[17px] text-[#d7e0ea]">
                            Already have an account?{" "}
                            <Link to="/login" className="underline text-[#79a8f9] hover:text-[#3070ca] transition">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>


            {/* Right Section (Optional Illustration / Background) */}
            <div className="hidden lg:flex items-center justify-center bg-[#3070ca] text-black">
                <div className="flex flex-col items-center text-center p-10 space-y-6">
                    {/* Chat Icon */}
                    <div className="p-4 bg-white/10 rounded-2xl flex items-center justify-center">
                        <MessageSquareText className="w-14 h-14 text-black" />
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl font-bold tracking-tight">
                        Welcome to <span className=" text-white">PingMe </span> 
                    </h2>

                    {/* Tagline */}
                    <p className="text-[#e8f0f8] max-w-md text-[17px] leading-relaxed">
                        Connect instantly with your friends, share ideas, and stay in sync —
                        wherever you are. PingMe makes chatting simple, fast, and fun.
                    </p>
                
                </div>
            </div>

        </div>
    );
};

export default SignupPage;
