
'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';

export default function DirectionsPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const stereograms = [
    {
      url: "/stereogram-balloons.png",
      alt: "Practice Stereogram 1: Balloons",
      credit: "Generated Stereogram",
    },
    {
      url: "/stereogram-cd-stars.png",
      alt: "Practice Stereogram 2: CDs and Stars",
      credit: "Generated Stereogram",
    },
    {
      url: "/stereogram-astronaut.png",
      alt: "Practice Stereogram 3: Astronaut",
      credit: "Generated Stereogram",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">Stereogram Practice Gallery</h1>
        <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            Practice viewing these stereoscopic images. Use the techniques described in the "How to Use" section. When you achieve clarity with the hidden 3D image, try to hold your focus for at least 30 seconds. Click any image to enlarge it.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stereograms.map((stereogram, index) => (
            <div
                key={index}
                className="bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedImage(stereogram.url)}
            >
                <div className="relative w-full h-48">
                    <Image
                        src={stereogram.url}
                        alt={stereogram.alt}
                        fill
                        className="object-cover rounded-md"
                    />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{stereogram.alt}</p>
            </div>
            ))}
        </div>

        {/* Modal for enlarged view */}
        {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl max-h-[90vh]">
                <Image src={selectedImage} alt="Enlarged Stereogram" width={1200} height={800} className="object-contain max-w-full max-h-[90vh] rounded-lg" />
                <button
                className="absolute top-2 right-2 text-white text-2xl bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                >
                &times;
                </button>
            </div>
            </div>
        )}

        {/* Credits Section */}
        <div className="mt-12 text-center">
            <h2 className="text-lg font-semibold text-foreground">Image Credits</h2>
            <ul className="text-sm text-muted-foreground list-disc list-inside">
            {stereograms.map((stereogram, index) => (
                <li key={index}>{stereogram.alt}: {stereogram.credit}</li>
            ))}
            </ul>
        </div>
        </div>
    </div>
  );
}
