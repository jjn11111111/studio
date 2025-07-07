'use client';
import type { Unit } from '@/lib/data';
import Link from 'next/link';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from './ui/sidebar';
import { CheckCircle, Circle, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExerciseSidebarProps {
  unit: Unit;
  currentVideoId: string;
  completedVideos: Set<string>;
}

export default function ExerciseSidebar({ unit, currentVideoId, completedVideos }: ExerciseSidebarProps) {
  return (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline text-primary">PinealVision</span>
          </Link>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="p-2">
            <h3 className="text-sm font-semibold text-muted-foreground px-2 font-headline">{unit.title}</h3>
        </div>
        <SidebarMenu>
          {unit.videos.map((video) => {
            const isCompleted = completedVideos.has(video.id);
            const isActive = video.id === currentVideoId;
            return (
              <SidebarMenuItem key={video.id}>
                <Link href={`/exercise/${unit.id}/${video.id}`} className="w-full" passHref legacyBehavior>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={video.title}
                    className={cn(
                        "justify-start w-full",
                        isActive && "font-bold bg-accent/10 text-accent-foreground",
                    )}
                  >
                    <a>
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{video.title}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
