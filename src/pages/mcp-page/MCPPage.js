import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Typography } from '@mui/material';
const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'Address', headerName: 'Address', width: 500 },
];

const rows = [
  {
    id: 60001,
    Address: '167 Phạm Hữu Lầu Phường Mỹ Phước Quận 7 TP. HCM',
  },
  {
    id: 60002,
    Address: '69 Nguyễn Khắc Nhu Phường Cô Giang Quận 1 Tp. HCM',
  },
  {
    id: 60003,
    Address: '15C Nguyễn Thị Minh Khai Phường Bế Quận 1 Tp.HCM',
  },
  {
    id: 60004,
    Address: '271 Phạm Ngũ Lão Phường Phạm Ngũ Lão Quận 1 Tp.HCM',
  },
  {
    id: 60005,
    Address: '200 Lê Quang Sung, Phường 6, Quận 6 Tp.HCM',
  },
  {
    id: 60006,
    Address: '188 Nguyễn Thị Minh Khai Phường 6 Quận 3 Tp.HCM',
  },
  {
    id: 60007,
    Address: '62 Phạm Ngọc Thạch Phường 6 Quận 3 Tp.HCM',
  },
  {
    id: 60008,
    Address: '1103 Trương Định Phường 6 Quận 3 Tp.HCM',
  },
  {
    id: 60009,
    Address: '97 Kinh Dương Vương, phường 12, Quận 6, TP.HCM',
  },
  {
    id: 60010,
    Address: '205 số 17, Tân Quy, Quận 7 TP.HCM',
  },
  {
    id: 60011,
    Address: '273 Trần Bình Trọng Phường 4 Quận 5 TP.HCM',
  },
  {
    id: 60012,
    Address: '37C Thuận Kiều Phường 12 Quận 5 TP.HCM',
  },
  {
    id: 60013,
    Address: '81 Trần Bình Trọng Phường 1 Quận 5 TP.HCM',
  },
  {
    id: 60014,
    Address: '7 đường Tân Mỹ, Tân Thuận Tây, Quận 7 TP.HCM',
  },
  {
    id: 60015,
    Address: '86 Dã Tượng, Phường 10, Quận 8 TP.HCM',
  },
  {
    id: 60016,
    Address: '178 Âu Dương Lân, Phường 3, Quận 8 TP.HCM',
  },
  {
    id: 60017,
    Address: '129F/95I Bến Vân Đồn Quận 4 TP.HCM',
  },
  {
    id: 60018,
    Address: '13 Tôn Đản Quận 4 TP.HCM',
  },
  {
    id: 60019,
    Address: '22 Nguyễn Trường Tộ Quận 4 TP.HCM',
  },
  {
    id: 60020,
    Address: '54 Phạm Nhữ Tăng, Phường 4, Quận 8 TP.HCM',
  },
];

export default function MCPPage() {
  return (
    <Card
      style={{
        height: 750,
        width: '80%',
        margin: '100px auto',
        padding: '50px 50px 70px 50px',
      }}>
      <Typography variant="h4" gutterBottom style={{ paddingBottom: '20px' }}>
        Danh sách điểm thu gom
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[2]}
        checkboxSelection
      />
    </Card>
  );
}
