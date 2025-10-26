import { THEMES } from '@/constants';
import { useChatStore } from '@/store/useChatStore';
import React, { useEffect, useState, useRef } from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import { MessageSkeleton } from './messageSkeleton';
import { useAuthStore } from '@/store/useAuthStore';

export const ChatContainer = () => {
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const { messages, selectedUser, getMessages, isMessagesLoading, SubscribeToMessage, UnSubscribeToMessage } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null); // ✅ fix: useState syntax corrected
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  console.log({ onlineUsers });
  useEffect(() => {
    if (!selectedUser?._id) return;

    const saveId = localStorage.getItem("chat-theme");
    const theme = THEMES.find((t) => t.id === saveId) || THEMES[0];
    setSelectedTheme(theme);
    getMessages(selectedUser._id);
    SubscribeToMessage();
    return () => UnSubscribeToMessage();
  }, [selectedUser?._id]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className='flex flex-1 flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col h-full relative "
      style={
        {
          background: selectedTheme.colors["--background"],

        }
      }>
      <div className="flex-shrink-0">
        <ChatHeader />
      </div>

      {/* ✅ Scrollable area with ref */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-3 relative">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;
          const sender = isOwnMessage ? authUser : selectedUser;

          return (
            <div
              key={message._id}
              className={`flex items-start gap-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              {/* reciver profle */}
              <div
                className={`${sender._id === selectedUser._id ? "hidden md:block" : "hidden"
                  } size-10 rounded-full border overflow-hidden flex justify-center items-center bg-muted`}
              >
                {sender?.pic ? (
                  <img
                    src={sender.pic}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-xl">
                    {sender?.fullname?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {/* message content */}
              <div className="max-w-[75%]">
                {message.image && (
                  <img
                    src={message.image}
                    alt="attachment"
                    className="rounded-lg mb-1 max-h-24 lg:max-h-48 w-auto object-contain cursor-pointer"
                    onClick={() => setSelectedImage(message.image)} //  open preview
                  />
                )}
                {message.text && (
                  <div className="p-2 rounded-lg bg-muted text-white"
                    style={
                      {
                        backgroundColor:
                          selectedTheme.colors["--primary"]
                          || selectedTheme.colors["--secondary"],
                      }
                    }>
                    {message.text}
                  </div>
                )}
                <time className="text-xs opacity-70"
                  style={
                    {
                      color:
                        selectedTheme.colors["--foreground"]
                        || selectedTheme.colors["--muted-foreground"],
                    }
                  }>
                  {new Date(message.createdAt).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </time>
              </div>
              {/* own profle */}
              <div
                className={`${sender._id === authUser._id ? "hidden md:block" : "hidden"
                  } size-10 rounded-full border overflow-hidden flex justify-center items-center bg-muted`}
              >
                {sender?.pic ? (
                  <img
                    src={sender.pic}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-xl">
                    {sender?.fullname?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex-shrink-0">
        <MessageInput />
        <div className="pb-[env(safe-area-inset-bottom)]" />
      </div>

      {/* ✅ Image Preview Overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-[#0000009f] bg-opacity-10 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="preview"
            className="max-w-[90%] max-h-[90%] rounded-lg object-contain"
          />
        </div>
      )}
    </div>
  );
};
