// @mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// -----------------------------------------------

export default function MuiAutocomplete() {
  return (<>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />


      <TextField id="outlined-basic" label="Outlined error" variant="outlined" error />
      <TextField id="filled-basic" label="Filled error" variant="filled" error />
      <TextField id="standard-basic" label="Standard error" variant="standard" error />


      <TextField id="outlined-basic-small" label="Outlined small" variant="outlined" size="small" />
      <TextField id="filled-basic-small" label="Filled small" variant="filled" size="small" />
      <TextField id="standard-basic-small" label="Standard small" variant="standard" size="small" />
    </Box>
  </>);
}
