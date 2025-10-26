import { ArrowLeft } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import { SideBar } from "@/components/SideBar";
import { ChatContainer } from "@/components/ChatContainer";
import { NoChat } from "@/components/NoChat";

const HomePage = () => {
    const { selectedUser, setselectedUser } = useChatStore();

    return (
        <div className="bg-secondary-foreground h-full w-full flex items-center justify-center overflow-hidden">
            <div className="bg-secondary-foreground shadow-md w-full h-[calc(100vh-4rem)] flex flex-col">
                {/* Main Chat Section */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div
                        className={`${selectedUser ? "hidden sm:flex" : "flex"
                            } w-full sm:w-64 xl:w-72 2xl:w-80 bg-[#2c2c2c] flex-shrink-0 `}
                    >
                        <SideBar />
                    </div>

                    {/* Chat Area */}
                    <div
                        className={`${selectedUser ? "flex relative" : "hidden sm:flex"
                            } flex-1 bg-background`}
                    >
                        {/* Show back button only on mobile when user is selected */}
                        {selectedUser && (
                            <div className="absolute top-4 left-2 z-10 sm:hidden cursor-pointer">
                                <ArrowLeft
                                    className="text-white w-6 h-6"
                                    onClick={() => setselectedUser(null)}
                                />
                            </div>
                        )}

                        {!selectedUser ? <NoChat /> : <ChatContainer />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
