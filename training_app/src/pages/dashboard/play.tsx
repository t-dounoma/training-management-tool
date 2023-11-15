// src/pages/dashboard/play.tsx
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Load PlayComponent dynamically to ensure it's only included on the client-side
const PlayComponent = dynamic(() => import('../../components/play'), { ssr: false });

const PlayPage: React.FC = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<string>('');
  const [exerciseTime, setExerciseTime] = useState<number>(0);
  const [restTime, setRestTime] = useState<number>(0);

  useEffect(() => {
    // Retrieve values from sessionStorage on the client side
    const storedSelectedWorkout = sessionStorage.getItem('selectedWorkout') || '';
    const storedExerciseTime = parseInt(sessionStorage.getItem('exerciseTime') || '0', 10);
    const storedRestTime = parseInt(sessionStorage.getItem('restTime') || '0', 10);

    setSelectedWorkout(storedSelectedWorkout);
    setExerciseTime(storedExerciseTime);
    setRestTime(storedRestTime);
  }, []);

  return (
    <div>
      <PlayComponent selectedWorkout={selectedWorkout} exerciseTime={exerciseTime} restTime={restTime} />
    </div>
  );
};

export default PlayPage;
