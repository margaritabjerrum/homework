import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, AlertTitle, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { populateTableData } from './data-grid-table-calculations/populate-table-data';

const DataGridTable = () => {

  const userInput = useSelector((state) => state.userData.value.userInputData);
  const [rows, setRows] = React.useState([]);
  const [isEnoughTime, setIsEnoughTime] = React.useState('');

  React.useEffect(() => {
    const predefinedRows = populateTableData(userInput, setIsEnoughTime);
    setRows(predefinedRows);
  }, [userInput]);

  const columns = [
    { field: 'col1', headerName: 'Date', width: 150 },
    { field: 'col2', headerName: 'Weekday', width: 150 },
    { field: 'col3', headerName: 'Rest Time', width: 150, editable: true, type: 'number' },
    { field: 'col4', headerName: 'Busy Hours', width: 150, editable: true, type: 'number' },
    { field: 'col5', headerName: 'Hours To Write', width: 150, editable: true, align: 'right', type: 'string' },
  ];
  return (
    <Box component='div' sx={{ height: 475, width: '80%', mt: 2, mx: 'auto'}}>
      {isEnoughTime && <Alert 
        sx={{ mb: 2}}
        variant="filled"
        severity={isEnoughTime === 'yes' ? 'success' : 'error'} 
        onClose={() => setIsEnoughTime('')}
      >
        <AlertTitle>{isEnoughTime === 'yes' 
          ? 'You can finish on time' 
          : 'You do not have enough time to finish'} 
        </AlertTitle>
        {isEnoughTime === 'yes' 
          ? 'See your schedule below' 
          : 'Try entering different default parameters or edit schedule below to see if you can still make it'} 
      </Alert>}
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

export default DataGridTable;