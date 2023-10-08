import PropTypes from 'prop-types';
import * as React from 'react';
// @mui
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

// -----------------------------------------------


const TextInput = ({ textlabel, error, errmsg, disabled, ...props }) => (
  <Box sx={{ my: 1, mx: 1 }}>
    <TextField
      size='small'
      // inputProps={{
      //   style: {
      //     height: 30,
      //     padding: '0px 14px',
      //   },
      // }}

      hiddenLabel
      fullWidth
      sx={{
        alignItems: "center",
      }}
      variant="outlined"
      aria-label={textlabel}
      helperText={null}
      {...props}
    />
    <InputLabel variant="standard" style={{ fontSize: 12, textAlign: 'left', color: '#d32f2f', whiteSpace: 'unset' }} >{error ? errmsg : null}</InputLabel>
    <InputLabel variant="standard" style={{ fontSize: 12, textAlign: 'left', whiteSpace: 'unset', color: disabled ? '#00000033' : '' }} >{textlabel}</InputLabel>
  </Box>
);
export default TextInput;

TextInput.propTypes = {
  textlabel: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  errmsg: PropTypes.string,
}; 