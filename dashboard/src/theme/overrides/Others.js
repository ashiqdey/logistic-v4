export default function Others(theme) {
  return {
    AppBar: {
      defaultProps: {
        elevation: 0,
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderStyle: 'dashed',
        },
      },
    },

    MuiFormControl: {

      styleOverrides: {
        root: {
          // '& .MuiInputLabel-root.Mui-focused': {
          //   color: theme.palette.info.main,
          // },
          '& .MuiOutlinedInput-root': {
            // '& fieldset': {
            //   borderColor: theme.palette.grey[200]
            // },
            '&:not(.Mui-focused):hover fieldset': {
              borderColor: theme.palette.grey[600]
            },
          },
        },
      },

    },

  };
}
