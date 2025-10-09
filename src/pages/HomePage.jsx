import React, { useState, useEffect } from 'react';
import ModeCard from '../components/ModeCard';
import './HomePage.css';

const quotes = [
  {
    text: "The single biggest problem in communication is the illusion that it has taken place.",
    author: "George Bernard Shaw"
  },
  {
    text: "To effectively communicate, we must realize that we are all different in the way we perceive the world and use this understanding as a guide to our communication with others.",
    author: "Tony Robbins"
  },
  {
    text: "The most important thing in communication is hearing what isn't said.",
    author: "Peter Drucker"
  }
];

function HomePage() {
  const [quote, setQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="homepage-layout">
      <main className="main-content">
        <header className="hero-section">
          <h1 className="hero-title">Clarity Coach</h1>
          <p className="hero-subtitle">Bridge the gap between different communication styles. The Clarity Coach helps you say what you mean, and understand what they mean.</p>
        </header>

        <div className="quote-section">
          <blockquote className="quote-text">"{quote.text}"</blockquote>
          <cite className="quote-author">- {quote.author}</cite>
        </div>

        <div className="mode-selection">
          <ModeCard title="Draft a Message" description="Translate your intent into a clear message tailored for your audience." linkTo="/translate/draft" />
          <ModeCard title="Analyze a Message" description="Decode the likely intent behind a message you've received." linkTo="/translate/analyze" />
          <ModeCard title="Chat with the Coach" description="Get real-time advice on navigating a tricky conversation." linkTo="/chat" />
        </div>
      </main>
      <aside className="sidebar-content">
        <section className="empowerment-section">
          <h2>More Than a Translator</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
              <h3>Learn Your Style</h3>
              <p>Get AI-powered insights into your own communication patterns.</p>
            </div>
            <div className="benefit-card">
               <div className="benefit-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div>
              <h3>Build Stronger Bonds</h3>
              <p>Move past misunderstanding by learning to speak your audience's "language".</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V6.5a2.5 2.5 0 1 0-5 0V15a6.5 6.5 0 1 0 13 0V6.5a2.5 2.5 0 1 0-5 0V15a1 1 0 1 0 2 0V6.5"/></svg></div>
              <h3>Communicate with Confidence</h3>
              <p>Tackle difficult conversations with a clear strategy and feel empowered.</p>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
}
export default HomePage;