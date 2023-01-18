import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
//@mui
import { Link, Avatar } from '@mui/material';

const Logo = ({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Avatar
      alt="Logo"
      src="https://raw.githubusercontent.com/anduc146khmt/resource/master/public/assets/logo.png"
      sx={{ width: 60, height: 60, m: 1 }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/app" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
};

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
