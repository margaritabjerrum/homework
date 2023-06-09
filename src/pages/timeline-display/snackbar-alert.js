import { Alert, Snackbar } from '@mui/material';
import React from 'react';

const SnackbarAlert = ({error, setError}) => {
  return (
    <>
      <Snackbar
        open={error}
        autoHideDuration={4000}
        onClose={() => setError(false)}
      >
        <Alert
          onClose={() => setError(false)}
          severity='error'
          sx={{ width: '100%' }}
        >
          You can not enter more than 24 hours.
        </Alert>
      </Snackbar>
    </>
  )
}

export default SnackbarAlert;