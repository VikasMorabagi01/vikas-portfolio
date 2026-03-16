"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Terminal, Briefcase, Code2, GraduationCap, ChevronRight, Github, Linkedin, Cpu } from "lucide-react";
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
              className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-300 tracking-tighter mb-8"
            >
              INITIALIZING...
            </motion.div>
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-amber-500 shadow-[0_0_15px_#f59e0b]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <main className="relative z-10 w-full px-4 pb-40 pt-12 md:px-8">
          
          {/* FLOATING MAC-STYLE DOCK */}
          <motion.div 
            initial={{ y: 100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 left-1/2 z-50 flex items-center gap-4 px-6 py-4 glass-panel rounded-full border border-amber-500/20 shadow-[0_10px_40px_rgba(245,158,11,0.15)] backdrop-blur-md bg-slate-950/80"
          >
            {[
              { id: 'home', icon: <Terminal size={22} />, label: "Home" },
              { id: 'experience', icon: <Briefcase size={22} />, label: "Internship" },
              { id: 'projects', icon: <Code2 size={22} />, label: "Projects" },
              { id: 'skills', icon: <Cpu size={22} />, label: "Skills" },
              { id: 'education', icon: <GraduationCap size={22} />, label: "Education" },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => scrollTo(nav.id)}
                className={`relative group p-3 rounded-full transition-all ${activeTab === nav.id ? "bg-amber-500/20 text-amber-400" : "text-slate-400 hover:text-amber-300 hover:bg-white/5"}`}
              >
                {nav.icon}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all bg-slate-800 text-amber-400 text-xs font-bold px-3 py-1 rounded-md border border-amber-500/30">
                  {nav.label}
                </span>
              </button>
            ))}
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-40">
            
            {/* 1. CINEMATIC HERO */}
            <section id="home" className="min-h-[85vh] flex flex-col justify-center items-center text-center relative pt-10">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_0%,transparent_50%)] pointer-events-none" />
              
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-amber-400 font-mono tracking-[0.3em] uppercase text-sm mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" /> {data.basics.title.split(' | ')[0]} _
              </motion.span>

              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-4"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-700 block">VIKAS</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-t from-amber-500 to-yellow-200 block -mt-4 md:-mt-8 lg:-mt-12">MORABAGI</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex gap-4 mt-8 z-10 items-center">
                <a 
                  href="/resume.pdf" 
                  download="Vikas_Morabagi_Resume.pdf"
                  className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold tracking-wide rounded-none border border-amber-400 shadow-[4px_4px_0_#fbbf24] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#fbbf24] transition-all flex items-center gap-2"
                >
                  DOWNLOAD RESUME <Download size={18} />
                </a>
                
                <a href={`https://${data.basics.links[0].url}`} target="_blank" rel="noreferrer" className="p-4 rounded-full glass-panel border-slate-700 hover:border-amber-500 text-slate-300 hover:text-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all">
                  <Linkedin size={26} />
                </a>
                <a href={`https://${data.basics.links[1].url}`} target="_blank" rel="noreferrer" className="p-4 rounded-full glass-panel border-slate-700 hover:border-amber-500 text-slate-300 hover:text-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all">
                  <Github size={26} />
                </a>
              </motion.div>
            </section>

            {/* 2. ABOUT ME */}
            <section className="scroll-mt-24">
              <div className="mb-12 border-b border-amber-500/20 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase flex items-center gap-4">
                  <Terminal className="text-amber-500 h-10 w-10" /> About Me
                </h2>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-xl bg-[#0a0f16] border border-slate-800 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.05)]"
              >
                <div className="bg-[#111823] border-b border-slate-800 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-orange-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  </div>
                  <span className="ml-4 text-xs text-slate-500 font-mono flex-1 text-center pr-12">Profile Overview</span>
                </div>
                
                <div className="p-6 md:p-8 text-sm md:text-base leading-relaxed">
                  <h3 className="text-amber-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 bg-amber-500 animate-pulse" /> Professional Summary
                  </h3>
                  <p className="text-slate-300 mb-12 font-mono leading-loose">{data.basics.summary}</p>
                  
                  <h3 className="text-yellow-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 bg-yellow-500 animate-pulse" /> Key Achievements
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {data.achievements.slice(0, 4).map((ach, i) => (
                      <div key={i} className="border border-slate-800 bg-slate-900/50 p-4 rounded text-center hover:border-amber-500/30 transition-colors flex flex-col justify-center h-full">
                        <div className="text-2xl font-black text-amber-400 mb-2">{ach.metric}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest line-clamp-3 leading-snug" title={ach.context}>
                          {ach.context}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>

            {/* 3. INTERNSHIP */}
            <section id="experience" className="scroll-mt-24">
              <div className="mb-12 border-b border-amber-500/20 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase flex items-center gap-4">
                  <Briefcase className="text-amber-500 h-10 w-10" /> Internship
                </h2>
              </div>

              <div className="relative border-l-2 border-slate-800 ml-4 md:ml-0 space-y-12 pl-8 md:pl-12">
                {data.experience.map((exp, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="absolute -left-[43px] md:-left-[59px] top-1 w-5 h-5 rounded-full bg-slate-950 border-4 border-amber-500 group-hover:shadow-[0_0_15px_#f59e0b] transition-all" />
                    
                    <div className="glass-panel p-8 rounded-2xl border border-slate-800 group-hover:border-amber-500/50 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 relative z-10">
                        <div>
                          <h3 className="text-2xl font-bold text-white tracking-tight">{exp.role}</h3>
                          <p className="text-amber-400 font-mono text-sm mt-1">{exp.company}</p>
                        </div>
                        <span className="font-mono text-xs text-slate-500 bg-slate-900 px-3 py-1 rounded border border-slate-800">
                          {exp.dates}
                        </span>
                      </div>
                      
                      <ul className="space-y-3 relative z-10">
                        {exp.bullets.map((bullet, j) => (
                          <li key={j} className="text-slate-400 text-sm leading-relaxed flex gap-3">
                            <ChevronRight size={16} className="text-amber-500 shrink-0 mt-0.5" />
                            <span>
                              {bullet.split(/(\d+(?:\.\d+)?%|\d+(?:,\d+)?\+?)/g).map((part, k) => 
                                /(\d+(?:\.\d+)?%|\d+(?:,\d+)?\+?)/.test(part) ? 
                                <span key={k} className="text-amber-300 font-bold bg-amber-500/10 px-1 rounded">{part}</span> : part
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

            {/* 4. PROJECTS */}
            <section id="projects" className="scroll-mt-24">
              <div className="mb-12 border-b border-yellow-500/20 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase flex items-center gap-4">
                  <Code2 className="text-yellow-500 h-10 w-10" /> Projects
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {data.projects.map((proj, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="group glass-panel rounded-2xl border-slate-800 hover:border-yellow-500/50 overflow-hidden flex flex-col h-full relative"
                  >
                    <div className="h-2 w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-yellow-400 transition-all z-20 relative" />
                    
                    {/* NEW IMAGE CONTAINER */}
                    {proj.image && (
                      <div className="w-full h-48 md:h-56 overflow-hidden relative border-b border-slate-800">
                        {/* Fallback gray background while image loads */}
                        <div className="absolute inset-0 bg-slate-900" />
                        <img 
                          src={proj.image} 
                          alt={proj.title}
                          className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 relative z-10"
                        />
                        {/* Gradient overlay to blend image into the card */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] via-transparent to-transparent z-10" />
                      </div>
                    )}

                    <div className="p-8 flex flex-col flex-grow relative z-20">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors w-full">
                          {proj.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {proj.stack.map(tech => (
                          <span key={tech} className="text-[10px] uppercase font-mono tracking-widest px-2 py-1 bg-slate-900 border border-slate-700 text-yellow-400 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <ul className="space-y-3 mt-auto">
                        {proj.bullets.map((bullet, j) => (
                          <li key={j} className="text-sm text-slate-400 flex gap-2">
                            <span className="text-yellow-500/50 block mt-1">•</span>
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 5. SKILLS */}
            <section id="skills" className="scroll-mt-24">
              <div className="mb-12 border-b border-amber-500/20 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase flex items-center gap-4">
                  <Cpu className="text-amber-500 h-10 w-10" /> Skills
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {data.skills.map((skillGrp, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-amber-500/30 transition-colors"
                  >
                    <h4 className="text-amber-400 font-mono mb-4 text-sm uppercase tracking-widest flex items-center gap-2">
                      <span className="text-slate-600">{'//'}</span> {skillGrp.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGrp.items.map((item, j) => (
                        <span key={j} className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-amber-500/50 hover:text-amber-300 rounded text-sm text-slate-300 font-medium transition-colors cursor-default">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 6. EDUCATION & CERTS */}
            <section id="education" className="scroll-mt-24">
              <div className="mb-12 border-b border-yellow-500/20 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase flex items-center gap-4">
                  <GraduationCap className="text-yellow-500 h-10 w-10" /> Education & Certs
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                   <h3 className="text-xl font-bold text-slate-300 mb-6 tracking-tight uppercase">
                    Education
                  </h3>
                  <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i} className="p-6 glass-panel rounded-xl border border-slate-800 hover:border-yellow-500/30 transition-all">
                        <h4 className="text-lg font-bold text-white mb-1">{edu.degree}</h4>
                        <p className="text-slate-400 text-sm mb-4">{edu.institution}</p>
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-yellow-500">{edu.dates}</span>
                          <span className="bg-yellow-500/10 text-yellow-300 px-2 py-1 rounded">{edu.details}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                   <h3 className="text-xl font-bold text-slate-300 mb-6 tracking-tight uppercase">
                    Certifications
                  </h3>
                  <div className="space-y-3">
                    {data.certifications.map((cert, i) => (
                      <div key={i} className="p-4 glass-panel rounded-xl border border-slate-800 flex items-center gap-4 hover:border-yellow-500/30 transition-colors">
                        <div className="w-8 h-8 rounded bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                          <GraduationCap size={16} className="text-yellow-400" />
                        </div>
                        <span className="text-sm text-slate-300 font-medium leading-snug">{cert}</span>
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