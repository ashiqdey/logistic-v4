import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
// @mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LoadingButton } from '@mui/lab';
// components
import CitiesAutoComplete from '../components/mui/CitiesAutoComplete';
import Iconify from '../components/micro/Iconify';
import { fDate3, fDateTime2 } from "../utils/formatTime";
import { capitalizeFirst } from "../utils/formatString";
import { urls } from '../configs';
// hooks
import useApi from "../hooks/api/useApi";
import useAuth from '../hooks/useAuth';
// redux
import { updateTracking, onStatusAwb } from "../redux/tracking";

// -----------------------------------------------

export default function Statuses() {
  const DEFAULT_STATUS = {
    awb: null,
    status: '1',
    statuses: []
  }

  const dispatch = useDispatch();

  // all tracking data from redux
  const { statusAwb } = useSelector(state => state.tracking.value);
  const { fetchResponse } = useApi();
  const { user } = useAuth();

  const [data, setData] = useState({
    ...DEFAULT_STATUS,
    awb: statusAwb
  });

  const onAdd = (status) => {
    setData(prev => ({
      ...prev,
      statuses: [...prev.statuses, status]
    }))
  }

  useEffect(() => {
    if (statusAwb) {
      fetchResponse(urls.status.get, 'GET', { awb: statusAwb })
        .then(res => {
          const statuses = res.data;

          // find largest status
          let status = 1;

          statuses.forEach(e => {
            if (parseInt(e.type, 10) > status) {
              status = parseInt(e.type, 10);
            }
          });

          setData({
            awb: statusAwb,
            status: status.toString(),
            statuses
          });
        })
    }
    else {
      setData({ ...DEFAULT_STATUS })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusAwb])


  const onDelete = async (id) => {
    try {
      console.log(73, id)

      fetchResponse(urls.status.delete, "GET", { id })
        .then(res => {
          console.log("95 res ", res);

          setData(prev => {
            const statuses = prev.statuses.filter(e => e.id !== id)
            return { ...prev, statuses };
          });
        })
        .catch(err => {
          console.log("104 err", err);
        })
    }
    catch (error) {
      console.log("GET ERROR", error.response.data);
    }
  }




  const DEFAULT_VALUE = {
    text: "",
    location: "",
    datetime: new Date(),
  };


  const { enqueueSnackbar } = useSnackbar();

  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ ...DEFAULT_VALUE });




  // on input change onf new status
  const handleChange = (event, key, cap = false) => {
    setValues({ ...values, [key]: cap ? capitalizeFirst(event.target.value) : event.target.value });
  };


  // add new status
  const addStatus = (type = "") => {

    if (!user || (user.access < 3)) {
      enqueueSnackbar('You dont have access to add new status', { variant: 'error' });
      return;
    }

    if (values.text === "") {
      enqueueSnackbar('text is requried', { variant: 'warning' });
      return;
    }
    if (values.location === "") {
      enqueueSnackbar('location is requried', { variant: 'warning' });
      return;
    }
    if (typeof values.datetime !== "object") {
      enqueueSnackbar('Date is requried', { variant: 'warning' });
      return;
    }

    setLoading(true);

    const payload = {
      ...values,
      awb: data.awb,
      status: data.status,
      datetime: fDateTime2(values.datetime)
    }

    if (type === "delivered") {
      payload.text = "Delivered";
      payload.status = "5";
    }
    else if (type === "rto") {
      payload.text = "Returned to origin";
      payload.status = "6";
    }

    console.log(223, payload);

    fetchResponse(urls.status.add, "POST", payload)
      .then(res => {
        console.log("224 res ", res);

        setLoading(false);
        onAdd(res.data);

        setValues({ ...DEFAULT_VALUE })

        setShowForm(false);

        if (res.status_changed) {
          // update existing  row
          dispatch(updateTracking({
            awb: res.awb,
            data: res.tracking_row
          }));

          setData(prev => ({ ...prev, status: res.status }));
        }
      })
      .catch(err => {
        console.log("242 err", err);
        setLoading(false);
      })
  }


  return (
    <Drawer
      anchor={'right'}
      open={!!statusAwb}
      onClose={() => dispatch(onStatusAwb(null))}
    >
      <Box sx={{ width: 300, p: 2 }} className='statuses'>
        <Typography variant="h4" sx={{ mb: 3 }}>
          AWB : {statusAwb}
        </Typography>
        status : {data.status}

        {
          data.statuses.map((s, i) => <StatusBlock
            key={i}
            status={data.status}
            data={s}
            last={i === (data.statuses.length - 1)}
            onDelete={onDelete}
          />)
        }
        {
          parseInt(data.status, 10) < 5 && <>
            {
              user?.access >= 3 && <NewStatus
                // awb={data.awb}
                // status={data.status}
                // onAdd={onAdd}
                showForm={showForm}
                setShowForm={setShowForm}
                values={values}
                handleChange={handleChange}
                addStatus={addStatus}
                loading={loading}
                setValues={setValues}
              />
            }


            <StatusBlock
              status={data.status}
              data={{
                "id": "",
                "type": "expected",
                "text": "Expected delivery",
                "location": "",
              }}
            />
          </>
        }
      </Box>
    </Drawer>
  );
}


function StatusBlock({ status, data, last, onDelete }) {
  return <div className='status-block pr' last={last ? "1" : "0"} type={status < 5 ? data.type : "done"}>
    <div className='deco' />
    <div className='text pb2 pl2'>
      <div className="pr pt10p">
        <div className="lc1">{data.text}</div>
        {
          onDelete && <div className="icons pa r0 t0">
            <IconButton onClick={() => onDelete(data.id)}>
              <Iconify icon='ic:baseline-delete' width={20} height={20} />
            </IconButton>
          </div>
        }
      </div>
      <div className='cgray9 f08'>{data.ts && fDate3(data.ts)}</div>
    </div>
  </div>
}
StatusBlock.propTypes = {
  status: PropTypes.string,
  data: PropTypes.object,
  last: PropTypes.bool,
  onDelete: PropTypes.func,
};




function NewStatus({
  showForm,
  setShowForm,
  setValues,
  values,
  handleChange,
  addStatus,
  loading
}) {

  return <>
    <div className='status-block pr' last="0" >
      <div className='deco' />
      <div className='text pb2 pl2 pr50'>
        <div className="pb50 pt10p">New Status</div>
        {
          !showForm && <Button
            variant="soft"
            color="primary"
            size="large"
            onClick={() => setShowForm(true)}
            fullWidth
          >
            Add new status
          </Button>
        }

        <Stack spacing={2}>
          {
            showForm && <>
              <TextField
                fullWidth
                size='small'
                label="Text"
                inputProps={{ maxLength: 30 }}
                value={values.text}
                onChange={(e) => {
                  handleChange(e, "text", true);
                }}
              />

              <CitiesAutoComplete
                inputProps={{ size: 'small' }}
                value={{ t: values.location }}
                setValue={(e) => setValues({ ...values, location: e.t })}
              />

              <MobileDateTimePicker
                value={values.datetime}
                onChange={(value) => {
                  setValues({ ...values, datetime: value });
                }}
                onError={console.log}
                minDate={new Date('2022-05-01T00:00')}
                inputFormat="dd MMM hh:mm a"
                mask="___/__/__ __:__ _M"
                renderInput={(params) => <TextField
                  size='small'
                  fullWidth
                  {...params}
                />}
              />

              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                loading={loading}
                onClick={addStatus}
              >
                Add status
              </LoadingButton>

              <Typography className='tc' sx={{ color: 'grey.500' }}>OR</Typography>

              <Stack direction="row" spacing={2} justifyContent='space-between' >
                <Button
                  variant="soft"
                  color="success"
                  size="small"
                  onClick={() => addStatus('delivered')}
                >
                  Mark Delivered
                </Button>
                <Button
                  variant="soft"
                  color="error"
                  size="small"
                  onClick={() => addStatus('rto')}
                >
                  Mark RTO
                </Button>
              </Stack>
            </>
          }
        </Stack>
      </div>
    </div>
  </>
}
NewStatus.propTypes = {
  loading: PropTypes.bool,
  showForm: PropTypes.bool,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  addStatus: PropTypes.func,
  setValues: PropTypes.func,
  setShowForm: PropTypes.func,
};
