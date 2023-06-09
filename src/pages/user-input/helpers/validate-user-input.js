export const validate = (hoursRequired, busyTime, restTime) => {
  const numberError = 'Must be a number';
  const valueError = 'Number must be more than 0h and less than 24h';
  if (isNaN(Number(hoursRequired))) {
    return numberError;
  }

  if (isNaN(Number(busyTime))) {
    return numberError;
  } 

  if (isNaN(Number(restTime))) {
    return numberError;
  } 

  if(Number(hoursRequired) < 0) {
    return 'Number must be more than 0h';
  }

  if(Number(busyTime) < 0 || Number(busyTime) > 24) {
    return valueError;
  }

  if(Number(restTime) < 0 || Number(restTime) > 24) {
    return valueError;
  }

  if((Number(restTime) + Number(busyTime)) > 24) {
    return 'Sum of Rest time and Busy time cannot exceed 24h';
  } 
}
