import React from 'react';
import '../Content.css';

function EnhancementsPage() {
  return (
    <div className="content-page">
      <h1>Proposed Future Enhancements</h1>
      <p className="mission"><strong>Our Goal:</strong> To evolve from a powerful communicator into a truly personalized, context-aware communication partner.</p>
      <div className="content-block"><h2>Pillar 1: Content-First Intelligence</h2><div><h3>The "Style, Not Label" Approach</h3><p>Focus on communication styles ("Direct" vs. "Indirect") rather than identity labels.</p></div></div>
      <div className="content-block"><h2>Pillar 2: Building the AI Brain</h2><div><h3>The "Golden" Feedback Loop</h3><p>Allow users to directly edit and improve AI suggestions, providing the highest quality training data.</p></div></div>
      <div className="content-block"><h2>Pillar 3: Behavioral & Situational Decoding</h2><div><h3>The Behavioral Translator</h3><p>Help decode non-verbal actions and situations.</p></div></div>
      <div className="content-block"><h2>Pillar 4: Hyper-Personalization</h2><div><h3>Secure User Accounts & "Key Contacts" Profiles</h3><p>Save history and create profiles for people you communicate with regularly.</p></div></div>
      <div className="content-block"><h2>Pillar 5: Platform Expansion & Skill Building</h2><div><h3>Mobile App & Browser Extension</h3><p>Bring the Communicator directly into your workflow.</p></div><div><h3>Practice Conversation Simulator</h3><p>Engage in a real-time conversation with a custom AI persona.</p></div></div>
    </div>
  );
}
export default EnhancementsPage;
