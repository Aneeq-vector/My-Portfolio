import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { ExternalLink, Star, GitFork, Box } from 'lucide-react';
import './Projects.css';

const GithubIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/Aneeq-vector/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching repos:', err);
        setLoading(false);
      });
  }, []);

  return (
    <PageTransition>
      <div className="page-container">
        <h2 className="section-heading mono-text">MODULE_04 // REPOSITORIES</h2>
        <p className="projects-subtitle mono-text">&gt; Fetching active codebase from main branch...</p>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <span className="mono-text" style={{marginTop:'20px', color:'var(--brand-neon)'}}>LOADING...</span>
          </div>
        ) : (
          <motion.div 
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {repos.map(repo => (
              <motion.div key={repo.id} className="project-card glass-card" variants={cardVariants}>
                <div className="project-header">
                  <Box size={24} className="folder-icon" />
                  <div className="project-links">
                    <a href={repo.html_url} target="_blank" rel="noreferrer" className="p-link" title="Source Code">
                      <GithubIcon size={20} />
                    </a>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noreferrer" className="p-link" title="Live Preview">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="project-body">
                  <h3 className="project-title">{repo.name.replace(/-/g, ' ')}</h3>
                  <p className="project-desc mono-text">
                    {repo.description || '> No system description provided. Examining source code is required to understand functionality...'}
                  </p>
                </div>
                
                <div className="project-footer">
                  <div className="repo-stats mono-text">
                    <span className="stat-item"><Star size={14}/> {repo.stargazers_count}</span>
                    <span className="stat-item"><GitFork size={14}/> {repo.forks_count}</span>
                  </div>
                  <div className="tech-tags">
                  {repo.language && (
                    <span className="tech-tag">{repo.language}</span>
                  )}
                  {repo.topics && repo.topics.slice(0, 2).map((topic, idx) => (
                    <span key={idx} className="tech-tag">{topic}</span>
                  ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
