
import { Alert, AlertTitle } from '@mui/material';
import React from 'react';

const WillCompleteAlert = ({ isEnoughTime, setIsEnoughTime }) => {
  return (
    <>
      {isEnoughTime && <Alert
        sx={{ mb: 2 }}
        variant="filled"
        severity={isEnoughTime === 'yes' ? 'success' : 'error'}
        onClose={() => setIsEnoughTime('')}
      >
        <AlertTitle>{isEnoughTime === 'yes'
          ? 'You can finish on time'
          : 'You do not have enough time to finish'}
        </AlertTitle>
        {isEnoughTime === 'yes'
          ? 'See your schedule below. You can edit Rest Time and Busy Time values to customize your schedule.'
          : 'Try entering different default parameters or edit schedule below to see if you can still make it.'}
      </Alert>}
    </>
  )
}

export default WillCompleteAlert;