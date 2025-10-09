import React from 'react';
import '../Content.css';

function CommitmentsPage() {
  return (
    <div className="content-page">
      <h1>Our Commitments</h1>
      <p className="mission">
        Trust is the foundation of clear communication. This page outlines our unwavering commitment to your privacy and to making our tools accessible to everyone.
      </p>

      <h2 className="section-header">Your Privacy is Paramount</h2>
      <div className="content-block">
        <h3>Can you see what I type into the translator?</h3>
        <p>
          <strong>No.</strong> The text you enter for translation or analysis is sent securely to the AI for processing and is immediately discarded. It is never stored, and it is never seen by any human at Hearthside Works, LLC. Your conversations and thoughts are your own.
        </p>
      </div>
      <div className="content-block">
        <h3>What Data Do You Collect?</h3>
        <p>
          We only store anonymous feedback data (star ratings and comments) to help us identify areas for improvement. This data is completely disconnected from any personal identifiers.
        </p>
      </div>

      <h2 className="section-header">Commitment to Accessibility</h2>
      <div className="content-block">
        <p>
          Hearthside Works is dedicated to ensuring the Clarity Coach is accessible to all users. Our goal is to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
        </p>
      </div>
    </div>
  );
}
export default CommitmentsPage;