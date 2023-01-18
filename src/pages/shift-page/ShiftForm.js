import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const StyledRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledFields = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: theme.spacing(1, 1, 2, 1),
}));

const StyledButtonContainer = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  display: "flex",
  flexDirection: "row",
  gap: 20,
  padding: theme.spacing(1, 1, 2, 1),
}));

ShiftForm.propTypes = {
  values: PropTypes.object,
  onValues: PropTypes.func,
  onConfirmForm: PropTypes.func,
  onResetForm: PropTypes.func,
};

export default function ShiftForm({
  values,
  onValues,
  onConfirmForm,
  onResetForm,
}) {
  return (
    <StyledRoot>
      <StyledFields>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "20px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Giờ bắt đầu"
                  ampm={false}
                  value={values.starttime}
                  onChange={(newValue) => onValues("starttime", newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Giờ kết thúc"
                  ampm={false}
                  value={values.endtime}
                  onChange={(newValue) => onValues("endtime", newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item xs={6}>
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
                  label="Ngày"
                  inputFormat="YYYY/MM/DD"
                  value={values.date}
                  onChange={(newValue) => onValues("date", newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <FormControl fullWidth>
                <InputLabel id="add-status-select-label">Trạng thái</InputLabel>
                <Select
                  labelId="add-status-select-label"
                  label="Trạng thái"
                  value={values.status}
                  onChange={(e) => onValues("status", e.target.value)}
                >
                  <MenuItem value="Chưa diễn ra">Chưa diễn ra</MenuItem>
                  <MenuItem value="Đang diễn ra">Đang diễn ra</MenuItem>
                  <MenuItem value="Kết thúc">Kết thúc</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </StyledFields>
      <StyledButtonContainer>
        <Button variant="contained" onClick={onConfirmForm}>
          Xác nhận
        </Button>
        <Button variant="outlined" color="error" onClick={onResetForm}>
          Đặt lại
        </Button>
      </StyledButtonContainer>
    </StyledRoot>
  );
}
