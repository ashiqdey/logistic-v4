import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//
import { statusToId } from "../utils/tracking";
// import { fDate2 } from "../utils/formatTime";
import { trimRaw, alphaNumeric, naming, strNumeric, strDecimal } from "../utils/formatString";
import useAuth from "./useAuth";
import useApi from './api/useApi';
import { urls } from "../configs";

import {
  unshiftTrackingData,
  updateTracking,
  onEditAwb,
  deleteTrackings,
} from "../redux/tracking";
import { setErrorData } from "../redux/error";
import { fDate2 } from '../utils/formatTime';
// ----------------------------------------------------------------------


let deleteTimer = null;
// ----------------------------------------------------------------------


const useTracking = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { fetchResponse } = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  // all tracking data from redux
  // const tracking = useSelector(state => state.tracking.value);

  const [deleteAwbs, setDeleteAwbs] = useState([]);



  const DEFAULT_CONSIGNMENT = {
    "dated": new Date(),
    "awb": "",
    "forwarding_no": "",
    "courier": "",
    "sender": "",
    "receiver": "",
    "destination": "",
    "content": "",
    "pack": "1",
    "wt": "1",
    "dwt": "1",
    "vendor": "",
    "status": "1",
    "timestamp": ""
  };



  const formatConsignments = (r) => ({
    ...DEFAULT_CONSIGNMENT,
    dated: fDate2(r.dated),
    awb: alphaNumeric(r.awb),
    "forwarding_no": alphaNumeric(r.forwarding_no),
    "courier": naming(r.courier),
    "vendor": naming(r.vendor),
    "sender": naming(r.sender),
    "receiver": naming(r.receiver),
    "destination": trimRaw(r.destination),
    "content": trimRaw(r.content),
    "pack": strNumeric(r.pack),
    "wt": strDecimal(r.wt, 3),
    "dwt": strDecimal(r.dwt, 3),
    "status": statusToId(r.status),
    "timestamp": String(new Date(r.dated).getTime())
  })


  const uploadConsignments = async (consignments) => {
    if (uploading) {
      return enqueueSnackbar('Please wait while uploading finishes', { variant: 'warning' });
    }
    if (!accessAllowed(3)) {
      return false;
    }
    if (!consignments || (consignments.length === 0)) {
      return enqueueSnackbar('Please enter data', { variant: 'error' });
    }



    const payload = consignments.map(formatConsignments);

    // if (payload) {
    //   console.log({ consignments: payload });
    //   return;
    // }

    setUploading(true);

    // upload file
    // return fileUpload(urls.tracking.upload, payload)
    return fetchResponse(urls.tracking.add, 'POST', { consignments: payload })
      .then(res => {

        setUploading(false);


        console.log("consign-upload 52", res);
        if (res.error) return;




        // if error, add to error log
        if (res.skipped.length > 0) {
          dispatch(setErrorData({
            key: "upload",
            values: [`Skipped ${res.skipped.length} rows having AWB as ${res.skipped.join(", ")}`]
          }));

          // show toast
          enqueueSnackbar(`Imported ${res.imported}, Skipped ${res.skipped.length}`, { variant: 'success' });
        }
        else {
          // show toast
          enqueueSnackbar(`Imported ${res.imported}`, { variant: 'success' });
        }


        // if any error message, add to log
        if (res.failed.length > 0) {
          dispatch(setErrorData({
            key: "upload",
            values: [`${res.failed.length} failed message. ${res.failed.join(", ")}`]
          }));
        }

        if (res.imported > 0) {
          // clean cache
          // dispatch(clearTrackingData());

          // setTimeout(() => navigate(PATH_DASHBOARD.tracking.all), 200)


          // for new upload, push to traking (on front)
          // save in cache (redux)
          dispatch(unshiftTrackingData({
            consignments: res.consignments,
            version: res.version,
          }));
        }
      })
      .catch(err => {
        console.log("consign-add 148", err);
      });;
  }



  const updateConsignment = (consignment) => {
    if (!accessAllowed(2)) return;


    const payload = formatConsignments(consignment);

    // upload file
    // return fileUpload(urls.tracking.upload, payload)
    fetchResponse(urls.tracking.update, 'POST', payload)
      .then(res => {
        console.log("consign-update 173", res);

        if (res.error) return;

        if (res.data) {
          // update existing 
          dispatch(updateTracking({
            awb: res.awb,
            data: res.data
          }));

          // close modal
          dispatch(onEditAwb(null))
        }
      })
      .catch(err => {
        console.log("consign-update 184", err);
      });

  }




  const updateTrackingStatus = (awb, status) => {
    if (!accessAllowed(2)) {
      return;
    }


    fetchResponse(urls.tracking.statusUpdate, 'POST', { awb, status })
      .then(res => {

        if (res.error) return;

        // update sttaus 
        dispatch(updateTracking({
          awb,
          data: { status }
        }));
      })
      .catch(err => {
        console.log("consign-update 184", err);
      });

  }




  // ------DELETE-----

  const cancelDelete = () => {
    setDeleteAwbs([]);
  };

  const onDelete = (awb) => {
    if (!accessAllowed(4)) return;


    if (deleteTimer) {
      clearTimeout(deleteTimer);
    }

    setDeleteAwbs(prev => [...new Set([...prev, awb])]);

    // wait 9 sec before deleting
    deleteTimer = setTimeout(onDeleteApi, 9000);
  };


  const onDeleteApi = () => {
    if (!accessAllowed(4)) return;

    console.log("timer");

    let payload;

    setDeleteAwbs((prev) => {
      payload = prev.join(",")
      return [];
    });

    if (payload.length < 2) {
      return;
    }

    fetchResponse(urls.tracking.delete, 'GET', { awbs: payload })
      .then(res => {
        // if any error message, add to log
        if (res.errors.length > 0) {
          dispatch(setErrorData({
            key: "delete",
            values: res.errors
          }));
        }

        // remove from redux
        dispatch(deleteTrackings({
          awbs: res.awbs,
          totalRows: res.total_rows,
        }));

      })
      .catch(err => {
        console.log("consign-add 148", err);
      });;
  }

  // ------DELETE-----



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


  return {
    DEFAULT_CONSIGNMENT,
    uploadConsignments,
    updateConsignment,
    uploading,
    updateTrackingStatus,

    onDelete,
    deleteAwbs,
    cancelDelete,

  };
};

export default useTracking;
