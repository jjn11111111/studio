
'use client';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db as getDb } from './firebase';
import { exerciseData } from './data';

// NOTE: User authentication removed - all users are now anonymous
// UserProfile interface kept for compatibility but no longer used for auth
export interface UserProfile {
  email: string;
  createdAt: string;
  subscription?: {
    status: 'free' | 'active';
  };
  stripeCustomerId?: string;
}

export interface JournalEntry {
  id: string;
  userId: string; // TODO: Consider removing userId field in future cleanup
  videoId: string;
  videoTitle: string;
  notes: string;
  date: string;
  module: string;
  isPublic: boolean;
  authorEmail?: string; // Always 'Anonymous' now
  createdAt: string;
}

export interface JournalEntryData {
  userId: string; // TODO: Remove in future - always use 'anonymous' 
  videoId: string;
  videoTitle: string;
  notes: string;
  date: string;
  isPublic: boolean;
  authorEmail?: string;
}

export interface CommunityPost {
    id: string;
    userId: string; // TODO: Consider removing userId field in future cleanup
    content: string;
    createdAt: string;
    authorEmail?: string; // Always 'Anonymous' now
}

export interface CommunityPostData {
    userId: string; // TODO: Remove in future - always use 'anonymous'
    content: string;
    createdAt: string;
    authorEmail?: string;
}

// Stub function - no longer retrieves actual user profiles
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  // NOTE: Authentication removed - this function is stubbed and always returns null
  return null;
}

// Add a new community post to Firestore (no auth required)
export async function addCommunityPost(postData: CommunityPostData): Promise<CommunityPost> {
  const db = getDb();
  
  // Force anonymous authorship
  const anonymousData = {
    ...postData,
    userId: 'anonymous',
    authorEmail: undefined, // Remove email for privacy
  };
  
  const docRef = await addDoc(collection(db, 'communityPosts'), {
    ...anonymousData,
    createdAt: Timestamp.now(), 
  });

  const newDoc = await getDoc(docRef);
  const data = newDoc.data();
  const createdAtTimestamp = data?.createdAt as Timestamp;

  return {
      id: docRef.id,
      userId: 'anonymous',
      content: postData.content,
      createdAt: createdAtTimestamp.toDate().toISOString(),
      authorEmail: undefined, // Always anonymous
  };
}

// Get all community posts
export async function getCommunityPosts(): Promise<CommunityPost[]> {
  const db = getDb();
  const posts: CommunityPost[] = [];
  const q = query(
    collection(db, "communityPosts"),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const createdAtTimestamp = data.createdAt as Timestamp;
    posts.push({
      id: doc.id,
      userId: data.userId || 'anonymous',
      content: data.content,
      createdAt: createdAtTimestamp.toDate().toISOString(),
      authorEmail: undefined, // Strip email for anonymous access
    });
  });

  return posts;
}

// Add a new journal entry to Firestore (no auth required)
export async function addJournalEntry(entryData: JournalEntryData): Promise<JournalEntry> {
  const db = getDb();
  const allVideos = exerciseData.flatMap(unit => unit.videos.map(v => ({ ...v, module: unit.title })));
  const videoInfo = allVideos.find(v => v.id === entryData.videoId);

  // Force anonymous authorship
  const anonymousData = {
    ...entryData,
    userId: 'anonymous',
    authorEmail: undefined, // Remove email for privacy
  };

  const docRef = await addDoc(collection(db, 'journalEntries'), {
    ...anonymousData,
    videoTitle: videoInfo?.title ?? 'Unknown Video',
    module: videoInfo?.module ?? 'Unknown Module',
    createdAt: Timestamp.now(),
  });

  const newDoc = await getDoc(docRef);
  const data = newDoc.data();
  const createdAtTimestamp = data?.createdAt as Timestamp;

  return {
    id: docRef.id,
    userId: 'anonymous',
    videoId: entryData.videoId,
    videoTitle: videoInfo?.title ?? 'Unknown Video',
    notes: entryData.notes,
    date: entryData.date,
    module: videoInfo?.module ?? 'Unknown Module',
    isPublic: entryData.isPublic,
    createdAt: createdAtTimestamp.toDate().toISOString(),
    authorEmail: undefined, // Always anonymous
  };
}

// Get all journal entries (no user filtering - open access)
// NOTE: This used to filter by userId but now returns all entries
export async function getJournalEntries(userId: string): Promise<JournalEntry[]> {
  const db = getDb();
  const entries: JournalEntry[] = [];
  
  // Get all entries instead of filtering by userId
  const q = query(
    collection(db, 'journalEntries'),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const createdAtTimestamp = data.createdAt as Timestamp;
    
    entries.push({
      id: doc.id,
      userId: data.userId || 'anonymous',
      videoId: data.videoId,
      videoTitle: data.videoTitle,
      notes: data.notes,
      date: data.date,
      isPublic: data.isPublic || false,
      authorEmail: undefined, // Strip email for anonymous access
      module: data.module ?? 'Unknown Module',
      createdAt: createdAtTimestamp.toDate().toISOString(),
    });
  });

  return entries;
}

// Get all public journal entries
export async function getPublicJournalEntries(): Promise<JournalEntry[]> {
  const db = getDb();
  const entries: JournalEntry[] = [];
  const q = query(
    collection(db, "journalEntries"),
    where("isPublic", "==", true),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const createdAtTimestamp = data.createdAt as Timestamp;
    entries.push({
      id: doc.id,
      userId: data.userId || 'anonymous',
      videoId: data.videoId,
      videoTitle: data.videoTitle,
      notes: data.notes,
      date: data.date,
      isPublic: true,
      authorEmail: undefined, // Strip email for anonymous access
      module: data.module ?? "Unknown Module",
      createdAt: createdAtTimestamp.toDate().toISOString(),
    });
  });

  return entries;
}

// Get all public journal entries for a specific video
export async function getPublicJournalEntriesForVideo(videoId: string): Promise<JournalEntry[]> {
  const db = getDb();
  const entries: JournalEntry[] = [];
  const q = query(
    collection(db, "journalEntries"),
    where("isPublic", "==", true),
    where("videoId", "==", videoId),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const createdAtTimestamp = data.createdAt as Timestamp;
    entries.push({
      id: doc.id,
      userId: data.userId || 'anonymous',
      videoId: data.videoId,
      videoTitle: data.videoTitle,
      notes: data.notes,
      date: data.date,
      isPublic: true,
      authorEmail: undefined, // Strip email for anonymous access
      module: data.module ?? "Unknown Module",
      createdAt: createdAtTimestamp.toDate().toISOString(),
    });
  });

  return entries;
}
