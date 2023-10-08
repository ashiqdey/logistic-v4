import { useSnackbar } from 'notistack';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import SettingMode from '../../settings/SettingMode';
import { ListItemStyle, ListItemIconStyle } from '../nav-section/vertical/style';
import SvgIconStyle from '../../micro/SvgIconStyle';
import {urls} from '../../../configs';

// -----------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  // const [open, setOpen] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate(PATH_AUTH.login, { replace: true });

    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };



  return (
    <>
      <Box
        sx={{ p: 2 }}
      >
        <Box sx={{ pt: 3, pb: 6 }}>
          <Typography variant="subtitle2">
            DARK MODE
          </Typography>
          <Stack sx={{ py: 1 }} spacing={2}>
            <SettingMode />
          </Stack>
        </Box>

        <ListItemStyle onClick={handleLogout} >
          <ListItemIconStyle>
            <SvgIconStyle src={`${urls.appBaseUrl}/assets/icons/logout.svg`} sx={{ width: 1, height: 1 }} />
          </ListItemIconStyle>
          Logout
        </ListItemStyle>
      </Box>
    </>
  );
}
