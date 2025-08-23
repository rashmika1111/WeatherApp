import React from 'react';
import Link from 'next/link';
import  Navigation from 'next/navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Weather App</h1>
        <p className="text-gray-600 mb-8">Check the current weather in cities around the world</p>
        <Link href="/dashboard">
          <div className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
            View Weather Dashboard
          </div>
        </Link>
      </div>
    </div>
  );
}
