import { useSnackbar } from 'notistack';
// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
// components
import Page from '../../../components/micro/Page';
import PageHeading from '../../../components/micro/PageHeading';

// -----------------------------------------------

export default function GeneralApp() {
  const { enqueueSnackbar } = useSnackbar();

  const style = { width: "100%", height: "200px" };

  const showToast = (text = "This is a toast", variant = 'default') => {
    enqueueSnackbar(text, { variant });
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth='xl'>
        <PageHeading
          title='Dashboard'
        />

        <Grid container spacing={3}>

          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ ...style, p: 2 }} >
              <Button variant="contained" color="error" onClick={() => showToast('Error toast', 'error')}>Error toast</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ ...style }} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={style} />
          </Grid>

          <Grid item xs={12} lg={8}>
            <Paper sx={style} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={style} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={style} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Paper sx={style} />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
