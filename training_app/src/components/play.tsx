// src/components/play.tsx
import React, { useState, useEffect } from 'react';
import ReturnButton from "@/components/return";

interface PlayProps {
  selectedWorkout: string;
  exerciseTime: number;
  restTime: number;
}

const PlayComponent: React.FC<PlayProps> = ({ selectedWorkout, exerciseTime, restTime }) => {
  const [isWorkingOut, setIsWorkingOut] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(isWorkingOut ? exerciseTime : restTime);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      setTimer((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setIsWorkingOut((prev) => !prev);
          return isWorkingOut ? restTime : exerciseTime;
        }
      });
    }, 1000);

    // コンポーネントがアンマウントされる際に実行されるクリーンアップ関数
    return () => {
      clearInterval(interval);
    };
  }, [isWorkingOut, exerciseTime, restTime]);

  const handleFinishWorkout = () => {
    clearInterval(timer);

    // Save elapsed time to sessionStorage
    sessionStorage.setItem('elapsedTime', elapsedTime.toString());
    window.location.href = '/dashboard/result';
  };

  return (
    <div>
      <h1>Play Page</h1>
      <p>Workout: {selectedWorkout}</p>
      <p>{isWorkingOut ? 'Working Out' : 'Resting'}</p>
      <p>Remaining Time: {timer}</p>
      <p>Elapsed Time: {elapsedTime} seconds</p>
      <button onClick={handleFinishWorkout}>Finish Workout</button>
    </div>
  );
};

export default PlayComponent;
