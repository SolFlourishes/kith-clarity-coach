import React from 'react';
import '../Content.css';

function AboutPage() {
  return (
    <div className="content-page">
      <h1>Hear Me, See Me, Know Me.</h1>
      <p className="mission">
        <strong>Our Vision:</strong> To create a world where everyone can find their "kith"—their community of understanding—and feel supported, valued, and known.
      </p>

      <div className="content-block">
        <h3>What is "Kith"?</h3>
        <p>
          "Kith" is an old word for one's friends, acquaintances, and neighbors. It represents the community you belong to. At Kith, LLC, we build tools that foster mutual understanding, creating a world where everyone can flourish and belong.
        </p>
      </div>
      
      <h2 className="section-header">The Clarity Coach: Our Flagship Product</h2>

      <div className="content-block">
        <h3>The Challenge: A Costly Communication Gap</h3>
        <p>
          Have you ever felt like you were speaking a different language than a colleague, friend, or family member? This is a common and costly reality. A significant communication gap exists between different neurotypes (e.g., neurodivergent and neurotypical individuals), leading to misunderstanding, lost productivity, and personal distress.
        </p>
        <p>
          Existing tools like grammar checkers or productivity apps only scratch the surface. They fail to address the core issue: translating the social-pragmatic intent and unspoken subtext that often gets lost between different communication styles.
        </p>
      </div>

      <div className="content-block">
        <h3>The Solution: A Translator, Analyst & Coach</h3>
        <p>
          The Clarity Coach is a first-of-its-kind, AI-powered learning platform designed to bridge this gap. It's more than just a tool; it's your personal communication partner.
        </p>
        <ul>
          <li><strong>As a Translator:</strong> It helps you rephrase your message to be clearly understood by your audience, ensuring your intent matches your impact.</li>
          <li><strong>As an Analyst:</strong> It decodes the likely intent behind messages you receive, helping you understand what was *really* meant.</li>
          <li><strong>As a Coach:</strong> It provides real-time advice and practice, helping you build real-world communication skills and confidence over time.</li>
        </ul>
      </div>

      <h2 className="section-header">Our Guiding Philosophy</h2>
      <ul>
          <li><strong>Translate Styles, Not People:</strong> We believe in celebrating all communication styles. Our goal is to create a bridge, not to "correct" how someone thinks or speaks.</li>
          <li><strong>Context is Key:</strong> The AI is powerful, but it can't read a room. Always combine its insights with your own judgment and understanding of the situation.</li>
          <li><strong>Connection is the Goal:</strong> Technology is the means, not the end. The ultimate goal is to foster better human connection through clearer, more empathetic communication.</li>
      </ul>
    </div>
  );
}
export default AboutPage;