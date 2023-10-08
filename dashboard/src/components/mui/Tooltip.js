// @mui
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

// -----------------------------------------------

export default function MuiAutocomplete() {
  return (<>
    <Stack direction="row" spacing={2}>
      <Tooltip title="Delete">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete" placement="top">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete" placement="left-end">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete" placement="right-end">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  </>);
}
