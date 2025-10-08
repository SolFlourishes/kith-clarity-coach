import React from 'react';
import '../Content.css';

function HowToUsePage() {
  return (
    <div className="content-page">
      <h1>How to Use the Clarity Coach</h1>
      <p className="mission">This guide will help you get the most out of the Beta version by explaining its new features and workflows with clear examples.</p>
      <h2>The "Four-Box" Layout</h2>
      <p>The core of the app is the new four-box layout, which helps you visualize the communication process. The top two boxes are for your input, and the bottom two are for the AI's output.</p>
      <div className="content-block">
          <h3>Draft a Message</h3>
          <ul>
            <li><strong>What I Mean (Intent):</strong> Enter the core goal of your message.</li>
            <li><strong>What I Wrote (Draft):</strong> Enter your raw thoughts or a rough draft.</li>
            <li><strong>How They Might Hear It (Explanation):</strong> The AI explains potential misinterpretations.</li>
            <li><strong>The Translation (Suggested Draft):</strong> The AI's final, polished version.</li>
          </ul>
      </div>
      <div className="content-block">
          <h3>Analyze a Message</h3>
          <ul>
            <li><strong>What They Wrote (Received Message):</strong> Paste the message you received.</li>
            <li><strong>How I Heard It (My Interpretation):</strong> Explain how the message made you feel.</li>
            <li><strong>What They Likely Meant (Explanation):</strong> The AI analyzes the subtext and likely intent.</li>
            <li><strong>The Translation (Suggested Response):</strong> The AI's suggestion for a clear reply.</li>
          </ul>
      </div>
      <h2 className="section-header">Practical Applications: Real-World Scenarios 💡</h2>
      <div className="content-block">
        <h3 className="app-type-header">When to use "Draft a Message":</h3>
        <ul>
          <li>Preparing for a performance review or asking for a raise.</li>
          <li>Delegating a task to a colleague without sounding bossy.</li>
          <li>Setting a difficult but necessary boundary with a friend.</li>
        </ul>
      </div>
      <div className="content-block">
        <h3 className="app-type-header">When to use "Analyze a Message":</h3>
        <ul>
          <li>Decoding a short, ambiguous text from your manager.</li>
          <li>Understanding verbal feedback that felt vague or personal.</li>
          <li>Figuring out what a partner *really* means when they say "I'm fine."</li>
        </ul>
      </div>
    </div>
  );
}
export default HowToUsePage;
