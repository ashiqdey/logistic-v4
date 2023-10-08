import { useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

// -----------------------------------------------

export default function MuiAutocomplete() {
  const [value, setValue] = useState(30);
  const [range, setRange] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleRangeChange = (event, newValue) => {
    setRange(newValue);
  };

  return (<>
    <Box sx={{ width: 200 }}>
      <Slider aria-label="Volume" value={value} onChange={handleChange} />
      <Slider disabled defaultValue={30} aria-label="Disabled slider" />

      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={range}
        onChange={handleRangeChange}
        valueLabelDisplay="auto"
        getAriaValueText={() => `${value}°C`}
      />
    </Box>
  </>);
}
