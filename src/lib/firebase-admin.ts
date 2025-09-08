
import { getApp, getApps, initializeApp, cert, App } from 'firebase-admin/app';

// =================================================================================================
// IMPORTANT SECURITY NOTICE / HOW TO USE THIS FILE
// =================================================================================================
// Because you are in a constrained development environment (iPad) that does not easily support
// environment variables, we are placing the service account key directly in the code.
//
// THIS IS NOT A SECURE PRACTICE FOR PRODUCTION.
// This key grants administrative access to your Firebase project.
// Do not share this code publicly or commit it to a public Git repository.
//
// TO MAKE THIS WORK:
// 1. Go to your Firebase Project Settings > Service Accounts.
// 2. Click "Generate new private key" to download the JSON file.
// 3. Open the downloaded file and copy its ENTIRE content.
// 4. Paste the content you copied to replace the `null` value for the
//    `serviceAccountJSON` variable below.
//
// Example:
// const serviceAccountJSON = { "type": "service_account", "project_id": "...", ... };
// =================================================================================================

const serviceAccountJSON = null;


let adminApp: App | null = null;

if (!getApps().length) {
  if (!serviceAccountJSON) {
    console.error(
      'CRITICAL: Firebase service account key is not pasted into src/lib/firebase-admin.ts. ' +
      'Server-side authentication actions will fail. ' +
      'Please follow the instructions in the file to add your key.'
    );
  } else {
    try {
      // The type assertion is safe here because we've already checked if it's null.
      const serviceAccount = serviceAccountJSON as any;

      adminApp = initializeApp({
        credential: cert(serviceAccount),
      });

    } catch (error: any) {
      console.error(
        'CRITICAL: Failed to initialize Firebase Admin SDK. ' +
        'The service account key in src/lib/firebase-admin.ts may be invalid. ' +
        `Error: ${error.message}`
      );
    }
  }
} else {
    adminApp = getApp();
}

/**
 * Retrieves the singleton instance of the Firebase Admin App.
 * Returns null if the app could not be initialized.
 */
export function getFirebaseAdminApp(): App | null {
    return adminApp;
}
