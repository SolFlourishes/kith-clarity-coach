import axios from 'axios';

async function getAiResponse(prompt) {
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=${apiKey}`;
    const headers = { 'Content-Type': 'application/json' };
    const body = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.4, topK: 1, topP: 1, maxOutputTokens: 2048 } };

    try {
        const response = await axios.post(url, body, { headers });
        if (response.data && response.data.candidates && response.data.candidates.length > 0) {
            return response.data.candidates[0].content.parts[0].text;
        }
        throw new Error('Invalid AI response structure');
    } catch (error) {
        console.error('Gemini API Error:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get response from AI');
    }
}

export default async function handler(req, res) {
    // DIAGNOSTIC LOGS
    console.log('--- /api/translate function invoked ---');
    if (!process.env.VITE_GEMINI_API_KEY) {
        console.error('SERVER ERROR: VITE_GEMINI_API_KEY is not set.');
        return res.status(500).json({ message: 'Server configuration error: Missing Gemini API Key.' });
    }
    console.log('Gemini API Key is present.');
    
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
        try {
            const jsonResponse = JSON.parse(aiResponseText);
            res.status(200).json(jsonResponse);
        } catch (parseError) {
             console.error("Failed to parse AI response:", aiResponseText);
             res.status(500).json({ message: 'Error parsing AI response.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error processing your request.' });
    }
}

