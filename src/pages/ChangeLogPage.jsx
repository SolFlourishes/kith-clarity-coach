import React from 'react';
import '../Content.css';

function ChangeLogPage() {
  return (
    <div className="content-page">
      <h1>Change Log</h1>
      <div className="log-entry">
        <h2>Version 2.1 (Beta)</h2>
        <ul>
           <li><strong>Rebranding:</strong> Officially renamed the application from "The Neurotype Communicator" to "Kith Clarity Coach" to better reflect our brand and vision.</li>
          <li>Redesigned Translate/Analyze page with an intuitive multi-box layout.</li>
          <li>Added "Advanced Mode" with Neurotype and Generation selectors.</li>
          <li>Re-implemented persistent "General Feedback" button and per-translation 5-star rating system, now powered by Firebase Firestore.</li>
          <li>Added a "Context" input to the Analyze mode for more accurate situational analysis.</li>
          <li>Enhanced the Feedback system to allow separate ratings for the AI's Explanation and its Suggested Response.</li>
        </ul>
      </div>
      <div className="log-entry">
        <h2>Version 2.0 (Beta)</h2>
        <ul>
          <li><strong>Major Architectural Change:</strong> Migrated all back-end logic to Vercel Serverless Functions.</li>
          <li>Switched to a "Style, Not Label" UI.</li>
          <li>Implemented the "Let the AI Decide" feature.</li>
        </ul>
      </div>
       <div className="log-entry">
        <h2>Version 1.0 - 1.3 (Alpha)</h2>
        <ul>
            <li>Initial release and establishment of all core features, homepage design, content pages, and Resend API integration for listserv.</li>
        </ul>
      </div>
    </div>
  );
}
export default ChangeLogPage;
