// src/components/top.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../client/supabase';
import { useRouter } from 'next/router';

const TopComponent: React.FC = () => {
    const [totalWorkoutTime, setTotalWorkoutTime] = useState<string>('00:00:00');
    const [showMore, setShowMore] = useState<boolean>(false);

    useEffect(() => {
        // Fetch today's workout time
        fetchTodayWorkoutTime();
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

    const toggleShowMore = () => {
        setShowMore((prev) => !prev);
    };

    //ページ遷移
    const router = useRouter();
    const goToPlaySetting = () => window.location.href = '/dashboard/play-setting';
    const goToViewHistory = () => window.location.href = '/dashboard/history';

    return (
      <div>
          <h1>Top Page</h1>
          <p>Today's Workout Time: {totalWorkoutTime}</p>
          <button onClick={goToPlaySetting}>Start Workout</button>
          <button onClick={goToViewHistory}>View History</button>
      </div>
    );
};

export default TopComponent;
