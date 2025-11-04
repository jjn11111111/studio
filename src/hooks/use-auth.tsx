
'use client';

import React, {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {onAuthStateChanged, User, getAuth} from 'firebase/auth';
import {app} from '@/lib/firebase';
import {Loader2} from 'lucide-react';
import {useRouter, usePathname} from 'next/navigation';
import { getUserProfile, UserProfile } from '@/lib/firestore';
import { createUserProfile } from '@/app/auth/actions';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  idToken: string | null;
  isLoading: boolean;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PROTECTED_ROUTES = ['/profile', '/journal', '/exercise'];


export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth(app);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        setIdToken(token);
        
        let profile = await getUserProfile(user.uid);

        // If no profile exists, create it. This is more reliable than timestamp checks.
        if (!profile && user.email) {
          console.log('No profile found for new or existing user, creating one...');
          const { error } = await createUserProfile(user.uid, user.email);
          if (error) {
            console.error("Failed to create user profile:", error);
          } else {
            // Fetch the profile again after creation
            profile = await getUserProfile(user.uid);
          }
        }
        
        setUserProfile(profile);

        if (pathname === '/login') {
          router.replace('/training');
        }
      } else {
        setUser(null);
        setIdToken(null);
        setUserProfile(null);
        
        const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
        if (isProtectedRoute) {
          router.replace('/login');
        }
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [auth, pathname, router]);
  
  const signOutUser = async (): Promise<void> => {
    try {
      await auth.signOut();
      router.push('/login');
      router.refresh();
    } catch (e: any)      {
      console.error('Sign out error', e);
    }
  };

  const value = {
    user,
    userProfile,
    idToken,
    isLoading,
    signOutUser,
  };

  if (isLoading && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
