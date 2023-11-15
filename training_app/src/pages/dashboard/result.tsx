// src/pages/dashboard/result.tsx
import React, { useEffect, useState } from 'react';
import ResultComponent from '../../components/result';

const ResultPage: React.FC = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<string>('');
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    // Check if sessionStorage is available
    if (typeof window !== 'undefined' && window.sessionStorage) {
      // Retrieve values from sessionStorage
      const storedSelectedWorkout = sessionStorage.getItem('selectedWorkout') || '';
      const storedElapsedTime = parseInt(sessionStorage.getItem('elapsedTime') || '0', 10);
      // Set state with retrieved values
      setSelectedWorkout(storedSelectedWorkout);
      setElapsedTime(storedElapsedTime);
    }
  }, []); // Run this effect only once on mount

  return <ResultComponent selectedWorkout={selectedWorkout} elapsedTime={elapsedTime}/>;
};

export default ResultPage;
