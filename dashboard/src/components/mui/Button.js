// @mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
//
import Iconify from '../micro/Iconify';

// -----------------------------------------------

export default function MuiAutocomplete() {
  return (<>
    <Stack spacing={2}>
      <Stack direction='row' spacing={2}>
        <Button variant="text">Text</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="contained">Contained</Button>
      </Stack>

      <Stack direction='row' spacing={2} alignItems='center'>
        <Button size="small" variant="soft" color='secondary'>Small</Button>
        <Button size="large" variant="soft" color='primary'>primary large</Button>

        <Button size="small" variant="soft" color='error'>Small</Button>
        <Button size="small" variant="outlined" color='error'>Small</Button>
        <Button size="medium" variant="contained" color="success">
          Success
        </Button>
        <Button size="large" variant="contained" color="error">
          Error
        </Button>
      </Stack>

      <Stack direction='row' spacing={2} alignItems='center'>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>

        <IconButton color="primary" aria-label="add to shopping cart">
          <Iconify icon='ic:baseline-add-shopping-cart' />
        </IconButton>

        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </Stack>

    </Stack>
  </>);
}
