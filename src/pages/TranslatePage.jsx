import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Feedback from '../components/Feedback.jsx';
import './TranslatePage.css';

function TranslatePage() {
    const { mode } = useParams();
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);
    const [senderStyle, setSenderStyle] = useState('let-ai-decide');
    const [receiverStyle, setReceiverStyle] = useState('indirect');
    const [senderNeurotype, setSenderNeurotype] = useState('unsure');
    const [receiverNeurotype, setReceiverNeurotype] = useState('unsure');
    const [senderGeneration, setSenderGeneration] = useState('unsure');
    const [receiverGeneration, setReceiverGeneration] = useState('unsure');
    const [text, setText] = useState('');
    const [context, setContext] = useState('');
    const [interpretation, setInterpretation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [aiResponse, setAiResponse] = useState(null);
    const [feedbackSuccess, setFeedbackSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setAiResponse(null);
        setFeedbackSuccess(null);
        let finalSenderStyle = senderStyle;
        const textForClassification = mode === 'draft' ? (context || text) : text;
        try {
            if (senderStyle === 'let-ai-decide') {
                if (!textForClassification) {
                    setError("Please provide text for the AI to analyze your style.");
                    setLoading(false);
                    return;
                }
                const classificationResponse = await axios.post('/api/classify-style', { text: textForClassification });
                finalSenderStyle = classificationResponse.data.style;
            }
            const requestBody = { mode, text, context, interpretation, sender: finalSenderStyle, receiver: receiverStyle, senderNeurotype, receiverNeurotype, senderGeneration, receiverGeneration };
            const translateResponse = await axios.post('/api/translate', requestBody);
            setAiResponse(translateResponse.data);
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleReset = () => {
        setText(''); setContext(''); setInterpretation(''); setError(null);
        setAiResponse(null); setFeedbackSuccess(null);
    };

    const handleFeedbackSubmit = async (feedbackData) => {
        try {
            await axios.post('/api/feedback', { ...feedbackData, mode, version: '2.1.0' });
            setFeedbackSuccess('Thank you for your feedback!');
        } catch (err) {
            console.error('Failed to submit feedback', err);
            setFeedbackSuccess('Sorry, could not submit feedback.');
        }
    };

    const isDraftMode = mode === 'draft';
    const boxes = {
        draft: [
            { id: 'intent-label', title: "What I Mean (Intent)", required: true, content: <textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="What is the goal of your message?" required />, isUserInput: true },
            { id: 'draft-label', title: "What I Wrote (Draft)", required: true, content: <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What are your key points or raw thoughts?" required />, isUserInput: true },
            { id: 'explanation-label', title: "How They Might Hear It (Explanation)", content: <div className="ai-output" dangerouslySetInnerHTML={{ __html: aiResponse?.explanation }} /> },
            { id: 'translation-label', title: "The Translation (Suggested Draft)", content: <div className="ai-output" dangerouslySetInnerHTML={{ __html: aiResponse?.response }} /> },
        ],
        analyze: [
            { id: 'received-label', title: "What They Wrote (Received Message)", required: true, content: <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste the message you received." required />, isUserInput: true },
            { id: 'interpretation-label', title: "How I Heard It (My Interpretation)", required: true, content: <textarea value={interpretation} onChange={(e) => setInterpretation(e.target.value)} placeholder="How did this message make you feel?" required />, isUserInput: true },
            { id: 'explanation-label-analyze', title: "What They Likely Meant (Explanation)", content: <div className="ai-output" dangerouslySetInnerHTML={{ __html: aiResponse?.explanation }} /> },
            { id: 'translation-label-analyze', title: "The Translation (Suggested Response)", content: <div className="ai-output" dangerouslySetInnerHTML={{ __html: aiResponse?.response }} /> },
        ]
    };
    const currentBoxes = boxes[mode] || [];

    return (
        <div className="translate-container">
            <Link to="/" className="back-link">‹ Back to Modes</Link>
            <h1>{isDraftMode ? 'Draft a Message' : 'Analyze a Message'}</h1>
            <p className="page-description">{isDraftMode ? "Clearly defining your intent helps the AI create a more accurate translation." : "Explaining your interpretation helps the AI understand the communication gap."}</p>
            
            <div className="selectors-container">
                <div className="selector-group">
                    <label>My Communication Style: <span className="tooltip-container">(i)<span className="tooltip-text"><strong>Direct & Literal:</strong> You say what you mean. <strong>Indirect & Nuanced:</strong> You use context and subtext.</span></span></label>
                    <div className="options">
                        {['direct', 'indirect', 'let-ai-decide'].map(style => (
                            <label key={style} className={senderStyle === style ? 'selected' : ''}>
                                <input type="radio" name="sender" value={style} checked={senderStyle === style} onChange={e => setSenderStyle(e.target.value)} />
                                {style.replace('-', ' ')}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="selector-group">
                    <label>Audience's Style:</label>
                    <div className="options">
                        {['direct', 'indirect'].map(style => (
                            <label key={style} className={receiverStyle === style ? 'selected' : ''}>
                                <input type="radio" name="receiver" value={style} checked={receiverStyle === style} onChange={e => setReceiverStyle(e.target.value)} />
                                {style}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="advanced-mode-toggle"><label><input type="checkbox" checked={isAdvancedMode} onChange={() => setIsAdvancedMode(!isAdvancedMode)} /> Show Advanced Options</label></div>
            {isAdvancedMode && (
                <div className="advanced-options">
                </div>
            )}
            
            <div className="four-box-grid">{currentBoxes.map(box => (<div key={box.id} className={`io-box ${box.isUserInput ? 'user-input' : ''}`}><h3 id={box.id}>{box.title}{box.required && <span className="required-asterisk"> *</span>}</h3>{box.content}</div>))}</div>
            <div className="button-group"><button onClick={handleSubmit} disabled={loading}>{loading ? 'Thinking...' : 'Translate'}</button><button type="button" onClick={handleReset} className="reset-button">Reset</button></div>
            {loading && <div className="loading-spinner">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            {aiResponse && (
                <div className="response-container">
                    <Feedback onSubmit={handleFeedbackSubmit} successMessage={feedbackSuccess} />
                </div>
            )}
        </div>
    );
}
export default TranslatePage;
