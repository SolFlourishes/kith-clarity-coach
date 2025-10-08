import React, { useState } from 'react';
import axios from 'axios';
import './Footer.css';
import pkg from '../../package.json';

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

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
        <div className="footer-version"><span>Kith Clarity Coach | Beta Version {pkg.version}</span></div>
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
