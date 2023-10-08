import { memo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

// config
import { HEADER } from '../../../configs';
// components
import { NavSectionHorizontal } from '../nav-section';
import { navConfig } from '../../../configs/NavConfig';

// -----------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  transition: theme.transitions.create('top', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  width: '100%',
  position: 'fixed',
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1, 0),
  boxShadow: theme.customShadows.z8,
  top: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
  backgroundColor: theme.palette.background.default,
}));

// -----------------------------------------------

function NavbarHorizontal() {
  return (
    <RootStyle>
      <Container maxWidth={false}>
        <NavSectionHorizontal navConfig={navConfig} />
      </Container>
    </RootStyle>
  );
}

export default memo(NavbarHorizontal);