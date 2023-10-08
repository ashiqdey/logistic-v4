//
// import { InputSelectIcon } from './CustomIcons';

// -----------------------------------------------

export default function Select(theme) {
  const focusedColor = theme.palette.info.main;


  return {
    MuiSelect: {
      defaultProps: {
        // IconComponent: InputSelectIcon,
        classes: {
          root: 'Mui-select'
        }
      },
      // .css-1u5adoo-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {

            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: focusedColor,
            },
          },
        },
      },
    },
  };
}
