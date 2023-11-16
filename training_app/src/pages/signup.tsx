import React, { useState } from 'react';
import { supabase } from '../../client/supabase';
import styles from '../components/account/signup.module.css';
import crypto from "crypto";

const SignupPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  console.log('userId', userId);
  console.log('password', password);
  console.log(confirmPassword);

  const handleSignup = async () => {

    if (password !== confirmPassword) {
      // パスワードが一致しなかった場合
      console.error('Passwords do not match');
      alert("パスワードが一致しません")
      return;
    }
    // パスワードは8文字以上、英数字をそれぞれ1文字以上とする
    if (password.length < 8) {
      console.error('Passwords is too short');
      alert("パスワードは8文字以上で入力してください")
      return;
    }
    if (!password.match(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i)) {
      console.error('Passwords is too short');
      alert("パスワードは英数字をそれぞれ1文字以上含む必要があります")
      return;
    }

    const { data: existingUserData, error: existingUserError } = await supabase
      .from('users')
      .select('user_id')
      .eq('user_id', userId);
    console.log('existingUserData', existingUserData);


    if (existingUserError) {
      console.error('Error checking user ID:', existingUserError.message);
      return;
    }

    if (existingUserData && existingUserData.length > 0) {
      // User ID already exists
      console.error('User ID already exists');
      return;
    }

    const salt = generateRandomSalt();
    const hashedPassword = hashPassword(password, salt);

    console.log("push_userId",userId)
    console.log("push_password",hashedPassword)
    const {error} = await supabase
      .from('users')
      .insert([{ user_id: userId, password: hashedPassword,salt:salt}]);

    if (error) {

    }else{
      window.location.href = '/login';
    }
  };

  const generateRandomSalt = () => {
    const length = 16;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  };

  const hashPassword = (password: string, salt: string) => {
    const saltedPassword = password + salt;
    const hashedPassword = crypto
        .createHash('sha256')
        .update(saltedPassword)
        .digest('hex');
    return hashedPassword;
  };
  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>新規登録</div>
      <div className={styles.form}>
        <label>
          <input
            className={styles.input}
            type="text"
            placeholder="ユーザーネームを入力してください"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <label>
          <input
            className={styles.input}
            type="password"
            placeholder="パスワードを入力してください"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <input
            className={styles.input}
            type="password"
            placeholder="パスワードを再入力してください"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button className={`${styles.button} ${styles.login}`} onClick={handleSignup}>
          新規登録
        </button>
      </div>
      <div>
        Already have an account?{' '}
        <span className={styles.login} onClick={handleLogin}>
          ログイン
        </span>
      </div>
    </div>
  );
};

export default SignupPage;
