import React, { useState, useEffect } from 'react';
import ReturnButton from "@/components/return/return";
import styles from './play.module.css';

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
    console.log("elapsedTime",elapsedTime)
    // Save elapsed time to sessionStorage
    sessionStorage.setItem('elapsedTime', elapsedTime.toString());
    window.location.href = '/dashboard/result';
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ワークアウト中</h1>
      <p>筋トレ種目: {selectedWorkout}</p>
      <p className={styles.status}>{isWorkingOut ? '筋トレ時間' : '休憩時間'}</p>
      <p className={styles.timer}>残り時間: {timer}</p>
      <p className={styles.elapsed_time}>経過時間: {elapsedTime} 秒</p>
      <button className={`${styles.button}`} onClick={handleFinishWorkout}>
        筋トレを終了する
      </button>
      <ReturnButton />
    </div>
  );
};

export default PlayComponent;
