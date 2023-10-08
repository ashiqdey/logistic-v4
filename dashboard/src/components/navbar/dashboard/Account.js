// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
// routes
// hooks
import useAuth from '../../../hooks/useAuth';
import MyAvatar from '../../micro/MyAvatar';

// -----------------------------------------------


// -----------------------------------------------

export default function AccountPopover() {
  const { user } = useAuth();

  return (
    <Paper sx={{ borderRadius: 1.5, py: 0.5, }}>
      <Stack direction='row' alignItems='center' sx={{ px: 1.5, py: 1 }} spacing={1.5}>
        <MyAvatar />
        <Box>
          <Typography variant="subtitle2" noWrap>
            {user?.name || ''}
          </Typography>
          <Typography variant="body3" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email || ''}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
