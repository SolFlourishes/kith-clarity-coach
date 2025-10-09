// api/classify-style.js

import axios from 'axios';

// Helper function to extract JSON from a markdown-formatted string
function extractJson(text) {
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = text.match(jsonRegex);
    if (match && match[1]) {
        return match[1].trim();
    }
    // If no markdown block is found, assume the whole string is the JSON
    return text.trim();
}

async function getAiClassification(text) {
    // CRITICAL FIX: Use VITE_GEMINI_API_KEY to match Vercel environment
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    
    // Note: Using the non-streaming endpoint as the response is small and quick
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=${apiKey}`;
    
    const prompt = `Analyze the text and classify its style as "direct" or "indirect". Text: "${text}". Return only JSON: {"style": "your_classification"}`;
    const body = { contents: [{ parts: [{ text: prompt }] }] };
    
    try {
        const response = await axios.post(url, body, { headers: { 'Content-Type': 'application/json' } });
        
        // Safety check
        if (!response.data.candidates || response.data.candidates.length === 0) {
            console.error('Gemini API Blocked:', response.data.promptFeedback);
            throw new Error('The request was blocked by the API\'s safety settings.');
        }

        return response.data.candidates[0].content.parts[0].text;

    } catch (error) {
        // Log the full error response data if available
        console.error('Gemini API Error:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get classification from AI');
    }
}

export default async function handler(req, res) {
    console.log('--- /api/classify-style function invoked ---');
    
    // CRITICAL CHECK: Ensure the key is present
    if (!process.env.VITE_GEMINI_API_KEY) {
        console.error('SERVER ERROR: VITE_GEMINI_API_KEY is not set.');
        return res.status(500).json({ message: 'Server configuration error: Missing Gemini API Key.' });
    }
    console.log('Gemini API Key is present.');

    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
    
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Text is required.' });

    try {
        const classificationText = await getAiClassification(text);
        const cleanedJsonText = extractJson(classificationText); // Clean the response
        
        try {
            const jsonResponse = JSON.parse(cleanedJsonText);
            res.status(200).json(jsonResponse);
        } catch(parseError) {
            console.error("Failed to parse AI classification response after cleaning:", cleanedJsonText);
            res.status(500).json({ message: 'Error parsing AI response.' });
        }
        
    } catch (error) {
        const errorMessage = error.message.includes('safety settings') 
            ? 'Input blocked by safety filters. Please rephrase your text.'
            : 'Error processing your request.';
        res.status(500).json({ message: errorMessage });
    }
}