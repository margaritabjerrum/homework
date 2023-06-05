import React from 'react';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import {  DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import lt from 'date-fns/locale/lt';
import { useDispatch } from 'react-redux';
import { setUserInputData } from '../features/user-data';

const UserInputs = () => {
  const [selectedDateTime, setSelectedDateTime] = React.useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const hoursRequired = formData.get('hoursRequired');
    const busyTime = formData.get('busyTime');
    const restTime = formData.get('restTime');

    const userInputData = {
      hoursRequired: Number(hoursRequired),
      selectedDate: selectedDateTime,
      busyTime: Number(busyTime),
      restTime: Number(restTime)
    }
    dispatch(setUserInputData(userInputData));
  }

  return (
    <Box component='form' mt={4} mx='auto' width='300px' onSubmit={handleSubmit}>
      <TextField fullWidth required
          label='Total hours required'
          name='hoursRequired'
          variant='outlined'
          InputProps={{
            endAdornment: <InputAdornment position='end'>hr</InputAdornment>,
          }}
          sx={{mb: 2, backgroundColor: '#FFFFFF'}}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={lt}>
          <DateTimePicker
              orientation='landscape'
              label='Select deadline'
              value={selectedDateTime}
              onChange={(newValue) => {
                setSelectedDateTime(newValue);
              }}
              slotProps={{ textField: { variant: 'outlined', fullWidth: true, required: true } }}
              sx={{mb: 2, backgroundColor: '#FFFFFF'}}
            />
        </LocalizationProvider>
        <TextField fullWidth required
          label='Default busy time value'
          name='busyTime'
          variant='outlined'
          InputProps={{
            endAdornment: <InputAdornment position='end'>hr</InputAdornment>,
          }}
          sx={{mb: 2, backgroundColor: '#FFFFFF'}}
        />
        <TextField fullWidth required
          label='Rest time'
          name='restTime'
          variant='outlined'
          InputProps={{
            endAdornment: <InputAdornment position='end'>hr</InputAdornment>,
          }}
          sx={{mb: 2, backgroundColor: '#FFFFFF'}}
        />
        <Button 
          type='submit'
          variant='contained'
          fullWidth
        >
          Create Timeline
        </Button>
    </Box>
  )
}

export default UserInputs;