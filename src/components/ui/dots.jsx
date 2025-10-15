import React from "react";

export function DotsLoader() {
  return (
    <div className="flex items-center justify-center gap-1 py-[5px]">
      <span className="w-2 h-2 text-center bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 text-center bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 text-center bg-white rounded-full animate-bounce" />
    </div>
  );
}
