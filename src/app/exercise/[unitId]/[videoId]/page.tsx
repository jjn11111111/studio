import { exerciseData } from '@/lib/data';
import { notFound } from 'next/navigation';
import ExercisePage from '@/components/ExercisePage';
import type { Unit, Video } from '@/lib/data';

interface ExercisePageParams {
  params: {
    unitId: string;
    videoId: string;
  };
}

export default function Page({ params }: ExercisePageParams) {
  const { unitId, videoId } = params;

  const unit = exerciseData.find(u => u.id === unitId);
  if (!unit) {
    notFound();
  }

  const video = unit.videos.find(v => v.id === videoId);
  if (!video) {
    notFound();
  }

  const allVideos: { unit: Unit, video: Video }[] = exerciseData.flatMap(u => u.videos.map(v => ({ unit: u, video: v })));
  const currentIndex = allVideos.findIndex(item => item.video.id === videoId);

  const previousVideo = currentIndex > 0 ? allVideos[currentIndex - 1] : null;
  const nextVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null;

  return (
    <ExercisePage
      unit={unit}
      video={video}
      previousVideoLink={previousVideo ? `/exercise/${previousVideo.unit.id}/${previousVideo.video.id}` : null}
      nextVideoLink={nextVideo ? `/exercise/${nextVideo.unit.id}/${nextVideo.video.id}` : null}
    />
  );
}

export async function generateStaticParams() {
  return exerciseData.flatMap(unit => 
    unit.videos.map(video => ({
      unitId: unit.id,
      videoId: video.id,
    }))
  );
}
