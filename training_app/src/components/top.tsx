// src/components/top.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../client/supabase';

const TopComponent: React.FC = () => {
    const [totalWorkoutTime, setTotalWorkoutTime] = useState<string>('00:00:00');
    const [workoutTypes, setWorkoutTypes] = useState<string[]>([]);
    const [showMore, setShowMore] = useState<boolean>(false);

    useEffect(() => {
        // Fetch today's workout time
        fetchTodayWorkoutTime();

        // Fetch today's workout types
        fetchTodayWorkoutTypes();
    }, []);

    const fetchTodayWorkoutTime = async () => {
        // Retrieve the logged-in user ID from sessionStorage
        const currentUserId = sessionStorage.getItem('userId');

        // Implement logic to fetch and calculate today's workout time
        // Example: fetching from the 'training_management' table
        const { data, error } = await supabase
            .from('training_management')
            .select('time')
            .eq('user_id', currentUserId)
            .eq('date', new Date().toISOString().split('T')[0]);

        console.log('time:', data);
        if (error) {
            console.error('Error fetching workout time:', error.message);
            return;
        }

        if (data && data.length > 0) {
            // Calculate total workout time in HH:mm:ss format
            const totalTimeInSeconds = data.reduce((acc, curr) => acc + curr.time, 0);
            const hours = Math.floor(totalTimeInSeconds / 3600);
            const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
            const seconds = totalTimeInSeconds % 60;
            setTotalWorkoutTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
            setTotalWorkoutTime('00:00:00');
        }
    };

    const fetchTodayWorkoutTypes = async () => {
        // Retrieve the logged-in user ID from sessionStorage
        const currentUserId = sessionStorage.getItem('userId');

        // Implement logic to fetch today's workout types
        // Example: fetching from the 'workout_users' and 'workout_type' tables
        const { data: workoutIds, error: workoutIdsError } = await supabase
            .from('workout_users')
            .select('workout_id')
            .eq('user_id', currentUserId)
            .eq('date', new Date().toISOString().split('T')[0]);

        if (workoutIdsError) {
            console.error('Error fetching workout IDs:', workoutIdsError.message);
            return;
        }

        if (workoutIds && workoutIds.length > 0) {
            // Extract workout IDs and fetch corresponding workout types
            const ids = workoutIds.map((item) => item.workout_id);
            const { data: types, error: typesError } = await supabase
                .from('workout_type')
                .select('type')
                .in('workout_id', ids);

            if (typesError) {
                console.error('Error fetching workout types:', typesError.message);
                return;
            }

            // Set workout types
            setWorkoutTypes(types.map((item) => item.type));
        }
    };

    const toggleShowMore = () => {
        setShowMore((prev) => !prev);
    };

    return (
        <div>
            <h1>Top Page</h1>
            <p>Today's Workout Time: {totalWorkoutTime}</p>
            <p>
                Workout Content: {workoutTypes.slice(0, showMore ? undefined : 6).join(', ')}
                {workoutTypes.length > 6 && <span onClick={toggleShowMore}>{showMore ? ' △' : ' ▽'}</span>}
            </p>
            <button>Start Workout</button>
            <button>View History</button>
        </div>
    );
};

export default TopComponent;
