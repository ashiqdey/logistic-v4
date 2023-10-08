import { alpha } from '@mui/material/styles';

// -----------------------------------------------

export default function TextField(theme) {
  return {
    MuiTextField: {
      styleOverrides: {
        // uncomment to change border color in textarea on focus
        root: {
          '& .MuiOutlinedInput-root': {
            // '& fieldset': {
            //   borderColor: theme.palette.grey[400]
            // },
            '&:not(.Mui-error):hover fieldset': {
              borderColor: theme.palette.grey[600]
            },
          },

          '& .MuiFilledInput-root': {
            backgroundColor: alpha(theme.palette.grey[900], 0.04),

            '&.MuiFilledInput-underline:hover:before': {
              borderColor: theme.palette.grey[600]
            },

            '&.Mui-focused': {
              backgroundColor: alpha(theme.palette.grey[900], 0.09),
            },
          },

          '& .MuiInput-underline': {
            '&.MuiInput-root:hover:before': {
              borderColor: theme.palette.grey[600]
            },
          },
        },
      },
    },
  };
}
