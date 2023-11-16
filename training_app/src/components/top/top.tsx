import React, { useState, useEffect } from 'react';
import { supabase } from '../../../client/supabase';
import styles from './top.module.css';

const TopComponent: React.FC = () => {
    const [totalWorkoutTime, setTotalWorkoutTime] = useState<string>('00:00:00');

    useEffect(() => {
        fetchTodayWorkoutTime();
    }, []);

    const fetchTodayWorkoutTime = async () => {
        const currentUserId = sessionStorage.getItem('userId');
        const { data, error } = await supabase
          .from('training_management')
          .select('time')
          .eq('user_id', currentUserId)
          .eq('date', new Date().toISOString().split('T')[0]);

        if (error) {
            console.error('Error fetching workout time:', error.message);
            return;
        }

        if (data && data.length > 0) {
            const totalTimeInSeconds = data.reduce((acc, curr) => acc + curr.time, 0);
            const hours = Math.floor(totalTimeInSeconds / 3600);
            const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
            const seconds = totalTimeInSeconds % 60;
            setTotalWorkoutTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
            setTotalWorkoutTime('00:00:00');
        }
    };

    const goToPlaySetting = () => window.location.href = '/dashboard/play-setting';
    const goToViewHistory = () => window.location.href = '/dashboard/history';
    const logout = () => {
        sessionStorage.removeItem('userId');
        window.location.href = '/login';
    };

    return (
      <div className={styles.container}>
          <h1 className={styles.title}>Top</h1>
          <p className={styles.workout_time}>今日の筋トレ総時間: {totalWorkoutTime}</p>
          <button className={`${styles.button} ${styles.start_workout}`} onClick={goToPlaySetting}>
              筋トレを開始
          </button>
          <button className={`${styles.button} ${styles.view_history}`} onClick={goToViewHistory}>
              筋トレ履歴
          </button>
          <button className={`${styles.button} ${styles.logout}`} onClick={logout}>
              ログアウト
          </button>
      </div>
    );
};

export default TopComponent;
