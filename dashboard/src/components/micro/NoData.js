import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from './Image';
import { urls } from '../../configs';


const NoData = ({ text = "No data found", sx, description = "", children }) => (
  <Stack className='aic m-auto py-5' spacing={2} >
    <Image src={`${urls.appBaseUrl}/assets/svg/no-data.svg`} sx={{ width: '200px', ...sx }} />
    <Typography variant="body1" gutterBottom>{text}</Typography>
    {description && <Typography >{description}</Typography>}
    {children && <div>{children}</div>}
  </Stack>
)

export default NoData;

NoData.propTypes = {
  text: PropTypes.string,
  sx: PropTypes.object,
  description: PropTypes.string,
  children: PropTypes.node,
};
