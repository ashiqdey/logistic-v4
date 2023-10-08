import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { useSnackbar } from 'notistack';
// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui 
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
//
import Iconify from '../../../components/micro/Iconify';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import useApi from "../../../hooks/api/useApi";
import {
    FormProvider,
    RHFTextField,
    RHFSelect,
    RHFSwitch
} from '../../../components/hook-form';
import { urls } from '../../../configs';


// -----------------------------------------------

const DEFAULT_ACCOUNT = {
    name: '',
    password: '',
    email: '',
    access: '1',
    google: true,
    status: true,
}

// validation schema
const AccountSchema = Yup.object().shape({
    "name": Yup.string().required('Name is required'),
    "password": Yup.string(),
    "email": Yup.string().email().required('Email is required'),
    "access": Yup.string(),
    "status": Yup.bool(),
    "google": Yup.bool(),
});

// -----------------------------------------------


const AccountsSidebar = ({ data, type, onUpdate, onClose, accessMap }) => {
    const { fetchResponse } = useApi();
    const { enqueueSnackbar } = useSnackbar();

    const [password, setpassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const [accessArray, setAccessArray] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const methods = useForm({
        resolver: yupResolver(AccountSchema),
        defaultValues: {
            ...DEFAULT_ACCOUNT,
            ...data,
        }
    });

    useEffect(() => {

        // generate array of access
        const accessMapt = Object.keys(accessMap).map(key => ({
            value: key,
            label: accessMap[key]
        }))
        setAccessArray(accessMapt);

    }, [])


    const {
        // setError,
        // getValues,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;



    const onFormSubmit = async (data) => {
        console.log(125, data);

        try {
            // make API call
            const res = await fetchResponse(urls.account[data.id ? 'update' : 'add'], 'POST', data);
            console.log("UPDATED account", res);

            // set data locally
            onUpdate(res.data);

            onClose();
        } catch (err) {
            console.error(err);
            enqueueSnackbar(err.message || "Error", { variant: 'error' });
        }
    };


    const deleteAccount = () => {
        fetchResponse(urls.account.delete, 'GET', { id: data.id })
            .then(res => {
                console.log("delete", res);

                // set data locally
                onUpdate({ id: res.id }, true);

                onClose();
            })
            .catch(err => {
                console.log("POST ERROR", err);
            })
    }


    return (<Drawer
        anchor='right'
        open
        onClose={onClose}
    >
        <Box sx={{ width: 300, p: 2 }}>
            <Stack sx={{ mb: 3 }} className="jcsb aic" direction='row'>
                <Typography variant="h4" >
                    {type === "edit" ? "Edit account" : "Add new account"}
                </Typography>
                <IconButton onClick={onClose}>
                    <Iconify icon='ic-baseline-close' width={24} height={24} />
                </IconButton>
            </Stack>


            <FormProvider methods={methods} onSubmit={handleSubmit(onFormSubmit)} className='mt-4'>
                <Stack sx={{ mb: 3 }} spacing={3}>
                    <RHFTextField name="name" label="Name" />
                    <RHFTextField name="email" label="Email" />

                    <Box>
                        {
                            type === "add" || password ? <Stack direction='row' className="aic jcsb" spacing={2}>
                                <RHFTextField
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {
                                    type === "edit" && <Button
                                        color='error'
                                        variant='text'
                                        onClick={() => {
                                            setValue("password", "")
                                            setpassword(false)
                                        }}>
                                        Cancel
                                    </Button>
                                }
                            </Stack> : <Stack direction='row' className="aic jcsb">
                                <span>Password : *****</span>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        setTimeout(() => setValue("password", ""), 900)
                                        setpassword(true);
                                    }}
                                >
                                    {password ? "Cancel" : "Change"}
                                </Button>
                            </Stack>
                        }
                    </Box>

                    <Box>
                        {
                            accessArray.length > 0 && <RHFSelect fullWidth name="access" label="Access type">
                                {accessArray.map((e) => (
                                    <MenuItem key={e.value} value={e.value}>
                                        {e.label}
                                    </MenuItem>
                                ))}
                            </RHFSelect>
                        }

                        <FormHelperText>Limit user to do specific task</FormHelperText>
                    </Box>


                    <Stack direction='row' className="aic jcsb">
                        <span>Active</span>
                        <RHFSwitch name='status' />
                    </Stack>

                    <Stack direction='row' className="aic jcsb">
                        <span>Allow login with google</span>
                        <RHFSwitch name='google' />
                    </Stack>

                    <Box sx={{ p: 2 }} />

                    {
                        data.access !== 9 && <>
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                color="primary"
                                loading={isSubmitting}
                                fullWidth
                            >
                                {type === "edit" ? "Update" : "Add"} account
                            </LoadingButton>


                            {
                                type === "edit" && <>
                                    <Box sx={{ py: 5 }} >
                                        <Divider />
                                    </Box>


                                    <Stack direction='row' className="aic jcsb">
                                        <span>Delete account</span>
                                        <IconButton onClick={() => setDeleteConfirm(true)}>
                                            <Iconify icon='ic-baseline-delete' width={24} height={24} />
                                        </IconButton>
                                    </Stack>
                                </>
                            }
                        </>
                    }
                </Stack>

            </FormProvider>
        </Box>

        <ConfirmDialog
            options={deleteConfirm}
            onClose={() => setDeleteConfirm(false)}
            onDelete={deleteAccount}
        >
            <Box sx={{ maxWidth: '400px' }}>
                {/* <Typography variant='h5'>Confirm</Typography> */}
                <Typography variant='h5' color='grey.900'>Are you sure and want to delete this account?</Typography>
                <Typography color='grey.700' sx={{ mt: 2 }}>Once the account is delete you won't be able to recover it again. proceed with caution.</Typography>
            </Box>
        </ConfirmDialog>

    </Drawer>
    );
}

AccountsSidebar.propTypes = {
    // open: PropTypes.bool,
    data: PropTypes.object,
    accessMap: PropTypes.object,
    type: PropTypes.string,
    onUpdate: PropTypes.func,
    onClose: PropTypes.func,
};

export default AccountsSidebar;