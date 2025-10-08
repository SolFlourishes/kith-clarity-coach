import React from 'react';
import '../Content.css';

function ChangeLogPage() {
  return (
    <div className="content-page">
      <h1>Change Log</h1>
      <div className="log-entry">
        <h2>Version 2.1 (Beta)</h2>
        <ul>
          <li>Redesigned Translate/Analyze page with an intuitive "Four-Box" layout.</li>
          <li>Added "Advanced Mode" with Neurotype and Generation selectors.</li>
          <li>Added instructional text and info-icon tooltips to guide users.</li>
          <li>Re-implemented persistent "General Feedback" button and per-translation 5-star rating system, now powered by Firebase Firestore.</li>
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
