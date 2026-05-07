import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Command, Layers, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Education', path: '/education', icon: BookOpen },
  { name: 'Experience', path: '/experience', icon: Command },
  { name: 'Projects', path: '/projects', icon: Layers },
  { name: 'Contact', path: '/contact', icon: Terminal }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <motion.nav 
      className={`dock-navbar ${scrolled ? 'dock-scrolled' : ''}`}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="dock-container glass">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`}
            >
              <div className="dock-icon-wrapper">
                <Icon size={20} />
              </div>
              <span className="dock-tooltip mono-text">{link.name}</span>
              {location.pathname === link.path && (
                <motion.div layoutId="dock-indicator" className="dock-indicator" />
              )}
            </NavLink>
          );
        })}
        <div className="dock-divider"></div>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
