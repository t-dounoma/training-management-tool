import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../client/supabase';
import styles from './play-setting.module.css';
import {
  ReactServerDOMTurbopackClientEdge
} from "next/dist/server/future/route-modules/app-page/vendored/ssr/entrypoints";
import ReturnButton from "@/components/return/return";

const PlaySetting: React.FC = () => {
  const [exerciseTime, setExerciseTime] = useState<number>(0);
  const [restTime, setRestTime] = useState<number>(0);
  const [workoutTypes, setWorkoutTypes] = useState<string[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    fetchWorkoutTypes();
  }, []);

  const fetchWorkoutTypes = async () => {
    const { data, error } = await supabase.from('workout_type').select('type');

    if (error) {
      console.error('Error fetching workout types:', error.message);
      return;
    }

    if (data) {
      setWorkoutTypes(data.map((item) => item.type));
    }
  };

  const handleStartWorkout = () => {
    if (exerciseTime < 0 || restTime < 0) {
      alert('Exercise time and rest time must be non-negative values. Please enter valid values.');
      return;
    }

    if (exerciseTime === 0 && restTime === 0) {
      alert('Exercise time and rest time cannot both be 0. Please enter valid values.');
      return;
    }

    if (!selectedWorkout) {
      alert('Please select a workout type.');
      return;
    }

    sessionStorage.setItem('exerciseTime', exerciseTime.toString());
    sessionStorage.setItem('restTime', restTime.toString());
    sessionStorage.setItem('selectedWorkout', selectedWorkout);

    router.push('/dashboard/play');
  };

  return (
    <div className={styles.container}>
      <ReturnButton />
      <h1 className={styles.title}>筋トレ設定画面</h1>
      <label>
        筋トレタイム/秒:
        <input
          className={styles.input}
          type="number"
          value={exerciseTime}
          onChange={(e) => setExerciseTime(Math.max(0, parseInt(e.target.value, 10)))}
        />
      </label>
      <br />
      <label>
        休憩タイム/秒:
        <input
          className={styles.input}
          type="number"
          value={restTime}
          onChange={(e) => setRestTime(Math.max(0, parseInt(e.target.value, 10)))}
        />
      </label>
      <br />
      <label>
        筋トレの種類:
        <select
          className={styles.select}
          value={selectedWorkout}
          onChange={(e) => setSelectedWorkout(e.target.value)}
        >
          <option value="">選択してください</option>
          {workoutTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button className={`${styles.button}`} onClick={handleStartWorkout}>
        筋トレを開始する
      </button>
    </div>
  );
};

export default PlaySetting;
