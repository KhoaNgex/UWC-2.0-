import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import {
  Paper,
  Box,
  IconButton,
  Typography,
  Grid,
  Chip,
  Button,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableContainer,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// component
import Iconify from "../../components/iconify";
// mock
import TASKLIST from "../../mock_data/Task";
import SHIFTTASK from "../../mock_data/Shift_Task";
import MCPLIST from "../../mock_data/MCP";
import ROUTE from "../../mock_data/Route";
//------------------------------------------------------------

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//-----------------------------------------------

const initTask = {
  shiftid: 0,
  Task_ID: 0,
  Status: "",
  Vehicle_ID: "fff",
  Collector: "",
  Route_ID: "",
};

//------------------------------------------------
export default function TaskDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { taskid } = useParams();

  const navToPlanner = () => {
    navigate(`/app/route-planner/${taskid}`, {
      state: {
        shiftid: location.state.shiftid,
      },
    });
  };

  // get task info
  const [taskInfo, setTaskInfo] = useState(initTask);

  // get mcp list
  const [mcpList, setMcpList] = useState([]);

  useEffect(() => {
    let idx = TASKLIST.findIndex((task) => task.Task_ID === Number(taskid));
    if (localStorage.getItem(`task_detail_${taskid}`) === null) {
      setTaskInfo(TASKLIST[idx]);
      let filtered_list = SHIFTTASK.filter(
        (task) =>
          task.shiftid === Number(location.state.shiftid) &&
          task.taskid === Number(taskid)
      );
      setMcpList(filtered_list);
    } else {
      //new task or edited task
      var parse_task_detail = JSON.parse(
        localStorage.getItem(`task_detail_${taskid}`)
      );
      //console.log(parse_task_detail);

      setTaskInfo(parse_task_detail.task_info);
      let mcp_list_idx = ROUTE.findIndex(
        (item) => item.Route_ID === parse_task_detail.task_info.Route_ID
      );
      var mcp_list = ROUTE[mcp_list_idx].MCP_ID;
      let filtered_list = [];
      for (let i = 0; i < mcp_list.length; i++) {
        let item = {
          mcpid: mcp_list[i],
          leader: parse_task_detail.leaderList[i],
          members: parse_task_detail.memberList[i],
        };
        filtered_list.push(item);
      }
      //console.log(filtered_list);
      setMcpList(filtered_list);
    }
  }, []);

  //----------------------------------------------

  const statusColor = (status) => {
    if (status === "Chưa bắt đầu") return "warning";
    else if (status === "Đang thu gom") return "primary";
    else if (status === "Vận chuyển") return "secondary";
    else return "success";
  };

  //----------------------------------------------

  return (
    <Box
      sx={{
        px: 5,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          mb: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "18px",
            mb: 3,
          }}
        >
          <IconButton
            sx={{ height: "32px", width: "32px" }}
            onClick={() =>
              navigate(`/app/shift/${location.state.shiftid}`, {
                replace: true,
              })
            }
          >
            <ArrowBackIcon sx={{ fontSize: "32px" }} />
          </IconButton>
          <Typography variant="h4">ID nhiệm vụ</Typography>
          <Typography variant="body1">#{taskid}</Typography>
        </Box>

        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                gap: "10px",
                mb: 3,
              }}
            >
              <Iconify icon="bi:people-circle" />
              <Typography variant="body1">
                <b>Tài xế: </b>
                {taskInfo.Collector}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                gap: "10px",
                mb: 3,
              }}
            >
              <Iconify icon="material-symbols:location-on" />
              <Typography variant="body1">
                <b>Mã lộ trình: </b>
                {taskInfo.Route_ID}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                gap: "10px",
              }}
            >
              <Iconify icon="material-symbols:nest-clock-farsight-analog-outline" />
              <Typography variant="body1">
                <b>ID ca làm việc: </b>
                {taskInfo.shiftid}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  gap: "10px",
                }}
              >
                <Iconify icon="mdi:truck-cargo-container" />
                <Typography variant="body1">
                  <b>Mã phương tiện: </b>
                  {taskInfo.Vehicle_ID}
                </Typography>
              </Box>
              <Chip
                label={taskInfo.Status}
                color={statusColor(taskInfo.Status)}
              />
              <Button
                variant="contained"
                onClick={navToPlanner}
                sx={{ height: 50 }}
              >
                Tạo route tối ưu
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>MCP ID</StyledTableCell>
              <StyledTableCell align="left">Địa điểm</StyledTableCell>
              <StyledTableCell align="left">Nhóm trưởng</StyledTableCell>
              <StyledTableCell align="left">Thành viên</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mcpList.map((mcp, idx) => (
              <StyledTableRow key={mcp.mcpid}>
                <StyledTableCell component="th" scope="row">
                  {mcp.mcpid}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {
                    MCPLIST[
                      MCPLIST.findIndex((item) => item.MCP_ID === mcp.mcpid)
                    ].Address
                  }
                </StyledTableCell>
                <StyledTableCell align="left">{mcp.leader}</StyledTableCell>
                <StyledTableCell align="left">
                  {mcp.members.map((item, idx) => (
                    <Typography key={idx} variant="body2">
                      {item}
                    </Typography>
                  ))}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
