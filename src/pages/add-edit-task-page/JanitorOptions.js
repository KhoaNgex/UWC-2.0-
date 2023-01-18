import { useState, useEffect } from "react";
// @mui
import { styled } from "@mui/material/styles";
import {
  Paper,
  Table,
  Box,
  Typography,
  TableRow,
  TableHead,
  TableBody,
  TableContainer,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Chip,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// mock
import ROUTELIST from "../../mock_data/Route";
import MCPLIST from "../../mock_data/MCP";
import JANITORLIST from "../../mock_data/Janitor";

//------------------------------------------------------

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, memberList, theme) {
  return {
    fontWeight:
      memberList.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

//======================================================

export default function JanitorOptions(props) {
  const theme = useTheme();

  //---------------------------------------------------------

  const { month_route, leaderList, setLeaderList, memberList, setmemberList } = props;

  // get MCP list
  const [mcpIDList, setMcpIDList] = useState([]);

  useEffect(() => {
    var route_idx = ROUTELIST.findIndex(
      (route) => route.Route_ID === month_route
    );
    setMcpIDList(ROUTELIST[route_idx].MCP_ID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //---------------------------------------------------------

  const handleChangeMember = (event, idx) => {
    const {
      target: { value },
    } = event;
    let copyArr = [...memberList];
    copyArr[idx] = typeof value === "string" ? value.split(",") : value;
    setmemberList(copyArr);
  };
  //----------------------------------------------------

  const handleChangeLeader = (event, idx) => {
    const {
      target: { value },
    } = event;
    let copyArr = { ...leaderList };
    copyArr[idx] = String(value);
    setLeaderList(copyArr);
  };

  //----------------------------------------------------
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6">
          Danh sách Điểm thu gom trong lộ trình tháng của phương tiện
        </Typography>
        <Typography variant="h5" color="primary">
          {month_route}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1000 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>MCP ID</StyledTableCell>
                <StyledTableCell align="left">Địa điểm</StyledTableCell>
                <StyledTableCell align="left">Nhóm trưởng</StyledTableCell>
                <StyledTableCell align="left">Thành viên</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mcpIDList.map((mcpid, idx) => (
                <StyledTableRow key={mcpid}>
                  <StyledTableCell component="th" scope="row">
                    {mcpid}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {
                      MCPLIST[MCPLIST.findIndex((mcp) => mcp.MCP_ID === mcpid)]
                        .Address
                    }
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <FormControl sx={{ width: 220 }}>
                      <InputLabel id="leader-select-label">
                        Tên nhóm trưởng
                      </InputLabel>
                      <Select
                        labelId="leader-select-label"
                        id="leader-select"
                        label="Tên nhóm trưởng"
                        value={leaderList[idx]}
                        onChange={(e) => handleChangeLeader(e, idx)}
                      >
                        {JANITORLIST.map((item, idx) => (
                          <MenuItem key={item.ID} value={item.Name}>
                            {item.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <FormControl sx={{ m: 1, width: 200 }}>
                      <InputLabel id="member-label">Tên thành viên</InputLabel>
                      <Select
                        labelId="member-label"
                        id="memmber-chip"
                        multiple
                        value={memberList[idx] ? memberList[idx] : ""}
                        onChange={(e) => handleChangeMember(e, idx)}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Tên thành viên"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {JANITORLIST.map((item, idx) => (
                          <MenuItem
                            key={item.ID}
                            value={item.Name}
                            style={getStyles(item.Name, memberList, theme)}
                          >
                            {item.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
