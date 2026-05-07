import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import PageTransition from '../components/PageTransition';
import { Send, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus('loading');

   emailjs.send(
  "service_0r93n2a",
  "template_fbajb4v",
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  },
  "xbJ9TOvgQvzw9jM2"
)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch(() => {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
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

            <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-group">
                <label htmlFor="name" className="mono-text">USER_IDENTIFIER :</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field mono-text ${errors.name ? 'input-error' : ''}`}
                  placeholder="Enter your name"
                  disabled={status === 'loading'}
                />
                {errors.name && <span className="field-error mono-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="mono-text">RETURN_ADDRESS :</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field mono-text ${errors.email ? 'input-error' : ''}`}
                  placeholder="Enter your email"
                  disabled={status === 'loading'}
                />
                {errors.email && <span className="field-error mono-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="mono-text">PAYLOAD_DATA :</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className={`input-field mono-text ${errors.message ? 'input-error' : ''}`}
                  placeholder="Enter transmission content"
                  disabled={status === 'loading'}
                ></textarea>
                {errors.message && <span className="field-error mono-text">{errors.message}</span>}
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
              Message sent successfully. I will get back to you soon.
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
              Something went wrong. Please try again.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
