'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-8">
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-5xl font-bold text-center mb-6">PinealVision</h1>
        <p className="text-center text-xl mb-8">3rd Eye CrossTraining</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/login">
            <div className="bg-white text-black p-6 rounded-lg shadow-xl text-center cursor-pointer">
              <h2 className="text-2xl font-bold mb-2">Login / Register</h2>
              <p className="text-gray-600">Sign in or create an account</p>
            </div>
          </Link>
          <Link href="/community">
            <div className="bg-white text-black p-6 rounded-lg shadow-xl text-center cursor-pointer">
              <h2 className="text-2xl font-bold mb-2">Community Journal</h2>
              <p className="text-gray-600">Share your experiences</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
