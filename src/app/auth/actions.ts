
'use server';

import { getAuth as getAdminAuthSdk } from 'firebase-admin/auth';
import { getFirebaseAdminApp } from '@/lib/firebase-admin';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth as getClientAuth } from 'firebase/auth';
import { app as clientApp } from '@/lib/firebase';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';
import Stripe from 'stripe';

function getAdminAuth() {
  try {
    const app = getFirebaseAdminApp();
    return { auth: getAdminAuthSdk(app), adminDb: getAdminFirestore(app), error: null };
  } catch (error: any) {
    console.error("Failed to get Firebase Admin services:", error.message);
    return { auth: null, adminDb: null, error: error.message };
  }
}

export async function signUpWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!email || !password) {
    return {error: 'Email and password are required.'};
  }
  
  const { auth: adminAuth, adminDb, error: adminError } = getAdminAuth();
  
  if (adminError || !adminAuth || !adminDb) {
      return { error: adminError || 'Server is not configured for authentication. Please contact support.' };
  }
  
  try {
    // First, create the user on the client to get an ID token and a UID
    const clientAuth = getClientAuth(clientApp);
    const userCredential = await createUserWithEmailAndPassword(clientAuth, email, password);
    const user = userCredential.user;

    // Use the admin SDK to set a custom claim if needed or perform other server-side actions.
    // For now, we just create the profile document.
    
    // Create a customer in Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-04-10',
    });
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        firebaseUID: user.uid,
      },
    });

    await adminDb.collection('users').doc(user.uid).set({
        email: user.email,
        createdAt: new Date(),
        subscription: { status: 'free' },
        stripeCustomerId: customer.id,
    });
    
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
    // We only need to use the client SDK to sign in.
    // The onAuthStateChanged listener will handle the rest.
    const clientAuth = getClientAuth(clientApp);
    await signInWithEmailAndPassword(clientAuth, email, password);

    return {success: true};
  } catch (error: any) {
    // Catch specific Firebase auth errors for client-side sign-in
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        return {error: 'Invalid email or password.'};
    }
    console.error("Sign in error:", error);
    return {error: 'An unknown error occurred during sign in.'};
  }
}
