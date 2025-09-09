'use client';
import Header from '@/components/Header';

export default function DirectionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-muted/50 border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center"
            >
              <span className="text-muted-foreground text-sm">Empty Container {index + 1}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
