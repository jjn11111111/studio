
import { initializeApp, getApps, App } from 'firebase-admin/app';

const ADMIN_APP_NAME = 'firebase-admin-app-workaround';

function initializeAdminApp(): App {
  const existingApp = getApps().find(app => app.name === ADMIN_APP_NAME);
  if (existingApp) {
    return existingApp;
  }

  // When deployed in a Google Cloud environment (like App Hosting),
  // the SDK automatically detects the service account credentials.
  // No explicit configuration is needed.
  try {
    return initializeApp({}, ADMIN_APP_NAME);
  } catch (error: any) {
    console.error('Failed to initialize Firebase Admin app:', error);
    throw new Error(`Failed to initialize Firebase Admin SDK: ${error.message}`);
  }
}

/**
 * Retrieves the singleton instance of the Firebase Admin App.
 * This function will throw an error if the admin app cannot be initialized.
 */
export function getFirebaseAdminApp(): App {
  return initializeAdminApp();
}
