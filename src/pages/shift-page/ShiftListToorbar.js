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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
  alignItems: 'center',
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Ng??y"
                    value={filterValue.date}
                    inputFormat="YYYY/MM/DD"
                    onChange={(newValue) => onFilterValue("date", newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <FormControl fullWidth>
                  <InputLabel id="status-select-label">Tr???ng th??i</InputLabel>
                  <Select
                    labelId="status-select-label"
                    value={filterValue.status}
                    label="Tr???ng th??i"
                    onChange={(e) => onFilterValue("status", e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Ch??a di???n ra">Ch??a di???n ra</MenuItem>
                    <MenuItem value="??ang di???n ra">??ang di???n ra</MenuItem>
                    <MenuItem value="K???t th??c">K???t th??c</MenuItem>
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
