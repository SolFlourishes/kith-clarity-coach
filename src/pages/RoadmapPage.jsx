import React from 'react';
import '../Content.css';

function RoadmapPage() {
  return (
    <div className="content-page">
      <h1>Application Roadmap</h1>
      <p className="mission">We believe in transparency. This page outlines our current state and future vision.</p>
      <div className="content-block-highlight">
          <h2>Current Phase: Beta (v2.1)</h2>
          <p>This version is focused on intelligent user experience with the "Style, Not Label" approach and a full visual redesign.</p>
          <div>
            <h3>Key Features Implemented</h3>
            <ul>
              <li>"Let the AI Decide" feature to analyze writing style.</li>
              <li>New "Four-Box" layout for the communication loop.</li>
              <li>"Advanced Mode" with selectors for Neurotype and Generation.</li>
              <li>Functional Feedback systems for data collection.</li>
            </ul>
          </div>
      </div>
      <div className="content-block-highlight">
          <h2>Next Phase: Beta (v2.2)</h2>
          <p>The next major step is building the "Golden Feedback Loop" to create a world-class AI brain.</p>
          <div>
              <h3>Key Enhancements</h3>
              <ul>
                  <li><strong>Editable AI Responses:</strong> Allow users to directly edit AI-generated text.</li>
                  <li><strong>"Save My Edit" System:</strong> Save user-perfected translations for AI training.</li>
              </ul>
          </div>
      </div>
    </div>
  );
}
export default RoadmapPage;
