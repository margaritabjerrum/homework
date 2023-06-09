import { Box, Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

const CheckboxField = ({setFreeWeekends, freeWeekends}) => {
  return (
    <Box sx={{ mb: 1 }}>
    <FormControlLabel
      label='I want to have free weekends'
      control={
        <Checkbox 
          size='medium' 
          onChange={() => setFreeWeekends(!freeWeekends)} 
        />
      }
    />
  </Box>
  )
}

export default CheckboxField;