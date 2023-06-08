import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, AlertTitle, Box, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { populateTableData } from './data-grid-table-calculations/populate-table-data';
import { differenceInCalendarDays } from 'date-fns';
import { updateSchedule } from './data-grid-table-calculations/update-schedule';

const DataGridTable = () => {

  const userInput = useSelector((state) => state.userData.value.userInputData);
  const [rows, setRows] = React.useState([]);
  const [isEnoughTime, setIsEnoughTime] = React.useState('');
  const [error, setError] = React.useState(false);

  const today = new Date();

  const deadline = userInput.selectedDate;
  
  const daysToDeadline = differenceInCalendarDays(deadline, today);

  React.useEffect(() => {
    const predefinedRows = populateTableData(userInput, setIsEnoughTime);
    setRows(predefinedRows);
  }, [userInput]);

  const processRowUpdate = (newRow, oldRow) => {
    setRows((prevRows) => {
      const newRows = [...prevRows].map((row) => {
        if (row.id === newRow.id && (newRow.col3 + newRow.col4) > 24) {
          setError(true);
          return oldRow;
        }
        if (row.id === newRow.id) return newRow;
        return row;
      });

      updateSchedule(newRows, userInput, setIsEnoughTime, daysToDeadline);

      return newRows;
    });

    return newRow;
  };

  const columns = [
    { field: 'col1', headerName: 'Date', width: 150 },
    { field: 'col2', headerName: 'Weekday', width: 150 },
    { field: 'col3', headerName: 'Rest Time', width: 150, editable: true, type: 'number' },
    { field: 'col4', headerName: 'Busy Hours', width: 150, editable: true, type: 'number' },
    { field: 'col5', headerName: 'Hours To Write', width: 150, align: 'right', type: 'string' },
  ];
  return (
    <>
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
          ? 'See your schedule below. You can edit Rest Time and Busy Time values to customize your schedule.' 
          : 'Try entering different default parameters or edit schedule below to see if you can still make it.'} 
      </Alert>}
      <DataGrid 
        rows={rows} 
        columns={columns} 
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[7, 14, 21, 28]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 7, page: 0 },
          },
        }}
      />
    </Box>
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

export default DataGridTable;