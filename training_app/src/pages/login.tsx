import React, { useState } from 'react';
import { supabase } from '../../client/supabase';
import crypto from 'crypto';
import styles from '../components/account/login.module.css'

const LoginPage: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Fetch user data including salt and hashed password
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('user_id, password, salt')
            .eq('user_id', userId);

        if (userError) {
            console.error('Error fetching user data:', userError.message);
            return;
        }

        if (!userData || userData.length === 0) {
            // User not found
            console.error('User not found');
            return;
        }

        const storedPassword = userData[0].password;
        const salt = userData[0].salt;

        const hashedPassword = hashPassword(password, salt);

        if (hashedPassword === storedPassword) {
            sessionStorage.setItem('userId', userId);
            window.location.href = '/dashboard/top';
        } else {
            console.error('Incorrect password');
        }
    };

    const hashPassword = (password: string, salt: string) => {
        const saltedPassword = password + salt;
        const hashedPassword = crypto
            .createHash('sha256')
            .update(saltedPassword)
            .digest('hex');
        return hashedPassword;
    };
    const handleSignup = () => {
        window.location.href = '/signup';
    }
    return (
        <div className={styles.container}>
            <div className={styles.title}>ログイン</div>
            <div className={styles.form}>
                <label>
                    <input className={styles.input} type="text" placeholder="ユーザーネームを入力してください" value={userId} onChange={(e) => setUserId(e.target.value)} />
                </label>
                <label>
                    <input className={styles.input} type="password" placeholder="パスワードを入力してください" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button className={`${styles.button} ${styles.signup}`} onClick={handleLogin}>ログイン</button>
            </div>
            <div>Don't have an account? <span className={styles.signup} onClick={handleSignup}>新規作成</span></div>
        </div>
    );
};

export default LoginPage;
