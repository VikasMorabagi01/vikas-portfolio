"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Terminal, Briefcase, Code2, GraduationCap, ChevronRight, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";
import { data } from "../data/resume"; 

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  // Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AnimatedBackground />
      <AnimatePresence>
        {loading && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-300 tracking-tighter mb-8"
            >
              INITIALIZING...
            </motion.div>
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <main className="relative z-10 w-full px-4 pb-32 pt-12 md:px-8">
          
          {/* FLOATING MAC-STYLE DOCK */}
          <motion.div 
            initial={{ y: 100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 left-1/2 z-50 flex items-center gap-4 px-6 py-4 glass-panel rounded-full border border-emerald-500/20 shadow-[0_10px_40px_rgba(16,185,129,0.15)]"
          >
            {[
              { id: 'home', icon: <Terminal size={22} />, label: "System" },
              { id: 'experience', icon: <Briefcase size={22} />, label: "Experience" },
              { id: 'projects', icon: <Code2 size={22} />, label: "Projects" },
              { id: 'education', icon: <GraduationCap size={22} />, label: "Education" },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => scrollTo(nav.id)}
                className={`relative group p-3 rounded-full transition-all ${activeTab === nav.id ? "bg-emerald-500/20 text-emerald-400" : "text-slate-400 hover:text-emerald-300 hover:bg-white/5"}`}
              >
                {nav.icon}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all bg-slate-800 text-emerald-400 text-xs font-bold px-3 py-1 rounded-md border border-emerald-500/30">
                  {nav.label}
                </span>
              </button>
            ))}
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-32">
            
            {/* 1. CINEMATIC HERO */}
            <section id="home" className="min-h-[85vh] flex flex-col justify-center items-center text-center relative pt-10">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_50%)] pointer-events-none" />
              
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-400 font-mono tracking-[0.3em] uppercase text-sm mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Data Analyst _
              </motion.span>

              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-4"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-700 block">VIKAS</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-t from-emerald-500 to-teal-200 block -mt-4 md:-mt-8 lg:-mt-12">MORABAGI</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex gap-6 mt-8 z-10">
                <button onClick={() => window.print()} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wide rounded-none border border-emerald-400 shadow-[4px_4px_0_#34d399] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#34d399] transition-all flex items-center gap-2">
                  EXECUTE RESUME.EXE <Download size={18} />
                </button>
                <div className="flex gap-2">
                  <a href={`https://${data.basics.links[0].url}`} target="_blank" rel="noreferrer" className="p-4 glass-panel border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 transition-colors">
                    <Linkedin size={22} />
                  </a>
                  <a href={`https://${data.basics.links[1].url}`} target="_blank" rel="noreferrer" className="p-4 glass-panel border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 transition-colors">
                    <Github size={22} />
                  </a>
                </div>
              </motion.div>
            </section>

            {/* 2. HACKER TERMINAL (About & Skills) */}
            <section>
              <motion.div 
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-xl bg-[#0a0f16] border border-slate-800 overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.05)]"
              >
                {/* Terminal Header */}
                <div className="bg-[#111823] border-b border-slate-800 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="ml-4 text-xs text-slate-500 font-mono flex-1 text-center pr-12">vikas@mainframe: ~/system_info</span>
                </div>
                
                {/* Terminal Body */}
                <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed">
                  <p className="text-emerald-400 mb-4"><span className="text-slate-500">➜</span> <span className="text-teal-300">~</span> cat bio.txt</p>
                  <p className="text-slate-300 mb-8">{data.basics.summary}</p>
                  
                  <p className="text-emerald-400 mb-4"><span className="text-slate-500">➜</span> <span className="text-teal-300">~</span> ./load_metrics.sh</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {data.achievements.slice(0, 4).map((ach, i) => (
                      <div key={i} className="border border-emerald-500/20 bg-emerald-500/5 p-4 rounded text-center hover:bg-emerald-500/10 transition-colors">
                        <div className="text-2xl font-black text-emerald-400 mb-1">{ach.metric}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest">{ach.context.substring(0,35)}...</div>
                      </div>
                    ))}
                  </div>

                  <p className="text-emerald-400 mb-4"><span className="text-slate-500">➜</span> <span className="text-teal-300">~</span> ls /skills</p>
                  <div className="flex flex-wrap gap-2 text-slate-400 text-xs md:text-sm">
                    {data.skills.flatMap(s => s.items).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm">
                        {skill.split('(')[0].trim()}
                      </span>
                    ))}
                    <span className="animate-pulse text-emerald-400 px-2 py-1">_</span>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* 3. HOLOGRAPHIC EXPERIENCE CARDS */}
            <section id="experience" className="scroll-mt-24">
              <h2 className="text-4xl font-black text-white mb-12 tracking-tight uppercase flex items-center gap-4">
                <span className="w-8 h-1 bg-emerald-500" /> Career Log
              </h2>
              <div className="relative border-l-2 border-slate-800 ml-4 md:ml-0 space-y-12 pl-8 md:pl-12">
                {data.experience.map((exp, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="relative group"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[43px] md:-left-[59px] top-1 w-5 h-5 rounded-full bg-slate-950 border-4 border-emerald-500 group-hover:shadow-[0_0_15px_#10b981] transition-all" />
                    
                    <div className="glass-panel p-8 rounded-2xl border border-slate-800 group-hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden">
                      {/* Holographic Glow */}
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 relative z-10">
                        <div>
                          <h3 className="text-2xl font-bold text-white tracking-tight">{exp.role}</h3>
                          <p className="text-emerald-400 font-mono text-sm mt-1">{exp.company}</p>
                        </div>
                        <span className="font-mono text-xs text-slate-500 bg-slate-900 px-3 py-1 rounded border border-slate-800">
                          {exp.dates}
                        </span>
                      </div>
                      
                      <ul className="space-y-3 relative z-10">
                        {exp.bullets.map((bullet, j) => (
                          <li key={j} className="text-slate-400 text-sm leading-relaxed flex gap-3">
                            <ChevronRight size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span>
                              {bullet.split(/(\d+(?:\.\d+)?%|\d+(?:,\d+)?\+?)/g).map((part, k) => 
                                /(\d+(?:\.\d+)?%|\d+(?:,\d+)?\+?)/.test(part) ? 
                                <span key={k} className="text-emerald-300 font-bold bg-emerald-500/10 px-1 rounded">{part}</span> : part
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 4. NEON DATA CHIP PROJECTS */}
            <section id="projects" className="scroll-mt-24">
              <h2 className="text-4xl font-black text-white mb-12 tracking-tight uppercase flex items-center gap-4">
                <span className="w-8 h-1 bg-teal-500" /> Project Modules
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {data.projects.map((proj, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="group glass-panel rounded-2xl border-slate-800 hover:border-teal-500/50 overflow-hidden flex flex-col h-full relative"
                  >
                    <div className="h-2 w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-400 transition-all" />
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors w-5/6">
                          {proj.title}
                        </h3>
                        <ExternalLink size={20} className="text-slate-600 group-hover:text-teal-400 transition-colors" />
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {proj.stack.map(tech => (
                          <span key={tech} className="text-[10px] uppercase font-mono tracking-widest px-2 py-1 bg-slate-900 border border-slate-700 text-teal-400 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <ul className="space-y-3 mt-auto">
                        {proj.bullets.map((bullet, j) => (
                          <li key={j} className="text-sm text-slate-400 flex gap-2">
                            <span className="text-teal-500/50 block mt-1">•</span>
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 5. EDUCATION & SYSTEM CERTS */}
            <section id="education" className="scroll-mt-24 pb-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                   <h2 className="text-2xl font-black text-white mb-8 tracking-tight uppercase flex items-center gap-4">
                    <span className="w-4 h-1 bg-emerald-500" /> Education
                  </h2>
                  <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i} className="p-6 glass-panel rounded-xl border border-slate-800">
                        <h4 className="text-lg font-bold text-white mb-1">{edu.degree}</h4>
                        <p className="text-slate-400 text-sm mb-3">{edu.institution}</p>
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-emerald-500">{edu.dates}</span>
                          <span className="bg-emerald-500/10 text-emerald-300 px-2 py-1 rounded">{edu.details}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                   <h2 className="text-2xl font-black text-white mb-8 tracking-tight uppercase flex items-center gap-4">
                    <span className="w-4 h-1 bg-teal-500" /> Certifications
                  </h2>
                  <div className="space-y-3">
                    {data.certifications.map((cert, i) => (
                      <div key={i} className="p-4 glass-panel rounded-xl border border-slate-800 flex items-center gap-4 hover:border-teal-500/30 transition-colors">
                        <div className="w-8 h-8 rounded bg-teal-500/10 flex items-center justify-center shrink-0">
                          <GraduationCap size={16} className="text-teal-400" />
                        </div>
                        <span className="text-sm text-slate-300 font-medium">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

          </div>
        </main>
      )}
    </>
  );
}