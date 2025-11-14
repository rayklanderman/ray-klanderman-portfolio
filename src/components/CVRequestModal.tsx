import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CVRequestModalProps {
  onClose: () => void;
}

const CVRequestModal: React.FC<CVRequestModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('email', email);

    try {
      const response = await fetch('https://formspree.io/f/mnnpbdzv', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast.success('Request sent successfully! Raymond will respond with his CV information.');
        onClose();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Error sending message. Please try again.');
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <motion.div 
        className="modal-content" 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        exit={{ scale: 0 }}
      >
        <h2>Request CV</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Your email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>
        <button onClick={onClose} disabled={isSubmitting}>Close</button>
      </motion.div>
    </div>
  );
};

export default CVRequestModal;
