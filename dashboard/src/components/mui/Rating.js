import { useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

// -----------------------------------------------

export default function MuiAutocomplete() {
  const [value, setValue] = useState(2);

  return (<>
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly />

      <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} size="small" disabled />

      <Typography component="legend" >No rating given</Typography>
      <Rating name="no-value" size="large" value={null} />
    </Box>
  </>);
}
