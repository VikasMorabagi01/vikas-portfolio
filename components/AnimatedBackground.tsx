"use client";
import React, { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // Changed bg-[#050505] to bg-black for true AMOLED pure black
    <div className="fixed inset-0 z-[-1] bg-black overflow-hidden">
      
      {/* 1. Ambient Background Glows (Static & Ultra-Subtle) */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-yellow-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      {/* 2. Interactive Spotlight (Follows the user's mouse) */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.06), transparent 40%)`
        }}
      />

      {/* 3. The Precision Data Grid (2rem x 2rem) */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '2rem 2rem',
          maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, #000 30%, transparent 80%)'
        }}
      />
      
    </div>
  );
}