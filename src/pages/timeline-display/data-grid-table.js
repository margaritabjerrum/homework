import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

const DataGridTable = ({rows, columns, processRowUpdate}) => {
  return (
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
  )
}

export default DataGridTable;