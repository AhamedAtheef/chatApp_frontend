import React, { useState } from "react";
import { DotsLoader } from "@/components/ui/dots"
import { MessageCircle, MessageSquareText } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore"
import { Link } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { LogIn, isLoggingIn } = useAuthStore();
    const [formData, setFormData] = useState({
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
        LogIn(formData); 
    };
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
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
                            <h1 className="text-2xl font-bold text-white mt-2 tracking-wide">
                                Log in to your account
                            </h1>
                            <p className="text-[#aeb8c4]">Chat with your friends</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
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

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-[#3070ca] text-white py-[7px] md:py-2 rounded-lg hover:bg-[#255da3] transition-colors font-semibold"
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? <DotsLoader /> : <span className="text-xl tracking-wide">Login</span>}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center my-4">
                            <div className="flex-grow h-px bg-[#3070ca]/40"></div>
                            <span className="px-2 text-[#aeb8c4] text-sm">or</span>
                            <div className="flex-grow h-px bg-[#3070ca]/40"></div>
                        </div>

                        {/* Google Login Button */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 border border-[#3070ca]/50 text-white py-[7px] md:py-2 rounded-lg
                             hover:bg-[#3070ca]/10 transition-colors font-semibold"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            Continue with Google
                        </button>

                        <p className="text-center tracking-wide text-[15px] md:text-[17px] text-[#d7e0ea]"><span>Create a new account? </span> 
                             <Link to="/signup" className="text-[#79a8f9]
                             underline hover:text-[#3070ca] transition">Sign Up</Link></p>
                    </form>
                </div>
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center justify-center bg-[#3070ca] text-black">
                <div className="flex flex-col items-center text-center p-10 space-y-6">
                    <div className="p-4 bg-white/10 rounded-2xl flex items-center justify-center">
                        <MessageSquareText className="w-14 h-14 text-black" />
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight">
                        Welcome Back to <span className="text-white">PingMe</span>
                    </h2>
                    <p className="text-[#e8f0f8] max-w-md text-[17px] leading-relaxed">
                        Connect instantly with your friends, share ideas, and stay in sync —
                        wherever you are. PingMe makes chatting simple, fast, and fun.
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Login