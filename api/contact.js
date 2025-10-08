import db from './lib/firebaseAdmin.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    try {
        const contactData = { ...req.body, timestamp: new Date() };
        await db.collection('generalFeedback').add(contactData);
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error submitting contact form to Firestore:', error);
        res.status(500).json({ message: 'Failed to send message' });
    }
}
