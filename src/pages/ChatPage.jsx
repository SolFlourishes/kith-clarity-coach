import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatPage.css';

function ChatPage() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setHistory([{ role: 'model', content: '<p>Hi there! I\'m the Clarity Coach. How can I help you navigate a communication challenge today?</p>' }]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const newHistory = [...history, { role: 'user', content: input }];
    setHistory(newHistory);
    setInput('');
    setLoading(true);
    try {
      const response = await axios.post('/api/chat', { history: newHistory });
      setHistory(prev => [...prev, { role: 'model', content: response.data.reply }]);
    } catch (error) {
      setHistory(prev => [...prev, { role: 'model', content: '<p>Sorry, I seem to be having trouble connecting. Please try again.</p>' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page-container">
      <h1>Chat with the Coach</h1>
      <div className="chat-window">
        {history.map((msg, index) => (<div key={index} className={`chat-message ${msg.role}`}><div className="message-content" dangerouslySetInnerHTML={{ __html: msg.content }} /></div>))}
        {loading && <div className="chat-message model"><div className="message-content typing-indicator"><span /><span /><span /></div></div>}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Describe your situation..." disabled={loading} />
        <button type="submit" disabled={loading || !input.trim()}>Send</button>
      </form>
    </div>
  );
}
export default ChatPage;