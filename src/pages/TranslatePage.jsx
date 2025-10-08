import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Feedback from '../components/Feedback.jsx';
import './TranslatePage.css';

// Tips for the loading indicator
const loadingTips = [
    "Average translation time is 5-10 seconds.",
    "Tip: Direct communicators often appreciate getting to the point quickly.",
    "Tip: Indirect communicators may use questions to make suggestions.",
    "Did you know? The 'Double Empathy Problem' suggests communication gaps are a two-way street.",
    "For best results, provide as much context as you can.",
    "The AI is analyzing grammar, tone, and subtext.",
];

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
    const [analyzeContext, setAnalyzeContext] = useState(''); // New state for Analyze mode context
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [aiResponse, setAiResponse] = useState(null);
    const [feedbackSuccess, setFeedbackSuccess] = useState(null);

    // State for the dynamic loading message
    const [loadingMessage, setLoadingMessage] = useState(loadingTips[0]);

    // Effect to cycle through loading tips
    useEffect(() => {
        let interval;
        if (loading) {
            let tipIndex = 0;
            setLoadingMessage(loadingTips[tipIndex]); // Set initial tip
            interval = setInterval(() => {
                tipIndex = (tipIndex + 1) % loadingTips.length;
                setLoadingMessage(loadingTips[tipIndex]);
            }, 3000); // Change tip every 3 seconds
        }
        return () => clearInterval(interval);
    }, [loading]);


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
                analyzeContext, // Pass new context to backend
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
            await axios.post('/api/feedback', { ...feedbackData, mode, version: '2.1.0' });
            setFeedbackSuccess('Thank you for your feedback!');
        } catch (err) {
            console.error('Failed to submit feedback', err);
            setFeedbackSuccess('Sorry, could not submit feedback.');
        }
    };

    const isDraftMode = mode === 'draft';
    
    // Updated box layouts
    const boxes = {
        draft: [
            { id: 'intent-input', title: "What I Mean (Intent)", required: true, content: <textarea id="intent-input" value={context} onChange={(e) => setContext(e.target.value)} placeholder="What is the goal of your message?" required />, isUserInput: true },
            { id: 'draft-input', title: "What I Wrote (Draft)", required: true, content: <textarea id="draft-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="What are your key points or raw thoughts?" required />, isUserInput: true },
        ],
        analyze: [
            { id: 'received-input', title: "What They Wrote (Received Message)", required: true, content: <textarea id="received-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste the message you received." required />, isUserInput: true },
            { id: 'analyze-context-input', title: "What's the situation? (Context)", required: false, content: <textarea id="analyze-context-input" value={analyzeContext} onChange={(e) => setAnalyzeContext(e.target.value)} placeholder="e.g., This is my boss, we have a good relationship but this seems short." />, isUserInput: true },
            { id: 'interpretation-input', title: "How I Heard It (My Interpretation)", required: true, content: <textarea id="interpretation-input" value={interpretation} onChange={(e) => setInterpretation(e.target.value)} placeholder="How did this message make you feel or what do you think it means?" required />, isUserInput: true },
        ]
    };

    const outputBoxes = [
        { id: 'explanation-output', title: isDraftMode ? "How They Might Hear It (Explanation)" : "What They Likely Meant (Explanation)", content: <div className="ai-output" dangerouslySetInnerHTML={{ __html: aiResponse?.explanation }} /> },
        { id: 'translation-output', title: isDraftMode ? "The Translation (Suggested Draft)" : "The Translation (Suggested Response)", content: <div className="ai-output" dangerouslySetInnerHTML={{ __html: aiResponse?.response }} /> },
    ];

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
                        {/* Re-implemented Advanced Options */}
                        <div className="selector-group">
                            <label htmlFor="sender-nt-select">My Neurotype (Advanced)</label>
                            <div className="options" id="sender-nt-select">
                                {['neurodivergent', 'neurotypical', 'unsure'].map(nt => (
                                    <label key={`sender-${nt}`} className={senderNeurotype === nt ? 'selected' : ''}>
                                        <input type="radio" name="sender-nt" value={nt} checked={senderNeurotype === nt} onChange={e => setSenderNeurotype(e.target.value)} />
                                        {nt}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="selector-group">
                            <label htmlFor="receiver-nt-select">Audience's Neurotype (Advanced)</label>
                            <div className="options" id="receiver-nt-select">
                                {['neurodivergent', 'neurotypical', 'unsure'].map(nt => (
                                    <label key={`receiver-${nt}`} className={receiverNeurotype === nt ? 'selected' : ''}>
                                        <input type="radio" name="receiver-nt" value={nt} checked={receiverNeurotype === nt} onChange={e => setReceiverNeurotype(e.target.value)} />
                                        {nt}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="selector-group">
                            <label htmlFor="sender-gen-select">My Generation (Advanced)</label>
                            <div className="options" id="sender-gen-select">
                                {['Gen Z', 'Millennial', 'Gen X', 'Boomer', 'unsure'].map(gen => (
                                    <label key={`sender-${gen}`} className={senderGeneration === gen ? 'selected' : ''}>
                                        <input type="radio" name="sender-gen" value={gen} checked={senderGeneration === gen} onChange={e => setSenderGeneration(e.target.value)} />
                                        {gen}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="selector-group">
                            <label htmlFor="receiver-gen-select">Audience's Generation (Advanced)</label>
                            <div className="options" id="receiver-gen-select">
                                {['Gen Z', 'Millennial', 'Gen X', 'Boomer', 'unsure'].map(gen => (
                                    <label key={`receiver-${gen}`} className={receiverGeneration === gen ? 'selected' : ''}>
                                        <input type="radio" name="receiver-gen" value={gen} checked={receiverGeneration === gen} onChange={e => setReceiverGeneration(e.target.value)} />
                                        {gen}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className={`input-grid ${isDraftMode ? 'draft-mode' : 'analyze-mode'}`}>
                    {currentInputBoxes.map(box => (
                        <div key={box.id} className="io-box user-input">
                            <label htmlFor={box.id} className="box-title">
                                {box.title}
                                {box.required && <span className="required-asterisk"> *</span>}
                            </label>
                            {box.content}
                        </div>
                    ))}
                </div>

                <div className="button-group">
                    <button type="submit" disabled={loading}>{loading ? 'Thinking...' : 'Translate'}</button>
                    <button type="button" onClick={handleReset} className="reset-button">Reset</button>
                </div>

                {loading && <div className="loading-message" aria-live="polite">{loadingMessage}</div>}
                {error && <div className="error-message" role="alert">{error}</div>}

                {aiResponse && (
                    <div className="response-container" aria-live="polite">
                        <div className="output-grid">
                            {outputBoxes.map(box => (
                                <div key={box.id} className="io-box">
                                    <h3 id={box.id} className="box-title">{box.title}</h3>
                                    {box.content}
                                </div>
                            ))}
                        </div>
                        <Feedback onSubmit={handleFeedbackSubmit} successMessage={feedbackSuccess} />
                    </div>
                )}
            </form>
        </div>
    );
}
export default TranslatePage;

