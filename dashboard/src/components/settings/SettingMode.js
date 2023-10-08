// @mui
import { styled, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import CardActionArea from '@mui/material/CardActionArea';

// hooks
import useSettings from '../../hooks/useSettings';
//
import Iconify from '../micro/Iconify';
import BoxMask from '../micro/BoxMask';

// -----------------------------------------------

const BoxStyle = styled(CardActionArea)(({ theme }) => ({
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  border: `solid 1px ${theme.palette.grey[500_12]}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

// -----------------------------------------------

export default function SettingMode() {
  const theme = useTheme();
  const { themeMode, onChangeMode } = useSettings();

  return (
    <RadioGroup name="themeMode" value={themeMode} onChange={onChangeMode}>
      <Grid dir="ltr" container spacing={1}>
        {['light', 'dark'].map((mode, index) => {
          const isSelected = themeMode === mode;

          return (
            <Grid key={mode} item xs={6}>
              <BoxStyle
                sx={{
                  bgcolor: isSelected ? 'primary.main' : theme.palette.grey[500_12],
                  ...(isSelected && {
                    color: '#fff',
                    boxShadow: (theme) => theme.customShadows.z20,
                  }),
                }}
              >
                <Iconify icon={index === 0 ? 'ph:sun-duotone' : 'ph:moon-duotone'} width={24} height={24} />
                <BoxMask value={mode} />
              </BoxStyle>
            </Grid>
          );
        })}
      </Grid>
    </RadioGroup>
  );
}
