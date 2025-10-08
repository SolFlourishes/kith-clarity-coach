import db from './lib/firebaseAdmin.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    try {
        const feedbackData = { ...req.body, timestamp: new Date() };
        await db.collection('ratingsFeedback').add(feedbackData);
        res.status(200).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error submitting feedback to Firestore:', error);
        res.status(500).json({ message: 'Failed to submit feedback' });
    }
}
