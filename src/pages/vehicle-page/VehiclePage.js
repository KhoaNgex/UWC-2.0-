import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Typography } from '@mui/material';
const columns = [
  { field: 'id', headerName: 'ID', width: 130 },
  { field: 'Payload_Capacity', headerName: 'Total Capacity', width: 130 },
  {
    field: 'Capacity_of_cargo_space',
    headerName: 'Remaining Capacity',
    width: 130,
  },
  { field: 'Fuel_consumption', headerName: 'Fuel Consumption', width: 130 },
  { field: 'Route_id', headerName: 'Route ID', width: 130 },
];

const rows = [
  {
    id: 'SU-20-0001',
    Payload_Capacity: 9.55,
    Capacity_of_cargo_space: 70,
    Fuel_consumption: 30,
    Route_id: 'Q716',
  },
  {
    id: 'TO-19-0002',
    Payload_Capacity: 8.25,
    Capacity_of_cargo_space: 63,
    Fuel_consumption: 28,
    Route_id: 'Q137',
  },
  {
    id: 'HY-20-0003',
    Payload_Capacity: 9,
    Capacity_of_cargo_space: 67,
    Fuel_consumption: 31,
    Route_id: 'Q457',
  },
  {
    id: 'SU-21-0004',
    Payload_Capacity: 10,
    Capacity_of_cargo_space: 83,
    Fuel_consumption: 37,
    Route_id: 'Q547',
  },
  {
    id: 'TO-22-0005',
    Payload_Capacity: 8.34,
    Capacity_of_cargo_space: 65,
    Fuel_consumption: 31,
    Route_id: 'Q376',
  },
  {
    id: 'HY-20-0006',
    Payload_Capacity: 7.39,
    Capacity_of_cargo_space: 72,
    Fuel_consumption: 30,
    Route_id: 'Q816',
  },
  {
    id: 'SU-18-0007',
    Payload_Capacity: 13,
    Capacity_of_cargo_space: 89,
    Fuel_consumption: 39,
    Route_id: 'Q871',
  },
  {
    id: 'FU-22-0008',
    Payload_Capacity: 8,
    Capacity_of_cargo_space: 75,
    Fuel_consumption: 33,
    Route_id: 'Q358',
  },
  {
    id: 'HY-20-0009',
    Payload_Capacity: 9.36,
    Capacity_of_cargo_space: 80,
    Fuel_consumption: 35,
    Route_id: 'Q648',
  },
  {
    id: 'FU-20-0010',
    Payload_Capacity: 7.86,
    Capacity_of_cargo_space: 60,
    Fuel_consumption: 29,
    Route_id: 'Q153',
  },
];

export default function VehiclePage() {
  return (
    <Card
      style={{
        height: 750,
        width: '80%',
        margin: '100px auto',
        padding: '50px 50px 70px 50px',
      }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
        Danh sách phương tiện
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Card>
  );
}
