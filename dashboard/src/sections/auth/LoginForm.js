import * as Yup from 'yup';
import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { LoadingButton } from '@mui/lab';
// routes
// import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import Iconify from '../../components/micro/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';

// -----------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@xbytelab.com',
    password: 'demo123',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log('s/a/lf/53', data);
      await login(data.email, data.password, 'password');
      console.log('s/a/lf/55', data);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        {/* <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
