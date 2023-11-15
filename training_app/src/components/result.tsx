import React, { useEffect } from 'react';
import { supabase } from '../../client/supabase';

interface ResultProps {
  selectedWorkout: string;
  elapsedTime: number;
}

const ResultComponent: React.FC<ResultProps> = ({ selectedWorkout, elapsedTime }) => {
  useEffect(() => {
    // Update or insert data into the training_management table
    updateOrInsertTrainingData();
  }, []);

  const updateOrInsertTrainingData = async () => {
    const userId = sessionStorage.getItem("userId");
    console.log(userId);
    const { data: trainingData, error: trainingError } = await supabase
      .from('training_management')
      .select('id, time')
      .eq('user_id', userId)
      .eq('date', new Date().toISOString().split('T')[0]);

    if (trainingError) {
      console.error('Error fetching training data:', trainingError.message);
      return;
    }

    if (trainingData && trainingData.length > 0) {
      // Update existing record
      const { data: updateResult, error: updateError } = await supabase
        .from('training_management')
        .update({ time: trainingData[0].time + elapsedTime })
        .eq('id', trainingData[0].id);

      if (updateError) {
        console.error('Error updating training data:', updateError.message);
      }
    } else {
      // Insert new record
      await supabase.from('training_management').insert([
        {
          user_id: userId,
          date: new Date().toISOString().split('T')[0],
          time: elapsedTime,
        },
      ]);
    }
  };

  const handleShareOnTwitter = () => {
    const tweetText = `Just completed a ${selectedWorkout} workout in ${elapsedTime} seconds! #WorkoutChallenge`;

    // Open a new window to share on Twitter
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
  };

  const handleGoToTop = () => {
    // Clear sessionStorage and navigate to the top page
    sessionStorage.removeItem('selectedWorkout');
    sessionStorage.removeItem('exerciseTime');
    sessionStorage.removeItem('restTime');
    sessionStorage.removeItem('elapsedTime');


    window.location.href = '/dashboard/${userId}';
  };

  return (
    <div>
      <h1>Result Page</h1>
      <p>Workout: {selectedWorkout}</p>
      <p>Elapsed Time: {elapsedTime} seconds</p>
      <button onClick={handleShareOnTwitter}>Share on Twitter</button>
      <button onClick={handleGoToTop}>Go to Top</button>
    </div>
  );
};

export default ResultComponent;
