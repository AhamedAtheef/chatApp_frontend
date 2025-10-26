import { THEMES } from '@/constants';
import { useChatStore } from '@/store/useChatStore';
import React, { useEffect, useState, useRef } from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import { MessageSkeleton } from './messageSkeleton';
import { useAuthStore } from '@/store/useAuthStore';
import { Trash2 } from 'lucide-react';

export const ChatContainer = () => {
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const {
    messages,
    selectedUser,
    getMessages,
    isMessagesLoading,
    SubscribeToMessage,
    UnSubscribeToMessage,
    deleteMessage,
  } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null); // ✅ new state
  const pressTimer = useRef(null);

  // detect long press (mobile)
  const handleTouchStart = (message) => {
    pressTimer.current = setTimeout(() => {
      setSelectedMessage(message);
      setShowMenu(true);
    }, 700); // long-press delay
  };

  const handleTouchEnd = () => {
    clearTimeout(pressTimer.current);
  };

  // optional desktop right-click support
  const handleContextMenu = (e, message) => {
    e.preventDefault();
    setSelectedMessage(message);
    setShowMenu(true);
  };

  const handleDelete = () => {
    if (selectedMessage) {
      deleteMessage(selectedMessage._id);
    }
    setShowMenu(false);
    setSelectedMessage(null);
  };

  useEffect(() => {
    if (!selectedUser?._id) return;

    const saveId = localStorage.getItem('chat-theme');
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
        behavior: 'smooth',
      });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div
      className="flex flex-1 flex-col h-full relative "
      style={{
        background: selectedTheme.colors['--background'],
      }}
    >
      <div className="flex-shrink-0">
        <ChatHeader />
      </div>

      {/* ✅ Scrollable area with ref */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-3 py-2 space-y-3 relative"
      >
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;
          const sender = isOwnMessage ? authUser : selectedUser;

          return (
            <div
              key={message._id}
              className={`flex items-start gap-2 ${isOwnMessage ? 'justify-end' : 'justify-start'
                }`}
            >
              {/* receiver profile */}
              <div
                className={`${sender._id === selectedUser._id ? 'hidden md:block' : 'hidden'
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
              <div
                className="relative max-w-[75%]"
                onTouchStart={() => handleTouchStart(message)}
                onTouchEnd={handleTouchEnd}
                onContextMenu={(e) => handleContextMenu(e, message)}
              >
                {/* --- your original styles kept exactly --- */}
                {message.image && (
                  <img
                    src={message.image}
                    alt="attachment"
                    className="rounded-lg mb-1 max-h-24 lg:max-h-48 w-auto object-contain cursor-pointer"
                    onClick={() => setSelectedImage(message.image)}
                  />
                )}

                {message.text && (
                  <div
                    className="p-2 rounded-lg bg-muted text-white"
                    style={{
                      backgroundColor:
                        selectedTheme.colors['--primary'] ||
                        selectedTheme.colors['--secondary'],
                    }}
                  >
                    {message.text}
                  </div>
                )}

                <time
                  className="text-xs opacity-70"
                  style={{
                    color:
                      selectedTheme.colors['--foreground'] ||
                      selectedTheme.colors['--muted-foreground'],
                  }}
                >
                  {new Date(message.createdAt).toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </time>

                {/* --- small action popup --- */}
                {showMenu && selectedMessage?._id === message._id && (
                  <div
                    className="absolute right-0 bottom-full mb-2 bg-gray-800 text-sm text-white rounded-lg shadow-lg py-2 z-50 flex flex-col w-28"
                    style={{
                      backgroundColor:
                        selectedTheme.colors['--popover'] ||
                        selectedTheme.colors['--secondary-foreground'],
                    }}
                  >
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-red-600 rounded-lg"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                    <button
                      onClick={() => setShowMenu(false)}
                      className="px-4 py-2 text-gray-300 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* own profile */}
              <div
                className={`${sender._id === authUser._id ? 'hidden md:block' : 'hidden'
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
