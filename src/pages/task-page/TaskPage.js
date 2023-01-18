import { useState, useEffect, forwardRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LinearProgress,
  Box,
  Paper,
  Typography,
  Grid,
  IconButton,
  Chip,
  Button,
  Pagination,
  Container,
  Card,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  TablePagination,
  MenuItem,
  Popover,
  Dialog,
  DialogActions,
  Slide,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ErrorIcon from '@mui/icons-material/Error';

// sections
import TaskToolbar from './TaskToolbar';
// component
import Iconify from '../../components/iconify';
import Notification from '../../components/notification';
import Scrollbar from '../../components/scrollbar';
import ListHead from '../../components/list-head';
import ConfirmPopup from '../../components/confirm-popup';
// mock
import NOTILIST from '../../mock_data/notification';
import TASKLIST from '../../mock_data/Task';
import SHIFTLIST from '../../mock_data/shift';
import VEHICLELIST from '../../mock_data/Vehicle';
import COLLECTORLIST from '../../mock_data/Collector';
import SHIFTTASK from '../../mock_data/Shift_Task';
// utils
import { getComparator, stableSort } from '../../utils/sortEngine.js';
import { getRandomIntInclusive } from '../../utils/mathSupport.js';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Task_ID', label: 'ID nhiệm vụ', align: 'left' },
  { id: 'Status', label: 'Trạng thái', align: 'left' },
  { id: 'Vehicle_ID', label: 'Mã phương tiện', align: 'left' },
  { id: 'Collector', label: 'Tài xế', align: 'left' },
  { id: 'Route_ID', label: 'Mã lộ trình', align: 'left' },
  { id: 'button' },
  { id: 'menu' },
];

const NOTI_PER_PAGE = 2;

const progressMapping = {
  'bắt đầu': 'Đang thu gom',
  'thu gom': 'Vận chuyển',
  'vận chuyển': 'Hoàn thành',
};

//----------------------------------------------

const initFilterValue = {
  collector_name: '',
  status: '',
};

//------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//----------------------------------------------------------

export default function TaskPage() {
  const navigate = useNavigate();

  const navToAddTask = () => {
    navigate('/app/addTask', {
      state: {
        shiftid: shiftid,
      },
    });
  };

  const navToTaskDetail = (taskid) => {
    navigate(`/app/task/${taskid}`, {
      state: {
        shiftid: shiftid,
      },
    });
  };

  //----------------------------------------------------------

  const { shiftid } = useParams();

  const [shiftInfo, setShiftInfo] = useState({});

  const [taskList, setTaskList] = useState([]);

  const [selectedTask, setSelectedTask] = useState({});

  // get shift info
  const getShiftInfo = (shiftid) => {
    return SHIFTLIST.find((shift) => shift.shiftid === Number(shiftid));
  };

  // get task list of shift
  const getTaskList = (shiftid) => {
    return TASKLIST.filter((task) => task.shiftid === Number(shiftid));
  };

  useEffect(() => {
    let shiftinfo_ = getShiftInfo(shiftid);
    let tasklist_ = getTaskList(shiftid);
    setShiftInfo(shiftinfo_);

    //handle if has new task
    if (localStorage.getItem('new_task') !== null) {
      var parse_task = JSON.parse(localStorage.getItem('new_task'));
      //console.log(parse_task);

      // check collector and vehicle
      var i = 0;
      for (i = 0; i < tasklist_.length; i++) {
        if (
          tasklist_[i].Collector === parse_task.collector.Name ||
          tasklist_[i].Vehicle_ID === parse_task.vehicle.ID
        ) {
          break;
        }
      }
      if (i === tasklist_.length) {
        // add new task to task page
        let ve_idx = VEHICLELIST.findIndex(
          (item) => item.ID === parse_task.vehicle.ID
        );
        var new_task = {
          shiftid: Number(shiftid),
          Task_ID: getRandomIntInclusive(60000, 100000),
          Status: 'Chưa bắt đầu',
          Vehicle_ID: parse_task.vehicle.ID,
          Collector: parse_task.collector.Name,
          Route_ID: VEHICLELIST[ve_idx].Route_ID,
        };
        tasklist_.unshift(new_task);
        //console.log(tasklist_)

        let task_detail = {
          task_info: new_task,
          leaderList: parse_task.leaderList,
          memberList: parse_task.memberList,
        };
        if (localStorage.getItem(`task_detail_${new_task.Task_ID}`) !== null)
          localStorage.removeItem(`task_detail_${new_task.Task_ID}`);
        // save task detail
        localStorage.setItem(
          `task_detail_${new_task.Task_ID}`,
          JSON.stringify(task_detail)
        );
      } else {
        //console.log("error");
        handleOpenError();
      }
      localStorage.removeItem('new_task');
    }

    // handle if has edited task
    for (let i = 0; i < tasklist_.length; i++) {
      let taskid = tasklist_[i].Task_ID;
      let query = localStorage.getItem(`new-edited-task-${taskid}`);
      if (query !== null) {
        let parse_info = JSON.parse(query);

        // check duplicate

        // check collector and vehicle
        var j = 0;
        for (j = 0; j < tasklist_.length; j++) {
          if (i === j) continue;
          if (
            tasklist_[j].Collector === parse_info.collector.Name ||
            tasklist_[j].Vehicle_ID === parse_info.vehicle.ID
          ) {
            break;
          }
        }
        if (j === tasklist_.length) {
          let edited_record = {
            ...tasklist_[i],
            Vehicle_ID: parse_info.vehicle.ID,
            Collector: parse_info.collector.Name,
            Route_ID: parse_info.vehicle.Route_ID,
          };
          tasklist_[i] = edited_record;

          let task_detail = {
            task_info: edited_record,
            leaderList: parse_info.leaderList,
            memberList: parse_info.memberList,
          };
          if (localStorage.getItem(`task_detail_${taskid}`) !== null)
            localStorage.removeItem(`task_detail_${taskid}`);
          // save task detail
          localStorage.setItem(
            `task_detail_${taskid}`,
            JSON.stringify(task_detail)
          );
        } else {
          handleOpenError();
        }
        localStorage.removeItem(`new-edited-task-${taskid}`);
      }
    }
    setTaskList(tasklist_);
  }, []);

  //----------------------------------------------------------

  const [notiPage, setNotiPage] = useState(0);

  const maxPage = Math.ceil(NOTILIST.length / NOTI_PER_PAGE);

  //-----------------------------------------------------------

  const [openNoti, setOpenNoti] = useState(false);

  const [actStatus, setActStatus] = useState(false);

  const handleCloseNoti = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNoti(false);
  };

  //---------------------------------------------------------

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('Task_ID');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  //---------------------------------------------------------

  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = taskList.map((task) => task.Task_ID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, Task_ID) => {
    const selectedIndex = selected.indexOf(Task_ID);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, Task_ID);
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

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  //--------------------------------------------------------

  const [filterValues, setFilterValues] = useState(initFilterValue);

  const handleChangeFilterValues = (name, newValue) => {
    setFilterValues({ ...filterValues, [name]: newValue });
  };

  const filterRows = () => {
    let filteredList = getTaskList(shiftid);
    if (filterValues.collector_name !== '' && filterValues.status !== '') {
      filteredList = taskList.filter(
        (task) =>
          task.Collector === filterValues.collector_name &&
          task.Status === filterValues.status
      );
    } else if (
      filterValues.collector_name === '' &&
      filterValues.status !== ''
    ) {
      filteredList = taskList.filter(
        (task) => task.Status === filterValues.status
      );
    } else if (
      filterValues.collector_name !== '' &&
      filterValues.status === ''
    ) {
      filteredList = taskList.filter(
        (task) => task.Collector === filterValues.collector_name
      );
    }
    setTaskList(filteredList);
  };

  //-----------------------------------------------------------------

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    handleCloseMenu();
    setOpenConfirm(true);
  };

  const onConfirmDelete = (Task_ID) => {
    let idx = taskList.findIndex((task) => {
      return task.Task_ID === Task_ID;
    });
    // console.log(idx)
    let deletedTaskList = taskList;
    deletedTaskList.splice(idx, 1);
    setTaskList(deletedTaskList);
    setOpenConfirm(false);
    setActStatus(true);
    setOpenNoti(true);
  };

  //--------------------------------------------------------

  const [notiList, setNotiList] = useState(NOTILIST);

  const handleConfirmProgress = (noti) => {
    let content_parse = noti.content.split(' ');
    let progress = [content_parse[5], content_parse[6]].join(' ');
    setActStatus(false);
    const newState = taskList.map((obj) => {
      if (obj.Task_ID === noti.taskID) {
        setActStatus(true);
        return { ...obj, Status: progressMapping[progress] };
      }
      return obj;
    });
    var index = notiList.findIndex((obj) => obj === noti);
    var array = [...notiList];
    if (index !== -1) {
      array.splice(index, 1);
      setNotiList(array);
    }
    setTaskList(newState);
    setOpenNoti(true);
  };

  //---------------------------------------------------------

  const [openError, setOpenError] = useState(false);

  const handleOpenError = () => {
    setOpenError(true);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  //---------------------------------------------------------

  const handleEditTask = (task) => {
    // save to localstorage
    let ve_idx = VEHICLELIST.findIndex((item) => task.Vehicle_ID === item.ID);
    let co_idx = COLLECTORLIST.findIndex(
      (item) => task.Collector === item.Name
    );
    let ts_list = SHIFTTASK.filter((item) => item.taskid === task.Task_ID);
    let leader_list = ts_list.map((item) => item.leader);
    let member_list = ts_list.map((item) => item.members);

    const save_info = {
      vehicle: VEHICLELIST[ve_idx],
      collector: COLLECTORLIST[co_idx],
      leaderList: leader_list,
      memberList: member_list,
    };

    //console.log(save_info)

    localStorage.setItem(
      `edited-task-${task.Task_ID}`,
      JSON.stringify(save_info)
    );

    navigate(`/app/editTask/${task.Task_ID}`, {
      state: {
        shiftid: shiftid,
      },
    });
  };

  //---------------------------------------------------------

  const statusColor = (status) => {
    if (status === 'Chưa bắt đầu') return 'warning';
    else if (status === 'Đang thu gom') return 'primary';
    else if (status === 'Vận chuyển') return 'secondary';
    else return 'success';
  };

  const statusShiftColor = (status) => {
    if (status === 'Chưa diễn ra') return 'warning';
    else if (status === 'Kết thúc') return 'success';
    else return 'secondary';
  };

  //---------------------------------------------------------

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            padding: '18px',
          }}>
          <Paper
            elevation={3}
            sx={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              mt: 5,
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '18px',
                mb: 3,
              }}>
              <IconButton
                sx={{ height: '32px', width: '32px' }}
                onClick={() =>
                  navigate('/app', {
                    replace: true,
                  })
                }>
                <ArrowBackIcon sx={{ fontSize: '32px' }} />
              </IconButton>
              <Typography variant="h4">Thông tin ca</Typography>
              <Typography variant="body1">#{shiftid}</Typography>
            </Box>

            <Grid container sx={{ padding: 1 }}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    gap: '10px',
                  }}>
                  <Iconify icon="material-symbols:calendar-month" />
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    <b>Ngày: </b>
                    {shiftInfo.date}
                  </Typography>
                </Box>
                <Chip
                  label={shiftInfo.status}
                  color={statusShiftColor(shiftInfo.status)}
                />
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    gap: '10px',
                  }}>
                  <Iconify icon="material-symbols:nest-clock-farsight-analog-outline" />
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    <b>Giờ bắt đầu: </b>
                    {shiftInfo.starttime}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    gap: '10px',
                  }}>
                  <Iconify icon="material-symbols:nest-clock-farsight-analog-outline" />
                  <Typography variant="body1">
                    <b>Giờ kết thúc: </b>
                    {shiftInfo.endtime}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box display="flex" alignItems="center" py={3}>
              <Box width="100%" mr={3}>
                <LinearProgress
                  variant="determinate"
                  value={Math.round(
                    (shiftInfo.taskdone * 100) / shiftInfo.taskcount
                  )}
                  sx={{
                    height: 25,
                    borderRadius: 50,
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 50,
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  {shiftInfo.taskdone}/{shiftInfo.taskcount}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            paddingLeft: '18px',
            paddingRight: '18px',
          }}>
          <Paper
            elevation={3}
            sx={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Typography
              variant="h4"
              sx={{
                mb: 3,
              }}>
              Thông báo tiến độ
            </Typography>
            {notiList
              .slice(
                notiPage * NOTI_PER_PAGE,
                notiPage * NOTI_PER_PAGE + NOTI_PER_PAGE
              )
              .map((noti, idx) => {
                const { taskID, minute, content } = noti;
                return (
                  <Box
                    sx={{
                      padding: 2,
                      paddingBottom: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: '#EBF8F2',
                      borderRadius: 3,
                      mb: 2,
                      width: '100%',
                    }}
                    key={idx}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'center',
                        gap: '10px',
                        mb: 1,
                      }}>
                      <Typography variant="body2">
                        <em>{minute} phút trước</em>
                      </Typography>
                      <Typography variant="body1">#{taskID}</Typography>
                    </Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 1,
                      }}>
                      {content}
                    </Typography>
                    <Button
                      startIcon={<DoneAllIcon />}
                      onClick={() => handleConfirmProgress(noti)}
                      sx={{ width: 120 }}>
                      Xác nhận
                    </Button>
                  </Box>
                );
              })}
            <Pagination
              count={maxPage}
              color="success"
              onChange={(e, value) => setNotiPage(value - 1)}
            />
          </Paper>
        </Grid>
      </Grid>

      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mb: 5,
            mt: 3,
            gap: 3,
          }}>
          <Typography variant="h4">Danh sách nhiệm vụ</Typography>
          <Button
            variant="contained"
            startIcon={<AddTaskIcon />}
            onClick={navToAddTask}>
            Phân nhiệm vụ mới
          </Button>
        </Box>

        <Card>
          <TaskToolbar
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
                  rowCount={taskList.length}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {stableSort(taskList, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((task, idx) => {
                      const {
                        Task_ID,
                        Status,
                        Vehicle_ID,
                        Collector,
                        Route_ID,
                      } = task;

                      const selectedTask = selected.indexOf(Task_ID) !== -1;

                      return (
                        <TableRow
                          hover
                          key={Task_ID}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedTask}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedTask}
                              onChange={(event) => handleClick(event, Task_ID)}
                            />
                          </TableCell>
                          <TableCell align="left">{Task_ID}</TableCell>

                          <TableCell align="left">
                            {' '}
                            <Chip label={Status} color={statusColor(Status)} />
                          </TableCell>

                          <TableCell align="left">{Vehicle_ID}</TableCell>

                          <TableCell align="left">{Collector}</TableCell>

                          <TableCell align="left">{Route_ID}</TableCell>

                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              onClick={() => navToTaskDetail(Task_ID)}
                              sx={{ fontSize: '14px', borderRadius: 30 }}>
                              Xem
                            </Button>
                          </TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(event) => {
                                handleOpenMenu(event);
                                setSelectedTask(task);
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
            count={taskList.length}
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
        <MenuItem onClick={() => handleEditTask(selectedTask)}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Chỉnh sửa
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenConfirm}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>

      <Notification
        open={openNoti}
        handleClose={handleCloseNoti}
        status={actStatus}
      />

      <ConfirmPopup
        open={openConfirm}
        setOpen={setOpenConfirm}
        onConfirm={onConfirmDelete}
        itemID={selectedTask.Task_ID}
        content="Bạn có muốn xóa bỏ nhiệm vụ này?"
      />

      <Dialog
        open={openError}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseError}
        aria-describedby="alert-dialog-slide-description">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 4,
            gap: 3,
          }}>
          <ErrorIcon color="error" sx={{ height: 50, width: 50 }} />
          <Typography variant="h5">
            Trùng nhân viên hoặc trùng phương tiện với nhiệm vụ khác?!
          </Typography>
        </Box>

        <DialogActions>
          <Button onClick={handleCloseError}>Thoát</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
