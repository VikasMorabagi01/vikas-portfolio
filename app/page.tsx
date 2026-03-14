"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";
import { data } from "../data/resume"; 

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("about");

  // Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll Spy Logic for Desktop Navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "projects", "skills"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
              className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-300 tracking-tighter mb-8"
            >
              VM
            </motion.div>
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-4">
            
            {/* LEFT SIDE: Sticky Sidebar (Header, Nav, Socials) */}
            <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl"
                >
                  {data.basics.name}
                </motion.h1>
                <motion.h2 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-3 text-lg font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 sm:text-xl"
                >
                  {data.basics.title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 max-w-xs leading-normal text-slate-400"
                >
                  Transforming complex datasets into actionable business intelligence.
                </motion.p>

                {/* Desktop Navigation */}
                <nav className="nav hidden lg:block mt-16">
                  <ul className="mt-8 w-max">
                    {["about", "experience", "projects", "skills"].map((item) => (
                      <li key={item}>
                        <a 
                          href={`#${item}`} 
                          className={`group flex items-center py-3 ${activeSection === item ? "text-emerald-400" : "text-slate-500 hover:text-slate-200"} transition-all`}
                        >
                          <span className={`mr-4 h-px transition-all bg-emerald-400 group-hover:w-16 group-hover:bg-slate-200 ${activeSection === item ? "w-16" : "w-8 bg-slate-600"}`}></span>
                          <span className="text-xs font-bold uppercase tracking-widest">{item}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Contact & Social Links (Bottom Left) */}
              <motion.ul 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="ml-1 mt-8 flex items-center gap-6 text-slate-400"
              >
                <li>
                  <a href={`https://${data.basics.links.find(l => l.name === 'GitHub')?.url}`} target="_blank" rel="noreferrer" className="block hover:text-emerald-400 transition-colors">
                    <Github className="h-6 w-6" />
                  </a>
                </li>
                <li>
                  <a href={`https://${data.basics.links.find(l => l.name === 'LinkedIn')?.url}`} target="_blank" rel="noreferrer" className="block hover:text-emerald-400 transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                </li>
                <li>
                  <a href={`mailto:${data.basics.email}`} className="block hover:text-emerald-400 transition-colors">
                    <Mail className="h-6 w-6" />
                  </a>
                </li>
                <li>
                  <button onClick={() => window.print()} className="flex items-center gap-2 text-sm font-medium hover:text-emerald-400 transition-colors px-3 py-1 rounded-full border border-slate-700 hover:border-emerald-500/50">
                    Resume <Download className="h-4 w-4" />
                  </button>
                </li>
              </motion.ul>
            </header>

            {/* RIGHT SIDE: Scrolling Content */}
            <main id="content" className="pt-24 lg:w-[52%] lg:py-24 flex flex-col gap-24">
              
              {/* ABOUT SECTION */}
              <section id="about" className="scroll-mt-16 lg:scroll-mt-24 text-slate-400 leading-relaxed">
                <p className="mb-4">{data.basics.summary}</p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {data.achievements.slice(0, 4).map((ach, i) => (
                    <div key={i} className="glass-panel p-4 rounded-xl flex flex-col">
                      <span className="text-2xl font-bold text-emerald-400 mb-1">{ach.metric}</span>
                      <span className="text-xs text-slate-500 leading-tight">{ach.context.substring(0, 60)}...</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* EXPERIENCE SECTION */}
              <section id="experience" className="scroll-mt-16 lg:scroll-mt-24">
                <ol className="group/list">
                  {data.experience.map((exp, i) => (
                    <li key={i} className="mb-12 transition-all hover:!opacity-100 group-hover/list:opacity-50">
                      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg lg:hover:bg-slate-800/50 lg:p-6 lg:-m-6 lg:rounded-2xl">
                        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                          {exp.dates}
                        </header>
                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-200">
                            <div>
                              <span className="text-emerald-400">{exp.role}</span>
                              <span className="text-slate-500"> · {exp.company}</span>
                            </div>
                          </h3>
                          <ul className="mt-4 text-sm text-slate-400 space-y-3">
                            {exp.bullets.map((bullet, j) => (
                              <li key={j} className="flex gap-2">
                                <span className="text-emerald-500/50">▹</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* PROJECTS SECTION */}
              <section id="projects" className="scroll-mt-16 lg:scroll-mt-24">
                <ol className="group/list">
                  {data.projects.map((proj, i) => (
                    <li key={i} className="mb-12 transition-all hover:!opacity-100 group-hover/list:opacity-50">
                      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg lg:hover:bg-slate-800/50 lg:p-6 lg:-m-6 lg:rounded-2xl">
                        <div className="z-10 sm:col-span-8">
                          <h3 className="font-medium leading-snug text-slate-200 mb-2 flex items-center gap-2">
                            <span className="text-emerald-400">{proj.title}</span>
                            <ExternalLink size={14} className="text-slate-500" />
                          </h3>
                          <p className="mt-2 text-sm text-slate-400 leading-normal">
                            {proj.bullets[0]}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {proj.stack.map((tech) => (
                              <div key={tech} className="flex items-center rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                {tech}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* SKILLS SECTION */}
              <section id="skills" className="scroll-mt-16 lg:scroll-mt-24 mb-24">
                <div className="grid gap-6">
                  {data.skills.map((skillGrp, i) => (
                    <div key={i}>
                      <h4 className="text-slate-200 font-semibold mb-3 text-sm">{skillGrp.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGrp.items.map((item, j) => (
                          <span key={j} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-400 hover:text-emerald-300 hover:border-emerald-500/30 transition-colors">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </main>
          </div>
        </div>
      )}
    </>
  );
}