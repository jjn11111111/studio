'use client';
import { useState, useEffect, useCallback } from 'react';

const PROGRESS_KEY = 'thirdEyeCrossTrainingProgress';

export function useProgress() {
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(PROGRESS_KEY);
      if (storedProgress) {
        setCompletedVideos(new Set(JSON.parse(storedProgress)));
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(Array.from(completedVideos)));
      } catch (error) {
        console.error("Failed to save progress to localStorage", error);
      }
    }
  }, [completedVideos, isInitialized]);

  const toggleComplete = useCallback((videoId: string) => {
    setCompletedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  }, []);
  
  const markAsComplete = useCallback((videoId: string) => {
    setCompletedVideos(prev => {
      const newSet = new Set(prev);
      if (!newSet.has(videoId)) {
        newSet.add(videoId);
      }
      return newSet;
    });
  }, []);

  const isComplete = useCallback((videoId: string) => {
    return completedVideos.has(videoId);
  }, [completedVideos]);

  return { completedVideos, toggleComplete, isComplete, markAsComplete, isInitialized };
}
