import React from "react";

export const MessageSkeleton = () => {
    return (
        <div className="flex flex-col h-full bg-background animate-pulse">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"
                            }`}
                    >
                        <div
                            className={`${i % 2 === 0 ? "bg-zinc-800" : "bg-zinc-700"
                                } rounded-2xl p-3 space-y-2 w-2/3`}
                        >
                            <div className="h-3 bg-zinc-600 rounded" />
                            <div className="h-3 bg-zinc-600 rounded w-5/6" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
