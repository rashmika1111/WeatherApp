'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import WeatherDashboard from '../../Components/WeatherDashboard';

const DashboardPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <WeatherDashboard />
    </div>
  );
};

export default DashboardPage;