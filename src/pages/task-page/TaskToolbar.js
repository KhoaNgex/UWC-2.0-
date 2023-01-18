import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
// component
import Iconify from "../../components/iconify";

// ----------------------------------------------------------------------

const StyledRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: theme.spacing(3),
  padding: theme.spacing(3, 4, 3, 4),
}));

const StyledSelected = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(3, 4, 3, 4),
}));

// ----------------------------------------------------------------------

ShiftListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterValue: PropTypes.object,
  onFilterValue: PropTypes.func,
  filterRows: PropTypes.func,
};

export default function ShiftListToolbar({
  numSelected,
  filterValue,
  onFilterValue,
  filterRows,
}) {
  return (
    <>
      {numSelected > 0 ? (
        <StyledSelected
          sx={{ color: "primary.main", bgcolor: "primary.light" }}
        >
          <Typography variant="h6">{numSelected} selected</Typography>
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </StyledSelected>
      ) : (
        <StyledRoot>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography variant="h6">Filter</Typography>
            <Iconify icon="ic:round-filter-list" />
          </Box>
          <Grid container spacing={5}>
            <Grid item xs={8}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: "20px",
                }}
              >
                <TextField
                  label="Tên tài xế"
                  name="collector_name"
                  value={filterValue.collector_name}
                  onChange={(e) =>
                    onFilterValue("collector_name", e.target.value)
                  }
                />

                <FormControl fullWidth>
                  <InputLabel id="status-select-label">Trạng thái</InputLabel>
                  <Select
                    labelId="status-select-label"
                    value={filterValue.status}
                    label="Trạng thái"
                    onChange={(e) => onFilterValue("status", e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Chưa bắt đầu">Chưa bắt đầu</MenuItem>
                    <MenuItem value="Đang thu gom">Đang thu gom</MenuItem>
                    <MenuItem value="Vận chuyển">Vận chuyển</MenuItem>
                    <MenuItem value="Hoàn thành">Hoàn thành</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ height: 50 }}
                  onClick={filterRows}
                >
                  Filter
                </Button>
              </Box>
            </Grid>
          </Grid>
        </StyledRoot>
      )}
    </>
  );
}
