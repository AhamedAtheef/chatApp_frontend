import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Settings, User, X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { logOut, authUser } = useAuthStore();

    const handleLogout = () => {
        logOut();
    };
    return (
        <nav className="bg-[#01070fe1] text-[#49d1f3] backdrop-blur-md   shadow-sm sticky top-0 z-50">
            <div className="w-full px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-semibold text-indigo-600 flex items-center"
                    >
                        <img src="/logo.jpg" alt="" className="w-[130px] md:w-[150px] md:h-[50px]" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/profile"
                            className="flex items-center text-[#ffff] hover:text-[#ffffffda] gap-1"
                        >
                            <User className="w-5 h-5" />
                            Profile
                        </Link>
                        <Link
                            to="/settings"
                            className="flex items-center text-[#ffff] hover:text-[#ffffffda] gap-1"
                        >
                            <Settings className="w-5 h-5" />
                            Settings
                        </Link>
                        {authUser && (
                            <button
                                className="flex items-center text-[#ffff] hover:text-[#ffffffda] gap-1"
                                onClick={() => handleLogout()}
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-[#16a5e7] hover:text-[#23c4ec]"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-[#1c355a] bg-[#031733e1]">
                    <div className="flex flex-col space-y-3 px-4 py-3">
                        <Link
                            to="/profile"
                            className="flex items-center text-[#80edf5] hover:text-[#23c4ec] gap-1"
                            onClick={() => setMenuOpen(false)}
                        >
                            <User className="w-5 h-5" />
                            Profile
                        </Link>
                        <Link
                            to="/settings"
                            className="flex items-center text-[#80edf5] hover:text-[#23c4ec] gap-1"
                            onClick={() => setMenuOpen(false)}
                        >
                            <Settings className="w-5 h-5" />
                            Settings
                        </Link>
                        {authUser && (
                            <button
                                className="flex items-center text-[#80edf5] hover:text-[#23c4ec] gap-1"
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        )}

                    </div>
                </div>
            )}
        </nav>

    );
}