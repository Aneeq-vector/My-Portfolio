import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { Terminal, Database, Code2, Layers, Zap, Clock } from 'lucide-react';
import './Home.css';

const textStagger = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const containerStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

export default function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageTransition>
      <div className="home-container">
        
        {/* Left Content (Command Intro) */}
        <motion.div 
          className="home-content"
          variants={containerStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="status-bars" variants={textStagger}>
            <div className="badge glass mono-text">
              <span className="badge-dot pulse-green"></span>
              SYS.STATUS: ONLINE
            </div>
            <div className="badge glass mono-text">
              <Clock size={14} style={{ marginRight: 6 }} className="text-neon" />
              {time.toLocaleTimeString([], { hour12: false })}
            </div>
          </motion.div>
          
          <motion.h1 className="hero-heading" variants={textStagger}>
            Building Intelligent <br className="hidden-mobile" />
            Digital <span className="gradient-text">Systems</span>
          </motion.h1>
          
          <motion.p className="hero-description mono-text" variants={textStagger}>
            &gt; I’m Aneeq. Transforming complex problems into elegant solutions. 
            <br />&gt; Full-stack capabilities with precision architecture.
          </motion.p>
          
          <motion.div className="hero-actions" variants={textStagger}>
            <NavLink to="/projects" className="btn-primary">
              <span className="btn-text">projects</span> <Zap size={16} style={{ marginLeft: 8 }} />
            </NavLink>
            <NavLink to="/contact" className="btn-secondary">
              <span className="btn-text">contact ME </span> <Terminal size={16} style={{ marginLeft: 8 }} />
            </NavLink>
          </motion.div>
        </motion.div>

        {/* Right Content (Holographic Panel) */}
        <motion.div 
          className="hologram-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <div className="hologram-ring"></div>
          <div className="hologram-ring reverse"></div>
          
          <div className="hologram-core">
            <img src="/profile.png" alt="Aneeq" className="cyber-profile" />
            <div className="scan-line"></div>
          </div>

          {/* Floating Chips */}
          <motion.div className="floating-chip chip-1 glass" animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }}>
            <Code2 size={16} className="text-neon" /> React
          </motion.div>
          <motion.div className="floating-chip chip-2 glass" animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity }}>
            <Database size={16} className="text-neon" /> Node.js
          </motion.div>
          <motion.div className="floating-chip chip-3 glass" animate={{ y: [-5, 15, -5] }} transition={{ duration: 6, repeat: Infinity }}>
            <Layers size={16} className="text-neon" /> Problem Solver
          </motion.div>
        </motion.div>

      </div>
    </PageTransition>
  );
}
