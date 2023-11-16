import React from 'react';
import styles from './index.module.css';

const IndexComponent: React.FC = () => {
  const login = () => {
    window.location.href = '/login';
  };
  const signup = () => {
    window.location.href = '/signup';
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>筋トレ管理くん</div>
      <button className={`${styles.button} ${styles.login}`} onClick={login}>ログイン</button><p></p>
      <button className={`${styles.button} ${styles.signup}`} onClick={signup}>新規作成</button>
    </div>
  );
};

export default IndexComponent;
