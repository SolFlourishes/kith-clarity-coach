import React from 'react';
import '../Content.css';

function HowToUsePage() {
  return (
    <div className="content-page">
      <h1>How to Use the Clarity Coach</h1>
      <p className="mission">This guide will help you get the most out of the Beta version by explaining its features and workflows with clear examples.</p>
      
      <h2>Core Features: Draft, Analyze, and Chat</h2>

      <div className="content-block">
          <h3>Draft a Message</h3>
          <p>Use this mode when you have a thought you need to share effectively.</p>
          <ul>
            <li><strong>What I Mean (Intent):</strong> Enter the core goal of your message.</li>
            <li><strong>What I Wrote (Draft):</strong> Enter your raw thoughts or a rough draft.</li>
            <li>The AI will then explain potential misinterpretations and provide a polished, translated draft.</li>
          </ul>
      </div>

      <div className="content-block">
          <h3>Analyze a Message</h3>
          <p>Use this mode when you receive a message that is confusing or has a hidden meaning.</p>
          <ul>
            <li><strong>What They Wrote:</strong> Paste the message you received.</li>
            <li><strong>What's the Situation? (Context):</strong> Briefly explain the circumstances (e.g., "This is from my boss, and the project is late."). This gives the AI crucial context.</li>
            <li><strong>How I Heard It:</strong> Explain how the message made you feel or what you think it means.</li>
            <li>The AI will then analyze the sender's likely intent and suggest a strategic response.</li>
          </ul>
      </div>

      <div className="content-block">
          <h3>Chat with the Coach</h3>
          <p>Use this real-time chat for more complex situations or for practicing your skills.</p>
          <ul>
            <li><strong>Get Real-time Advice:</strong> Describe a challenging situation and get instant, empathetic advice on how to navigate it.</li>
            <li><strong>Role-play a Conversation:</strong> Practice a difficult conversation in a safe space. For example, "Let's practice a performance review. You be my manager."</li>
            <li><strong>Brainstorm Solutions:</strong> Work through a communication problem step-by-step with the AI as your sounding board.</li>
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