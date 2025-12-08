import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-page-background">
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Electromagnetic wave pulses */}
        <div className="relative w-32 h-32">
          {/* Center core (sun/magnetosphere) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
          
          {/* Expanding wave rings */}
          <div className="absolute inset-0 border-2 border-blue-500 rounded-full animate-[ping_2s_ease-out_infinite]"></div>
          <div className="absolute inset-0 border-2 border-purple-500 rounded-full animate-[ping_2s_ease-out_infinite] opacity-75" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 border-2 border-cyan-500 rounded-full animate-[ping_2s_ease-out_infinite] opacity-50" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 animate-pulse">
            Work in progress...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;