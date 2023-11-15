// src/pages/signup.tsx
import React, { useState } from 'react';
import { supabase } from '../../client/supabase';
import {isStringObject} from "util/types";
import crypto from "crypto"; // Supabase configuration file

const SignupPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  console.log('userId', userId);
  console.log('password', password);
  console.log(confirmPassword);

  const handleSignup = async () => {
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

    // Generate a random salt
    const salt = generateRandomSalt();

    // Hash the password with the salt
    const hashedPassword = hashPassword(password, salt);

    console.log("push_userId",userId)
    console.log("push_password",hashedPassword)
    // Store the user in the Supabase 'users' table
    const {error} = await supabase
      .from('users')
      .insert([{ user_id: userId, password: hashedPassword,salt:salt}]);

    // Registration successful, redirect to login page
    if (error) {

    }else{
      window.location.href = '/dashboard/login';
    }
  };

  // Function to generate a random salt
  const generateRandomSalt = () => {
    const length = 16; // You can adjust the length of the salt
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  };

  // Function to hash the password with the salt
  const hashPassword = (password: string, salt: string) => {
    const saltedPassword = password + salt;
    const hashedPassword = crypto
        .createHash('sha256')
        .update(saltedPassword)
        .digest('hex');
    return hashedPassword; // This should be replaced with a secure hashing function
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <label>
        User ID:
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Confirm Password:
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default SignupPage;
