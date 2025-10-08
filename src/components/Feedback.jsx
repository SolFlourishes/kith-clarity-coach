import React, { useState } from 'react';
import './Feedback.css';

// Reusable Star Rating Component
const StarRating = ({ title, rating, setRating, hover, setHover }) => (
    <div className="rating-section">
        <label>{title}</label>
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
                        aria-label={`${ratingValue} out of 5 stars`}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    </div>
);


function Feedback({ onSubmit, successMessage }) {
    const [explanationRating, setExplanationRating] = useState(0);
    const [explanationComment, setExplanationComment] = useState('');
    const [explanationHover, setExplanationHover] = useState(0);

    const [responseRating, setResponseRating] = useState(0);
    const [responseComment, setResponseComment] = useState('');
    const [responseHover, setResponseHover] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (explanationRating > 0 || responseRating > 0) {
            onSubmit({ 
                explanationRating, 
                explanationComment,
                responseRating,
                responseComment
            });
        }
    };

    if (successMessage) {
        return <div className="success-message">{successMessage}</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="feedback-form">
            <h4 className="feedback-title">Was this helpful?</h4>
            <div className="feedback-grid">
                <div className="feedback-block">
                    <StarRating 
                        title="Rate the Explanation"
                        rating={explanationRating}
                        setRating={setExplanationRating}
                        hover={explanationHover}
                        setHover={setExplanationHover}
                    />
                    <textarea
                        placeholder="How could the explanation be improved?"
                        value={explanationComment}
                        onChange={(e) => setExplanationComment(e.target.value)}
                        aria-label="Feedback for the explanation"
                    />
                </div>
                <div className="feedback-block">
                     <StarRating 
                        title="Rate the Suggested Response"
                        rating={responseRating}
                        setRating={setResponseRating}
                        hover={responseHover}
                        setHover={setResponseHover}
                    />
                    <textarea
                        placeholder="How could the response be improved?"
                        value={responseComment}
                        onChange={(e) => setResponseComment(e.target.value)}
                        aria-label="Feedback for the suggested response"
                    />
                </div>
            </div>
            <button type="submit" disabled={explanationRating === 0 && responseRating === 0}>
                Submit Feedback
            </button>
        </form>
    );
}
export default Feedback;

