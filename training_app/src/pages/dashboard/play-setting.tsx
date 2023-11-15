// src/pages/dashboard/play-setting.tsx
import React from 'react';
import PlaySettingComponent from '../../components/play-setting';
import ReturnButton from "@/components/return";

const PlaySettingPage: React.FC = () => {
  return (
    <div>
      <PlaySettingComponent />
      <ReturnButton />
    </div>
  );
};

export default PlaySettingPage;
