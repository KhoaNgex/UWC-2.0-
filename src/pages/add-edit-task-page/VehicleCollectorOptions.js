import { useState } from 'react';
// @mui
import {
  Grid,
  Box,
  Typography,
  TextField,
  IconButton,
  Stack,
  MenuItem,
  Popover,
  Avatar,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// mock
import VEHICLELIST from '../../mock_data/Vehicle';
import COLLECTORLIST from '../../mock_data/Collector';

export default function VehicleCollectorOptions(props) {
  //------------------------------------------------------

  const { collector, setCollector, vehicle, setVehicle, errors } = props;

  const [openCo, setOpenCo] = useState(null);

  const handleCollectorValue = (collector) => {
    handleCloseCollector();
    setCollector(collector);
  };

  const handleOpenCollector = (event) => {
    setOpenCo(event.currentTarget);
  };

  const handleCloseCollector = () => {
    setOpenCo(null);
  };

  //------------------------------------------------------

  const [openVe, setOpenVe] = useState(null);

  const handleVehicleValue = (vehicle) => {
    handleCloseVehicle();
    setVehicle(vehicle);
  };

  const handleOpenVehicle = (event) => {
    setOpenVe(event.currentTarget);
  };

  const handleCloseVehicle = () => {
    setOpenVe(null);
  };

  //------------------------------------------------------

  return (
    <>
      <Grid container spacing={5} sx={{ p: { xs: 1, md: 2 } }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Chọn phương tiện:{' '}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 1,
            }}>
            <TextField
              fullWidth
              label="Mã phương tiện"
              value={vehicle.ID}
              error={errors.ve}
            />
            <IconButton onClick={handleOpenVehicle}>
              <LocalShippingIcon />
            </IconButton>
          </Box>
          {vehicle.ID !== 'None' ? (
            <Box
              sx={{
                backgroundColor: 'primary.lighter',
                py: 5,
                mt: 3,
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Avatar
                alt="vehicle"
                src="https://raw.githubusercontent.com/anduc146khmt/resource/master/public/assets/vehicle.png"
                sx={{ width: 210, height: 150, mb: 2 }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}>
                <Typography variant="h5" color="primary">
                  {vehicle.ID}
                </Typography>
                <Typography>
                  Payload Capacity (t): {vehicle.Payload_Capacity}
                </Typography>
                <Typography>
                  Cargo Space (m3): {vehicle.Capacity_of_cargo_space}
                </Typography>
                <Typography>
                  Fuel Consumption (l/100km): {vehicle.Fuel_consumption}
                </Typography>
              </Box>
            </Box>
          ) : (
            <p></p>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4">Chọn tài xế: </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 1,
            }}>
            <TextField
              margin="normal"
              fullWidth
              label="Tên tài xế"
              value={collector.Name}
              error={errors.co}
            />
            <IconButton onClick={handleOpenCollector}>
              <AccountCircleIcon />
            </IconButton>
          </Box>

          {collector.ID !== 0 ? (
            <Box
              sx={{
                backgroundColor: 'primary.lighter',
                p: 3,
                mt: 3,
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: { xs: 5, md: 3 },
              }}>
              <Avatar
                alt="ava"
                src={collector.Avatar}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}>
                <Typography variant="h5" color="primary" gutterBottom>
                  {collector.Name}
                </Typography>
                <Typography>ID tài xế: {collector.ID}</Typography>

                <Typography>
                  Loại bằng lái: <b>{collector.License}</b>
                </Typography>
              </Box>
            </Box>
          ) : (
            <p></p>
          )}
        </Grid>
      </Grid>

      <Popover
        open={Boolean(openVe)}
        anchorEl={openVe}
        onClose={handleCloseVehicle}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 400,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 2,
            },
          },
        }}>
        {' '}
        <Stack sx={{ p: 1 }}>
          {VEHICLELIST.map((vehicle) => (
            <MenuItem
              key={vehicle.ID}
              onClick={() => handleVehicleValue(vehicle)}>
              {' '}
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                }}>
                <Avatar
                  alt="vehicle"
                  src="https://raw.githubusercontent.com/anduc146khmt/resource/master/public/assets/vehicle.png"
                  sx={{ width: 70, height: 50 }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                  }}>
                  <Typography variant="h5">{vehicle.ID}</Typography>
                  <Typography>
                    Payload Capacity (t): {vehicle.Payload_Capacity}
                  </Typography>
                  <Typography>
                    Cargo Space (m3): {vehicle.Capacity_of_cargo_space}
                  </Typography>
                  <Typography>
                    Fuel Consumption (l/100km): {vehicle.Fuel_consumption}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          ))}
        </Stack>
      </Popover>

      <Popover
        open={Boolean(openCo)}
        anchorEl={openCo}
        onClose={handleCloseCollector}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 400,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 2,
            },
          },
        }}>
        {' '}
        <Stack sx={{ p: 1 }}>
          {COLLECTORLIST.map((collector) => (
            <MenuItem
              key={collector.Name}
              onClick={() => handleCollectorValue(collector)}>
              {' '}
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  alignItems: 'center',
                }}>
                <Avatar
                  alt="ava"
                  src={collector.Avatar}
                  sx={{ width: 50, height: 50 }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                  }}>
                  <Typography variant="h6">{collector.Name}</Typography>
                  <Typography>Loại bằng lái: {collector.License}</Typography>
                </Box>
              </Box>
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
