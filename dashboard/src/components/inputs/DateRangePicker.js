import PropTypes from 'prop-types';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
// components
import Iconify from '../micro/Iconify';

// -----------------------------------------------


/*
this can be used to set and pass value

const [value, setValue] = useState({
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
});
*/

RangePicker.propTypes = {
  setValue: PropTypes.func,
  value: PropTypes.object,
};


export default function RangePicker({ setValue, value }) {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;

  const [open, setOpen] = useState(false);

  const [valueT, setValueT] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
    ...value
  });

  const onClose = (range) => {
    setOpen(false);
    // while closing set the value in parent
    setValue(range || valueT);
  }

  // const refFooter = useRef();
  // useOnOutside(refFooter, () => onClose());


  const handleSelect = (range) => {
    // console.log(range);
    const temp = range.selection;

    setValueT(temp);

    // close date selector if
    // 1. if startDate and endDate is different
    // AND
    // 2.1 if current.startDate is different than initial.startDate
    // 2.2 OR if current.endDate is different than initial.endDate)
    if (
      (temp.startDate.toDateString() !== temp.endDate.toDateString()) &&
      (temp.startDate.toDateString() !== value.startDate.toDateString() || temp.endDate.toDateString() !== value.endDate.toDateString())
    ) {
      onClose(temp);
    }
  }


  return (
    <div className='pr tr'>
      <Button
        variant="outlined"
        color="inherit"
        onClick={() => setOpen(!open)}
        className='font6 br-1 p-1 fw-n bg-grey-0 border'
        sx={{ minWidth: "200px" }}
      >
        {`${format(value.startDate, 'dd MMM yyyy')} - ${format(value.endDate, 'dd MMM yyyy')}`}
        <Iconify icon='ic:baseline-arrow-drop-down' className='ml-1 font4' />
      </Button>
      {
        open && <ClickAwayListener onClickAway={() => onClose()}>
          <Box component='div' className='pa r-0 zindex-10' sx={{ boxShadow: theme.customShadows.z16 }} >
            <DateRangePicker
              ranges={[valueT]}
              maxDate={new Date()}
              onChange={handleSelect}
              inputRanges={[]}
              color="#ddd"
              rangeColors={[PRIMARY_MAIN, PRIMARY_MAIN]}
            />
          </Box>
        </ClickAwayListener>

      }
    </div>
  )
}
