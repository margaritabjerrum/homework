import React from 'react';
import { Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Header = () => {
  return (
    <Stack alignItems='center' gap={1} mt={2}>
      <CalendarMonthIcon color='primary' sx={{ fontSize: 60 }} />
      <Typography variant='h2'>Timeline builder</Typography>
    </Stack>
  )
}

export default Header;