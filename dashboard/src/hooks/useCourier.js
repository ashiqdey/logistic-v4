import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
//
import useApi from "./api/useApi";
import useAuth from "./useAuth";
import { urls } from "../configs";
import { capitalizeFirst } from "../utils/formatString";

// redux
import { setMaps, deleteMap } from "../redux/maps";

const useCourier = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { fetchResponse } = useApi();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");


    const { courier } = useSelector(state => state.maps.value);


    const fetchData = async () => {
        fetchResponse(urls.courier.get)
            .then((res) => {
                console.log("21 h/uc", res);

                if (res.error) return;

                dispatch(setMaps({
                    key: 'courier',
                    data: res.courier
                }));
            })
            .catch(err => {
                console.log("31 h/uc", err);
            })

    }


    const addCourier = () => {
        if (!accessAllowed(3)) return;

        if (value.length < 2) {
            return enqueueSnackbar('Courier name is requried', { variant: 'warning' });
        }

        setLoading(true);

        return fetchResponse(urls.courier.add, 'POST', { courier: capitalizeFirst(value) })
            .then((res) => {
                setLoading(false);
                setValue("");

                if (res.error) return;

                dispatch(setMaps({
                    key: 'courier',
                    data: [res.data]
                }));
            })
            .catch(err => {
                setLoading(false);
                enqueueSnackbar(err.message, { variant: 'error' });
                console.log("add 63", err);
            })
    };

    const deleteCourier = (id) => {
        if (!accessAllowed(4)) return;

        fetchResponse(urls.courier.delete, 'GET', { id })
            .then((res) => {
                if (res.error) {
                    return;
                }

                dispatch(deleteMap({ key: 'courier', id }));
            })
            .catch(err => {
                enqueueSnackbar(err.message, { variant: 'error' });
                console.log("add 78", err);
            })
    }



    const accessAllowed = (access = 3) => {
        if (!user || (user.access < access)) {
            if (access === 2) {
                enqueueSnackbar('You dont have access to edit', { variant: 'warning' });
            }
            else if (access === 3) {
                enqueueSnackbar('You dont have access to upload data', { variant: 'warning' });
            }
            else if (access === 4) {
                enqueueSnackbar('You dont have access to delete', { variant: 'warning' });
            }
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (courier && courier.length === 0) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return {
        addCourier,
        deleteCourier,
        loading,
        setValue,
        value,
        courier
    };
}

export default useCourier;