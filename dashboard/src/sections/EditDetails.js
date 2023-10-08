import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
// import { Link as RouterLink } from 'react-router-dom';
// form
// import * as Yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LoadingButton } from '@mui/lab';


// import Alert from '@mui/material/Alert';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { LoadingButton } from '@mui/lab';
// routes
// import { PATH_AUTH } from '../../routes/paths';
// hooks
// import useAuth from '../hooks/useAuth';
// import useIsMountedRef from '../hooks/useIsMountedRef';
// components
import CitiesAutoComplete from '../components/mui/CitiesAutoComplete';
import Iconify from '../components/micro/Iconify';
import TrackingDetailsForm from './TrackingDetailsForm';

// import { FormProvider, RHFTextField, RHFCheckbox } from '../components/hook-form';
import { onEditAwb } from "../redux/tracking";
import { fDate3 } from "../utils/formatTime";
import { urls } from '../configs';
// hooks
import useApi from "../hooks/api/useApi";
import useAuth from '../hooks/useAuth';
import useTracking from "../hooks/useTracking";

// -----------------------------------------------

export default function EditDetails() {
  const dispatch = useDispatch();
  const { updateConsignment } = useTracking();

  // all tracking data from redux
  const { editAwb } = useSelector(state => state.tracking.value);

  // const onSubmit = async (data) => {
  //   const res = await updateConsignment(data);
  //   console.log('71 res', res);

  //   return res;
  // }


  return (
    <Drawer
      anchor={'right'}
      open={!!editAwb}
      onClose={() => dispatch(onEditAwb(null))}
    >
      <Box sx={{ width: { xs: 300, md: 500 }, px: 2 }}>
        <TrackingDetailsForm
          onSubmit={updateConsignment}
        />
      </Box>
    </Drawer>
  );
}




// NewStatus.propTypes = {
//   awb: PropTypes.string,
//   status: PropTypes.string,
//   onAdd: PropTypes.func,
// };
