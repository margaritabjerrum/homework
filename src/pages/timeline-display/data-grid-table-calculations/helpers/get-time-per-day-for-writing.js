export const getTimePerDayForWriting = (
    hoursRequired, 
    restTime, 
    busyTime, 
    daysToDeadline, 
    setIsEnoughTime
  ) => {
  const timeAvailable = (24 - restTime - busyTime) * daysToDeadline;
  if (timeAvailable >= hoursRequired) {
    setIsEnoughTime('yes');
    return Number((hoursRequired / daysToDeadline)).toFixed(2)
  } else {
    setIsEnoughTime('no');
    return '-';
  }
}
