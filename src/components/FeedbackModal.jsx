import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackModal.css';

function FeedbackModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [subject, setSubject] = useState('general');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            await axios.post('/api/contact', { subject, message, email });
            setStatus('Thank you! Your feedback has been sent.');
            setMessage('');
            setEmail('');
            setTimeout(() => { setIsOpen(false); setStatus(''); }, 3000);
        } catch (error) {
            setStatus('Failed to send. Please try again later.');
        }
    };

    return (
        <>
            <button className="feedback-fab" onClick={() => setIsOpen(true)}>Feedback</button>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setIsOpen(false)}>×</button>
                        <h2>General Feedback</h2>
                        <p>Have a suggestion, bug report, or a question? Let us know!</p>
                        {status ? <p className="modal-status">{status}</p> : (
                            <form onSubmit={handleSubmit} className="modal-form">
                                <label>Subject</label>
                                <select value={subject} onChange={e => setSubject(e.target.value)}>
                                    <option value="general">General Suggestion</option>
                                    <option value="bug">Bug Report</option>
                                    <option value="question">Question</option>
                                </select>
                                <label>Your Email (Optional)</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="So we can reply to you" />
                                <label>Message</label>
                                <textarea value={message} onChange={e => setMessage(e.target.value)} required placeholder="Describe your feedback..." />
                                <button type="submit">Send Feedback</button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
export default FeedbackModal;
