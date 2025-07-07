

export interface Video {
  id: string;
  level: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
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
    title: 'Level 1: Foundational Attunement',
    description: 'Begin your journey by gently awakening your senses and preparing your mind for deeper exploration. These exercises focus on basic relaxation and visualization.',
    videos: [
      { id: 'vid-1-1', level: 1, title: 'Attunement 1: Stillness Breath', description: 'A guided breathing exercise to calm the nervous system and center your awareness.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
      { id: 'vid-1-2', level: 2, title: 'Attunement 2: Forehead Light', description: 'Visualize a gentle light glowing in the center of your forehead.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { id: 'vid-1-3', level: 3, title: 'Attunement 3: Simple Geometry', description: 'Observe simple, rotating geometric shapes to train your focus.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
      { id: 'vid-1-4', level: 4, title: 'Attunement 4: Energy Flow', description: 'Focus on the sensation of energy flowing through your body.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
      { id: 'vid-1-5', level: 5, title: 'Attunement 5: Mindful Listening', description: 'Practice mindful listening to the sounds around you.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
      { id: 'vid-1-6', level: 6, title: 'Attunement 6: Body Awareness', description: 'Gentle stretching and body awareness exercise.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
      { id: 'vid-1-7', level: 7, title: 'Attunement 7: Earth Grounding', description: 'Grounding exercise: connect with the energy of the Earth.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
      { id: 'vid-1-8', level: 8, title: 'Attunement 8: Color Visualization', description: 'Explore color visualization for emotional balance.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
      { id: 'vid-1-9', level: 9, title: 'Attunement 9: Tension Release', description: 'A meditation on releasing tension and stress.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
      { id: 'vid-1-10', level: 10, title: 'Attunement 10: Bio-Field Sensing', description: 'Introduction to feeling your bio-energetic field (aura).', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
      { id: 'vid-1-11', level: 11, title: 'Attunement 11: Breath and Mantra', description: 'Harmonizing breath with a simple mantra.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { id: 'vid-1-12', level: 12, title: 'Attunement 12: Mindful Space', description: 'Focus on the space between thoughts.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
      { id: 'vid-1-13', level: 13, title: 'Attunement 13: Energy Cleansing', description: 'Basic energy cleansing and purification.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
      { id: 'vid-1-14', level: 14, title: 'Attunement 14: Chakra Scan', description: 'A walk-through of the major chakras.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
      { id: 'vid-1-15', level: 15, title: 'Attunement 15: Cultivating Peace', description: 'Cultivating a sense of gratitude and peace.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
    ],
  },
  {
    id: 'unit-2',
    title: 'Level 2: Pineal Activation',
    description: 'Engage in exercises designed to directly stimulate the pineal gland through specific frequencies and more complex visual patterns.',
    videos: [
        { id: 'vid-2-1', level: 16, title: 'Activation 1: Vibrational Humming', description: 'A deep humming meditation that creates vibrations resonating with the pineal gland.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        { id: 'vid-2-2', level: 17, title: 'Activation 2: Pulsating Indigo', description: 'Focus on a pulsating indigo light to energize and activate.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        { id: 'vid-2-3', level: 18, title: 'Activation 3: Mandala Focus', description: 'Deepen your meditative state by focusing on intricate, evolving mandala patterns.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
        { id: 'vid-2-4', level: 19, title: 'Activation 4: Binaural Beats', description: 'Working with binaural beats tuned to pineal gland frequencies.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        { id: 'vid-2-5', level: 20, title: 'Activation 5: Decalcification', description: 'Visualizing the decalcification and opening of the pineal gland.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
        { id: 'vid-2-6', level: 21, title: 'Activation 6: Breath and Light', description: 'Coordinating breath with light pulses for deeper stimulation.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
        { id: 'vid-2-7', level: 22, title: 'Activation 7: Bija Mantras', description: 'Chanting specific seed sounds (bija mantras) for the third eye.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
        { id: 'vid-2-8', level: 23, title: 'Activation 8: Geometric Energy', description: 'Directing energy to the third eye using geometric flows.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
        { id: 'vid-2-9', level: 24, title: 'Activation 9: Inner Sanctuary', description: 'Advanced visualization: building an inner sanctuary.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
        { id: 'vid-2-10', level: 25, title: 'Activation 10: Introduction to Scrying', description: 'Introduction to scrying with a dark mirror or crystal.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        { id: 'vid-2-11', level: 26, title: 'Activation 11: Sustained Focus', description: 'Sustained focus on a single point of light.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        { id: 'vid-2-12', level: 27, title: 'Activation 12: Waking Dream', description: 'Exploring dream-like states while awake.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
        { id: 'vid-2-13', level: 28, title: 'Activation 13: Heart-Third Eye Link', description: 'Connecting the heart and third eye chakras.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        { id: 'vid-2-14', level: 29, title: 'Activation 14: Perceiving Nature', description: 'Perceiving subtle energies in nature.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
        { id: 'vid-2-15', level: 30, title: 'Activation 15: Energy Integration', description: 'A meditation on integrating awakened energies.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
    ],
  },
  {
    id: 'unit-3',
    title: 'Level 3: Expanding Consciousness',
    description: 'Journey beyond the self with advanced techniques that aim to open pathways to higher states of awareness and intuitive insight.',
    videos: [
        { id: 'vid-3-1', level: 31, title: 'Expansion 1: Cosmic Voyage', description: 'An immersive journey through stars and galaxies to expand your sense of self.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        { id: 'vid-3-2', level: 32, title: 'Expansion 2: Gateway to Intuition', description: 'Use abstract visual cues to help you listen to your inner voice.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        { id: 'vid-3-3', level: 33, title: 'Expansion 3: Vision Quest', description: 'A free-form visual meditation to unlock your inner vision.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
        { id: 'vid-3-4', level: 34, title: 'Expansion 4: Universal Mind', description: 'Meditation on the concept of universal consciousness.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        { id: 'vid-3-5', level: 35, title: 'Expansion 5: Remote Viewing', description: 'Remote viewing basics: sensing a location from a distance.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
        { id: 'vid-3-6', level: 36, title: 'Expansion 6: Akashic Exploration', description: 'Exploring the Akashic records through guided meditation.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
        { id: 'vid-3-7', level: 37, title: 'Expansion 7: Higher Self', description: 'Connecting with spirit guides or your higher self.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
        { id: 'vid-3-8', level: 38, title: 'Expansion 8: Past Lives', description: 'Perceiving past lives and their influence.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
        { id: 'vid-3-9', level: 39, title: 'Expansion 9: Astral Projection', description: 'Astral projection preparation and techniques.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
        { id: 'vid-3-10', level: 40, title: 'Expansion 10: Merging Consciousness', description: 'Merging your consciousness with an object or plant.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        { id: 'vid-3-11', level: 41, title: 'Expansion 11: Group Consciousness', description: 'Group consciousness and shared-field meditation.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        { id: 'vid-3-12', level: 42, title: 'Expansion 12: Inner Landscapes', description: 'Navigating symbolic landscapes of the inner world.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
        { id: 'vid-3-13', level: 43, title: 'Expansion 13: Interpreting Intuition', description: 'Receiving and interpreting intuitive information.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        { id: 'vid-3-14', level: 44, title: 'Expansion 14: Unconditional Love', description: 'A meditation on unconditional love and compassion.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
        { id: 'vid-3-15', level: 45, title: 'Expansion 15: Daily Integration', description: 'Integrating higher consciousness into daily life.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
    ],
  },
];

    