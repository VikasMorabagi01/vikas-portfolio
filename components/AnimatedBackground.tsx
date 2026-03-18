"use client";
import React, { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // 1. Cinematic Embers (Dust)
    const emberCount = w < 768 ? 40 : 80;
    class Ember {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      alphaDir: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Drifts slowly upward and slightly side-to-side
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() * -0.3) - 0.1; 
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.5;
        this.alphaDir = Math.random() > 0.5 ? 0.003 : -0.003;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Smooth pulsing effect
        this.alpha += this.alphaDir;
        if (this.alpha <= 0.05 || this.alpha >= 0.6) {
          this.alphaDir *= -1;
        }

        // Wrap around screen seamlessly
        if (this.y < -10) this.y = h + 10;
        if (this.x < -10) this.x = w + 10;
        if (this.x > w + 10) this.x = -10;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`; // Champagne Gold
        ctx.fill();
      }
    }

    // 2. Ambient Soft Glows (Aurora Orbs)
    class Glow {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = radius;
        this.color = color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        // Gentle bounce off invisible padded walls
        if (this.x < -this.radius || this.x > w + this.radius) this.vx *= -1;
        if (this.y < -this.radius || this.y > h + this.radius) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    let embers: Ember[] = [];
    let glows: Glow[] = [];

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      
      embers = [];
      for (let i = 0; i < emberCount; i++) {
        embers.push(new Ember());
      }

      glows = [
        // Top right soft amber glow
        new Glow(w * 0.8, h * 0.2, w > 768 ? 600 : 400, "rgba(214, 158, 46, 0.07)"),
        // Bottom left deep gold glow
        new Glow(w * 0.2, h * 0.8, w > 768 ? 700 : 500, "rgba(245, 158, 11, 0.05)"),
        // Center subtle copper glow
        new Glow(w * 0.5, h * 0.5, w > 768 ? 500 : 300, "rgba(180, 83, 9, 0.04)")
      ];
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Obsidian Base Background
      const bgGradient = ctx.createLinearGradient(0, 0, w, h);
      bgGradient.addColorStop(0, "#09090b"); // zinc-950
      bgGradient.addColorStop(1, "#000000"); // pure black
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, w, h);

      // Draw Glows first (so they sit in the deep background)
      ctx.globalCompositeOperation = "screen";
      for (let glow of glows) {
        glow.update();
        glow.draw();
      }
      ctx.globalCompositeOperation = "source-over";

      // Draw Embers on top
      for (let ember of embers) {
        ember.update();
        ember.draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  );
}