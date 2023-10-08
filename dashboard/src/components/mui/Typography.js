// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// -----------------------------------------------

export default function MuiAutocomplete() {
  return (<>
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="h1" gutterBottom>
        h1. Heading
      </Typography>
      <Typography variant="h2" gutterBottom>
        h2. Heading
      </Typography>
      <Typography variant="h3" gutterBottom>
        h3. Heading
      </Typography>
      <Typography variant="h4" gutterBottom>
        h4. Heading
      </Typography>
      <Typography variant="h5" gutterBottom>
        h5. Heading
      </Typography>
      <Typography variant="h6" gutterBottom>
        h6. Heading
      </Typography>



      <Typography variant="font1" gutterBottom component="div">
        font1. Font 1
      </Typography>
      <Typography variant="font2" gutterBottom component="div">
        font2. Font 2
      </Typography>
      <Typography variant="font3" gutterBottom component="div">
        font3. Font 3
      </Typography>
      <Typography variant="font4" gutterBottom component="div">
        font4. Font 4
      </Typography>
      <Typography variant="font5" gutterBottom component="div">
        font5. Font 5
      </Typography>
      <Typography variant="font6" gutterBottom component="div">
        font6. Font 6
      </Typography>


      <Typography variant="subtitle1" gutterBottom component="div">
        subtitle1. Lorem ipsum dolor sit amet
      </Typography>
      <Typography variant="subtitle2" gutterBottom component="div">
        subtitle2. Lorem ipsum dolor sit amet,
      </Typography>

      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet
      </Typography>
      <Typography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet
      </Typography>
      <Typography variant="body3" gutterBottom>
        body3. Lorem ipsum dolor sit amet
      </Typography>

      <Typography variant="button" display="block" gutterBottom>
        button text
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        caption text
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        overline text
      </Typography>
    </Box>
  </>);
}
