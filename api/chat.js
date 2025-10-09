// api/chat.js

import axios from 'axios';

async function getAiChatResponse(history) {
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    // NOTE: This URL is non-streaming and is confirmed to be working.
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=${apiKey}`;
    
    const SYSTEM_PROMPT_CONTENT = `You are the Clarity Coach, an expert in neurodivergent-affirming communication. Your tone is empathetic, insightful, and supportive. Use HTML for formatting.`;

    const contents = history.map(msg => ({ 
        role: msg.role === 'user' ? 'user' : 'model', 
        parts: [{ text: msg.content }] 
    }));
    
    // Payload structure for non-streaming REST API
    const body = { 
        contents, 
        // **CRITICAL FIX: systemInstruction is top-level Content object**
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT_CONTENT }] }
    }; 

    try {
        const response = await axios.post(url, body, { headers: { 'Content-Type': 'application/json' } });
        
        // **SAFETY CHECK ADDED**
        if (!response.data.candidates || response.data.candidates.length === 0) {
            console.error('Gemini API Blocked:', response.data.promptFeedback);
            // Return a user-friendly message in the chat
            return '<p>I\'m sorry, but I can\'t respond to that. The input was blocked by my safety filters. Could you please rephrase?</p>';
        }

        return response.data.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error('Gemini API Error:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get chat response from AI');
    }
}

export default async function handler(req, res) {
    console.log('--- /api/chat function invoked ---');
    if (!process.env.VITE_GEMINI_API_KEY) {
        console.error('SERVER ERROR: VITE_GEMINI_API_KEY is not set.');
        return res.status(500).json({ message: 'Server configuration error: Missing Gemini API Key.' });
    }
    console.log('Gemini API Key is present.');

    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
    const { history } = req.body;
    if (!history) return res.status(400).json({ message: 'History is required.' });
    try {
        const aiMessage = await getAiChatResponse(history);
        res.status(200).json({ reply: aiMessage });
    } catch (error) {
        res.status(500).json({ message: 'Error getting response.' });
    }
}