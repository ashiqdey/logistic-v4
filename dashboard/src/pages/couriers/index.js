// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { LoadingButton } from '@mui/lab';
// 
import Page from '../../components/micro/Page';
import Iconify from '../../components/micro/Iconify';
import PageHeading from '../../components/micro/PageHeading';
//
import useCourier from "../../hooks/useCourier";


export default function Consignment() {
    const {
        addCourier,
        deleteCourier,
        loading,
        setValue,
        value,
        courier
    } = useCourier();


    return (<Page title="Consignments">
        <Container maxWidth='xl'>
            <PageHeading
                title='All couriers'
                subtitle='Manage all couriers'
            />

            <Box sx={{ maxWidth: 400, m: 'auto' }}>

                <Stack direction='row' spacing={1} sx={{ pb: 2 }}>
                    <TextField
                        fullWidth
                        label="Courier name"
                        inputProps={{ maxLength: 30 }}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <LoadingButton
                        variant="contained"
                        color="primary"
                        loading={loading}
                        onClick={addCourier}
                        sx={{ py: 1 }}
                    >
                        Add
                    </LoadingButton>
                </Stack>

                {
                    courier.map((e, i) => <Stack
                        direction='row'
                        sx={{ px: 1, py: 1, '&:hover': { bgcolor: 'grey.100' } }}
                        key={i}
                        className="aic jcsb br-1"
                    >
                        <div>{e.name}</div>
                        <IconButton
                            sx={{ color: 'grey.500', '&:hover': { color: 'error.main' } }}
                            onClick={() => deleteCourier(e.id)}>
                            <Iconify icon='ic-baseline-delete' width={20} height={20} />
                        </IconButton>
                    </Stack>)
                }
            </Box>

        </Container>
    </Page>);
}



