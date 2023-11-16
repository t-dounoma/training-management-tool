import React, { useEffect, useState } from 'react';
import { supabase } from '../../../client/supabase';
import ReturnButton from "@/components/return/return";
import styles from './history.module.css';

interface HistoryItem {
  date: string;
  time: string;
}

const HistoryComponent: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    fetchWorkoutHistory();
  }, []);

  const fetchWorkoutHistory = async () => {
    const currentUserId = sessionStorage.getItem('userId');
    const { data, error } = await supabase
      .from('training_management')
      .select('date, time')
      .eq('user_id', currentUserId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching workout history:', error.message);
      return;
    }

    if (data && data.length > 0) {
      const formattedHistory = data.map((item: { date: string; time: number }) => {
        const hours = Math.floor(item.time / 3600);
        const minutes = Math.floor((item.time % 3600) / 60);
        const seconds = item.time % 60;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return {
          date: new Date(item.date).toLocaleDateString(),
          time: formattedTime,
        };
      });
      setHistory(formattedHistory);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>過去の筋トレ履歴</h1>
      <ReturnButton />
      <ul className={styles.list}>
        {history.map((item, index) => (
          <li key={index} className={styles.list_item}>
            <div className={styles.date_time}>
              <p className={styles.date}>日付: {item.date}&nbsp;</p>
              <p className={styles.time}>総時間: {item.time}</p>
            </div>
            <div className={styles.divider}></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryComponent;
