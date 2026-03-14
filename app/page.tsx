"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ExternalLink, Github, Linkedin, Mail, ArrowUpRight, Database, PieChart, Code2 } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";
import { data } from "../data/resume"; 

export default function Portfolio() {
  const [loading, setLoading] = useState(true);

  // Splash Screen Timer
  useEffect(() => {
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
        <main className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 md:px-8 md:py-20 lg:py-24">
          
          {/* HEADER ROW */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-5xl font-bold tracking-tight text-white mb-2">
                {data.basics.name}
              </h1>
              <h2 className="text-xl font-medium text-emerald-400 flex items-center gap-2">
                <Database size={20} /> {data.basics.title.split(' | ')[0]}
              </h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2 }}
              className="flex gap-3"
            >
              <a href={`https://${data.basics.links.find(l => l.name === 'GitHub')?.url}`} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-emerald-500/20 border border-white/10 rounded-xl transition-colors text-slate-300 hover:text-emerald-400">
                <Github size={20} />
              </a>
              <a href={`https://${data.basics.links.find(l => l.name === 'LinkedIn')?.url}`} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-emerald-500/20 border border-white/10 rounded-xl transition-colors text-slate-300 hover:text-emerald-400">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${data.basics.email}`} className="p-3 bg-white/5 hover:bg-emerald-500/20 border border-white/10 rounded-xl transition-colors text-slate-300 hover:text-emerald-400">
                <Mail size={20} />
              </a>
              <button onClick={() => window.print()} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-colors">
                Resume <Download size={18} />
              </button>
            </motion.div>
          </div>

          {/* BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[160px]">
            
            {/* Box 1: About Me (Spans 2 columns, 2 rows) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="col-span-1 md:col-span-2 row-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors flex flex-col justify-center"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
              <h3 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-4">About Me</h3>
              <p className="text-lg text-slate-300 leading-relaxed font-medium">
                I am a Data Analyst skilled in Python, SQL, and Power BI. I specialize in transforming complex ETL pipelines and building interactive dashboards that drive 
                <span className="text-emerald-400"> data-driven business decisions</span> and performance optimization.
              </p>
              <div className="mt-8 flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">📍 {data.basics.location}</span>
                <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">🎓 Computer Engineering (CGPA: 7.4)</span>
              </div>
            </motion.div>

            {/* Box 2: Core Tool 1 (Power BI) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="glass-panel p-6 rounded-3xl flex flex-col justify-between hover:bg-white/10 transition-colors"
            >
              <PieChart className="text-emerald-400 h-8 w-8" />
              <div>
                <h4 className="text-white font-bold text-xl">Power BI</h4>
                <p className="text-xs text-slate-400 mt-1">DAX, Star Schema, Dashboards</p>
              </div>
            </motion.div>

            {/* Box 3: Highlight Metric 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="glass-panel p-6 rounded-3xl bg-emerald-500/10 border-emerald-500/20 flex flex-col justify-center items-center text-center"
            >
              <span className="text-5xl font-black text-emerald-400 mb-2">{data.achievements[1].metric}</span>
              <span className="text-xs font-medium text-slate-300 px-2 leading-tight">Reduction in manual reporting cycles via automated dashboards</span>
            </motion.div>

            {/* Box 4: Highlight Metric 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="glass-panel p-6 rounded-3xl bg-teal-500/10 border-teal-500/20 flex flex-col justify-center items-center text-center"
            >
              <span className="text-5xl font-black text-teal-400 mb-2">{data.achievements[0].metric}</span>
              <span className="text-xs font-medium text-slate-300 px-2 leading-tight">Improved simulated cloud resource utilization via Azure config</span>
            </motion.div>

            {/* Box 5: Core Tool 2 (Python & SQL) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
              className="glass-panel p-6 rounded-3xl flex flex-col justify-between hover:bg-white/10 transition-colors"
            >
              <Code2 className="text-emerald-400 h-8 w-8" />
              <div>
                <h4 className="text-white font-bold text-xl">Python & SQL</h4>
                <p className="text-xs text-slate-400 mt-1">Pandas, CTEs, Window Functions</p>
              </div>
            </motion.div>

            {/* Box 6: Latest Experience (Spans 2 columns) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
              className="col-span-1 md:col-span-2 row-span-1 glass-panel p-6 rounded-3xl group flex flex-col justify-center"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{data.experience[0].role}</h3>
                  <p className="text-sm text-slate-400">{data.experience[0].company}</p>
                </div>
                <span className="text-xs font-medium text-emerald-500/80 bg-emerald-500/10 px-3 py-1 rounded-full">{data.experience[0].dates}</span>
              </div>
              <p className="text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                {data.experience[0].bullets[0]}
              </p>
            </motion.div>

            {/* Box 7: Project 1 (Spans 2 columns, 2 rows) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}
              className="col-span-1 md:col-span-2 row-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/50 transition-all flex flex-col"
            >
              <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="text-emerald-400 h-6 w-6" />
              </div>
              <h3 className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-4">Featured Project</h3>
              <h4 className="text-2xl font-bold text-white mb-2">{data.projects[0].title}</h4>
              <div className="flex gap-2 mb-6">
                {data.projects[0].stack.map(tech => (
                  <span key={tech} className="text-xs px-2 py-1 bg-white/10 rounded-md text-slate-300">{tech}</span>
                ))}
              </div>
              <ul className="space-y-3 mt-auto">
                {data.projects[0].bullets.slice(0, 2).map((bullet, i) => (
                  <li key={i} className="text-sm text-slate-400 flex gap-3">
                    <span className="text-emerald-500 mt-1">▹</span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Box 8: Project 2 (Spans 2 columns) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}
              className="col-span-1 md:col-span-2 row-span-1 glass-panel p-6 rounded-3xl group flex flex-col justify-center hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{data.projects[1].title}</h4>
                <div className="flex gap-1 hidden sm:flex">
                  {data.projects[1].stack.map(tech => (
                    <span key={tech} className="text-[10px] px-2 py-1 bg-white/5 rounded text-slate-400">{tech}</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-400 line-clamp-2">
                {data.projects[1].bullets[0]}
              </p>
            </motion.div>

            {/* Box 9: Project 3 (Spans 2 columns) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 }}
              className="col-span-1 md:col-span-2 row-span-1 glass-panel p-6 rounded-3xl group flex flex-col justify-center hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{data.projects[2].title}</h4>
                <div className="flex gap-1 hidden sm:flex">
                  {data.projects[2].stack.map(tech => (
                    <span key={tech} className="text-[10px] px-2 py-1 bg-white/5 rounded text-slate-400">{tech}</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-400 line-clamp-2">
                {data.projects[2].bullets[0]}
              </p>
            </motion.div>

          </div>

          {/* FULL SKILLS LIST ROW */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-4 glass-panel p-8 rounded-3xl"
          >
             <h3 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-6">Complete Tech Stack</h3>
             <div className="flex flex-wrap gap-3">
                {data.skills.flatMap(group => group.items).map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm font-medium text-slate-300 hover:text-emerald-300 hover:border-emerald-500/50 transition-colors cursor-default">
                    {skill.split('(')[0].trim()}
                  </span>
                ))}
             </div>
          </motion.div>

        </main>
      )}
    </>
  );
}