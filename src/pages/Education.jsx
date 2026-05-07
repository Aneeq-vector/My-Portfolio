import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { GraduationCap, MapPin } from 'lucide-react';
import './Education.css';

const educationData = [
  {
    title: 'Higher National Diploma in Software Engineering',
    institute: 'ICBT',
    year: '2026 - Present',
    location: 'Colombo, Sri Lanka'
  },
  {
    title: 'Certificate in Web Development',
    institute: 'Orion International Campus',
    year: '2025',
    location: 'Colombo, Sri Lanka'
  },
  {
    title: 'Diploma in Information & Communication Technology',
    institute: 'ICBT',
    year: '2024 - 2025',
    location: 'Colombo, Sri Lanka'
  },
  {
    title: 'Certificate in Software Engineering',
    institute: 'NIBM',
    year: '2023 - 2024',
    location: 'Colombo, Sri Lanka'
  }
];

export default function Education() {
  return (
    <PageTransition>
      <div className="page-container">
        <h2 className="section-heading mono-text">MODULE_02 // EDUCATION</h2>
        
        <div className="edu-timeline-container">
          <div className="cyber-line"></div>
          
          {educationData.map((item, index) => (
            <motion.div 
              key={index}
              className="edu-node"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="edu-pointer">
                <GraduationCap size={20} className="text-neon pulse-icon" />
              </div>
              
              <div className="edu-panel glass-card">
                <div className="panel-header">
                  <h3 className="edu-title">{item.title}</h3>
                  <div className="edu-status mono-text">[{item.year}]</div>
                </div>
                <h4 className="edu-institute text-neon">{item.institute}</h4>
                
                <div className="edu-metrics">
                  <span className="metric-badge mono-text">
                    <MapPin size={14} style={{ marginRight: 4 }} /> {item.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
