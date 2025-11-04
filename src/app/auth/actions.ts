
'use server';

import { getAuth as getAdminAuthSdk } from 'firebase-admin/auth';
import { getFirebaseAdminApp } from '@/lib/firebase-admin';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth as getClientAuth } from 'firebase/auth';
import { app as clientApp } from '@/lib/firebase';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';
import Stripe from 'stripe';

function getAdminServices() {
  try {
    const app = getFirebaseAdminApp();
    return { adminDb: getAdminFirestore(app), error: null };
  } catch (error: any) {
    console.error("Failed to get Firebase Admin services:", error.message);
    return { adminDb: null, error: error.message };
  }
}

export async function createUserProfile(uid: string, email: string) {
    const { adminDb, error: adminError } = getAdminServices();

    if (adminError || !adminDb) {
        return { error: adminError || 'Server is not configured correctly.' };
    }

    try {
        const userDoc = await adminDb.collection('users').doc(uid).get();
        if (userDoc.exists) {
            return { success: true, message: 'Profile already exists.' };
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2024-04-10',
        });

        const customer = await stripe.customers.create({
            email: email,
            metadata: {
                firebaseUID: uid,
            },
        });

        await adminDb.collection('users').doc(uid).set({
            email: email,
            createdAt: new Date(),
            subscription: { status: 'free' },
            stripeCustomerId: customer.id,
        });

        return { success: true };
    } catch (error: any) {
        console.error("Error creating user profile:", error);
        return { error: 'Failed to create user profile on the server.' };
    }
}


export async function signUpWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!email || !password) {
    return {error: 'Email and password are required.'};
  }
  
  try {
    // This step ONLY creates the user in Firebase Auth on the client.
    // The useAuth hook will handle creating the profile document.
    const clientAuth = getClientAuth(clientApp);
    await createUserWithEmailAndPassword(clientAuth, email, password);
    return {success: true};
  } catch (error: any) {
    if (error.code === 'auth/email-already-exists' || error.code === 'auth/email-already-in-use') {
        return { error: 'This email address is already in use. Please log in or use a different email.' };
    }
    console.error("Sign up error:", error);
    return {error: 'An unknown error occurred during sign up. Please try again.'};
  }
}

export async function signInWithEmail(formData: FormData) {
   const email = formData.get('email') as string;
   const password = formData.get('password') as string;

  if (!email || !password) {
    return {error: 'Email and password are required.'};
  }
  
  try {
    const clientAuth = getClientAuth(clientApp);
    await signInWithEmailAndPassword(clientAuth, email, password);

    return {success: true};
  } catch (error: any) {
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        return {error: 'Invalid email or password.'};
    }
    console.error("Sign in error:", error);
    return {error: 'An unknown error occurred during sign in.'};
  }
}
