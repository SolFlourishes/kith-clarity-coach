import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Subscribing...');
    try {
      await axios.post('/api/subscribe', { email });
      setMessage('Success! Thanks for subscribing.');
      setEmail('');
    } catch (error) {
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-links">
          <span>© {currentYear} Hearthside Works, LLC. All Rights Reserved.</span>
          <Link to="/commitments">Our Commitments (Privacy & Accessibility)</Link>
        </div>
        <div className="footer-subscribe">
          <p>Get notified about updates:</p>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Subscribe</button>
          </form>
          {message && <p className="subscribe-message">{message}</p>}
        </div>
      </div>
    </footer>
  );
}
export default Footer;