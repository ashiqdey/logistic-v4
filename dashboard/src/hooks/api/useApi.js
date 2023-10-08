import { useSnackbar } from 'notistack';
//
import axios from '../../utils/axios';
import { config } from '../../configs';
import useAuth from '../useAuth';

// -----------------------------------------------

const useApi = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();

    const GETPayload = (data) => {
        if (!data || typeof data !== 'object') return '';

        // generate payload
        const payload = Object.keys(data).map(key => {
            if (data[key]) {
                return `${key}=${data[key]}`
            }
            return null;
        });

        return payload.filter(e => e !== null).join("&");
    }


    const fetchResponse = async (
        url,
        method = "GET",
        data = {},
        headers = {},
        withCredentials = false,
        toast = true,
    ) => {
        headers = {
            'Content-Type': 'application/json',
            'Secret': config.SECRET,
            ...headers
        }

        if (user?.token) {
            headers.Authorization = user.token;
        }

        const options = {
            method,
            headers,
            withCredentials
        };

        if (method === 'GET') {
            options.url = `${url}?${GETPayload(data)}`;
        }
        else {
            options.url = url;
            options.data = data;
        }


        try {
            return axios(options).then(res => res.data);
        }
        catch (error) {
            console.error("useApi/104", error);
            if (toast) {
                enqueueSnackbar(error.message, { variant: 'error' });
            }
            return error;
        }
    }



    const fileUpload = (url = "", data = {}) => {
        const headers = {
            'Content-Type': 'multipart/form-data'
        };
        return fetchResponse(url, 'POST', data, headers);
    }





    return {
        fetchResponse,
        fileUpload,
    }
}



export default useApi;
