"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, Terminal, Briefcase, Code2, GraduationCap, 
  ChevronRight, Github, Linkedin, Cpu, Database, 
  BarChart3, Table, Workflow, Network, 
  BrainCircuit, LineChart, Code, ChevronDown, Mail
} from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";
import { data } from "../data/resume"; 

const parseSkill = (rawString: string, categoryName: string) => {
  const match = rawString.match(/^(.*?)(?:\s*\((.*?)\))?$/);
  const title = match?.[1]?.trim() || rawString;
  const subtitle = match?.[2]?.trim() || categoryName;
  return { title, subtitle };
};

const getSkillBrandIcon = (title: string) => {
  const t = title.toLowerCase();
  if(t.includes('python')) return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-6 h-6" alt="Python" />;
  if(t.includes('postgresql')) return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" className="w-6 h-6" alt="PostgreSQL" />;
  if(t.includes('mysql') || t === 'sql') return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" className="w-6 h-6" alt="MySQL" />;
  if(t.includes('azure')) return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" className="w-6 h-6" alt="Azure" />;
  if(t.includes('git') && !t.includes('github')) return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" className="w-6 h-6" alt="Git" />;
  if(t.includes('jupyter')) return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" className="w-6 h-6" alt="Jupyter" />;
  if(t.includes('github')) return <Github className="w-6 h-6 text-zinc-100" />;
  if(t.includes('power bi') || t.includes('tableau')) return <BarChart3 className="w-6 h-6 text-amber-500" />;
  if(t.includes('excel')) return <Table className="w-6 h-6 text-emerald-500" />;
  if(t.includes('etl') || t.includes('pipeline')) return <Workflow className="w-6 h-6 text-orange-400" />;
  if(t.includes('data model') || t.includes('transform')) return <Network className="w-6 h-6 text-purple-400" />;
  if(t.includes('predictive') || t.includes('ai')) return <BrainCircuit className="w-6 h-6 text-rose-400" />;
  if(t.includes('analysis') || t.includes('eda')) return <LineChart className="w-6 h-6 text-emerald-400" />;
  if(t.includes('database')) return <Database className="w-6 h-6 text-blue-400" />;
  return <Code className="w-6 h-6 text-zinc-400" />;
};

// --- PREMIUM ANIMATION SETTINGS ---
const premiumEasing = [0.16, 1, 0.3, 1]; // Apple-like smooth glide

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEasing } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardHover = {
  rest: { y: 0, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
  hover: { 
    y: -8, 
    boxShadow: "0px 20px 40px rgba(212, 175, 55, 0.08)",
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [expandedProjects, setExpandedProjects] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleProject = (index: number) => {
    setExpandedProjects(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      <AnimatedBackground />
      <AnimatePresence>
        {loading && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: premiumEasing } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: premiumEasing }}
              className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-600 tracking-tighter mb-8"
            >
              INITIALIZING...
            </motion.div>
            <div className="w-64 h-[2px] bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-amber-400 shadow-[0_0_20px_#d4af37]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <main className="relative z-10 w-full px-4 pb-40 pt-12 md:px-8">
          
          {/* FLOATING DOCK */}
          <motion.div 
            initial={{ y: 100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 left-1/2 z-50 flex items-center gap-2 md:gap-4 px-4 md:px-6 py-3 rounded-full border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl bg-black/60"
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
                className={`relative group p-3 rounded-full transition-all duration-300 ${activeTab === nav.id ? "bg-amber-500/10 text-amber-400" : "text-zinc-500 hover:text-amber-300 hover:bg-white/5"}`}
              >
                {nav.icon}
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all bg-zinc-900 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 shadow-xl whitespace-nowrap">
                  {nav.label}
                </span>
              </button>
            ))}
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-40">
            
            {/* 1. HERO */}
            <section id="home" className="min-h-[85vh] flex flex-col justify-center items-center text-center relative pt-10">
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: premiumEasing }} className="text-zinc-500 font-semibold tracking-[0.2em] uppercase text-xs md:text-sm mb-6 flex items-center gap-2 z-10">
                BASED IN {data.basics.location.toUpperCase()}
              </motion.span>

              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: premiumEasing }}
                className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight leading-tight mb-8 z-10"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-600 pb-4 drop-shadow-sm">
                  {data.basics.title.split(' | ')[0]}
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: premiumEasing }} className="text-zinc-400 font-light text-base md:text-lg max-w-3xl leading-relaxed mb-4 z-10">
                Hi, I'm <span className="font-semibold text-zinc-100">{data.basics.name}</span>. A dedicated data professional extracting, transforming, and analyzing complex datasets to build robust, data-driven solutions.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: premiumEasing }} className="flex flex-col items-center justify-center gap-8 mt-10 z-10 w-full">
                <a 
                  href="/resume.pdf" 
                  download="Vikas_Morabagi_Resume.pdf"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 text-black font-bold tracking-widest uppercase rounded-full shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all flex items-center gap-3"
                >
                  DOWNLOAD RESUME <Download size={18} />
                </a>
                
                <div className="flex items-center justify-center w-full max-w-[320px] gap-6 mt-2">
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-amber-500/30"></div>
                  <div className="flex items-center gap-5">
                    <a href={`mailto:${data.basics.email}`} className="text-zinc-500 hover:text-amber-400 transition-colors"><Mail size={24} /></a>
                    <a href={`https://${data.basics.links[1].url}`} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-amber-400 transition-colors"><Github size={24} /></a>
                    <a href={`https://${data.basics.links[0].url}`} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-amber-400 transition-colors"><Linkedin size={24} /></a>
                  </div>
                  <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-amber-500/30"></div>
                </div>
              </motion.div>
            </section>

            {/* 2. ABOUT ME */}
            <motion.section id="about" className="scroll-mt-24" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <motion.div variants={fadeInUp} className="mb-12 border-b border-white/5 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight uppercase flex items-center gap-4">
                  <Terminal className="text-amber-500 h-10 w-10" /> About Me
                </h2>
              </motion.div>

              <motion.div variants={fadeInUp} className="rounded-2xl bg-gradient-to-br from-zinc-900/40 to-black/60 backdrop-blur-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="bg-black/40 border-b border-white/5 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-800" />
                    <div className="w-3 h-3 rounded-full bg-zinc-800" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_#d4af37]" />
                  </div>
                  <span className="ml-4 text-xs text-zinc-600 font-mono flex-1 text-center pr-12">System.Info</span>
                </div>
                
                <div className="p-8 md:p-12 text-sm md:text-base leading-relaxed">
                  <h3 className="text-amber-500/80 font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-xs">
                    <span className="w-8 h-[1px] bg-amber-500/50" /> Professional Summary
                  </h3>
                  <p className="text-zinc-300 font-sans leading-loose text-lg font-light">{data.basics.summary}</p>
                </div>
              </motion.div>
            </motion.section>

            {/* 3. INTERNSHIP */}
            <motion.section id="experience" className="scroll-mt-24" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <motion.div variants={fadeInUp} className="mb-12 border-b border-white/5 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight uppercase flex items-center gap-4">
                  <Briefcase className="text-amber-500 h-10 w-10" /> Internship
                </h2>
              </motion.div>

              <div className="relative border-l border-white/10 ml-4 md:ml-0 space-y-12 pl-8 md:pl-12">
                {data.experience.map((exp, i) => (
                  <motion.div key={i} variants={fadeInUp} className="relative group">
                    <div className="absolute -left-[37px] md:-left-[53px] top-1 w-3 h-3 rounded-full bg-black border-2 border-amber-500 group-hover:shadow-[0_0_15px_#d4af37] transition-all" />
                    
                    <motion.div variants={cardHover} initial="rest" whileHover="hover" className="bg-gradient-to-br from-zinc-900/40 to-black/60 backdrop-blur-2xl p-8 rounded-2xl border border-white/5 relative overflow-hidden">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 relative z-10">
                        <div>
                          <h3 className="text-2xl font-bold text-zinc-100 tracking-tight">{exp.role}</h3>
                          <p className="text-amber-500/80 font-medium text-sm mt-1">{exp.company}</p>
                        </div>
                        <span className="font-mono text-xs text-zinc-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                          {exp.dates}
                        </span>
                      </div>
                      
                      <ul className="space-y-4 relative z-10">
                        {exp.bullets.map((bullet, j) => (
                          <li key={j} className="text-zinc-400 text-sm leading-relaxed flex gap-4">
                            <ChevronRight size={16} className="text-amber-500 shrink-0 mt-0.5 opacity-70" />
                            <span className="font-light">
                              {bullet.split(/(\d+(?:\.\d+)?%|\d+(?:,\d+)?\+?)/g).map((part, k) => 
                                /(\d+(?:\.\d+)?%|\d+(?:,\d+)?\+?)/.test(part) ? 
                                <span key={k} className="text-amber-300 font-medium px-1 rounded">{part}</span> : part
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 4. PROJECTS */}
            <motion.section id="projects" className="scroll-mt-24" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <motion.div variants={fadeInUp} className="mb-12 border-b border-white/5 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight uppercase flex items-center gap-4">
                  <Code2 className="text-amber-500 h-10 w-10" /> Projects
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {data.projects.map((proj, i) => {
                  const projectLink = (proj as any).link || `https://${data.basics.links[1].url}`;
                  const isExpanded = expandedProjects[i] || false;

                  return (
                    <motion.div key={i} variants={fadeInUp}>
                      <motion.div variants={cardHover} initial="rest" whileHover="hover" className="group bg-gradient-to-br from-zinc-900/40 to-black/60 backdrop-blur-2xl rounded-2xl border border-white/5 overflow-hidden flex flex-col h-fit relative">
                        {proj.image && (
                          <div className="w-full h-48 md:h-56 overflow-hidden relative border-b border-white/5 shrink-0">
                            <div className="absolute inset-0 bg-black" />
                            <img src={proj.image} alt={proj.title} className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 relative z-10" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                          </div>
                        )}

                        <div className="p-8 flex flex-col flex-grow relative z-20">
                          <div className="flex justify-between items-start mb-6 gap-4">
                            <h3 className="text-xl font-bold text-zinc-100">{proj.title}</h3>
                            <a href={projectLink} target="_blank" rel="noreferrer" title="View Repository" className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-400 text-zinc-400 transition-all shrink-0">
                              <Github size={18} />
                            </a>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-8">
                            {proj.stack.map(tech => (
                              <span key={tech} className="text-[10px] uppercase font-mono tracking-widest px-3 py-1 bg-white/5 border border-white/10 text-amber-500/80 rounded-full">
                                {tech}
                              </span>
                            ))}
                          </div>

                          <button onClick={() => toggleProject(i)} className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-amber-400 transition-colors mt-auto font-bold w-fit">
                            {isExpanded ? "Hide Details" : "View Details"}
                            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}><ChevronDown size={16} /></motion.div>
                          </button>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: premiumEasing }} className="overflow-hidden">
                                <ul className="space-y-4 mt-6 pt-6 border-t border-white/5">
                                  {proj.bullets.map((bullet, j) => (
                                    <li key={j} className="text-sm text-zinc-400 flex gap-4 font-light leading-relaxed">
                                      <span className="text-amber-500/50 block mt-1 shrink-0">•</span>
                                      <span>{bullet}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.section>

            {/* 5. SKILLS */}
            <motion.section id="skills" className="scroll-mt-24" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <motion.div variants={fadeInUp} className="mb-12 border-b border-white/5 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight flex flex-col gap-2">
                  <span className="flex items-center gap-4 uppercase"><Cpu className="text-amber-500 h-10 w-10" /> Tech Stack</span>
                  <span className="text-base font-light text-zinc-500 tracking-normal mt-2 max-w-2xl">Proficient in modern technologies that empower me to build highly functional, data-driven solutions.</span>
                </h2>
              </motion.div>

              <div className="space-y-12">
                {data.skills.map((skillGrp, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <h4 className="text-zinc-500 font-mono mb-6 text-sm uppercase tracking-widest flex items-center gap-4">
                      <span className="w-8 h-[1px] bg-zinc-800" /> {skillGrp.category}
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {skillGrp.items.map((item, j) => {
                        const { title, subtitle } = parseSkill(item, skillGrp.category);
                        return (
                          <motion.div key={j} variants={cardHover} initial="rest" whileHover="hover" className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-zinc-900/40 to-black/60 border border-white/5 transition-all duration-300 group cursor-default">
                            <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center shrink-0 border border-white/5 group-hover:border-amber-500/30 transition-colors">
                              {getSkillBrandIcon(title)}
                            </div>
                            <div className="flex flex-col overflow-hidden">
                              <span className="text-sm font-bold text-zinc-100 truncate group-hover:text-amber-400 transition-colors">{title}</span>
                              <span className="text-[11px] text-zinc-500 truncate mt-0.5 font-light tracking-wide">{subtitle}</span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 6. EDUCATION & CERTS */}
            <motion.section id="education" className="scroll-mt-24 pb-20" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <motion.div variants={fadeInUp} className="mb-12 border-b border-white/5 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight uppercase flex items-center gap-4">
                  <GraduationCap className="text-amber-500 h-10 w-10" /> Education
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                <motion.div variants={fadeInUp}>
                   <h3 className="text-amber-500/80 font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-xs">
                    <span className="w-8 h-[1px] bg-amber-500/50" /> Academics
                  </h3>
                  <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <motion.div key={i} variants={cardHover} initial="rest" whileHover="hover" className="p-8 bg-gradient-to-br from-zinc-900/40 to-black/60 backdrop-blur-2xl rounded-2xl border border-white/5">
                        <h4 className="text-lg font-bold text-zinc-100 mb-2">{edu.degree}</h4>
                        <p className="text-zinc-400 text-sm mb-6 font-light">{edu.institution}</p>
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-zinc-500">{edu.dates}</span>
                          <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full border border-amber-500/20">{edu.details}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                   <h3 className="text-amber-500/80 font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-xs">
                    <span className="w-8 h-[1px] bg-amber-500/50" /> Certifications
                  </h3>
                  <div className="space-y-4">
                    {data.certifications.map((cert, i) => (
                      <motion.div key={i} variants={cardHover} initial="rest" whileHover="hover" className="p-5 bg-gradient-to-br from-zinc-900/40 to-black/60 backdrop-blur-2xl rounded-2xl border border-white/5 flex items-center gap-5">
                        <div className="w-10 h-10 rounded-full bg-black border border-white/5 flex items-center justify-center shrink-0">
                          <GraduationCap size={18} className="text-amber-500/70" />
                        </div>
                        <span className="text-sm text-zinc-300 font-light leading-relaxed">{cert}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.section>

          </div>
        </main>
      )}
    </>
  );
}