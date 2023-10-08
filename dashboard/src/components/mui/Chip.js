// @mui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

// -----------------------------------------------

export default function MuiAutocomplete() {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (<>
    <Stack spacing={1}>
      <Stack direction="row" spacing={0.5}>
        <Chip label="Chip Filled" />
        <Chip label="Chip Outlined" variant="outlined" />
      </Stack>

      <Stack direction="row" spacing={0.5}>
        <Chip label="Clickable" onClick={() => null} />
        <Chip label="Clickable" variant="outlined" onClick={() => null} />
        <Chip label="Deletable" onDelete={handleDelete} />
      </Stack>

      <Stack direction="row" spacing={0.5}>
        <Chip label="primary" color="primary" />
        <Chip label="success" color="success" />
        <Chip label="primary" color="primary" variant="outlined" />
        <Chip label="Small" size="small" />
      </Stack>

      <Stack direction="row" spacing={0.5}>
        <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
        <Chip
          avatar={<Avatar alt="Natacha" src="/assets/mock/avatars/1.jpg" />}
          label="Avatar"
          variant="outlined"
        />
      </Stack>

    </Stack>
  </>);
}
