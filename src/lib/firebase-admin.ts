
import { getApp, getApps, initializeApp, cert, App } from 'firebase-admin/app';

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

let adminApp: App | undefined;

function initializeAdminApp(): App | null {
  if (getApps().some(app => app.name === 'firebase-admin-app')) {
    return getApp('firebase-admin-app');
  }
  
  if (!serviceAccountKey) {
    console.error(
      'CRITICAL: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Firebase Admin SDK cannot be initialized. Server-side authentication actions will fail.'
    );
    return null;
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    const adminAppConfig = {
      credential: cert(serviceAccount),
    };
    return initializeApp(adminAppConfig, 'firebase-admin-app');
  } catch (error) {
    console.error('CRITICAL: Error parsing FIREBASE_SERVICE_ACCOUNT_KEY or initializing admin app:', error);
    return null;
  }
}

export function getFirebaseAdminApp(): App {
    if (!adminApp) {
        adminApp = initializeAdminApp() ?? undefined;
    }
    if (!adminApp) {
        throw new Error('Firebase Admin App is not available. Please check server logs for configuration errors.');
    }
    return adminApp;
}
