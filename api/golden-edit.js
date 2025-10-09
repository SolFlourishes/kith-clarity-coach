// api/golden-edit.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// --- Initialization Block (Assumes Firebase Admin SDK setup) ---
// This part should be configured securely in a real Vercel environment.
// For example, by loading a service account from an environment variable.
let db;
try {
  // Check if an app has already been initialized to prevent re-initialization in a hot-reloaded environment
  if (!initializeApp.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    initializeApp({
      credential: cert(serviceAccount)
    });
  }
  db = getFirestore();
} catch (error) {
  // Log the error but allow the function to run to return a 500 error to the client
  console.error("Firebase initialization failed:", error.message);
}
// ------------------------------------------------------------------

/**
 * Handles the POST request to save a user-validated "Golden Edit" to Firestore.
 * @param {object} req - The request object (should contain body with edit and context data).
 * @param {object} res - The response object.
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed. Only POST is supported.' });
  }

  if (!db) {
    return res.status(500).json({ message: 'Database connection failed. Please check server configuration.' });
  }

  const {
    mode,
    version,
    originalText,
    editedText,
    text,
    context,
    interpretation,
    analyzeContext
  } = req.body;

  // 1. Basic Validation for required fields
  if (!mode || !originalText || !editedText || !version) {
    return res.status(400).json({ message: 'Missing required fields: mode, originalText, editedText, and version are mandatory.' });
  }

  // 2. Prepare the data for saving
  const dataToSave = {
    // Core Edit Data
    mode,
    version,
    originalText,
    editedText,
    // Full Context from TranslatePage.jsx
    userText: text || null,
    userIntent: context || null,
    userInterpretation: interpretation || null,
    userAnalyzeContext: analyzeContext || null,
    // Metadata
    timestamp: new Date().toISOString(),
    source: 'web-app',
    // We intentionally do not collect personal identifiers for privacy.
    anonymousUserId: req.headers['x-forwarded-for'] || req.connection.remoteAddress, // Collect an anonymous IP for basic logging/rate limiting
  };
  
  // 3. Securely save the data to a new collection in Firestore
  try {
    const docRef = await db.collection('goldenEdits').add(dataToSave);
    
    // 4. Return a 200 success response
    return res.status(200).json({ 
      message: 'Golden Edit saved successfully.',
      id: docRef.id
    });
    
  } catch (error) {
    console.error("Error saving Golden Edit:", error);
    // 5. Return a 500 error response
    return res.status(500).json({ 
      message: 'Failed to save Golden Edit due to a server error.', 
      error: error.message 
    });
  }
};