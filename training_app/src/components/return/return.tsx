import React from 'react';
import { useRouter } from 'next/router';
import styles from './return.module.css';

const ReturnButton: React.FC = () => {
  const router = useRouter();

  const handleReturn = () => {
    router.push('/dashboard/[userId]', `/dashboard/${sessionStorage.getItem('userId')}`);
  };

  return (
    <button className={styles.button} onClick={handleReturn}>
      Topに戻る
    </button>
  );
};

export default ReturnButton;
