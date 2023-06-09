import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

const HoursInputField = ({label, name}) => {
  return (
    <TextField 
      fullWidth 
      required
      label={label}
      name={name}
      variant='outlined'
      InputProps={{
        endAdornment: <InputAdornment position='end'>hr</InputAdornment>,
      }}
      sx={{mb: 2, backgroundColor: '#FFFFFF'}}
  />
  )
}

export default HoursInputField;