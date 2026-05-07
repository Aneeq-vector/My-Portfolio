import { Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './SocialSidebar.css';

const GithubIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const InstagramIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

// TikTok icon is not in standard Lucide, we can use an SVG or similar, but for now fallback to an icon or custom SVG.
const TikTokIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const socials = [
  { icon: GithubIcon, link: 'https://github.com/Aneeq-vector' },
  { icon: LinkedinIcon, link: 'https://www.linkedin.com/in/ahmed-aneeq-b8b073325/' },
  { icon: Mail, link: 'mailto:ahmedaneeq.official@gmail.com'},
  { icon: InstagramIcon, link: 'https://www.instagram.com/neeq.dev/' },
  { icon: TikTokIcon, link: 'https://www.tiktok.com/@mr_xnee' },
  { icon: MessageCircle, link: 'https://wa.me/94710900155' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export default function SocialSidebar() {
  return (
    <motion.div 
      className="social-sidebar"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socials.map((social, idx) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={idx}
            href={social.link}
            target="_blank"
            rel="noreferrer"
            className="social-icon-wrapper"
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.1 }}
          >
            <Icon size={20} />
          </motion.a>
        );
      })}
      <motion.div className="social-line" variants={itemVariants}></motion.div>
    </motion.div>
  );
}
