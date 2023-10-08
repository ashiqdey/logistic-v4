import { useState } from 'react';
// @mui
import Stack from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

// -----------------------------------------------

export default function MuiAutocomplete() {
  const [loading, setLoading] = useState(false);


  return (<>
    <Stack sx={{ width: '100%' }} spacing={2}>
      <FormControlLabel
        sx={{
          display: 'block',
        }}
        control={
          <Switch
            checked={loading}
            onChange={() => setLoading(!loading)}
            name="loading"
            color="primary"
          />
        }
        label="Loading"
      />

      {
        loading && <>
          <CircularProgress />
          <LinearProgress />
        </>
      }
    </Stack>
  </>);
}
