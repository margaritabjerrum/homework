import React from 'react';
import { useSelector } from 'react-redux';
import UserInput from './user-input/user-input';
import Header from './header/header';
import TimelineDisplay from './timeline-display/timeline-display';

const TimelineBuilder = () => {
  const userInput = useSelector((state) => state.userData.value.userInputData);
  return (
    <>
      <Header />
      <UserInput />
      {userInput && <TimelineDisplay />}
    </>
  );
}

export default TimelineBuilder;