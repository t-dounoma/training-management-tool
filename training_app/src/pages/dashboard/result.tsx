import React, { useEffect, useState } from 'react';
import ResultComponent from '../../components/result/result';

const ResultPage: React.FC = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<string>('');
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const storedSelectedWorkout = sessionStorage.getItem('selectedWorkout') || '';
      const storedElapsedTime = parseInt(sessionStorage.getItem('elapsedTime') || '0', 10);
      setSelectedWorkout(storedSelectedWorkout);
      setElapsedTime(storedElapsedTime);
    }
  }, []);

  return <ResultComponent selectedWorkout={selectedWorkout} elapsedTime={elapsedTime}/>;
};

export default ResultPage;
