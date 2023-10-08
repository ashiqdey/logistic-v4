// @mui
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// -----------------------------------------------

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function MuiAutocomplete() {
  return (<>
    <Stack spacing={2} direction="row">
      <Badge badgeContent={4} color="primary">
        <MailIcon color="action" />
      </Badge>
      <Badge badgeContent={4} color="secondary">
        <MailIcon color="action" />
      </Badge>
      <Badge badgeContent={4} color="error">
        <MailIcon color="action" />
      </Badge>
      <Badge badgeContent={4} color="warning">
        <MailIcon color="action" />
      </Badge>

      <IconButton aria-label="cart">
        <StyledBadge badgeContent={4} color="info">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
    </Stack>
  </>);
}
