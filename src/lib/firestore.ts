'use client';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db as getDb } from './firebase';
import { exerciseData } from './data';

export interface JournalEntry {
  id: string;
  userId: string;
  videoId: string;
  videoTitle: string;
  notes: string;
  intensity: number;
  usefulness: number; // 1 (good) to 5 (poor)
  tags: string[];
  date: string;
  module: string;
}

export interface JournalEntryData {
  userId: string;
  videoId: string;
  videoTitle: string;
  notes: string;
  intensity: number;
  usefulness: number;
  tags: string[];
  date: string;
}

// Add a new journal entry to Firestore
export async function addJournalEntry(entryData: JournalEntryData): Promise<JournalEntry> {
  const db = getDb();
  const docRef = await addDoc(collection(db, 'journalEntries'), {
    ...entryData,
    createdAt: Timestamp.now(),
  });

  const allVideos = exerciseData.flatMap(unit => unit.videos.map(v => ({...v, module: unit.title})));
  const video = allVideos.find(v => v.id === entryData.videoId);

  return {
      id: docRef.id,
      ...entryData,
      module: video?.module ?? 'Unknown Module'
  };
}

// Get all journal entries for a specific user
export async function getJournalEntries(userId: string): Promise<JournalEntry[]> {
  const db = getDb();
  const entries: JournalEntry[] = [];
  const q = query(
    collection(db, 'journalEntries'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const allVideos = exerciseData.flatMap(unit => unit.videos.map(v => ({...v, module: unit.title})));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const video = allVideos.find(v => v.id === data.videoId);
    entries.push({
      id: doc.id,
      userId: data.userId,
      videoId: data.videoId,
      videoTitle: data.videoTitle,
      notes: data.notes,
      intensity: data.intensity,
      usefulness: data.usefulness ?? 3, // Default to neutral if not present
      tags: data.tags || [],
      date: data.date,
      module: video?.module ?? 'Unknown Module'
    });
  });

  return entries;
}
