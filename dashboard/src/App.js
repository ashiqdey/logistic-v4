// @mui
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// components
import ScrollToTop from './components/micro/ScrollToTop';

// mui theme
import ThemeProvider from './theme';
// routes
import Router from './routes';
// components
import Settings from './components/settings';
import NotistackProvider from './components/others/NotistackProvider';
// contexts
import { AuthProvider } from './contexts/AuthContext';

// -----------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <NotistackProvider>
        <AuthProvider>
          <Settings />
          <ScrollToTop />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Router />
          </LocalizationProvider>
        </AuthProvider>
      </NotistackProvider>
    </ThemeProvider>
  );
}
