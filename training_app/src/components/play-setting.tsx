// src/components/play-setting.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../client/supabase';

interface WorkoutType {
  workout_id: number;
  type: string;
}

const PlaySettingComponent: React.FC = () => {
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<string>('');
  const [selectedWorkoutid, setSelectedWorkoutid] = useState<number>(0);
  const [exerciseTime, setExerciseTime] = useState<number>(0);
  const [restTime, setRestTime] = useState<number>(0);

  useEffect(() => {
    // Fetch workout types from the 'workout_type' table
    fetchWorkoutTypes();
  }, []);

  const fetchWorkoutTypes = async () => {
    const { data, error } = await supabase.from('workout_type').select('workout_id, type');
    if (error) {
      console.error('Error fetching workout types:', error.message);
      return;
    }
    if (data) {
      setWorkoutTypes(data);
      // Set the default selected workout type
      if (data.length > 0) {
        setSelectedWorkout(data[0].type);
        setSelectedWorkoutid(data[0].workout_id);
      }
    }
  };

  const handleStartWorkout = () => {
    // Save selected workout type, exercise time, and rest time to sessionStorage
    sessionStorage.setItem('selectedWorkout', selectedWorkout);
    sessionStorage.setItem('exerciseTime', exerciseTime.toString());
    sessionStorage.setItem('restTime', restTime.toString());

    window.location.href = '/dashboard/play';
  };

  return (
    <div>
      <h1>Play Setting</h1>
      <form>
        <label>
          Select Workout Type:
          <div>
            {workoutTypes.map((workout) => (
              <label key={workout.workout_id}>
                <input
                  type="radio"
                  name="workoutType"
                  value={workout.type}
                  checked={selectedWorkout === workout.type}
                  onChange={() => setSelectedWorkout(workout.type)}
                />
                {workout.type}
              </label>
            ))}
          </div>
        </label>
        <label>
          Exercise Time (seconds):
          <input
            type="number"
            value={exerciseTime}
            onChange={(e) => setExerciseTime(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Rest Time (seconds):
          <input type="number" value={restTime} onChange={(e) => setRestTime(parseInt(e.target.value, 10))} />
        </label>
        <button type="button" onClick={handleStartWorkout}>
          Start Workout
        </button>
      </form>
    </div>
  );
};

export default PlaySettingComponent;
