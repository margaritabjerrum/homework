import React from 'react';
import { Alert, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUserInputData } from '../../features/user-data';
import HoursInputField from './hours-input-field';
import DeadlineInputField from './deadline-input-field';
import CheckboxField from './ckeckbox-field';
import { validate } from './helpers/validate-user-input';

const UserInput = () => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [freeWeekends, setFreeWeekends] = React.useState(false);
  const [error, setError] = React.useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const hoursRequired = formData.get('hoursRequired');
    const busyTime = formData.get('busyTime');
    const restTime = formData.get('restTime');

    const validateMessage = validate(hoursRequired, busyTime, restTime);

    if (validateMessage) {
      setError(validateMessage);
      return;
    } else {
      setError('');
    }

    const userInputData = {
      hoursRequired: Number(hoursRequired),
      selectedDate: selectedDate,
      busyTime: Number(busyTime),
      restTime: Number(restTime),
      freeWeekends,
    }
    dispatch(setUserInputData(userInputData));
  }

  return (
    <Box component='form' mt={4} mx='auto' width='300px' onSubmit={handleSubmit}>
      <HoursInputField label={'Total hours required'} name={'hoursRequired'} />
      <DeadlineInputField 
        label={'Select deadline'} 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate} 
      />
      <HoursInputField label={'Rest time'} name={'restTime'} />
      <HoursInputField label={'Default busy time value'} name={'busyTime'} />
      <CheckboxField setFreeWeekends={setFreeWeekends} freeWeekends={freeWeekends} />
      <Button
        type='submit'
        variant='contained'
        fullWidth
      >
        Create Timeline
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  )
}

export default UserInput;