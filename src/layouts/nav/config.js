// component
import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`https://raw.githubusercontent.com/anduc146khmt/resource/master/public/assets/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: 'Ca và nhiệm vụ',
    path: '/app/shift',
    icon: icon('briefcase'),
  },
  {
    title: 'Nhân viên',
    path: '/app/employee',
    icon: icon('account-box'),
  },
  {
    title: 'Phương tiện',
    path: '/app/vehicle',
    icon: icon('truck-cargo-container'),
  },
  {
    title: 'Điểm thu gom',
    path: '/app/mcp',
    icon: icon('map-marker-radius'),
  },
];

export default navConfig;
