import React from 'react';

const AuthLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-md text-white transition-all duration-300">
      {/* Outer Glowing Ring */}
      <div className="relative flex items-center justify-center">
        {/* Animated Spinning Ring */}
        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        
        {/* Inner Pulse Circle */}
        <div className="absolute w-8 h-8 bg-indigo-500/40 rounded-full animate-ping" />
      </div>

      {/* Loading Text */}
      <div className="mt-5 text-center">
        <h3 className="text-lg font-semibold tracking-wide text-slate-100">
          Authenticating...
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Please wait while we check your session
        </p>
      </div>
    </div>
  );
};

export default AuthLoader;