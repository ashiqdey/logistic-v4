// @mui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// -----------------------------------------------

export default function MuiAutocomplete() {
  return (<>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
      }}
    >
      <Paper elevation={0} variant='flat'>flat</Paper>
      <Paper elevation={0}>0</Paper>
      <Paper>1</Paper>
      <Paper elevation={3}>3</Paper>
      <Paper elevation={4}>4</Paper>
      <Paper elevation={6}>6</Paper>
      <Paper elevation={8}>8</Paper>
      <Paper elevation={12}>12</Paper>
      <Paper elevation={16}>16</Paper>
      <Paper elevation={24}>24</Paper>
    </Box>
  </>);
}
