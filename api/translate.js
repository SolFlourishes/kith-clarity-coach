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
        
        // Safety check for blocked responses
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
    
    // Using a more concise prompt to prevent response truncation
    const { mode, text, context, interpretation, sender, receiver, senderNeurotype, receiverNeurotype, senderGeneration, receiverGeneration } = req.body;
    let prompt;
    if (mode === 'draft') {
        prompt = `SENDER (${sender}, NT:${senderNeurotype}, Gen:${senderGeneration}) to RECEIVER (${receiver}, NT:${receiverNeurotype}, Gen:${receiverGeneration}). INTENT: ${context}. DRAFT: ${text}. TASK: Explain misinterpretations, then suggest a better draft. Respond with STRICT JSON: {"explanation":"html...","response":"html..."}`;
    } else {
        prompt = `SENDER (${sender}, NT:${senderNeurotype}, Gen:${senderGeneration}) writing to me, RECEIVER (${receiver}, NT:${receiverNeurotype}, Gen:${receiverGeneration}). MESSAGE: ${text}. MY INTERPRETATION: ${interpretation}. TASK: Analyze sender's intent, then suggest a response. Respond with STRICT JSON: {"explanation":"html...","response":"html..."}`;
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

