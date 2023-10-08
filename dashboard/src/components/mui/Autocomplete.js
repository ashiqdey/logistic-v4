// @mui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import top100Films from "../../_mock/_films"
// -----------------------------------------------

export default function MuiAutocomplete() {
  return (<>

    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />

  </>);

}
