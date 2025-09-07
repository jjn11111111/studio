'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface StereoVideoPlayerProps {
  thumbnailUrl: string;
  videoUrl: string;
}

export default function StereoVideoPlayer({ thumbnailUrl, videoUrl }: StereoVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Reset state when video source changes
    setIsPlaying(false);
    setHasEnded(false);
    if (videoRef.current) {
        videoRef.current.play().then(() => {
            setIsPlaying(true);
        }).catch(err => {
            console.error("Video play failed:", err);
            setIsPlaying(false);
        });
    }
  }, [videoUrl]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.paused) {
      if (hasEnded) {
        setHasEnded(false);
        video.currentTime = 0;
      }
      video.play().catch(console.error);
    } else {
      video.pause();
    }
  };
  
  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
        setHasEnded(false);
        video.currentTime = 0;
        video.play().catch(console.error);
    }
  }

  const togglePlayButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    handlePlayPause();
  };
  
  const onVideoEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
  }

  return (
    <Card 
      className="aspect-video w-full overflow-hidden shadow-lg border-2 border-primary/20 relative cursor-pointer bg-muted"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlayPause}
    >
      <div className="h-full w-full bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnailUrl}
          playsInline
          muted
          autoPlay
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={onVideoEnded}
          data-ai-hint="abstract space"
        />
      </div>
      <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${(isHovered || !isPlaying || hasEnded) ? 'opacity-100' : 'opacity-0'}`}>
        {hasEnded ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReplay}
              className="h-20 w-20 text-white hover:bg-white/20 hover:text-white rounded-full backdrop-blur-sm flex flex-col items-center"
              aria-label="Replay video"
            >
              <RefreshCw className="h-10 w-10" />
              <span className="text-xs mt-1">Replay</span>
            </Button>
        ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayButton}
              className="h-20 w-20 text-white hover:bg-white/20 hover:text-white rounded-full backdrop-blur-sm"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="h-12 w-12" /> : <Play className="h-12 w-12 ml-2" />}
            </Button>
        )}
      </div>
    </Card>
  );
}
