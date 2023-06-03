import React from 'react';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import lt from 'date-fns/locale/lt';

const UserInputs = () => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  console.log(selectedDate)
  return (
    <Box component="form" mt={4} mx='auto' width='300px'>
      <TextField fullWidth
          label="Total hours required"
          name="hoursRequired"
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">hr</InputAdornment>,
          }}
          sx={{mb: 2}}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={lt}>
          <DatePicker
              label="Select deadline"
              value={selectedDate}
              onChange={(newValue) => {
                setSelectedDate(newValue);
              }}
              slotProps={{ textField: { variant: 'outlined', fullWidth: true } }}
              sx={{mb: 2}}
            />
        </LocalizationProvider>
        <TextField fullWidth
          label="Default busy time value"
          name="busyTime"
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">hr</InputAdornment>,
          }}
          sx={{mb: 2}}
        />
        <TextField fullWidth
          label="Rest time"
          name="restTime"
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">hr</InputAdornment>,
          }}
          sx={{mb: 2}}
        />
        <Button 
          variant="contained"
          fullWidth
        >
          Create Timeline
        </Button>
    </Box>
  )
}

export default UserInputs;