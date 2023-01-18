import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Typography } from '@mui/material';
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Name', headerName: 'Name', width: 130 },
  { field: 'Sex', headerName: 'Gender', width: 130 },
  { field: 'Date_of_birth', headerName: 'Date Of Birth', width: 130 },
  { field: 'Phone', headerName: 'Phone', width: 130 },
  { field: 'Address', headerName: 'Address', width: 150 },
];

const rows = [
  {
    id: 30001,
    Name: 'Trần Phúc Anh',
    Sex: 'Nam',
    Date_of_birth: '02/06/2002',
    Phone: '0123456005',
    Address: 'Quận 1, HCM',
  },
  {
    id: 30002,
    Name: 'Nguyễn Đức An',
    Sex: 'Nam',
    Date_of_birth: '14/06/2002',
    Phone: '0123396005',
    Address: 'Quận 2, HCM',
  },
  {
    id: 30003,
    Name: 'Nguyễn Quang Huy',
    Sex: 'Nam',
    Date_of_birth: '31/05/2001',
    Phone: '0763456005',
    Address: 'Quận 3, HCM',
  },
  {
    id: 30004,
    Name: 'Võ Thái Toàn',
    Sex: 'Nam',
    Date_of_birth: '30/09/2002',
    Phone: '0763753005',
    Address: 'Quận 4, HCM',
  },
  {
    id: 30005,
    Name: 'Cao Trần Anh Khoa',
    Sex: 'Nam',
    Date_of_birth: '31/10/2002',
    Phone: '0763093005',
    Address: 'Dĩ An, Bình Dương',
  },
  {
    id: 20001,
    Name: 'Nguyễn Quang Anh',
    Sex: 'Nam',
    Date_of_birth: '2001-06-05',
    Phone: '0763456125',
    Address: 'Quận 3, HCM',
  },
  {
    id: 20002,
    Name: 'Nguyễn Quang Ân',
    Sex: 'Nam',
    Date_of_birth: '2000-03-06',
    Phone: '0763226005',
    Address: 'Quận 2, HCM',
  },
  {
    id: 20003,
    Name: 'Nguyễn Quang Bình',
    Sex: 'Nam',
    Date_of_birth: '2001-01-05',
    Phone: '0724456005',
    Address: 'Quận 5, HCM',
  },
  {
    id: 20004,
    Name: 'Nguyễn Quang Bảo',
    Sex: 'Nam',
    Date_of_birth: '2000-07-27',
    Phone: '0763499005',
    Address: 'Quận 12, HCM',
  },
  {
    id: 20005,
    Name: 'Nguyễn Quang Cường',
    Sex: 'Nam',
    Date_of_birth: '2001-01-02',
    Phone: '0763452225',
    Address: 'Quận 3, HCM',
  },
  {
    id: 20006,
    Name: 'Nguyễn Quang Chí',
    Sex: 'Nam',
    Date_of_birth: '2001-03-02',
    Phone: '07634568722',
    Address: 'Quận 2, HCM',
  },
  {
    id: 20007,
    Name: 'Nguyễn Quang Công',
    Sex: 'Nam',
    Date_of_birth: '2001-08-31',
    Phone: '0923456005',
    Address: 'Quận 3, HCM',
  },
  {
    id: 20008,
    Name: 'Nguyễn Quang Chung',
    Sex: 'Nam',
    Date_of_birth: '2001-03-30',
    Phone: '0763415225',
    Address: 'Quận 1, HCM',
  },
  {
    id: 20009,
    Name: 'Nguyễn Quang Danh',
    Sex: 'Nam',
    Date_of_birth: '2001-05-11',
    Phone: '0769996005',
    Address: 'Quận 4, HCM',
  },
  {
    id: 20010,
    Name: 'Nguyễn Quang Dũng',
    Sex: 'Nam',
    Date_of_birth: '2001-06-21',
    Phone: '07634563636',
    Address: 'Quận 7, HCM',
  },
  {
    id: 20011,
    Name: 'Nguyễn Quang Giàu',
    Sex: 'Nam',
    Date_of_birth: '2000-08-25',
    Phone: '0763224005',
    Address: 'Quận 3, HCM',
  },
  {
    id: 20012,
    Name: 'Nguyễn Quang Nam',
    Sex: 'Nam',
    Date_of_birth: '2001-03-31',
    Phone: '0787654005',
    Address: 'Quận 3, HCM',
  },
  {
    id: 20013,
    Name: 'Nguyễn Quang Hùng',
    Sex: 'Nam',
    Date_of_birth: '2001-09-12',
    Phone: '0763456999',
    Address: 'Quận 3, HCM',
  },
  {
    id: 20014,
    Name: 'Nguyễn Quang Kiên',
    Sex: 'Nam',
    Date_of_birth: '2001-10-15',
    Phone: '0763499415',
    Address: 'Quận 8, HCM',
  },
  {
    id: 200015,
    Name: 'Nguyễn Quang Lê',
    Sex: 'Nam',
    Date_of_birth: '20002-05-29',
    Phone: '0788771195',
    Address: 'Quận 9, HCM',
  },
  {
    id: 200016,
    Name: 'Lê Danh An',
    Sex: 'Nam',
    Date_of_birth: '2000-08-11',
    Phone: '0788775475',
    Address: 'Quận Bình Thạnh, HCM',
  },
  {
    id: 200017,
    Name: 'Nguyễn Đức Duy',
    Sex: 'Nam',
    Date_of_birth: '2002-02-27',
    Phone: '0771771195',
    Address: 'Quận 3, HCM',
  },
  {
    id: 200018,
    Name: 'Lê Việt Dũng',
    Sex: 'Nam',
    Date_of_birth: '2002-03-22',
    Phone: '0238771195',
    Address: 'Quận 2, HCM',
  },
];

export default function EmployeePage() {
  return (
    <Card
      style={{
        height: 750,
        width: '80%',
        margin: '100px auto',
        padding: '50px 50px 70px 50px',
      }}>
      <Typography variant="h4" gutterBottom style={{ paddingBottom: '20px' }}>
        Danh sách nhân viên
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[6]}
        checkboxSelection
      />
    </Card>
  );
}
