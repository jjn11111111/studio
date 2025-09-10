'use client';
import Header from '@/components/Header';
import { PlayCircle } from 'lucide-react';

export default function DirectionsPage() {
  const correctVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(10).mp4?alt=media';
  const secondVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(13).mp4?alt=media';
  const thirdVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(9).mp4?alt=media';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline">Practice Area</h1>
            <p className="text-muted-foreground mt-2">Use these videos to practice the viewing technique before starting the modules.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Video 1 */}
          <div className="bg-muted border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
            <video
              src={correctVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Video 2 */}
          <div className="bg-muted border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
            <video
              src={secondVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Video 3 */}
          <div className="bg-muted border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
            <video
              src={thirdVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>


          {/* 3 Empty Placeholders */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-muted border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PlayCircle className="h-12 w-12 mx-auto" />
                <p>Video Placeholder</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
