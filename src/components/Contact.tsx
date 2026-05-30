import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm("mnnpbdzv");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with:", { email: e.currentTarget.email.value, message: e.currentTarget.message.value });

    handleSubmit(e);
  };

  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }

  return (
    <section id="contact-me" className="contact-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          Contact Me
        </motion.h2>
        
        <form onSubmit={handleFormSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="email">
              <span className="label-text">Email Address</span>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="form-input"
                placeholder="your.email@example.com"
              />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
                className="error-message"
                style={{ color: '#ff6b6b' }}
              />
            </label>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">
              <span className="label-text">Your Message</span>
              <textarea
                id="message"
                name="message"
                required
                className="form-textarea"
                placeholder="How can I help you?"
                rows={5}
              />
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
                className="error-message"
                style={{ color: '#ff6b6b' }}
              />
            </label>
          </div>
          
          <motion.button 
            type="submit" 
            disabled={state.submitting} 
            className="submit-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'linear-gradient(45deg, #4a6cf7, #6a11cb)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: state.submitting ? 'not-allowed' : 'pointer',
              opacity: state.submitting ? 0.7 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            {state.submitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
