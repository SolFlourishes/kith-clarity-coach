import axios from 'axios';

async function getAiClassification(text) {
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=${apiKey}`;
    const prompt = `Analyze the text and classify its style as "direct" or "indirect". Text: "${text}". Return only JSON: {"style": "your_classification"}`;
    const body = { contents: [{ parts: [{ text: prompt }] }] };
    try {
        const response = await axios.post(url, body, { headers: { 'Content-Type': 'application/json' } });
        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Gemini API Error:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get classification from AI');
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Text is required.' });
    try {
        const classificationText = await getAiClassification(text);
        res.status(200).json(JSON.parse(classificationText));
    } catch (error) {
        res.status(500).json({ message: 'Error processing classification.' });
    }
}
