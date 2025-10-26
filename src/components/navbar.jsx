import React, { Profiler, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, PaletteIcon, Settings, User, UserCircle, X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { logOut, authUser } = useAuthStore();

    const handleLogout = () => {
        logOut();
    };
    return (
        <nav className="bg-[#2c2c2c] shadow-sm sticky top-0 z-50">
            <div className="w-full px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="text-2xl font-semibold text-indigo-600 flex items-center"
                    >
                        <img src="/logo.jpg" alt="" className="w-[120px] md:w-[150px] md:h-[150px]" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/profile"
                            onClick={() => { setMenuOpen(false) }}
                            className="flex items-center text-[#ffff] hover:text-[#ffffffda] gap-1"
                        >
                            <User className="w-5 h-5" />
                            Profile
                        </Link>
                        <Link
                            onClick={() => { setMenuOpen(true) }}
                            className="flex items-center text-[#ffff] hover:text-[#ffffffda] gap-1"
                        >
                            <Settings className="w-5 h-5" />
                            Settings
                        </Link>
                        {authUser && (
                            <button
                                className="flex items-center text-[#ffff] hover:text-[#ffffffda] gap-1"
                                onClick={() => { handleLogout(); setMenuOpen(false) }}
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        )}
                    </div>

                    <div className="md:hidden text-[#4b8df7] pr-[8%]">
                        <div className="flex justyfy-end gap-[20%] items-center w-full">
                            <Link to={"/profile"}
                                onClick={() => { setMenuOpen(false) }}>
                                <UserCircle />
                            </Link>
                            <button onClick={() => setMenuOpen(!menuOpen)}>
                                <Settings />
                            </button>

                            {authUser && (
                                <button
                                    onClick={() => { handleLogout(); setMenuOpen(false) }}
                                >
                                    <LogOut />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full z-50 ">
                    <div className="h-auto min-h-[100vh] md:min-h-[600px] md:h-[20%] md:w-[60%] lg:w-[40%] 2xl:w-[30%]
                     bg-popover-foreground shadow-lg rounded-b-2xl relative">
                        <div className="flex flex-col space-y-6 px-4 py-3">
                            <h1 className="text-2xl font-semibold text-center text-white border-b pb-2">
                                Settings
                            </h1>
                            <Link
                                to="/settings-theme"
                                className="flex text-xl items-center text-white gap-1 tracking-wider
                                 hover:bg-blue-500 px-2 py-2 transition-all hover:rounded-md focus:bg-blue-500"
                                onClick={() => setMenuOpen(false)}
                            >
                                <PaletteIcon className="w-5 h-5" />
                                Themes
                            </Link>
                            <button className="absolute top-3 right-2 bg-blue-400 py-[2px] 
                            px-[10px] rounded-full text-white cursor-pointer" 
                            onClick={() => setMenuOpen(false)} type="button">X</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}