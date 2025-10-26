import React, { useRef, useState } from "react";
import { Image as ImageIcon,  SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useChatStore } from "@/store/useChatStore";
import toast from "react-hot-toast";

export const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async () => {
        const trimmedText = text.trim();

        // 🛑 Block sending empty message (no text + no image)
        if (!trimmedText && !imagePreview) {
            toast.error("Message cannot be empty");
            return;
        }

        try {
            await sendMessage({ text: trimmedText, image: imagePreview });
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error(error);
            toast.error("Failed to send message");
        }
    };

    return (
        <div className="flex items-center gap-2 p-0 border-t border-border bg-background">
            <div className="p-4 w-full">
                {imagePreview && (
                    <div className="mb-3 flex items-center gap-2">
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-lg border border-gray-400"
                            />
                            <Button
                                type="button"
                                className="absolute top-2 right-2 w-5 h-5 p-2 rounded-full bg-zinc-400 flex items-center justify-center cursor-pointer"
                                onClick={removeImage}
                            >
                                <span className="size-5">X</span>
                            </Button>
                        </div>
                    </div>
                )}

                <div
                    className="flex items-center gap-2"
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                >
                    <div className="flex flex-1 gap-2 w-full">
                        <Input
                            type="text"
                            placeholder="Type a message..."
                            value={text}
                            className="w-full rounded-lg"
                            onChange={(e) => setText(e.target.value)}
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            className="hidden"
                        />

                        <button
                            type="button"
                            className={`hidden sm:flex items-center justify-center cursor-pointer ${imagePreview ? "text-emerald-500" : "text-zinc-400"
                                }`}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <ImageIcon size={20} />
                        </button>

                        <button
                            type="button"
                            onClick={handleSendMessage}
                            className="flex items-center justify-center cursor-pointer "
                        >
                            <SendIcon size={20} className="text-black" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
