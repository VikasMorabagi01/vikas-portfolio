"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown, Database, LayoutDashboard, BrainCircuit, ExternalLink, Code } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";
import { data } from "../data/resume"; // Assuming JSON is saved in data/resume.json

export default function Portfolio() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Splash screen timer 1.5s
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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
              className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300 tracking-tighter mb-8"
            >
              VM
            </motion.div>
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-32">
          
          {/* HERO SECTION */}
          <section className="min-h-[80vh] flex flex-col justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-blue-400 font-medium tracking-wide mb-4">HELLO, I'M</h2>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                {data.basics.name}
              </h1>
              <h3 className="text-2xl md:text-4xl font-semibold mb-8 text-gradient">
                {data.basics.title}
              </h3>
              <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed mb-10">
                {data.basics.summary}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#experience" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center gap-2">
                  View Experience <ChevronDown size={20} />
                </a>
                <button onClick={() => window.print()} className="px-8 py-4 glass-panel hover:bg-white/10 text-white font-medium rounded-full transition-all flex items-center gap-2">
                  Download Resume <Download size={20} />
                </button>
              </div>
            </motion.div>
          </section>

          {/* IMPACT BANNER */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.achievements.slice(0, 4).map((ach, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center group hover:border-blue-500/50 transition-colors"
              >
                <span className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{ach.metric}</span>
                <span className="text-xs text-slate-400">{ach.context.substring(0, 60)}...</span>
              </motion.div>
            ))}
          </section>

          {/* EXPERIENCE SECTION */}
          <section id="experience" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <LayoutDashboard className="text-blue-500" /> Professional Experience
            </h2>
            <div className="space-y-8">
              {data.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-panel rounded-3xl p-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
                  <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                      <p className="text-lg text-blue-400">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="px-4 py-1.5 mt-4 md:mt-0 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300">
                      {exp.dates}
                    </span>
                  </div>
                  <ul className="space-y-4">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-4 text-slate-300">
                        <span className="text-blue-500 mt-1">▹</span>
                        <span className="leading-relaxed">
                          {/* Highlight metrics automatically */}
                          {bullet.split(/(\d+(?:\.\d+)?%|\d+(?:,\d+)?\+?)/g).map((part, k) => 
                            /(\d+(?:\.\d+)?%|\d+(?:,\d+)?\+?)/.test(part) ? 
                            <span key={k} className="text-blue-300 font-bold bg-blue-500/10 px-1 rounded">{part}</span> : part
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section id="projects" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <Database className="text-blue-500" /> Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {data.projects.map((proj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="glass-panel rounded-3xl p-8 flex flex-col h-full"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                    {proj.title}
                    <ExternalLink size={18} className="text-slate-500" />
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.stack.map(tech => (
                      <span key={tech} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-blue-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-3 flex-grow">
                    {proj.bullets.map((bullet, j) => (
                      <li key={j} className="text-sm text-slate-400 flex gap-2">
                        <span className="text-blue-500/50 mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* SKILLS SECTION */}
          <section>
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <Code className="text-blue-500" /> Technical Arsenal
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.skills.map((skillGrp, i) => (
                <div key={i} className="glass-panel rounded-2xl p-6">
                  <h4 className="text-blue-400 font-semibold mb-4 text-sm uppercase tracking-wider">{skillGrp.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGrp.items.map((item, j) => (
                      <span key={j} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 transition-colors border border-white/5 rounded-lg text-sm text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION & CERTIFICATIONS */}
          <section className="grid md:grid-cols-2 gap-12 pb-24">
            <div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <BrainCircuit className="text-blue-500" /> Education
              </h2>
              <div className="space-y-6 border-l border-white/10 ml-3 pl-6">
                {data.education.map((edu, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
                    <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                    <p className="text-slate-400 text-sm my-1">{edu.institution}</p>
                    <div className="flex gap-4 text-xs font-medium text-blue-400">
                      {edu.dates && <span>{edu.dates}</span>}
                      <span>{edu.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-8">Certifications</h2>
              <ul className="space-y-4">
                {data.certifications.map((cert, i) => (
                  <li key={i} className="glass-panel p-4 rounded-xl text-sm text-slate-300 flex items-start gap-3">
                    <div className="w-2 h-2 mt-1.5 bg-blue-400 rounded-full" />
                    {cert}
                  </li>
                ))}
              </ul>
              
              <div className="mt-12 flex flex-col gap-2 text-sm text-slate-500 border-t border-white/10 pt-8">
                <p>📞 {data.basics.phone} | ✉️ {data.basics.email}</p>
                <div className="flex gap-4">
                  {data.basics.links.map(link => (
                    <a key={link.name} href={`https://${link.url}`} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </main>
      )}
    </>
  );
}