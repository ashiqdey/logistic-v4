import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch } from 'react-redux';
// @mui 
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
//
import Iconify from '../../../components/micro/Iconify';
//
import useAuth from "../../../hooks/useAuth";
import useApi from "../../../hooks/api/useApi";
import { urls } from '../../../configs';
import { updateEstimation } from "../../../redux/estimation";


// -----------------------------------------------


const QuerySidebar = ({ values, onClose }) => {
    const { fetchResponse } = useApi();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { user } = useAuth();

    const [resolved, setResolved] = useState(false);

    useEffect(() => {
        setResolved(values.resolved)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleChange = (event) => {
        console.log(event.target.checked)
        setResolved(event.target.checked);

        fetchResponse(urls.estimation.resolved, 'POST', { id: values.id, resolved: event.target.checked })
            .then(res => {
                console.log("updated", res);
                if (res.error) return;

                dispatch(updateEstimation(res.data));

                onClose();
            })
            .catch(err => {
                console.log("POST ERROR", err);
            })
    }


    const onCopy = () => {
        enqueueSnackbar('Copied', { variant: 'success' });
    }


    return (<Drawer
        anchor='right'
        open
        onClose={onClose}
    >
        <Stack sx={{ width: 300, p: 2, minHeight: '100vh' }} className='jcsb'>
            <Box>
                <Stack sx={{ mb: 3 }} className="jcsb aic" direction='row'>
                    <Typography variant="h4">Estimation request</Typography>
                    <IconButton onClick={onClose}>
                        <Iconify icon='ic-baseline-close' width={24} height={24} />
                    </IconButton>
                </Stack>


                <Stack sx={{ mb: 3 }} spacing={4}>

                    <Box direction='row' className="aic jcsb">
                        <Typography variant="subtitle2">
                            Phone
                        </Typography>

                        <Stack direction='row' className="aic jcsb">
                            <a
                                href={`tel:${values.phone}`}
                                className='td-n'
                            >
                                <Typography variant="h5" color='grey.800'>{values.phone}</Typography>
                            </a>

                            <Stack direction='row' className="aic jcsb">
                                <CopyToClipboard text={values.phone} onCopy={onCopy}>
                                    <IconButton>
                                        <Iconify icon='ic:round-content-copy' width={24} height={24} />
                                    </IconButton>
                                </CopyToClipboard>
                                <a
                                    href={`https://api.whatsapp.com/send?phone=${values.phone}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <IconButton>
                                        <Iconify icon='ic:baseline-whatsapp' width={24} height={24} />
                                    </IconButton>
                                </a>
                            </Stack>
                        </Stack>
                    </Box>
                    <Stack>
                        <Typography variant="subtitle3">Destimation</Typography>
                        <Typography variant="font6">{values.destination}</Typography>
                    </Stack>

                    <Stack direction='row' className='jcsb'>
                        <Stack>
                            <Typography variant="subtitle3">Weight</Typography>
                            <Typography variant="h5">{values.weight}</Typography>
                        </Stack>
                        <Stack>
                            <Typography variant="subtitle3">Width</Typography>
                            <Typography variant="h5">{values.width}</Typography>
                        </Stack>
                        <Stack>
                            <Typography variant="subtitle3">Height</Typography>
                            <Typography variant="h5">{values.height}</Typography>
                        </Stack>
                    </Stack>

                    <Stack>
                        <Stack direction='row' className="aic jcsb">
                            <span>Fragile</span>
                            <Switch disabled checked={values.fragile === '1'} />
                        </Stack>
                        <Stack direction='row' className="aic jcsb">
                            <span>Insurance</span>
                            <Switch disabled checked={values.insurance === '1'} />
                        </Stack>
                        <Stack direction='row' className="aic jcsb">
                            <span>Packing</span>
                            <Switch disabled checked={values.packing === '1'} />
                        </Stack>
                        <Stack direction='row' className="aic jcsb">
                            <span>Express</span>
                            <Switch disabled checked={values.express === '1'} />
                        </Stack>
                    </Stack>
                </Stack>
            </Box>

            {
                // access viewer+ only
                user.access > 1 && <Stack direction='row' className="aic jcsb">
                    <span>Mark {resolved ? 'unresolved' : 'resolved'}</span>
                    <Switch
                        checked={resolved}
                        onChange={handleChange}
                    />
                </Stack>

            }

        </Stack>
    </Drawer>
    );
}

QuerySidebar.propTypes = {
    values: PropTypes.object,
    onClose: PropTypes.func,
};

export default QuerySidebar;