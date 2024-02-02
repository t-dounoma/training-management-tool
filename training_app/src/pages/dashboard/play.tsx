// dashboard/play.tsx
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const PlayComponent = dynamic(() => import('../../components/play/play'), { ssr: false });

const PlayPage: React.FC = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<string>('');
  const [exerciseTime, setExerciseTime] = useState<number>(0);
  const [restTime, setRestTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    const storedSelectedWorkout = sessionStorage.getItem('selectedWorkout') || '';
    const storedExerciseTime = parseInt(sessionStorage.getItem('exerciseTime') || '0', 10);
    const storedRestTime = parseInt(sessionStorage.getItem('restTime') || '0', 10);
    const storedStartTime = parseInt(sessionStorage.getItem('startTime') || '0', 10);

    setSelectedWorkout(storedSelectedWorkout);
    setExerciseTime(storedExerciseTime);
    setRestTime(storedRestTime);
    setStartTime(storedStartTime || new Date().getTime() / 1000);
  }, []);

  return (
      <div>
        <PlayComponent selectedWorkout={selectedWorkout} exerciseTime={exerciseTime} restTime={restTime} startTime={startTime}/>
      </div>
  );
};

export default PlayPage;
