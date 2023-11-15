// src/components/return.tsx
import React from 'react';
import { useRouter } from 'next/router';

const ReturnButton: React.FC = () => {
  const router = useRouter();

  const handleReturn = () => {
    // Navigate to the user's top page
    router.push('/dashboard/[userId]', `/dashboard/${sessionStorage.getItem('userId')}`);
  };

  return (
    <button onClick={handleReturn}>
      Return
    </button>
  );
};

export default ReturnButton;