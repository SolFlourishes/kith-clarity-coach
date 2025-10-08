import React from 'react';
import ModeCard from '../components/ModeCard';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage-container">
      <header className="hero-section">
        <h1 className="hero-title">Translate Communication,<br />Not People.</h1>
        <p className="hero-subtitle">Bridge the gap between neurodivergent and neurotypical communication styles. The Clarity Coach helps you say what you mean, and understand what they mean.</p>
      </header>
      <div className="mode-selection">
        <ModeCard title="Draft a Message" description="Translate your intent into a clear message tailored for your audience." linkTo="/translate/draft" />
        <ModeCard title="Analyze a Message" description="Decode the likely intent behind a message you've received." linkTo="/translate/analyze" />
        <ModeCard title="Chat with the Coach" description="Get real-time advice on navigating a tricky conversation." linkTo="/chat" /> {/* Corrected Link */}
      </div>
    </div>
  );
}
export default HomePage;