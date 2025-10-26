import React, { useState, useEffect } from "react";
import { THEMES } from "@/constants";
import { Button } from "@/components/ui/button";
import { LucideGalleryVertical, LucideSend } from "lucide-react";

export default function ThemeSettings() {
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const saved = localStorage.getItem("chat-theme");
    return THEMES.find((t) => t.id === saved) || THEMES[0];
  });

  // Function to apply theme colors
  const applyTheme = (themeId) => {
    const newTheme = THEMES.find((t) => t.id === themeId);
    if (!newTheme) return;
    setSelectedTheme(newTheme);
    localStorage.setItem("chat-theme", newTheme.id);
  };

  useEffect(() => {
    if (selectedTheme) {
      localStorage.setItem("chat-theme", selectedTheme.id);
      
    }
  }, [selectedTheme]);

  return (
    <div className="min-h-screen container mx-auto px-3 sm:px-4 pt-16 sm:pt-20 max-w-5xl  ">
      <div className="space-y-6">
        {/* Heading */}
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h2 className="text-xl tracking-wider md:text-2xl font-semibold text-white">Themes</h2>
          <p className="text-sm sm:text-sm text-accent">
            Choose theme for your chat interface
          </p>
        </div>

        {/* Theme selector grid */}
        <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
          {THEMES.map((theme) => (
            <Button
              key={theme.id}
              variant={theme.id === selectedTheme.id ? "default" : "secondary"}
              className={`w-full h-10 rounded-lg text-xs sm:text-sm transition-all duration-200 ${theme.id === selectedTheme.id
                ? "ring-2 ring-primary"
                : "hover:ring-1 hover:ring-primary/60"
                }`}
              style={{
                backgroundColor: theme.colors["--primary"],
                color: theme.colors["--primary-foreground"],
              }}
              onClick={() => applyTheme(theme.id)}
            >
              {theme.name}
            </Button>
          ))}
        </div>

        {/* 🔥 Chat Preview Section */}
        <div
          className="p-4 sm:p-6 rounded-xl mt-6 md:mt-[15%]"
          style={{
            backgroundColor: selectedTheme.colors["--background"],
            color: selectedTheme.colors["--foreground"],
          }}
        >
          <p className="font-semibold mb-2 text-sm sm:text-base">Preview</p>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm font-bold"
                style={{
                  backgroundColor: selectedTheme.colors["--primary"],
                  color: selectedTheme.colors["--primary-foreground"],
                }}
              >
                J
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold">John Doe</p>
                <p className="text-[10px] sm:text-xs opacity-80">Online</p>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div
                className="text-xs sm:text-sm w-max p-2 rounded-lg"
                style={{
                  backgroundColor: "#3f3f46",
                  color: "#e4e4e7",
                }}
              >
                Hey! How's it going?
              </div>
              <div className="flex justify-end">
                <div
                  className="text-[10px] sm:text-sm w-max p-2 rounded-lg"
                  style={{
                    backgroundColor: selectedTheme.colors["--primary"],
                    color: selectedTheme.colors["--primary-foreground"],
                  }}
                >
                  I'm doing great! Just working on some new features.
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center px-2 sm:px-4 mt-3">
            <div
              className="w-full max-w-2xl flex items-center gap-2 border border-gray-300 dark:border-gray-600 
    rounded-full px-4 py-2 shadow-sm bg-white dark:bg-[#1f2937] 
    focus-within:ring-2 focus-within:ring-primary transition-all duration-200"
            >
              {/* Message input */}
              <input
                type="text"
                placeholder="Type your message..."
                readOnly
                className="flex-1 bg-transparent outline-none text-sm sm:text-base placeholder:text-gray-500 
      dark:placeholder:text-gray-400 text-gray-800 dark:text-gray-100"
              />

              {/* Gallery Icon */}
              <button
                type="button"
                className="text-gray-500 hover:text-primary transition"
                title="Attach image"
              >
                <LucideGalleryVertical className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Send Button */}
              <button
                type="button"
                className="bg-primary text-primary-foreground p-2 sm:p-2.5 rounded-full hover:opacity-90 transition"
                title="Send message"
              >
                <LucideSend className="w-3 h-3 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

        </div>
        {/* 🔥 End Preview */}
      </div>
    </div>

  );
}


