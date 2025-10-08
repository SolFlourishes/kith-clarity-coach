import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Feedback from '../components/Feedback.jsx';
import './TranslatePage.css';

const loadingTips = [
    "Average translation time is 5-10 seconds.",
    "Analyzing tone, subtext, and pragmatic meaning...",
    "Tip: Providing clear context leads to better translations.",
    "Did you know? The 'Double Empathy Problem' suggests communication gaps are a two-way street, not a deficit in one person.",
    "Checking for potential misinterpretations...",
    "Tip: Indirect communicators often use questions to make suggestions softly.",
    "Fact: High-context cultures rely heavily on non-verbal cues and shared understanding.",
    "Considering how different neurotypes might perceive this message...",
];

function TranslatePage() {
    const { mode } = useParams();
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);
    const [senderStyle, setSenderStyle] = useState('let-ai-decide');
    const [receiverStyle, setReceiverStyle] = useState('indirect');
    const generations = ['Gen Alpha', 'Gen Z', 'Millennial', 'Xennial', 'Gen X', 'Boomer', 'unsure'];
    const neurotypes = ['Autism', 'ADHD', 'Neurotypical', 'Unsure'];
    const [senderNeurotype, setSenderNeurotype] = useState('Unsure');
    const [receiverNeurotype, setReceiverNeurotype] = useState('Unsure');
    const [senderGeneration, setSenderGeneration] = useState('unsure');
    const [receiverGeneration, setReceiverGeneration] = useState('unsure');
    const [text, setText] = useState('');
    const [context, setContext] = useState('');
    const [interpretation, setInterpretation] = useState('');
    const [analyzeContext, setAnalyzeContext] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [aiResponse, setAiResponse] = useState(null);
    const [feedbackSuccess, setFeedbackSuccess] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState(loadingTips[0]);

    useEffect(() => {
        let interval;
        if (loading) {
            let tipIndex = 0;
            interval = setInterval(() => {
                tipIndex = (tipIndex + 1) % loadingTips.length;
                setLoadingMessage(loadingTips[tipIndex]);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [loading]);

    const handleCopy = (textToCopy, fieldName) => {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            alert(`Copied ${fieldName} to clipboard!`);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
    };

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
            const requestBody = { 
                mode, text, context, interpretation, 
                analyzeContext,
                sender: finalSenderStyle, 
                receiver: receiverStyle, 
                senderNeurotype, receiverNeurotype, 
                senderGeneration, receiverGeneration 
            };
            const translateResponse = await axios.post('/api/translate', requestBody);
            setAiResponse(translateResponse.data);
        } catch (err) {
            const message = err.response?.data?.message || 'An error occurred. Please try again.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleReset = () => {
        setText(''); setContext(''); setInterpretation(''); setAnalyzeContext(''); setError(null);
        setAiResponse(null); setFeedbackSuccess(null);
    };

    const handleFeedbackSubmit = async (feedbackData) => {
        try {
            const currentFeedback = aiResponse.feedback || {};
            const newFeedback = { ...currentFeedback, ...feedbackData };
            await axios.post('/api/feedback', { ...newFeedback, mode, version: '2.1.0' });
            setFeedbackSuccess('Thank you! Your feedback has been saved.');
            setAiResponse(prev => ({ ...prev, feedback: newFeedback })); 
        } catch (err) {
            console.error('Failed to submit feedback', err);
            setError('Sorry, could not submit feedback.');
        }
    };

    const isDraftMode = mode === 'draft';
    
    const boxes = {
        draft: [
            { id: 'intent-input', title: "What I Mean (Intent)", value: context, handler: (e) => setContext(e.target.value), placeholder: "What is the goal of your message?", required: true },
            { id: 'draft-input', title: "What I Wrote (Draft)", value: text, handler: (e) => setText(e.target.value), placeholder: "What are your key points or raw thoughts?", required: true },
        ],
        analyze: [
            { id: 'received-input', title: "What They Wrote", value: text, handler: (e) => setText(e.target.value), placeholder: "Paste the message you received.", required: true },
            { id: 'analyze-context-input', title: "What's the Situation? (Context)", value: analyzeContext, handler: (e) => setAnalyzeContext(e.target.value), placeholder: "e.g., This is my boss, the project is late...", required: false },
            { id: 'interpretation-input', title: "How I Heard It", value: interpretation, handler: (e) => setInterpretation(e.target.value), placeholder: "How did this message make you feel or what do you think it means?", required: true },
        ]
    };
    const currentInputBoxes = boxes[mode] || [];

    return (
        <div className="translate-container">
            <Link to="/" className="back-link">‹ Back to Modes</Link>
            <h1>{isDraftMode ? 'Draft a Message' : 'Analyze a Message'}</h1>
            <p className="page-description">{isDraftMode ? "Clearly defining your intent helps the AI create a more accurate translation." : "Explaining the situation and your interpretation helps the AI understand the communication gap."}</p>
            
            <form onSubmit={handleSubmit}>
                <div className="selectors-container">
                    <div className="selector-group">
                        <label>My Communication Style: <span className="tooltip-container" aria-label="Style information">(i)<span className="tooltip-text"><strong>Direct & Literal:</strong> You say what you mean. <br/><br/> <strong>Indirect & Nuanced:</strong> You use context and subtext.</span></span></label>
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
                        <div className="selector-group">
                            <label htmlFor="sender-nt-select">My Neurotype <span className="tooltip-container" aria-label="Neurotype information">(i)<span className="tooltip-text"><strong>Autism:</strong> May prefer direct, literal language and find subtext difficult. <br/><br/><strong>ADHD:</strong> May communicate in non-linear ways, valuing passion and interest. <br/><br/><strong>Neurotypical:</strong> The most common neurological development.</span></span></label>
                            <div className="options" id="sender-nt-select">{neurotypes.map(nt => (<label key={`sender-${nt}`} className={senderNeurotype === nt ? 'selected' : ''}><input type="radio" name="sender-nt" value={nt} checked={senderNeurotype === nt} onChange={e => setSenderNeurotype(e.target.value)} />{nt}</label>))}</div>
                        </div>
                        <div className="selector-group">
                            <label htmlFor="receiver-nt-select">Audience's Neurotype</label>
                            <div className="options" id="receiver-nt-select">{neurotypes.map(nt => (<label key={`receiver-${nt}`} className={receiverNeurotype === nt ? 'selected' : ''}><input type="radio" name="receiver-nt" value={nt} checked={receiverNeurotype === nt} onChange={e => setReceiverNeurotype(e.target.value)} />{nt}</label>))}</div>
                        </div>
                        <div className="selector-group">
                            <label>My Generation <span className="tooltip-container" aria-label="Generation information">(i)<span className="tooltip-text"><strong>Gen Alpha:</strong> ~2013+<br/><strong>Gen Z:</strong> ~1997-2012<br/><strong>Millennial:</strong> ~1981-1996<br/><strong>Xennial:</strong> ~1977-1983<br/><strong>Gen X:</strong> ~1965-1980<br/><strong>Boomer:</strong> ~1946-1964</span></span></label>
                            <div className="options">{generations.map(gen => (<label key={`sender-${gen}`} className={senderGeneration === gen ? 'selected' : ''}><input type="radio" name="sender-gen" value={gen} checked={senderGeneration === gen} onChange={e => setSenderGeneration(e.target.value)} />{gen}</label>))}</div>
                        </div>
                        <div className="selector-group">
                            <label>Audience's Generation</label>
                            <div className="options">{generations.map(gen => (<label key={`receiver-${gen}`} className={receiverGeneration === gen ? 'selected' : ''}><input type="radio" name="receiver-gen" value={gen} checked={receiverGeneration === gen} onChange={e => setReceiverGeneration(e.target.value)} />{gen}</label>))}</div>
                        </div>
                    </div>
                )}

                <div className={`input-grid ${isDraftMode ? 'draft-mode' : 'analyze-mode'}`}>
                    {currentInputBoxes.map(box => (
                        <div key={box.id} className="io-box user-input">
                            <div className="box-header">
                                <label htmlFor={box.id} className="box-title">{box.title}{box.required && <span className="required-asterisk"> *</span>}</label>
                                <button type="button" className="copy-button" onClick={() => handleCopy(box.value, box.title)} aria-label={`Copy ${box.title}`}>Copy</button>
                            </div>
                            <textarea id={box.id} value={box.value} onChange={box.handler} placeholder={box.placeholder} required={box.required} />
                        </div>
                    ))}
                </div>

                <div className="button-group">
                    <button type="submit" className="translate-button" disabled={loading}>{loading ? loadingMessage : 'Translate'}</button>
                    <button type="button" onClick={handleReset} className="reset-button">Reset</button>
                </div>

                {error && <div className="error-message" role="alert">{error}</div>}
            </form>

            {aiResponse && (
                <div className="response-container" aria-live="polite">
                    <div className="io-box">
                        <h3 className="box-title">{isDraftMode ? "How They Might Hear It (Explanation)" : "What They Likely Meant (Explanation)"}</h3>
                        <div className="ai-output" dangerouslySetInnerHTML={{ __html: aiResponse.explanation }} />
                        <Feedback type="explanation" onSubmit={handleFeedbackSubmit} isSuccess={!!aiResponse.feedback?.explanationRating} />
                    </div>
                    <div className="io-box">
                        <h3 className="box-title">{isDraftMode ? "The Translation (Suggested Draft)" : "The Translation (Suggested Response)"}</h3>
                        <div className="ai-output" dangerouslySetInnerHTML={{ __html: aiResponse.response }} />
                        <Feedback type="response" onSubmit={handleFeedbackSubmit} isSuccess={!!aiResponse.feedback?.responseRating} />
                    </div>
                    {feedbackSuccess && !aiResponse.feedback?.explanationRating && !aiResponse.feedback?.responseRating && <div className="success-message-global" role="alert">{feedbackSuccess}</div>}
                </div>
            )}
        </div>
    );
}
export default TranslatePage;