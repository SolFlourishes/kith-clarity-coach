import React from 'react';
import { Link } from 'react-router-dom';
import './ModeCard.css';

function ModeCard({ title, description, linkTo }) {
  return (
    <Link to={linkTo} className="mode-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}
export default ModeCard;
