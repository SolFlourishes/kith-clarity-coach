import React from 'react';
import '../Content.css';

function AboutPage() {
  return (
    <div className="content-page">
      <h1>About The Clarity Coach</h1>
      <p className="mission"><strong>Our Mission:</strong> To translate communication styles, not people. We believe that clearer communication builds more inclusive, effective, and compassionate workplaces and communities.</p>
      <div className="content-block">
        <h3>The Challenge</h3>
        <p>Ever feel like you're speaking clearly but your message doesn't land? This often happens because we're running on different communication "operating systems"—one prioritizing directness and data, the other social rapport and context.</p>
      </div>
      <div className="content-block">
        <h3>The Solution</h3>
        <p>This tool acts as a bridge, not a correction tool. It translates messages between communication styles, helping neurodivergent and neurotypical individuals understand each other more clearly without changing who they are.</p>
      </div>
      <h2>Important Limitations & Our Guiding Philosophy</h2>
      <ul>
          <li><strong>Neurodiversity is a Spectrum:</strong> We use "ND" and "NT" to describe communication *styles*, not to rigidly label people.</li>
          <li><strong>Context is Everything:</strong> The tool analyzes text, but it cannot analyze the tone of a room or your relationship with the other person.</li>
          <li><strong>Verification is Key:</strong> The ultimate goal is better human connection. The AI can be wrong. Always verify understanding through direct conversation.</li>
      </ul>
    </div>
  );
}
export default AboutPage;
