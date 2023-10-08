import { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// @mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

// import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

// import useAuth from "../../../hooks/useAuth";
// import useApi from "../../../hooks/api/useApi";
import useTracking from '../../../hooks/useTracking';

// import { clearTrackingData } from "../../../redux/tracking";
// import { setErrorData } from "../../../redux/error";
// import { urls } from "../../../configs";
import excelToJson from '../../../utils/excelToJson';

import DropArea from './drop-area';
// import { PATH_DASHBOARD } from "../../../routes/paths";
import { urls,config } from '../../../configs';
import { fDate2 } from '../../../utils/formatTime';
import { alphaNumeric } from '../../../utils/formatString';
// import ExcelPreview from "./ExcelPreview";

// -----------------

export default function Consignment() {
  const { DEFAULT_CONSIGNMENT, uploadConsignments, uploading } = useTracking();

  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [uploadingBatch, setUploadingBatch] = useState(0);

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
      resetFile();
      return;
    }

    // set name
    setFile({ name: excelFile.name, size: excelFile.size });

    excelToJson(excelFile).then((d) => {
      formatRawInputs(d);
    });
  };

  const formatRawInputs = (raw) => {
    // batch of 100 (config.BATCH_SIZE)
    const consignments = [];

    let pushed = 0;
    let batch = -1;

    for (let i = 0; i < raw.length; i += 1) {
      const r = raw[i];

      const dated = fDate2(r.Date);
      const awb = alphaNumeric(r['Waybill no.']);

      if (dated.length > 9 && awb.length > 3) {
        // 0-99 0
        // 100-199 - 1
        // 200 - 299 - 2
        if (pushed % config.BATCH_SIZE === 0) {
          batch += 1;
          consignments[batch] = [];
        }

        consignments[batch].push({
          ...DEFAULT_CONSIGNMENT,
          dated,
          awb,
          forwarding_no: r['Forwading no.'],
          courier: r['Co-Courier'],
          vendor: r.Vendor,
          sender: r.Sender,
          receiver: r.Receiver,
          destination: r.Destination,
          content: r.Content,
          pack: r.Pcs,
          wt: r.Weight,
          dwt: r['Dim Weight'],
          status: r.Status,
        });

        pushed += 1;
      }
    }

    setJsonData(consignments);
    setUploadingCount(0);
    setUploadingBatch(0);
  };

  const onUpload = async () => {
    if (uploading) {
      return;
    }
    if (!jsonData?.length || !jsonData[uploadingBatch]?.length) {
      resetFile();
      return;
    }

    const rows = jsonData[uploadingBatch];

    if (rows.length > 0) {
      setUploadingCount((prev) => prev + rows.length);
      await uploadConsignments(rows).then((res) => {
        console.log('113 res', { uploadingBatch, res });
        // upload next batch
        setUploadingBatch((prev) => prev + 1);
      });
    }
  };

  useEffect(() => {
    if (uploadingBatch > 0) {
      onUpload();
    }
  }, [uploadingBatch]);

  return (
    <div className="pt-5 pb-5">
      <DropArea onDrop={onDrop} />
      {jsonData.length > 0 && (
        <>
          <Stack direction="row" className="mt-2 jcsb aic">
            <Stack direction="row" className="mt-2 aic">
              <img src={`${urls.appBaseUrl}/assets/svg/excel.svg`} className="ic50 mr50" alt="..." />
              <div className="w-60">
                <div className="lc1">{file?.name} </div>
                <small>({Math.ceil(file?.size / 1024)}KB)</small>
              </div>
            </Stack>
            <Button color="error" onClick={() => setJsonData([])}>
              Remove
            </Button>
          </Stack>

          {/* <ExcelPreview data={jsonData} /> */}

          <div className="py3 mw300 mauto">
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              // loading={uploading}
              disabled={uploading}
              onClick={onUpload}
              className="ofh"
            >
              {uploading && (
                <LinearProgress
                  className="pa t-0 w100"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    height: 2,
                    '& .MuiLinearProgress-bar': { bgcolor: '#fff' },
                  }}
                />
              )}
              Upload{' '}
              {uploading && (
                <>
                  ({uploadingCount}/{jsonData.reduce((a, b) => a + b.length, 0)})
                </>
              )}
            </LoadingButton>
          </div>
        </>
      )}
    </div>
  );
}
