import axios from 'axios';

// Helper function to extract JSON from a markdown-formatted string
function extractJson(text) {
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = text.match(jsonRegex);
    if (match && match[1]) {
        return match[1].trim();
    }
    return text.trim();
}

async function getAiResponse(prompt) {
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=${apiKey}`;
    const headers = { 'Content-Type': 'application/json' };
    const body = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.4, topK: 1, topP: 1, maxOutputTokens: 2048 } };

    try {
        const response = await axios.post(url, body, { headers });
        
        if (!response.data.candidates || response.data.candidates.length === 0) {
            console.error('Gemini API Blocked:', response.data.promptFeedback);
            throw new Error('The request was blocked by the API\'s safety settings.');
        }
        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Gemini API Error:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get response from AI');
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
    
    // Updated to include analyzeContext
    const { mode, text, context, interpretation, analyzeContext, sender, receiver, senderNeurotype, receiverNeurotype, senderGeneration, receiverGeneration } = req.body;
    let prompt;
    if (mode === 'draft') {
        prompt = `
            ROLE: Act as a communication coach.
            TASK: Analyze the DRAFT based on SENDER and RECEIVER styles. BE CONCISE.
            1. Explain potential misinterpretations in simple HTML.
            2. Rewrite the DRAFT for the receiver in simple HTML.
            OUTPUT: Respond with STRICT JSON: {"explanation":"<p>analysis...</p>","response":"<p>rewrite...</p>"}.
            ---
            SENDER STYLE: ${sender}
            RECEIVER STYLE: ${receiver}
            INTENT: ${context}
            DRAFT: ${text}
        `;
    } else {
        prompt = `
            ROLE: Act as a communication coach.
            TASK: Analyze the MESSAGE based on SENDER and RECEIVER styles. BE CONCISE.
            1. Explain the sender's likely intent in simple HTML.
            2. Suggest a strategic response in simple HTML.
            OUTPUT: Respond with STRICT JSON: {"explanation":"<p>analysis...</p>","response":"<p>rewrite...</p>"}.
            ---
            SENDER STYLE: ${sender}
            RECEIVER STYLE: ${receiver}
            SITUATION: ${analyzeContext}
            MESSAGE: ${text}
            MY INTERPRETATION: ${interpretation}
        `;
    }

    try {
        const aiResponseText = await getAiResponse(prompt);
        const cleanedJsonText = extractJson(aiResponseText);
        try {
            const jsonResponse = JSON.parse(cleanedJsonText);
            res.status(200).json(jsonResponse);
        } catch (parseError) {
             console.error("Failed to parse AI response after cleaning:", cleanedJsonText);
             res.status(500).json({ message: 'Error: The AI response was incomplete. Please try again.' });
        }
    } catch (error) {
        const errorMessage = error.message.includes('safety settings') 
            ? 'Input blocked by safety filters. Please rephrase your text.'
            : 'Error processing your request.';
        res.status(500).json({ message: errorMessage });
    }
}