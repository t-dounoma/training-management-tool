// src/pages/[userId].tsx
import React from 'react';
import TopComponent from '../../components/top';

const UserDashboardPage: React.FC = () => {
  return (
      <div>
        <h1>User Dashboard</h1>
        <TopComponent />
      </div>
  );
};

export default UserDashboardPage;
