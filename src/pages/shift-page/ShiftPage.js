import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
//@mui
import {
  Card,
  Button,
  Container,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  useTheme,
  TablePagination,
  MenuItem,
  Popover,
  Chip,
} from '@mui/material';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import Popup from '../../components/popup';
import Notification from '../../components/notification';
import ConfirmPopup from '../../components/confirm-popup';
// sections
import ShiftForm from './ShiftForm';
import ListHead from '../../components/list-head';
import ShiftListToolbar from './ShiftListToorbar';
// utils
import { convertDateToStr, convertTimeToStr } from '../../utils/timeFormat.js';
import { getComparator, stableSort } from '../../utils/sortEngine.js';
// mock
import SHIFTLIST from '../../mock_data/shift';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'date', label: 'Ngày', align: 'left' },
  { id: 'starttime', label: 'Bắt đầu', align: 'left' },
  { id: 'endtime', label: 'Kết thúc', align: 'left' },
  { id: 'status', label: 'Trạng thái', align: 'left' },
  { id: 'taskcount', label: 'Số nhiệm vụ', align: 'center' },
  { id: 'taskdone', label: 'Xong', align: 'center' },
  { id: 'taskbutton' },
  { id: 'menu' },
];

//----------------------------------------------

const initFilterValue = {
  date: null,
  status: '',
};

const initAddValue = {
  starttime: null,
  endtime: null,
  date: null,
  status: '',
};

//----------------------------------------------------------

export default function ShiftPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  const navToTask = (shiftid) => {
    navigate(`/app/shift/${shiftid}`, {
      replace: true,
    });
  };

  //----------------------------------------------------------

  const [shiftList, setShiftList] = useState(SHIFTLIST);

  const [openPopup, setOpenPopup] = useState(false);

  const [selectedShift, setSelectedShift] = useState({});

  //-----------------------------------------------------------

  const [openNoti, setOpenNoti] = useState(false);

  const [actStatus, setActStatus] = useState(false);

  const handleCloseNoti = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNoti(false);
  };

  //-----------------------------------------------------------

  const [filterValues, setFilterValues] = useState(initFilterValue);

  const handleChangeFilterValues = (name, newValue) => {
    setFilterValues({ ...filterValues, [name]: newValue });
  };

  const filterRows = () => {
    let filteredList = SHIFTLIST;
    let dateStr = convertDateToStr(filterValues.date);
    if (filterValues.date !== null && filterValues.status !== '') {
      filteredList = SHIFTLIST.filter(
        (shift) =>
          shift.date === dateStr && shift.status === filterValues.status
      );
    } else if (filterValues.date !== null) {
      filteredList = SHIFTLIST.filter((shift) => shift.date === dateStr);
    } else if (filterValues.status !== '') {
      filteredList = SHIFTLIST.filter(
        (shift) => shift.status === filterValues.status
      );
    }
    setShiftList(filteredList);
  };

  //-----------------------------------------------------------

  const [addValues, setAddValues] = useState(initAddValue);

  const handleChangeAddValues = (name, newValue) => {
    setAddValues({ ...addValues, [name]: newValue });
  };

  const onResetAddForm = () => {
    setAddValues(initAddValue);
  };

  const onConfirmAddForm = () => {
    if (
      addValues.starttime !== null &&
      addValues.endtime !== null &&
      addValues.date !== null &&
      addValues.status !== ''
    ) {
      let newShift = {
        shiftid: faker.datatype.uuid(),
        date: convertDateToStr(addValues.date),
        starttime: convertTimeToStr(addValues.starttime),
        endtime: convertTimeToStr(addValues.endtime),
        status: addValues.status,
        taskcount: 0,
        taskdone: 0,
      };
      setShiftList([newShift, ...shiftList]);
      setAddValues(initAddValue);
      setActStatus(true);
    } else {
      setActStatus(false);
    }
    setOpenPopup(false);
    setOpenNoti(true);
  };

  //--------------------------------------------------

  const [editValues, setEditValues] = useState(initAddValue);

  const [openEditPopup, setOpenEditPopup] = useState(false);

  const handleOpenEditPopup = () => {
    setEditValues({
      ...editValues,
      starttime: new Date('01/01/1970 ' + selectedShift.starttime),
      endtime: new Date('01/01/1970 ' + selectedShift.endtime),
      date: selectedShift.date,
      status: selectedShift.status,
    });
    // console.log(editValues)
    setOpenEditPopup(true);
    handleCloseMenu();
  };
  const handleChangeEditValues = (name, newValue) => {
    setEditValues({ ...editValues, [name]: newValue });
  };

  const onResetEditForm = () => {
    setEditValues(initAddValue);
  };

  const onConfirmEditForm = () => {
    if (
      editValues.starttime !== null &&
      editValues.endtime !== null &&
      editValues.date !== null &&
      editValues.status !== ''
    ) {
      let idx = shiftList.findIndex((shift) => {
        return shift.shiftid === selectedShift.shiftid;
      });
      let editedList = shiftList;
      editedList[idx].starttime = convertTimeToStr(editValues.starttime);
      editedList[idx].endtime = convertTimeToStr(editValues.endtime);
      editedList[idx].date = editValues.date;
      editedList[idx].status = editValues.status;
      setShiftList(editedList);
      setActStatus(true);
    } else {
      setActStatus(false);
    }
    setOpenEditPopup(false);
    setOpenNoti(true);
  };

  //--------------------------------------------------

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    handleCloseMenu();
    setOpenConfirm(true);
  };

  const onConfirmDelete = (shiftid) => {
    let idx = shiftList.findIndex((shift) => {
      return shift.shiftid === shiftid;
    });
    // console.log(idx)
    let deletedShiftList = shiftList;
    deletedShiftList.splice(idx, 1);
    setShiftList(deletedShiftList);
    setOpenConfirm(false);
    setActStatus(true);
    setOpenNoti(true);
  };

  //--------------------------------------------------------

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  //---------------------------------------------------------

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SHIFTLIST.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  //---------------------------------------------------------

  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = shiftList.map((shift) => shift.shiftid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, shiftid) => {
    const selectedIndex = selected.indexOf(shiftid);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, shiftid);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  //---------------------------------------------------------

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  //---------------------------------------------------------

  const statusColor = (status) => {
    if (status === 'Chưa diễn ra') return 'warning';
    else if (status === 'Kết thúc') return 'success';
    else return 'secondary';
  };

  //---------------------------------------------------------

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}>
          <Typography variant="h4" gutterBottom>
            Danh sách ca
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOpenPopup(true)}>
            Tạo ca mới
          </Button>
        </Stack>

        <Card>
          <ShiftListToolbar
            numSelected={selected.length}
            filterValue={filterValues}
            onFilterValue={handleChangeFilterValues}
            filterRows={filterRows}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }} style={{ padding: '30px' }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  headLabel={TABLE_HEAD}
                  rowCount={shiftList.length}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {stableSort(shiftList, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((shift, idx) => {
                      const {
                        shiftid,
                        date,
                        starttime,
                        endtime,
                        status,
                        taskcount,
                        taskdone,
                      } = shift;

                      const selectedShift = selected.indexOf(shiftid) !== -1;

                      return (
                        <TableRow
                          hover
                          key={shiftid}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedShift}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedShift}
                              onChange={(event) => handleClick(event, shiftid)}
                            />
                          </TableCell>
                          <TableCell align="left">{date}</TableCell>

                          <TableCell align="left">{starttime}</TableCell>

                          <TableCell align="left">{endtime}</TableCell>

                          <TableCell align="left">
                            <Chip label={status} color={statusColor(status)} />
                          </TableCell>

                          <TableCell align="center">{taskcount}</TableCell>

                          <TableCell
                            align="center"
                            sx={{
                              fontWeight: 'bold',
                              color: theme.palette.text.markup,
                            }}>
                            {taskdone}
                          </TableCell>

                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              sx={{ fontSize: '14px', borderRadius: 30 }}
                              onClick={() => navToTask(shiftid)}>
                              Nhiệm vụ
                            </Button>
                          </TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(event) => {
                                handleOpenMenu(event);
                                setSelectedShift(shift);
                              }}>
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={SHIFTLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}>
        <MenuItem onClick={handleOpenEditPopup}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Chỉnh sửa
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenConfirm}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Xóa ca
        </MenuItem>
      </Popover>

      <Popup
        title="Tạo ca mới"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
        <ShiftForm
          values={addValues}
          onValues={handleChangeAddValues}
          onConfirmForm={onConfirmAddForm}
          onResetForm={onResetAddForm}
        />
      </Popup>
      <Popup
        title="Chỉnh sửa ca"
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}>
        <ShiftForm
          values={editValues}
          onValues={handleChangeEditValues}
          onConfirmForm={onConfirmEditForm}
          onResetForm={onResetEditForm}
        />
      </Popup>
      <Notification
        open={openNoti}
        handleClose={handleCloseNoti}
        status={actStatus}
      />
      <ConfirmPopup
        open={openConfirm}
        setOpen={setOpenConfirm}
        onConfirm={onConfirmDelete}
        itemID={selectedShift.shiftid}
        content="Bạn có muốn xóa bỏ ca này?"
      />
    </>
  );
}
