// src/pages/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../client/supabase'; // Supabase configuration file

const LoginPage: React.FC = () => {
  const router = useRouter();
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

    // Validate the provided password using the stored salt
    const storedPassword = userData[0].password;
    const salt = userData[0].salt;

    if (hashPassword(password, salt) === storedPassword) {
      // Password is correct, redirect to user dashboard
      router.push(`/dashboard/${userId}`);
    } else {
      // Incorrect password
      console.error('Incorrect password');
    }
  };

  // Function to hash the password with the salt
  const hashPassword = (password: string, salt: string) => {
    // Use a secure hashing algorithm, such as bcrypt, for production
    // For simplicity, this example uses a basic hash function
    return password + salt; // This should be replaced with a secure hashing function
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
