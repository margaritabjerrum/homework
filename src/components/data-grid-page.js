import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const DataGridPage = () => {
  const rows = [
    { id: 1, col1: '2023-06-03', col2: 'Sat', col3: 6, col4: 3 },
    { id: 2, col1: '2023-06-04', col2: 'Sun', col3: 6, col4: 0 },
    { id: 3, col1: '2023-06-05', col2: 'Mon', col3: 6, col4: 1 },
    { id: 5, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 6, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 7, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 8, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 9, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 10, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 11, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 12, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 13, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 14, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 15, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 16, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 17, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 18, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 19, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 20, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 21, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 22, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 23, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },
    { id: 24, col1: '2023-06-06', col2: 'Tue', col3: 6, col4: 4 },

  ];
  
  const columns = [
    { field: 'col1', headerName: 'Date', width: 150 },
    { field: 'col2', headerName: 'Weekday', width: 150 },
    { field: 'col3', headerName: 'Busy Hours', width: 150, editable: true, type: 'number' },
    { field: 'col4', headerName: 'Hours To Write', width: 150, editable: true, type: 'number' },
  ];
  return (
    <Box component='div' sx={{ height: 475, width: '80%', mt: 2, mx: 'auto'}}>
      <DataGrid 
        rows={rows} 
        columns={columns} 
        pageSizeOptions={[7, 14, 21, 28]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 7, page: 0 },
          },
        }}
      />
    </Box>
  )
}

export default DataGridPage;