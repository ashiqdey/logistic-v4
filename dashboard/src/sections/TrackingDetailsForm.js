import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';

// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// import { Link as RouterLink } from 'react-router-dom';
// form
// import * as Yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LoadingButton } from '@mui/lab';
// components
import CitiesAutoComplete from '../components/mui/CitiesAutoComplete';
import Iconify from '../components/micro/Iconify';
// import { FormProvider, RHFTextField, RHFCheckbox } from '../components/hook-form';
import { urls, statusObj } from '../configs';
// hooks
import useCourier from "../hooks/useCourier";
import useTracking from "../hooks/useTracking";
//
import { FormProvider, RHFTextField, RHFSelect } from '../components/hook-form';

// -----------------------------------------------


// validation schema
const ConsignmentSchema = Yup.object().shape({
  "dated": Yup.date(),
  "awb": Yup.string()
    .min(3, 'AWB is invalid')
    .max(30, 'AWB < 30 characters')
    .required('AWB required'),
  "forwarding_no": Yup.string()
    .min(3, 'Forwarding no. is invalid')
    .max(30, 'Forwarding no. < 30 characters')
    .required('Forwarding no. required'),
  "courier": Yup.string(),
  "vendor": Yup.string(),
  "sender": Yup.string()
    .max(50, 'Sender < 50 characters')
    .required('Sender required'),
  "receiver": Yup.string()
    .max(50, 'Receiver < 50 characters')
    .required('Receiver required'),
  "destination": Yup.string()
    .max(150, 'Receiver < 150 characters')
    .required('Destination required'),
  "content": Yup.string(),
  "pack": Yup.number(),
  "wt": Yup.number(),
  "dwt": Yup.number(),
  "status": Yup.string()
    .required('Status required'),
});

// ----------------------------------------------------------------------


export default function TrackingDetailsForm({ onSubmit }) {
  // const { enqueueSnackbar } = useSnackbar();
  const { DEFAULT_CONSIGNMENT } = useTracking();
  const { courier } = useCourier();
  const { editAwb } = useSelector(state => state.tracking.value);

  const existingdata = editAwb || {};

  const gridRef = useRef();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(gridRef.current && gridRef.current.offsetWidth > 900)
  }, []);


  const methods = useForm({
    resolver: yupResolver(ConsignmentSchema),
    defaultValues: {
      ...DEFAULT_CONSIGNMENT,
      ...existingdata,
    }
  });

  const {
    reset,
    setError,
    getValues,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isDirty, },
  } = methods;




  const [dated, setDated] = useState();

  useEffect(() => {
    setDated(getValues().dated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDate = (v) => {
    setDated(v);
    setValue('dated', v);
  }

  const onFormSubmit = async (data) => {
    console.log(264, data);
    try {
      // make API call
      await onSubmit(data);
    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', error);
    }
  };

  const breakpoints = (xs = 12) => ({
    item: true,
    xs,
    sm: 6,
    md: isDesktop ? 3 : 6
  })


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onFormSubmit)} className='mt-4'>
      <Grid container spacing={2} ref={gridRef}>
        <IconText icon='ic:outline-sim-card' text='Shipment identity' />

        {
          !existingdata.awb && <>
            <Grid {...breakpoints()}>
              <MobileDatePicker
                inputFormat="dd MMM yyyy"
                value={dated}
                onChange={(v) => handleDate(v)}
                // readOnly={!!existingdata.awb}
                renderInput={(params) => <TextField
                  fullWidth
                  {...params}
                />}
              />
            </Grid>
            <Grid {...breakpoints()}>
              <RHFSelect name="status" label="Status" >
                {
                  Object.keys(statusObj).map(key => <MenuItem key={key} value={key}>
                    {statusObj[key]}
                  </MenuItem>)
                }
              </RHFSelect>
            </Grid>
          </>
        }

        <Grid {...breakpoints()}>
          <RHFTextField
            name="awb"
            label="AWB number"
            inputProps={{ maxLength: 30, readOnly: !!existingdata.awb }}
          />
        </Grid>
        <Grid {...breakpoints()}>
          <RHFTextField name="forwarding_no" label="Forwarding no." inputProps={{ maxLength: 30 }} />
        </Grid>





        <IconText icon='ic:outline-local-shipping' text='Shipment details' />

        <Grid {...breakpoints(6)}>
          <RHFSelect name="courier" label="Courier">
            {courier.map((e) => (
              <MenuItem key={e.name} value={e.name}>
                {e.name}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>

        <Grid {...breakpoints(6)}>
          <RHFSelect name="vendor" label="Vendor">
            {courier.map((e) => (
              <MenuItem key={e.name} value={e.name}>
                {e.name}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>


        <Grid {...breakpoints()}>
          <RHFTextField name="sender" label="Sender" inputProps={{ maxLength: 50 }} />
        </Grid>
        <Grid {...breakpoints()}>
          <RHFTextField name="receiver" label="Receiver" inputProps={{ maxLength: 50 }} />
        </Grid>
        <Grid item xs={12}>
          <RHFTextField name="destination" label="Destination" inputProps={{ maxLength: 150 }} />
        </Grid>




        <IconText icon='akar-icons:shipping-box-01' text='Item details' />

        <Grid {...breakpoints()}>
          <RHFTextField
            name="content"
            label="Content"
            inputProps={{ maxLength: 30 }}
          />
        </Grid>
        <Grid {...breakpoints()}>
          <RHFTextField
            name="pack"
            type="number"
            label="No. of pack"
            inputProps={{ max: 10000 }}
          />
        </Grid>

        <Grid {...breakpoints()}>
          <RHFTextField
            name="wt"
            type="number"
            label="Weight"
            inputProps={{ max: 10000 }}
          />
        </Grid>

        <Grid {...breakpoints()}>
          <RHFTextField
            name="dwt"
            type="number"
            label="Dim. Weight"
            inputProps={{ max: 10000 }}
          />
        </Grid>



        <Grid item xs={12} sx={{ my: 6 }} className='tc'>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!isDirty}
          >
            {existingdata.id ? 'Update' : 'Add'} consignment
          </LoadingButton>
        </Grid>

      </Grid>
    </FormProvider>
  );
}


TrackingDetailsForm.propTypes = {
  onSubmit: PropTypes.func,
};



function IconText({ icon, text }) {
  return <Grid item xs={12} sx={{ mt: 3 }}>
    <Typography variant='h6' color='text.secondary'>
      <Iconify icon={icon} height={20} width={20} sx={{ mr: 1, mb: '-3px' }} inline />
      {text}
    </Typography>
  </Grid>
}
IconText.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string
};
