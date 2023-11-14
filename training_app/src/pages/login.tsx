// src/pages/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import crypto from 'crypto';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Sign in using next-auth
        const result = await signIn('credentials', {
            redirect: false,
            user_id: userId,
            password: password,
        });

        if (!result) {
            console.error('Login failed: Result is undefined');
            return;
        }

        if (result.error) {
            console.error('Login failed:', result.error);
            return;
        }

        // Redirect to user dashboard after successful login
        router.push(`/dashboard/${userId}`);
    };

    // Function to hash the password with the salt
    const hashPassword = (password: string, salt: string) => {
        const saltedPassword = password + salt;
        const hashedPassword = crypto
            .createHash('sha256')
            .update(saltedPassword)
            .digest('hex');
        return hashedPassword;
    };

    return (
        <div>
            <h1>Login</h1>
            <label>
                User ID:
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
