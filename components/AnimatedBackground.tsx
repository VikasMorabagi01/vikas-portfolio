import React from "react";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-black overflow-hidden">
      
      {/* 1. Ambient Background Glows (Static & Ultra-Subtle) */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-yellow-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      {/* 2. The Precision Data Grid (Static 2rem x 2rem) */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '2rem 2rem',
          // Mask to fade the grid smoothly towards the edges of the screen
          maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, #000 30%, transparent 80%)'
        }}
      />
      
    </div>
  );
}