import { Link as RouterLink } from 'react-router-dom';
// @mui
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
// components
import Page from '../../components/micro/Page';

// -----------------------------------------------


export default function Components() {
  const paths = [
    { text: "login", url: "/auth/login" },
    { text: "register", url: "/auth/register" },
    { text: "unauthorized", url: "/unauthorized" },
    { text: "dashboard", url: "/dashboard/app" },
    { text: "configure counter", url: "/dashboard/configure-counter" },
    { text: "input bills", url: "/dashboard/input-bills" },
    { text: "inventory", url: "/dashboard/inventory" },
    { text: "approval", url: "/dashboard/approval" },
    { text: "vendors", url: "/dashboard/vendors" },
    { text: "hygiene", url: "/dashboard/hygiene" },
    { text: "tickets", url: "/dashboard/tickets" },
    { text: "settings", url: "/dashboard/settings" },
    { text: "counter", url: "/dashboard/counter" },
    { text: "counter edit", url: "/dashboard/counter/edit" },
    { text: "admin", url: "/dashboard/admin" },
    { text: "bills-approval", url: "/dashboard/bills-approval" },
  ];

  return (
    <Page title="Routes">
      <Container maxWidth='xl'>
        <Stack>
          {
            paths.map(path => <Link
              component={RouterLink}
              key={path.text}
              to={path.url}
            >
              {path.text}
            </Link>)
          }
        </Stack>
      </Container>
    </Page>
  );
}
