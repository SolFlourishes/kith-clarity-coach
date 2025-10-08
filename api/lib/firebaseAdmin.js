import admin from 'firebase-admin';

// This helper ensures Firebase is initialized only once per serverless instance.
if (!admin.apps.length) {
  try {
    // DIAGNOSTIC LOG: Check if the Firebase config variable exists.
    if (!process.env.VITE_FIREBASE_ADMIN_CONFIG) {
      throw new Error('SERVER ERROR: VITE_FIREBASE_ADMIN_CONFIG environment variable is not set.');
    }
    console.log('Firebase config variable is present.');

    const serviceAccount = JSON.parse(process.env.VITE_FIREBASE_ADMIN_CONFIG);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin initialized successfully."); // Success message
  } catch (error) {
    // This will now log the specific error to Vercel.
    console.error('Firebase admin initialization error:', error.stack);
  }
}

export default admin.firestore();

