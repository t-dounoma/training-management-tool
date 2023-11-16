import React from 'react';
import PlaySettingComponent from '../../components/play-setting/play-setting';
import ReturnButton from "@/components/return/return";

const PlaySettingPage: React.FC = () => {
  return (
    <div>
      <PlaySettingComponent />
      <ReturnButton />
    </div>
  );
};

export default PlaySettingPage;
