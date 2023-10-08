import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import * as React from 'react';


const DropDown = ({ selectlabel, error, errmsg, ...rest }) => (
  <Box sx={{ my: 1, mx: 1 }}>
    <Select
      size="small"
      aria-label={selectlabel}
      value={''}
      {...rest}
    />
    <InputLabel variant="standard" style={{ fontSize: 12, textAlign: 'left', color: '#d32f2f', whiteSpace: 'unset' }} >{error ? errmsg : null}</InputLabel>
    <InputLabel id="bt-label" variant="standard" style={{ fontSize: 12, textAlign: 'left', whiteSpace: 'unset', }} >{selectlabel}</InputLabel>
  </Box>
);

export default DropDown;

DropDown.propTypes = {
  selectlabel: PropTypes.string,
  error: PropTypes.bool,
  errmsg: PropTypes.string,
};
