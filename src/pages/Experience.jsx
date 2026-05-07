import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Activity, Archive, Terminal } from 'lucide-react';
import './Experience.css';

const experienceData = [
  {
    role: 'IT Support Executive',
    company: 'Amazon College',
    active: true,
    description: 'Managing the student learning management system, assigning lectures, maintaining databases, and resolving system-related issues to ensure a smooth academic experience.',
    skills: ['LMS Management', 'Database Handling', 'Troubleshooting', 'IT Support', 'Coordination']
  },
  {
    role: 'Customer Support Executive',
    company: 'FBC Asia Pacific',
    active: false,
    description: 'Handled customer interactions through a non-voice support platform, resolving queries efficiently while maintaining service quality.',
    skills: ['Customer Support', 'Query Resolution', 'Communication', 'Service Quality']
  },
  {
    role: 'Customer Care Executive',
    company: 'Konnect BPO Technologies (PVT) Ltd.',
    active: false,
    description: 'Resolving customer inquiries and service issues promptly to ensure satisfaction and trust.',
    skills: ['Customer Support', 'Query Resolution', 'Communication', 'Service Quality']
  }
];

export default function Experience() {
  return (
    <PageTransition>
      <div className="page-container">
        <h2 className="section-heading mono-text">MODULE_03 // EXPERIENCE</h2>

        <div className="sys-logs-container">
          <div className="log-header mono-text glass">
            <Terminal size={16} className="text-neon" />
            <span>sys.log.history viewer</span>
            <div className="log-dots"><span></span><span></span><span></span></div>
          </div>

          <div className="log-body glass-card">
            {experienceData.map((exp, idx) => (
              <motion.div
                key={idx}
                className={`log-entry ${exp.active ? 'active-process' : 'archived-process'}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <div className="log-status-bar mono-text">
                  {exp.active ? (
                    <span className="status-badge running"><Activity size={12} className="pulse-icon" /> WORKING</span>
                  ) : (
                    <span className="status-badge archived"><Archive size={12} /> ARCHIVED</span>
                  )}
                  <span className="log-time">{exp.company}</span>
                </div>

                <h3 className="log-role">{exp.role}</h3>
                <p className="log-output mono-text">&gt; {exp.description}</p>

                <div className="log-skills">
                  {exp.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="log-skill-tag mono-text">{skill}</span>
                  ))}
                </div>
                {exp.active && <div className="scanning-line"></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
