import React from 'react';
import './AlphaBanner.css';

function AlphaBanner({ onDismiss }) {
  return (
    <div className="alpha-banner">
      <p><strong>Welcome to the Clarity Coach Beta!</strong> This is an early version of the app. Your insights are invaluable.</p>
      <button onClick={onDismiss} className="dismiss-button">×</button>
    </div>
  );
}
export default AlphaBanner;
