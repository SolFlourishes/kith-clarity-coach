import { Resend } from 'resend';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const resend = new Resend(process.env.VITE_RESEND_API_KEY);
    try {
        await resend.contacts.create({ email, audienceId: process.env.VITE_RESEND_AUDIENCE_ID });
        return res.status(200).json({ message: 'Subscription successful!' });
    } catch (error) {
        console.error('Resend API Error:', error);
        return res.status(500).json({ error: 'Failed to subscribe.' });
    }
}
