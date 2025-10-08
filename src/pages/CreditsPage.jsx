import React from 'react';
import '../Content.css';

function CreditsPage() {
  return (
    <div className="content-page">
      <h1>Credits & Attributions</h1>
      
      <div className="content-block">
        <h2>Founder & Visionary</h2>
        <p>The Clarity Coach was conceived, designed, and guided by the singular vision of <strong>Sol Roberts-Lieb, Ed.D.</strong> based on his life-long experience of being misunderstood. This application, including its core workflows for drafting and analyzing messages, the "intent-first" user interface, the concept of a conversational coach for neurotype communication, and the intellectual framework for translating between neurotypes, is the direct result of their insightful identification of a critical need and their dedication to building a tool that fosters empathy and understanding.</p>
      </div>
      <div className="content-block">
        <h2>Development Process</h2>
        <p>This application was developed in a unique, collaborative process where Sol Roberts-Lieb, Ed.D. served as the architect and product lead, providing the core concepts, user stories, real-world examples, and critical feedback that shaped the AI's logic and the application's user-focused design. Technical implementation was assisted by a large language model (Google's Gemini), which acted as a pair programmer and technical consultant under Dr. Roberts-Lieb's direction.</p>
      </div>
      <div className="content-block">
        <h2>Intellectual Property Notice</h2>
        <p>The concepts, methodologies, user interface designs, and workflows presented in this application are the intellectual property of Sol Roberts-Lieb, Ed.D. and Kith, LLC. This work is protected by copyright law. Unauthorized reproduction or distribution of this application, or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under the law.</p>
      </div>
      <div className="content-block">
        <h2>Scholarly Foundations</h2>
        <p>The AI's analysis is grounded in, and for future versions will be trained on, established academic concepts from the fields of sociology, linguistics, and psychology. This growing knowledge base ensures our responses are evidence-based and culturally competent. Key concepts include:</p>
        <ul>
          <li><strong>The Double Empathy Problem:</strong> A theory by Dr. Damian Milton suggesting that communication breakdowns between autistic and non-autistic people are a two-way issue of mutual misunderstanding, not a deficit in one party.</li>
          <li><strong>High-Context and Low-Context Cultures:</strong> A framework by anthropologist Edward T. Hall that explains how some cultures rely on implicit, shared context while others rely on explicit, direct information.</li>
          <li><strong>Pragmatic Language Differences:</strong> Linguistic research into the unwritten social rules of language that often differ between neurotypes.</li>
          <li><strong>Executive Function in Communication:</strong> Research from the field of ADHD studies (e.g., Dr. Russell Barkley) that explores how challenges with organization, memory, and impulsivity can impact communication style.</li>
        </ul>
      </div>
    </div>
  );
}
export default CreditsPage;