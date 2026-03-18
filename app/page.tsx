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
  if(t.includes('power bi') || t.includes('tableau')) return <BarChart3 className="w-6 h-6 text-yellow-500" />;
  if(t.includes('excel')) return <Table className="w-6 h-6 text-emerald-500" />;
  if(t.includes('etl') || t.includes('pipeline')) return <Workflow className="w-6 h-6 text-orange-400" />;
  if(t.includes('data model') || t.includes('transform')) return <Network className="w-6 h-6 text-purple-400" />;
  if(t.includes('predictive') || t.includes('ai')) return <BrainCircuit className="w-6 h-6 text-rose-400" />;
  if(t.includes('analysis') || t.includes('eda')) return <LineChart className="w-6 h-6 text-emerald-400" />;
  if(t.includes('database')) return <Database className="w-6 h-6 text-blue-400" />;
  return <Code className="w-6 h-6 text-zinc-400" />;
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
    setExpandedProjects(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500 tracking-tighter mb-8"
            >
              INITIALIZING...
            </motion.div>
            <div className="w-64 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
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
          
          {/* FLOATING MAC-STYLE DOCK */}
          <motion.div 
            initial={{ y: 100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 left-1/2 z-50 flex items-center gap-2 md:gap-4 px-4 md:px-6 py-3 rounded-full border border-zinc-800/80 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl bg-zinc-950/80"
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
                className={`relative group p-3 rounded-full transition-all duration-300 ${activeTab === nav.id ? "bg-amber-500/10 text-amber-400" : "text-zinc-400 hover:text-amber-300 hover:bg-white/5"}`}
              >
                {nav.icon}
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all bg-zinc-900 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-zinc-800 shadow-xl whitespace-nowrap">
                  {nav.label}
                </span>
              </button>
            ))}
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-40">
            
            {/* 1. CINEMATIC HERO */}
            <section id="home" className="min-h-[85vh] flex flex-col justify-center items-center text-center relative pt-10">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_60%)] pointer-events-none" />
              
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-amber-400 font-mono tracking-[0.3em] uppercase text-xs md:text-sm mb-6 flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse shadow-[0_0_10px_#d4af37]" /> {data.basics.title.split(' | ')[0]}
              </motion.span>

              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-4"
              >
                <span className="text-zinc-100 block">VIKAS</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-t from-amber-500 via-amber-200 to-amber-100 block -mt-4 md:-mt-8 lg:-mt-12">MORABAGI</span>
              </motion.h1>

              {/* UPDATED HERO CTA SECTION */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col items-center justify-center gap-8 mt-10 z-10 w-full">
                
                {/* Download Button */}
                <a 
                  href="/resume.pdf" 
                  download="Vikas_Morabagi_Resume.pdf"
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-bold tracking-widest uppercase rounded-full shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all flex items-center gap-3 scale-100 hover:scale-105"
                >
                  DOWNLOAD RESUME <Download size={18} />
                </a>
                
                {/* Clean Social Links with fading lines */}
                <div className="flex items-center justify-center w-full max-w-[320px] gap-6 mt-2">
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-amber-500/40"></div>
                  
                  <div className="flex items-center gap-5">
                    <a href={`mailto:${data.basics.email}`} className="text-zinc-300 hover:text-amber-400 hover:scale-110 transition-all drop-shadow-md">
                      <Mail size={24} />
                    </a>
                    <a href={`https://${data.basics.links[1].url}`} target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-amber-400 hover:scale-110 transition-all drop-shadow-md">
                      <Github size={24} />
                    </a>
                    <a href={`https://${data.basics.links[0].url}`} target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-amber-400 hover:scale-110 transition-all drop-shadow-md">
                      <Linkedin size={24} />
                    </a>
                  </div>

                  <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-amber-500/40"></div>
                </div>

              </motion.div>
            </section>

            {/* 2. ABOUT ME */}
            <section className="scroll-mt-24">
              <div className="mb-12 border-b border-zinc-800 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight uppercase flex items-center gap-4">
                  <Terminal className="text-amber-500 h-10 w-10" /> About Me
                </h2>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 overflow-hidden shadow-2xl"
              >
                <div className="bg-zinc-950/80 border-b border-zinc-800/80 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_#d4af37]" />
                  </div>
                  <span className="ml-4 text-xs text-zinc-500 font-mono flex-1 text-center pr-12">Profile Overview</span>
                </div>
                
                <div className="p-6 md:p-10 text-sm md:text-base leading-relaxed">
                  <h3 className="text-amber-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-xs">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> Professional Summary
                  </h3>
                  <p className="text-zinc-300 font-sans leading-loose text-lg font-light">{data.basics.summary}</p>
                </div>
              </motion.div>
            </section>

            {/* 3. INTERNSHIP */}
            <section id="experience" className="scroll-mt-24">
              <div className="mb-12 border-b border-zinc-800 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight uppercase flex items-center gap-4">
                  <Briefcase className="text-amber-500 h-10 w-10" /> Internship
                </h2>
              </div>

              <div className="relative border-l border-zinc-800 ml-4 md:ml-0 space-y-12 pl-8 md:pl-12">
                {data.experience.map((exp, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="absolute -left-[37px] md:-left-[53px] top-1 w-3 h-3 rounded-full bg-zinc-950 border-2 border-amber-500 group-hover:shadow-[0_0_15px_#d4af37] transition-all" />
                    
                    <div className="bg-zinc-900/30 backdrop-blur-md p-8 rounded-2xl border border-zinc-800 hover:border-amber-500/30 transition-all duration-500 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 relative z-10">
                        <div>
                          <h3 className="text-2xl font-bold text-zinc-100 tracking-tight">{exp.role}</h3>
                          <p className="text-amber-400/80 font-medium text-sm mt-1">{exp.company}</p>
                        </div>
                        <span className="font-mono text-xs text-zinc-400 bg-zinc-950/80 px-4 py-2 rounded-full border border-zinc-800">
                          {exp.dates}
                        </span>
                      </div>
                      
                      <ul className="space-y-4 relative z-10">
                        {exp.bullets.map((bullet, j) => (
                          <li key={j} className="text-zinc-300 text-sm leading-relaxed flex gap-4">
                            <ChevronRight size={16} className="text-amber-500 shrink-0 mt-0.5" />
                            <span className="font-light">
                              {bullet.split(/(\d+(?:\.\d+)?%|\d+(?:,\d+)?\+?)/g).map((part, k) => 
                                /(\d+(?:\.\d+)?%|\d+(?:,\d+)?\+?)/.test(part) ? 
                                <span key={k} className="text-amber-300 font-medium bg-amber-500/10 px-1.5 py-0.5 rounded ml-1">{part}</span> : part
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
              <div className="mb-12 border-b border-zinc-800 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight uppercase flex items-center gap-4">
                  <Code2 className="text-amber-500 h-10 w-10" /> Projects
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {data.projects.map((proj, i) => {
                  const projectLink = (proj as any).link || `https://${data.basics.links[1].url}`;
                  const isExpanded = expandedProjects[i] || false;

                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className="group bg-zinc-900/30 backdrop-blur-xl rounded-2xl border border-zinc-800 hover:border-amber-500/40 overflow-hidden flex flex-col h-fit relative shadow-lg transition-all duration-500"
                    >
                      {proj.image && (
                        <div className="w-full h-48 md:h-56 overflow-hidden relative border-b border-zinc-800 shrink-0">
                          <div className="absolute inset-0 bg-zinc-950" />
                          <img 
                            src={proj.image} 
                            alt={proj.title}
                            className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 relative z-10"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/20 to-transparent z-10" />
                        </div>
                      )}

                      <div className="p-8 flex flex-col flex-grow relative z-20 bg-zinc-950/50">
                        {/* PROJECT HEADER */}
                        <div className="flex justify-between items-start mb-6 gap-4">
                          <h3 className="text-xl font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                            {proj.title}
                          </h3>
                          <a 
                            href={projectLink}
                            target="_blank"
                            rel="noreferrer"
                            title="View Repository"
                            className="p-2.5 rounded-full bg-zinc-900 border border-zinc-700 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400 text-zinc-400 transition-all shrink-0 flex items-center justify-center shadow-sm z-30"
                          >
                            <Github size={18} />
                          </a>
                        </div>
                        
                        {/* TECH STACK */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {proj.stack.map(tech => (
                            <span key={tech} className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 bg-zinc-900 border border-zinc-700 text-amber-300 rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* TOGGLE EXPAND BUTTON */}
                        <button 
                          onClick={() => toggleProject(i)}
                          className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-amber-400 transition-colors mt-auto font-bold w-fit"
                        >
                          {isExpanded ? "Hide Details" : "View Details"}
                          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                            <ChevronDown size={16} />
                          </motion.div>
                        </button>
                        
                        {/* COLLAPSIBLE DETAILS */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <ul className="space-y-3 mt-6 pt-6 border-t border-zinc-800/50">
                                {proj.bullets.map((bullet, j) => (
                                  <li key={j} className="text-sm text-zinc-400 flex gap-3 font-light">
                                    <span className="text-amber-500 block mt-1 shrink-0">•</span>
                                    <span className="leading-relaxed">{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </section>

            {/* 5. SKILLS */}
            <section id="skills" className="scroll-mt-24">
              <div className="mb-12 border-b border-zinc-800 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight flex flex-col gap-2">
                  <span className="flex items-center gap-4 uppercase"><Cpu className="text-amber-500 h-10 w-10" /> Tech Stack</span>
                  <span className="text-base font-light text-zinc-400 tracking-normal mt-2">I'm proficient in a range of modern technologies that empower me to build highly functional solutions.</span>
                </h2>
              </div>

              <div className="space-y-12">
                {data.skills.map((skillGrp, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  >
                    <h4 className="text-zinc-500 font-mono mb-6 text-sm uppercase tracking-widest flex items-center gap-3">
                      <span className="w-6 h-[1px] bg-zinc-700" /> {skillGrp.category}
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {skillGrp.items.map((item, j) => {
                        const { title, subtitle } = parseSkill(item, skillGrp.category);
                        return (
                          <div 
                            key={j} 
                            className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-amber-500/30 hover:bg-zinc-800/60 transition-all duration-300 group cursor-default shadow-sm hover:shadow-md"
                          >
                            <div className="w-12 h-12 rounded-lg bg-zinc-950 flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-amber-500/30 transition-colors">
                              {getSkillBrandIcon(title)}
                            </div>
                            <div className="flex flex-col overflow-hidden">
                              <span className="text-sm font-bold text-zinc-100 truncate group-hover:text-amber-400 transition-colors">{title}</span>
                              <span className="text-[11px] text-zinc-500 truncate mt-0.5 font-medium tracking-wide" title={subtitle}>{subtitle}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 6. EDUCATION & CERTS */}
            <section id="education" className="scroll-mt-24 pb-20">
              <div className="mb-12 border-b border-zinc-800 pb-4">
                <h2 className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight uppercase flex items-center gap-4">
                  <GraduationCap className="text-amber-500 h-10 w-10" /> Education & Certs
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                   <h3 className="text-xl font-bold text-zinc-300 mb-8 tracking-widest uppercase text-sm">
                    Education
                  </h3>
                  <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i} className="p-8 bg-zinc-900/30 backdrop-blur-xl rounded-2xl border border-zinc-800 hover:border-amber-500/30 transition-all">
                        <h4 className="text-lg font-bold text-zinc-100 mb-2">{edu.degree}</h4>
                        <p className="text-zinc-400 text-sm mb-6 font-light">{edu.institution}</p>
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-amber-500/80">{edu.dates}</span>
                          <span className="bg-amber-500/10 text-amber-300 px-3 py-1 rounded-full border border-amber-500/20">{edu.details}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                   <h3 className="text-xl font-bold text-zinc-300 mb-8 tracking-widest uppercase text-sm">
                    Certifications
                  </h3>
                  <div className="space-y-4">
                    {data.certifications.map((cert, i) => (
                      <div key={i} className="p-5 bg-zinc-900/30 backdrop-blur-xl rounded-2xl border border-zinc-800 flex items-center gap-5 hover:border-amber-500/30 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0">
                          <GraduationCap size={18} className="text-amber-400" />
                        </div>
                        <span className="text-sm text-zinc-300 font-light leading-snug">{cert}</span>
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