import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Send, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulating terminal transmission delay
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PageTransition>
      <div className="page-container">
        <h2 className="section-heading mono-text">MODULE_05 // COMM_LINK</h2>

        <div className="contact-terminal-container">
          <div className="terminal-header glass">
            <Terminal size={16} className="text-neon" />
            <span className="mono-text">Secure Transmission Protocol</span>
            <div className="term-actions">
              <span className="term-btn min"></span>
              <span className="term-btn max"></span>
              <span className="term-btn close"></span>
            </div>
          </div>
          
          <div className="terminal-body glass-card">
            <p className="term-intro mono-text">
              <span className="text-neon">root@aneeq.dev:~#</span> ./init_connection.sh<br/>
              &gt; Establishing secure connection... [OK]<br/>
              &gt; Awaiting user payload...
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="mono-text">USER_IDENTIFIER :</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field mono-text"
                  placeholder="Enter your name"
                  disabled={status === 'loading'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="mono-text">RETURN_ADDRESS :</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field mono-text"
                  placeholder="Enter your email"
                  disabled={status === 'loading'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="mono-text">PAYLOAD_DATA :</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="input-field mono-text"
                  placeholder="Enter transmission content"
                  disabled={status === 'loading'}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`btn-primary submit-btn ${status === 'loading' ? 'loading' : ''}`}
                disabled={status === 'loading'}
              >
                <span className="btn-text">
                  {status === 'loading' ? 'TRANSMITTING...' : 'EXECUTE_TRANSMISSION'}
                </span>
                {status !== 'loading' && <Send size={16} style={{ marginLeft: 8 }} />}
              </button>
            </form>
          </div>
        </div>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="toast success mono-text"
            >
              <CheckCircle2 size={20} />
              TRANSMISSION SUCCESSFUL.
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="toast error mono-text"
            >
              <AlertCircle size={20} />
              TRANSMISSION FAILED.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
