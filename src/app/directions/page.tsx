'use client';
import Header from '@/components/Header';
import Image from 'next/image';

export default function DirectionsPage() {
  const imageUrl = "/stereogram-cd-stars.png";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-muted/50 border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
             <Image src={imageUrl} alt="Stereogram of a CD with pink stars" width={800} height={450} className="object-cover" data-ai-hint="cd stars" />
          </div>

          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index + 1}
              className="bg-muted/50 border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center"
            >
              <span className="text-muted-foreground text-sm">Empty Container {index + 2}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
