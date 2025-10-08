import React from 'react';
import '../Content.css';

function CreditsPage() {
  return (
    <div className="content-page">
      <h1>Credits & Attributions</h1>
      <div className="content-block">
        <h2>Founder & Visionary</h2>
        <p>The Clarity Coach was conceived, designed, and guided by the singular vision of <strong>Sol Roberts-Lieb, Ed.D.</strong></p>
      </div>
      <div className="content-block">
        <h2>Development Process</h2>
        <p>This application was developed in a collaborative process where Sol Roberts-Lieb, Ed.D. served as the architect and product lead. Technical implementation was assisted by a large language model (Google's Gemini).</p>
      </div>
      <div className="content-block">
        <h2>Intellectual Property Notice</h2>
        <p>The concepts, methodologies, user interface designs, and workflows presented in this application are the intellectual property of Sol Roberts-Lieb, Ed.D.</p>
      </div>
      <div className="content-block">
        <h2>Scholarly Foundations</h2>
        <p>The AI's analysis is grounded in established academic concepts like The Double Empathy Problem (Dr. Damian Milton) and High/Low-Context Cultures (Edward T. Hall).</p>
      </div>
    </div>
  );
}
export default CreditsPage;
