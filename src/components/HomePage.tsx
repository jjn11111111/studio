'use client';

import { exerciseData } from '@/lib/data';
import UnitCard from './UnitCard';
import { useProgress } from '@/hooks/use-progress';

export default function HomePage() {
  const { completedVideos, isInitialized } = useProgress();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">Welcome to PinealVision</h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Embark on a journey to awaken your inner potential. These guided exercises are designed to stimulate your pineal gland and expand your consciousness.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
        {exerciseData.map((unit) => (
          <UnitCard 
            key={unit.id} 
            unit={unit} 
            completedVideos={completedVideos} 
            isInitialized={isInitialized}
          />
        ))}
      </div>
    </div>
  );
}
