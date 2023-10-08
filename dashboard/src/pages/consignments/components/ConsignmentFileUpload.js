import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// @mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

import useAuth from '../../../hooks/useAuth';
import useApi from '../../../hooks/api/useApi';

import { clearTrackingData } from '../../../redux/tracking';
import { setErrorData } from '../../../redux/error';
import { urls } from '../../../configs';
import excelToJson from '../../../utils/excelToJson';

// import { Spinner } from "components/xbl";
import DropArea from './drop-area';
import { PATH_DASHBOARD } from '../../../routes/paths';
import ExcelPreview from './ExcelPreview';
import { urls } from '../../../configs';

// -----------------

export default function Consignment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fileUpload, fetchResponse } = useApi();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState([]);

  const upload = () => {
    if (loading) {
      return enqueueSnackbar('Please wait while uploading finishes', { variant: 'warning' });
    }
    if (!user || user.access < 3) {
      return enqueueSnackbar('You dont have access to upload new data', { variant: 'warning' });
    }
    if (!jsonData || jsonData.length === 0) {
      return enqueueSnackbar('Please select a file', { variant: 'error' });
    }

    setLoading(true);

    const payload = new FormData();
    payload.append('file', file);

    // upload file
    // return fileUpload(urls.tracking.upload, payload)
    fetchResponse(urls.tracking.upload, payload).then((res) => {
      setLoading(false);
      resetFile();

      console.log('consign-upload 52', res);
      if (res.error) {
        return;
      }

      // show toast
      enqueueSnackbar(`Imported ${res.imported}, Skipped ${res.skipped.length}`, { variant: 'success' });

      // if error
      if (res.skipped.length > 0) {
        dispatch(
          setErrorData({
            key: 'upload',
            values: [`Skipped ${res.skipped.length} rows having AWB as ${res.skipped.join(', ')}`],
          })
        );
      }

      // if error
      if (res.failed.length > 0) {
        dispatch(
          setErrorData({
            key: 'upload',
            values: [`${res.failed.length} failed message. ${res.failed.join(', ')}`],
          })
        );
      }

      if (res.imported > 0) {
        // clean cache
        dispatch(clearTrackingData());

        setTimeout(() => navigate(PATH_DASHBOARD.tracking.all), 200);
      }
    });
  };

  const resetFile = () => {
    setFile(null);
    setJsonData([]);
  };

  const onDrop = (excelFile) => {
    // handle File
    const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    if (excelFile === null) {
      resetFile();
      return;
    }

    if (!fileType.includes(excelFile.type)) {
      console.log('invalid file type', excelFile.type);
      resetFile();
      return;
    }

    // set name
    setFile({ name: excelFile.name, size: excelFile.size });

    excelToJson(excelFile).then((d) => {
      console.log(123, d);
      setJsonData(d);
    });

    // const reader = new FileReader();
    // reader.readAsArrayBuffer(excelFile);
    // reader.onload = (e) => {
    //     const fileRaw = e.target.result;

    //     // parse excel to json
    //     if (fileRaw === null) {
    //         setJsonData([]);
    //     }
    //     const workbook = XLSX.read(fileRaw, { type: 'buffer' });
    //     const worksheetName = workbook.SheetNames[0];
    //     const worksheet = workbook.Sheets[worksheetName];
    //     const data = XLSX.utils.sheet_to_json(worksheet);
    //     setJsonData(data);
    // }
  };

  return (
    <div className="pt-5 pb-5">
      <DropArea onDrop={onDrop} />
      {jsonData.length > 0 && (
        <>
          <Stack direction="row" className="mt-2 jcsb aic">
            <Stack direction="row" className="mt-2 aic">
              <img src={`${urls.appBaseUrl}/assets/svg/excel.svg`} className="ic50 mr50" alt="..." />
              <div className="w-60">
                <div className="lc1">{file.name} </div>
                <small>({Math.ceil(file.size / 1024)}KB)</small>
              </div>
            </Stack>
            <Button color="error" onClick={() => setJsonData([])}>
              Remove
            </Button>
          </Stack>

          <ExcelPreview data={jsonData} />

          <div className="py3 mw300 mauto">
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading} onClick={upload}>
              Upload
            </LoadingButton>
          </div>
        </>
      )}
    </div>
  );
}
