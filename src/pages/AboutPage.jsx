import React from 'react';
import '../Content.css';

function AboutPage() {
  return (
    <div className="content-page">
      <h1>Hear Me, See Me, Know Me.</h1>
      <p className="mission"><strong>Our Vision:</strong> To create a world where everyone can find their "kith"—their community of understanding—and feel supported, valued, and known. The company, Kith, builds tools and services that foster mutual understanding and create a world where everyone can flourish and belong.</p>
      
      <div className="content-block">
        <h3>The Problem: A Costly Communication Gap</h3>
        <p>In our homes, workplaces, and communities, a significant and costly communication gap often exists between different neurotypes—for example, between neurodivergent (Autistic, ADHD, etc.) and neurotypical individuals. This isn't about right or wrong; it's about running on different "operating systems." One might prioritize direct, literal, data-driven communication, while another relies on social rapport, subtext, and nuance. When these styles clash, the result is misunderstanding, lost productivity, and personal distress.</p>
        <p>Existing tools like grammar checkers or productivity apps only scratch the surface. They fail to address the core issue: translating the social-pragmatic intent and unspoken rules that underpin our daily interactions.</p>
      </div>
      
      <div className="content-block">
        <h3>The Solution: The Clarity Coach</h3>
        <p>The Clarity Coach is a first-of-its-kind, AI-powered learning platform designed to bridge this gap. It's more than a spell-checker; it's a translator, an analyst, and a coach, all in one. By helping you reframe your message for your audience—or decode a message you've received—it helps build the real-world skills needed to communicate effectively without changing who you are.</p>
      </div>

      <div className="content-block-highlight">
          <h3>What is "Kith"?</h3>
          <p>The name of our company, Kith, comes from the old phrase "kith and kin." While "kin" refers to your family, "kith" means your friends, neighbors, and community—the people you know and are known by. It represents the circle of understanding we all seek. Our goal is to build tools that help everyone find their kith.</p>
      </div>

      <h2 className="section-header">Our Guiding Philosophy</h2>
      <ul>
          <li><strong>We Translate Styles, Not People:</strong> This tool is a bridge, not a correction. It honors your authentic voice while helping you tailor your message to be heard and understood by others.</li>
          <li><strong>Neurodiversity is a Spectrum:</strong> We use terms like "Direct" and "Indirect" to describe communication *styles*, not to rigidly label people. Everyone is a unique mix of traits and preferences.</li>
          <li><strong>Context is Everything:</strong> The AI is powerful, but it can't know your personal history or the tone of a room. Always use its suggestions as a starting point, not a final answer.</li>
          <li><strong>Verification is Key:</strong> The ultimate goal is better human connection. The AI can be wrong. Whenever possible, verify understanding through direct, compassionate conversation.</li>
      </ul>
    </div>
  );
}
export default AboutPage;

