'use client'; // For client-side scroll effects

import { useState, useEffect } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Parallax pages={2} style={{ top: '0', left: '0' }}>
      <ParallaxLayer offset={0} speed={0.5}>
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-8 text-center">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-6">
            Pineal Vision
          </h1>
          <p className="text-2xl opacity-80">Breathe. See. Become.</p>
        </div>
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={1}>
        <div 
          className="h-screen flex items-center justify-center"
          style={{
            background: `radial-gradient(circle, cyan, purple, magenta, yellow, white)`,
            backgroundSize: '400% 400%',
            animation: `swirl 60s ease-in-out infinite`,
            height: '100vh', // Full viewport for scroll effect
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            opacity: scrollY / 1000, // Fade in on scroll (adjust as needed)
          }}
        >
          <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Pineal Vision - Third Eye Cross Trainer
          </h1>
          <a href="/training/red-sample" style={{ padding: '1rem 2rem', background: 'linear-gradient(to right, purple, cyan)', borderRadius: '999px', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Enter Here (Sample)
          </a>
        </div>
      </ParallaxLayer>
    </Parallax>
  );
}
