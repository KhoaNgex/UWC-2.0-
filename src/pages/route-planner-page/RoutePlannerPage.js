import { useState, forwardRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
// @mui
import {
  Box,
  IconButton,
  Typography,
  Paper,
  Button,
  Slide,
  Dialog,
  DialogActions,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Notification from '../../components/notification';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RoutePlannerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { taskid } = useParams();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openNoti, setOpenNoti] = useState(false);

  const handleCloseNoti = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNoti(false);
  };

  const navToTask = () => {
    navigate(`/app/task/${taskid}`, {
      state: {
        shiftid: location.state.shiftid,
      },
    });
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: 5,
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '18px',
          }}>
          <IconButton
            sx={{ height: '32px', width: '32px' }}
            onClick={navToTask}>
            <ArrowBackIcon sx={{ fontSize: '32px' }} />
          </IconButton>
          <Typography variant="h4">Quay lại</Typography>
          <Typography variant="body1">#{taskid}</Typography>
        </Box>
        <Box sx={{ p: { xs: 1, md: 5 }, mt: { xs: 3, md: 0 } }}>
          <Paper elevation={3}>
            <Box
              sx={{
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 3,
              }}>
              {' '}
              <Typography variant="h3">Route Planner</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" onClick={() => setOpenNoti(true)}>
                  Gửi
                </Button>
                <Button variant="outlined" onClick={handleClickOpen}>
                  Đường đi
                </Button>
              </Box>
            </Box>
            <Box
              component="img"
              alt="map"
              src="https://raw.githubusercontent.com/anduc146khmt/resource/master/public/assets/map.png"
            />
          </Paper>
        </Box>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 4,
          }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            10.5 km
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}>
            <Typography variant="body1">
              <b>Bắt đầu:</b> 69 Tân Lập, Đông Hòa, Dĩ An, Bình Dương (Chi nhánh
              1)
            </Typography>
            <Typography variant="body1">
              1. #60002: 69 Nguyễn Khắc Nhu Phường Cô Giang Quận 1 Tp. HCM
            </Typography>
            <Typography variant="body1">
              2. #60005: 200 Lê Quang Sung, Phường 6, Quận 6 Tp.HCM
            </Typography>
            <Typography variant="body1">
              3. #60001: 167 Phạm Hữu Lầu Phường Mỹ Phước Quận 7 TP. HCM
            </Typography>
            <Typography variant="body1">
              <b>Depot:</b> 101 Nguyễn Thị Thập, Tân Phú, Quận 7, Thành phố Hồ
              Chí Minh
            </Typography>
          </Box>
        </Box>

        <DialogActions>
          <Button onClick={handleClose}>Thoát</Button>
        </DialogActions>
      </Dialog>
      <Notification
        open={openNoti}
        handleClose={handleCloseNoti}
        status={true}
      />
    </>
  );
}
