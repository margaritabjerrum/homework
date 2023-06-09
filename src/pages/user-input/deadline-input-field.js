import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import lt from 'date-fns/locale/lt';

import React from 'react';

const DeadlineInputField = ({label, selectedDate, setSelectedDate}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={lt}>
    <DatePicker
      orientation='landscape'
      label={label}
      value={selectedDate}
      onChange={(newValue) => {
        setSelectedDate(newValue);
      }}
      slotProps={{ textField: { variant: 'outlined', fullWidth: true, required: true } }}
      sx={{ mb: 2, backgroundColor: '#FFFFFF' }}
    />
  </LocalizationProvider>
  )
}

export default DeadlineInputField;