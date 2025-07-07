export interface Video {
  id: string;
  level: number;
  title: string;
  description: string;
  thumbnailUrl: string;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  videos: Video[];
}

export const exerciseData: Unit[] = [
  {
    id: 'unit-1',
    title: 'Unit 1: Foundational Attunement',
    description: 'Begin your journey by gently awakening your senses and preparing your mind for deeper exploration. These exercises focus on basic relaxation and visualization.',
    videos: [
      {
        id: 'vid-1-1',
        level: 1,
        title: 'Breathing into Stillness',
        description: 'A guided breathing exercise to calm the nervous system and center your awareness.',
        thumbnailUrl: 'https://placehold.co/800x450',
      },
      {
        id: 'vid-1-2',
        level: 2,
        title: 'The Light Within',
        description: 'Visualize a gentle light glowing in the center of your forehead, preparing the energetic space of the third eye.',
        thumbnailUrl: 'https://placehold.co/800x450',
      },
      {
        id: 'vid-1-3',
        level: 3,
        title: 'Sacred Geometry Primer',
        description: 'Observe simple, rotating geometric shapes to train your focus and introduce your mind to visual meditation.',
        thumbnailUrl: 'https://placehold.co/800x450',
      },
    ],
  },
  {
    id: 'unit-2',
    title: 'Unit 2: Pineal Activation',
    description: 'Engage in exercises designed to directly stimulate the pineal gland through specific frequencies and more complex visual patterns.',
    videos: [
      {
        id: 'vid-2-1',
        level: 4,
        title: 'Vibrational Humming',
        description: 'A deep humming meditation that creates vibrations resonating with the pineal gland.',
        thumbnailUrl: 'https://placehold.co/800x450',
      },
      {
        id: 'vid-2-2',
        level: 5,
        title: 'Pulsating Indigo Light',
        description: 'Focus on a pulsating indigo light, a color associated with the third eye chakra, to energize and activate.',
        thumbnailUrl: 'https://placehold.co/800x450',
      },
      {
        id: 'vid-2-3',
        level: 6,
        title: 'Mandala Focus',
        description: 'Deepen your meditative state by focusing on intricate, evolving mandala patterns.',
        thumbnailUrl: 'https://placehold.co/800x450',
      },
    ],
  },
  {
    id: 'unit-3',
    title: 'Unit 3: Expanding Consciousness',
    description: 'Journey beyond the self with advanced techniques that aim to open pathways to higher states of awareness and intuitive insight.',
    videos: [
      {
        id: 'vid-3-1',
        level: 7,
        title: 'Cosmic Voyage',
        description: 'An immersive journey through stars and galaxies to expand your sense of self and connect with the cosmos.',
        thumbnailUrl: 'https://placehold.co/800x450',
      },
      {
        id: 'vid-3-2',
        level: 8,
        title: 'Gateway to Intuition',
        description: 'This exercise uses abstract visual cues to help you listen to and trust your inner voice.',
        thumbnailUrl: 'https://placehold.co/800x450',
      },
      {
        id: 'vid-3-3',
        level: 9,
        title: 'Vision Quest',
        description: 'The final exercise combines all learned techniques in a free-form visual meditation to unlock your inner vision.',
        thumbnailUrl: 'https://placehold.co/800x450',
      },
    ],
  },
];
