import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
//
import Iconify from '../../../components/micro/Iconify';
//
import useApi from "../../../hooks/api/useApi";
import { urls } from '../../../configs';
import { updateQuery } from "../../../redux/queries";
import useAuth from "../../../hooks/useAuth";


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

        fetchResponse(urls.query.resolved, 'POST', { id: values.id, resolved: event.target.checked })
            .then(res => {
                console.log("updated", res);
                if (res.error) return;

                dispatch(updateQuery(res.data));

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
                    <Typography variant="h4">Customer query</Typography>
                    <IconButton onClick={onClose}>
                        <Iconify icon='ic-baseline-close' width={24} height={24} />
                    </IconButton>
                </Stack>


                <Stack sx={{ mb: 3 }} spacing={3}>

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

                    <Box direction='row' className="aic jcsb">
                        <Typography variant="subtitle2">
                            Email
                        </Typography>

                        <Stack direction='row' className="aic jcsb">
                            <a
                                href={`mailto:${values.email}`}
                                target="_blank"
                                rel="noreferrer"
                                className='td-n'
                            >

                                <Typography variant="h5" color='grey.800'>{values.email}</Typography>
                            </a>

                            <CopyToClipboard text={values.email} onCopy={onCopy}>
                                <IconButton>
                                    <Iconify icon='ic:round-content-copy' width={24} height={24} />
                                </IconButton>
                            </CopyToClipboard>
                        </Stack>
                    </Box>

                    <Stack>
                        <Typography variant="subtitle2">Message</Typography>
                        <Typography variant="font6" dangerouslySetInnerHTML={{ __html: values.message }} />
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