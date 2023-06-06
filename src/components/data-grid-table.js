import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { populateTableData } from './data-grid-table-calculations/populate-table-data';

const DataGridTable = () => {

  const userInput = useSelector((state) => state.userData.value.userInputData);
  const [rows, setRows] = React.useState([]);
  const [isEnoughTime, setIsEnoughTime] = React.useState(null);

  React.useEffect(() => {
    const predefinedRows = populateTableData(userInput, setIsEnoughTime);
    setRows(predefinedRows);
  }, [userInput]);

  const columns = [
    { field: 'col1', headerName: 'Date', width: 150 },
    { field: 'col2', headerName: 'Weekday', width: 150 },
    { field: 'col3', headerName: 'Rest Time', width: 150, editable: true, type: 'number' },
    { field: 'col4', headerName: 'Busy Hours', width: 150, editable: true, type: 'number' },
    { field: 'col5', headerName: 'Hours To Write', width: 150, editable: true, type: 'number' },
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

export default DataGridTable;