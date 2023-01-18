import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//@mui
import {
  TextField,
  Avatar,
  Button,
  Typography,
  Box,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
// components
import Iconify from '../../components/iconify';

//-------------------------------------------------

const initialFValues = {
  username: '',
  password: '',
};

// -------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('username' in fieldValues)
      temp.username = fieldValues.username ? '' : 'Điền tên tài khoản!';
    if ('password' in fieldValues)
      temp.password = fieldValues.password ? '' : 'Điền mật khẩu';
    setErrors({ ...temp });

    // return true if there're any errors
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/app', { replace: true });
      resetForm();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar
          alt="Logo"
          src="https://raw.githubusercontent.com/anduc146khmt/resource/master/public/assets/logo.png"
          sx={{ width: 100, height: 100, m: 1 }}
        />
        <Typography component="h1" variant="h4">
          Đăng nhập
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Tên tài khoản"
            name="username"
            value={values.username}
            onChange={handleInputChange}
            {...(errors.username && {
              error: true,
              helperText: errors.username,
            })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Mật khẩu"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            {...(errors.password && {
              error: true,
              helperText: errors.password,
            })}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end">
                    <Iconify
                      icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ height: 50, mt: 3, mb: 2 }}
            onClick={handleSubmit}>
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
