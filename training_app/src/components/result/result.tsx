import React, { useEffect } from 'react';
import { supabase } from '../../../client/supabase';
import styles from './result.module.css';

interface ResultProps {
  selectedWorkout: string;
  elapsedTime: number;
}

const ResultComponent: React.FC<ResultProps> = ({ selectedWorkout, elapsedTime }) => {
  console.log("elapsedTime引数",elapsedTime);
  useEffect(() => {
    updateOrInsertTrainingData();
  }, [elapsedTime]);

  const updateOrInsertTrainingData = async () => {
    const userId = sessionStorage.getItem("userId");
    console.log(userId);
    const currentDate = new Date().toISOString().split('T')[0];

    const { data: trainingData, error: trainingError } = await supabase
      .from('training_management')
      .select('id, time')
      .eq('user_id', userId)
      .eq('date', currentDate);
    console.log("throw1");
    if (trainingError) {
      console.error('Error fetching training data:', trainingError.message);
      return;
    }

    if (trainingData && trainingData.length > 0) {
      console.log("throw2");
      console.log("dbの時間",trainingData[0].time);
      console.log("elapsedTime",elapsedTime);
      console.log("id",trainingData[0].id);
      const { data: updateResult, error: updateError } = await supabase
        .from('training_management')
        .update({ time: trainingData[0].time + elapsedTime })
        .eq('id', trainingData[0].id);
      sessionStorage.removeItem('elapsedTime');


      if (updateError) {
        console.error('Error updating training data:', updateError.message);
      }
    } else {
      console.log("throw3");
      await supabase.from('training_management').insert([
        {
          user_id: userId,
          date: currentDate,
          time: elapsedTime,
        },
      ]);
    }
  };

  const handleShareOnTwitter = () => {
    const tweetText = ` ${selectedWorkout} の筋トレを行いました！ ${elapsedTime} 秒間行いました! #WorkoutChallenge`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
  };

  const handleGoToTop = () => {
    const userId = sessionStorage.getItem('userId');
    sessionStorage.removeItem('selectedWorkout');
    sessionStorage.removeItem('exerciseTime');
    sessionStorage.removeItem('restTime');

    window.location.href = `/dashboard/${userId}`;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>筋トレ結果画面</h1>
      <p className={styles.workout_info}>行った種類: {selectedWorkout}</p>
      <p className={styles.elapsed_time}>行った時間: {elapsedTime} 秒</p>
      <button className={`${styles.button}`} onClick={handleShareOnTwitter}>
        Twitter(X)でシェアする
      </button>
      <button className={`${styles.button}`} onClick={handleGoToTop}>
        Topページに戻る
      </button>
    </div>
  );
};

export default ResultComponent;
