import React, { useState } from 'react';
import './Feedback.css';

function Feedback({ type, onSubmit, isSuccess }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating > 0 && !isSuccess) {
            const feedbackData = type === 'explanation' 
                ? { explanationRating: rating, explanationComment: comment }
                : { responseRating: rating, responseComment: comment };
            onSubmit(feedbackData);
            setSubmitted(true); // Visually disable after one submission
        }
    };

    // If global success state is true, show a disabled/thank you state
    if (isSuccess || submitted) {
        return (
            <div className="feedback-form submitted">
                <p>Thank you for your rating!</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="feedback-form">
            <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <button
                            type="button"
                            key={ratingValue}
                            className={ratingValue <= (hover || rating) ? "on" : "off"}
                            onClick={() => setRating(ratingValue)}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(rating)}
                            aria-label={`${ratingValue} out of 5 stars for the ${type}`}
                        >
                            <span className="star">&#9733;</span>
                        </button>
                    );
                })}
            </div>
            <textarea
                placeholder="How could this be improved?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                aria-label={`Feedback comment for the ${type}`}
            />
            <button className="submit-feedback-button" type="submit" disabled={rating === 0}>
                Rate this {type}
            </button>
        </form>
    );
}
export default Feedback;