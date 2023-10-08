// @mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// -----------------------------------------------

const buttons = [
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
];

export default function MuiAutocomplete() {
  return (<>
    <Stack spacing={2}>
      <Box>
        <ButtonGroup disableElevation variant="contained" aria-label="contained primary button group">
          {buttons}
        </ButtonGroup>
      </Box>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {buttons}
      </ButtonGroup>
      <ButtonGroup color="error" aria-label="error button group">
        {buttons}
      </ButtonGroup>
      <Box sx={{ maxWidth: '300px' }}>
        <ButtonGroup orientation="vertical" variant="contained" aria-label="contained primary button group">
          {buttons}
        </ButtonGroup>
      </Box>
    </Stack>
  </>);
}
