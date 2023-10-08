// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// components
import Page from '../../components/micro/Page';
import MuiAccordion from '../../components/mui/Accordion';
import MuiAlert from '../../components/mui/Alert';
import MuiAutocomplete from '../../components/mui/Autocomplete';
import MuiAvatar from '../../components/mui/Avatar';
import MuiBackdrop from '../../components/mui/Backdrop';
import MuiBadge from '../../components/mui/Badge';
import MuiBreadcrumbs from '../../components/mui/Breadcrumbs';
import MuiButton from '../../components/mui/Button';
import MuiButtonGroup from '../../components/mui/ButtonGroup';
import MuiCard from '../../components/mui/Card';
import MuiCheckbox from '../../components/mui/Checkbox';
import MuiChip from '../../components/mui/Chip';
import MuiDataGrid from '../../components/mui/DataGrid';
import MuiDialog from '../../components/mui/Dialog';
import MuiDrawer from '../../components/mui/Drawer';
import MuiFab from '../../components/mui/Fab';
import MuiLink from '../../components/mui/Link';
import MuiList from '../../components/mui/List';
import MuiLoadingButton from '../../components/mui/LoadingButton';
import MuiMenu from '../../components/mui/Menu';
import MuiPagination from '../../components/mui/Pagination';
import MuiPaper from '../../components/mui/Paper';
import MuiPopover from '../../components/mui/Popover';
import MuiProgress from '../../components/mui/Progress';
import MuiRadio from '../../components/mui/Radio';
import MuiRating from '../../components/mui/Rating';
import MuiSelect from '../../components/mui/Select';
import MuiSkeleton from '../../components/mui/Skeleton';
import MuiSlider from '../../components/mui/Slider';
import MuiStepper from '../../components/mui/Stepper';
import MuiSwitch from '../../components/mui/Switch';
import MuiTable from '../../components/mui/Table';
import MuiTabs from '../../components/mui/Tabs';
import MuiTextField from '../../components/mui/TextField';
import MuiTimeline from '../../components/mui/Timeline';
import MuiToggleButton from '../../components/mui/ToggleButton';
import MuiTooltip from '../../components/mui/Tooltip';
import MuiTypography from '../../components/mui/Typography';

import Heading from '../../components/micro/Heading';



// -----------------------------------------------



export default function Components() {

  const sx = { mx: 'auto' };

  return (
    <Page title="General: App">

      {/* <Container maxWidth={themeStretch ? false : 'xl'}> */}
      <Container maxWidth='xl'>
        <Grid container spacing={5} maxWidth='md' sx={sx}>


          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Accordion' />
            <MuiAccordion />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Alert' />
            <MuiAlert />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Autocomplete' />
            <MuiAutocomplete />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Avatar' />
            <MuiAvatar />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Backdrop' />
            <MuiBackdrop />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Badge' />
            <MuiBadge />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Breadcrumbs' />
            <MuiBreadcrumbs />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Button' />
            <MuiButton />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Button Group' />
            <MuiButtonGroup />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Card' />
            <MuiCard />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Checkbox' />
            <MuiCheckbox />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Chip' />
            <MuiChip />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Data Grid' />
            <MuiDataGrid />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Dialog' />
            <MuiDialog />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Drawer' />
            <MuiDrawer />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Fab' />
            <MuiFab />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Link' />
            <MuiLink />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='List' />
            <MuiList />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Loading Button' />
            <MuiLoadingButton />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Menu' />
            <MuiMenu />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Pagination' />
            <MuiPagination />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Paper' />
            <MuiPaper />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Popover' />
            <MuiPopover />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Progress' />
            <MuiProgress />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Radio' />
            <MuiRadio />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Rating' />
            <MuiRating />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Select' />
            <MuiSelect />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Skeleton' />
            <MuiSkeleton />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Slider' />
            <MuiSlider />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Stepper' />
            <MuiStepper />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Switch' />
            <MuiSwitch />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Table' />
            <MuiTable />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Tabs' />
            <MuiTabs />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Text Field' />
            <MuiTextField />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Timeline' />
            <MuiTimeline />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Toggle Button' />
            <MuiToggleButton />
          </Grid>
          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Tooltip' />
            <MuiTooltip />
          </Grid>

          <Grid item xs={12} sx={sx}>
            <Heading sx={{ mb: 2 }} title='Typography' />
            <MuiTypography />
          </Grid>





        </Grid>
      </Container>
    </Page>
  );
}
