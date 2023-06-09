import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { populateTableData } from './data-grid-table-calculations/populate-table-data';
import { differenceInCalendarDays, differenceInBusinessDays } from 'date-fns';
import { updateSchedule } from './data-grid-table-calculations/update-schedule';
import WillCompleteAlert from './will-complete-alert';
import SnackbarAlert from './snackbar-alert';
import DataGridTable from './data-grid-table';
import { formatHoursMinutes } from './data-grid-table-calculations/helpers/format-hours-minutes';

const TimelineDisplay = () => {

  const userInput = useSelector((state) => state.userData.value.userInputData);
  const [rows, setRows] = React.useState([]);
  const [isEnoughTime, setIsEnoughTime] = React.useState('');
  const [error, setError] = React.useState(false);
  const today = new Date();

  const deadline = userInput.selectedDate;

  let daysToDeadline;
  if (userInput.freeWeekends) {
    daysToDeadline = differenceInBusinessDays(deadline, today);
  } else {
    daysToDeadline = differenceInCalendarDays(deadline, today);
  }

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
  
  let rowsToFormat = JSON.parse(JSON.stringify(rows));
  let formatedRows = formatHoursMinutes(rowsToFormat);

  const columns = [
    { field: 'col1', headerName: 'Date', width: 150 },
    { field: 'col2', headerName: 'Weekday', width: 150 },
    { field: 'col3', headerName: 'Rest Time', width: 150, editable: true, type: 'number' },
    { field: 'col4', headerName: 'Busy Hours', width: 150, editable: true, type: 'number' },
    { field: 'col5', headerName: 'Hours To Write', width: 150, align: 'right', type: 'string' },
  ];
  return (
    <>
      <Box component='div' sx={{ height: 475, width: '80%', mt: 2, mx: 'auto' }}>
        <WillCompleteAlert
          isEnoughTime={isEnoughTime}
          setIsEnoughTime={setIsEnoughTime}
        />
        <DataGridTable 
            rows={formatedRows}
            columns={columns}
            processRowUpdate={processRowUpdate}
        />
      </Box>
      <SnackbarAlert error={error} setError={setError} />
    </>
  )
}

export default TimelineDisplay;