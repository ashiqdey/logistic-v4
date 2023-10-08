import { useState } from 'react';
// @mui
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// -----------------------------------------------
export default function MuiAutocomplete() {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (<>
    <Stack spacing={2}>
      <Pagination count={10} page={page} onChange={handleChange} />
      <Pagination count={10} page={page} onChange={handleChange} color="primary" />
      <Pagination count={10} page={page} onChange={handleChange} color="secondary" />
      <Pagination count={10} page={page} onChange={handleChange} variant="outlined" color="primary" />
      <Pagination count={10} page={page} onChange={handleChange} shape="rounded" />
      <Pagination count={10} page={page} onChange={handleChange} color="success" size="large" />
      <Pagination count={10} page={page} onChange={handleChange} showFirstButton showLastButton />
    </Stack>
  </>);
}
