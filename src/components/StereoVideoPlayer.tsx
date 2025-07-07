import Image from 'next/image';
import { Card } from './ui/card';

interface StereoVideoPlayerProps {
  thumbnailUrl: string;
}

export default function StereoVideoPlayer({ thumbnailUrl }: StereoVideoPlayerProps) {
  return (
    <Card className="aspect-video w-full overflow-hidden shadow-lg border-2 border-primary/20">
      <div className="flex h-full w-full bg-black">
        <div className="relative w-1/2 h-full border-r border-gray-700">
          <Image
            src={thumbnailUrl}
            alt="Left eye view"
            layout="fill"
            objectFit="cover"
            priority
            data-ai-hint="abstract space"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="relative w-1/2 h-full">
          <Image
            src={thumbnailUrl}
            alt="Right eye view"
            layout="fill"
            objectFit="cover"
            priority
            data-ai-hint="abstract space"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </div>
    </Card>
  );
}
