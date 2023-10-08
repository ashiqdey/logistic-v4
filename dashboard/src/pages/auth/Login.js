import { useEffect, useState } from 'react';
// @mui
import { Box, Stack, Container, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/micro/Page';
import Logo from '../../components/micro/Logo';
// sections
import LoginForm from '../../sections/auth/LoginForm';

// -----------------------------------------------

export default function Login() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get token based on cookie
    getToken()
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(24, err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (loading) {
    return null;
  }

  return (
    <Page title="Login">
      <Container maxWidth="sm">
        <Box
          component="div"
          className="m-auto d-flex fdc jcc minh-100vh" sx={{
            maxWidth: 350,
            py: 12,
          }}
        >
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1, textAlign:'center' }}>
              <Logo sx={{width:200, mx:'auto',mb:5}} />
              <Typography variant="h4" gutterBottom>
                Sign in to G move
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
            </Box>
          </Stack>

          <LoginForm />
        </Box>
      </Container>
    </Page>
  );
}
