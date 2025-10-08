import React, { useState } from 'react';
import './Feedback.css';

function Feedback({ onSubmit, successMessage }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating > 0) {
            onSubmit({ responseRating: rating, responseComment: comment });
        }
    };

    if (successMessage) {
        return <div className="success-message">{successMessage}</div>;
    }

    return (
        <div className="feedback-container">
            <h4>Was this translation helpful?</h4>
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || rating) ? "on" : "off"}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <span className="star">&#9733;</span>
                        </button>
                    );
                })}
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Optional: How could it be improved?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit" disabled={rating === 0}>Submit Feedback</button>
            </form>
        </div>
    );
}
export default Feedback;
