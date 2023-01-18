//@mui
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

//component
import LoginForm from './LoginForm';

const StyledRoot = styled('div')({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url("https://raw.githubusercontent.com/anduc146khmt/resource/master/public/assets/login_background.jpg")`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

const StyledPaper = styled(Paper)({
  padding: 20,
  height: '90vh',
  width: 450,
});

export default function LoginPage() {
  return (
    <StyledRoot>
      <StyledPaper>
        <LoginForm />
      </StyledPaper>
    </StyledRoot>
  );
}
