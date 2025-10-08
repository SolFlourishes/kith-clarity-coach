import admin from 'firebase-admin';

// This helper ensures Firebase is initialized only once per serverless instance.
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.VITE_FIREBASE_ADMIN_CONFIG);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error.stack);
  }
}

export default admin.firestore();
