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
        
        // **SAFETY CHECK ADDED**
        // Check if the response was blocked by safety settings
        if (!response.data.candidates || response.data.candidates.length === 0) {
            console.error('Gemini API Blocked:', response.data.promptFeedback);
            throw new Error('The request was blocked by the API\'s safety settings.');
        }

        return response.data.candidates[0].content.parts[0].text;

    } catch (error) {
        // Log the detailed error, whether it's from safety or another network issue
        console.error('Gemini API Error:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get response from AI');
    }
}

export default async function handler(req, res) {
    console.log('--- /api/translate function invoked ---');
    if (!process.env.VITE_GEMINI_API_KEY) {
        console.error('SERVER ERROR: VITE_GEMINI_API_KEY is not set.');
        return res.status(500).json({ message: 'Server configuration error: Missing Gemini API Key.' });
    }
    
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
    const { mode, text, context, interpretation, sender, receiver, senderNeurotype, receiverNeurotype, senderGeneration, receiverGeneration } = req.body;
    let prompt;
    if (mode === 'draft') {
        prompt = `**Objective:** Translate a message. **My Role:** SENDER (Style: ${sender}). **Audience Role:** RECEIVER (Style: ${receiver}). **My Intent:** ${context}. **My Draft:** ${text}. **Advanced Context:** My Neurotype: ${senderNeurotype}, Audience's Neurotype: ${receiverNeurotype}, My Generation: ${senderGeneration}, Audience's Generation: ${receiverGeneration}. **Task:** 1. Explain potential misinterpretations. 2. Provide an effective translation. **Output Format (Strict JSON):** {"explanation": "HTML explanation...", "response": "HTML response..."}`;
    } else {
        prompt = `**Objective:** Analyze a message. **My Role:** RECEIVER (Style: ${receiver}). **Audience Role:** SENDER (Style: ${sender}). **Received Message:** ${text}. **My Interpretation:** ${interpretation}. **Advanced Context:** My Neurotype: ${receiverNeurotype}, Audience's Neurotype: ${senderNeurotype}, My Generation: ${receiverGeneration}, Audience's Generation: ${senderGeneration}. **Task:** 1. Analyze the sender's likely intent. 2. Suggest a strategic response. **Output Format (Strict JSON):** {"explanation": "HTML explanation...", "response": "HTML response..."}`;
    }
    try {
        const aiResponseText = await getAiResponse(prompt);
        const cleanedJsonText = extractJson(aiResponseText);
        try {
            const jsonResponse = JSON.parse(cleanedJsonText);
            res.status(200).json(jsonResponse);
        } catch (parseError) {
             console.error("Failed to parse AI response after cleaning:", cleanedJsonText);
             res.status(500).json({ message: 'Error parsing AI response.' });
        }
    } catch (error) {
        // Pass the more specific error message to the frontend if available
        const errorMessage = error.message.includes('safety settings') 
            ? 'Input blocked by safety filters. Please rephrase your text.'
            : 'Error processing your request.';
        res.status(500).json({ message: errorMessage });
    }
}

