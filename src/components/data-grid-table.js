import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, AlertTitle, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { populateTableData } from './data-grid-table-calculations/populate-table-data';
import { differenceInCalendarDays } from 'date-fns';

const DataGridTable = () => {

  const userInput = useSelector((state) => state.userData.value.userInputData);
  const [rows, setRows] = React.useState([]);
  const [isEnoughTime, setIsEnoughTime] = React.useState('');

  React.useEffect(() => {
    const predefinedRows = populateTableData(userInput, setIsEnoughTime);
    setRows(predefinedRows);
  }, [userInput]);

  const today = new Date();

  const deadline = userInput.selectedDate;
  
  const daysToDeadline = differenceInCalendarDays(deadline, today);

  const processRowUpdate = (newRow, oldRow) => {
    setRows((prevRows) => {
      const newRows = [...prevRows].map((row) => {
        if (row.id === newRow.id && (newRow.col3 + newRow.col4) > 24) {
          console.log('too many hours in a day')
          return oldRow;
        }
        if (row.id === newRow.id) return newRow;
        return row;
      });

      let totalAvailableTime = 0;
      newRows.forEach((row) => {
        totalAvailableTime += 24 - (row.col3 + row.col4)
      })
      
      if(totalAvailableTime >= userInput.hoursRequired) {
        setIsEnoughTime('yes');
        
        let avgWritingTime = userInput.hoursRequired / daysToDeadline;

        let allDaysFitAverage = true;
        newRows.forEach((row) => {
          const availableTimeInTheDay = 24 - (row.col3 + row.col4);
            if (availableTimeInTheDay - avgWritingTime < 0) {
              allDaysFitAverage = false;
            }
        });

        let hoursAssigned = 0;
        let daysCalculated = 0

        newRows.forEach((row) => {
          const availableTimeInTheDay = 24 - (row.col3 + row.col4);
          if (allDaysFitAverage) {
            row.col5 = avgWritingTime.toFixed(2);
            hoursAssigned += Number(row.col5);
            return;
          }
  
          if (avgWritingTime >= availableTimeInTheDay) {
            row.col5 = availableTimeInTheDay.toFixed(2);
            hoursAssigned += Number(row.col5);
            daysCalculated += 1;
  
          } else if (totalAvailableTime === userInput.hoursRequired) {
            row.col5 = availableTimeInTheDay.toFixed(2);
            hoursAssigned += Number(row.col5);
            daysCalculated += 1;
              
          } else {
            row.col5 = Number(((userInput.hoursRequired - hoursAssigned) / (daysToDeadline - daysCalculated)).toFixed(2));
            hoursAssigned += Number(row.col5);
            daysCalculated += 1;
          }

        })

        if (hoursAssigned + 0.1 < userInput.hoursRequired) {
          newRows.forEach((row) => {
            if((24 - (row.col3 + row.col4)) > row.col5) {
              row.col5 += Number((userInput.hoursRequired - hoursAssigned).toFixed(2));
              hoursAssigned += userInput.hoursRequired - hoursAssigned;
            }
          })
        }

        } else {
          setIsEnoughTime('no');
          newRows.forEach((row) => {
            row.col5 = '-';
          })        
        }     

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
  )
}

export default DataGridTable;