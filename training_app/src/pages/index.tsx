// src/pages/index.tsx
import React from 'react';
import IndexComponent from '../components/index';

const IndexPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Your Workout App</h1>
      <IndexComponent />
    </div>
  );
};

export default IndexPage;
