import { MessageSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import { THEMES } from "@/constants";

export const NoChat = () => {
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);

  useEffect(() => {
    const savedId = localStorage.getItem("chat-theme");
    const theme = THEMES.find((t) => t.id === savedId) || THEMES[0];
    setSelectedTheme(theme);
  }, []);

  return (
    <div
      className="w-full flex flex-1 flex-col items-center justify-center  transition-colors duration-300"
      style={{
        backgroundColor: selectedTheme.colors["--background"],
        color: selectedTheme.colors["--foreground"],
      }}
    >
      <div className="max-w-md text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center animate-bounce shadow-lg"
              style={{
                backgroundColor: selectedTheme.colors["--primary"],
                color: selectedTheme.colors["--primary-foreground"],
              }}
            >
              <MessageSquare className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Text */}
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: selectedTheme.colors["--foreground"] }}
        >
          Welcome to Pingme
        </h1>

        <p
          className="text-sm opacity-80"
          style={{ color: selectedTheme.colors["--muted-foreground"] || selectedTheme.colors["--foreground"] }}
        >
          Select a chat to start a conversation
        </p>
      </div>
    </div>
  );
};
