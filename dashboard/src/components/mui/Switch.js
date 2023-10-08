// @mui
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

// -----------------------------------------------

export default function MuiAutocomplete() {
  return (<>
    <div>
      <Switch {...label} defaultChecked />
      <Switch {...label} />

      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="Label" />
      </FormGroup>
    </div>
  </>);
}
