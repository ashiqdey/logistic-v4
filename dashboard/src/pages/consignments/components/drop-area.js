import React, { useMemo } from "react";
import { useDropzone } from 'react-dropzone';
import { urls } from '../../../configs';

const acceptedFiles = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

export default function Index({ onDrop }) {

    // dropzone
    const handleOnDrop = e => {
        if (e.length > 0) {
            handleFile(e[0]);
        }
    };

    const handleInput = async (event) => {
        const imageInfo = event.target.files[0];
        handleFile(imageInfo);
    };


    const handleFile = (obj) => {
        console.log(obj);
        onDrop(obj);
    };



    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone(
        {
            accept: {
                [acceptedFiles]: ['.xlsx'],
            },
            maxFiles: 1,
            onDrop: e => handleOnDrop(e)
        }
    );


    const style = useMemo(() => ({
        ...(isFocused ? { borderColor: "var(--primary-main)" } : {}),
        ...(isDragAccept ? { borderColor: "var(--success-main)", background: "var(--success-lighter)" } : {}),
        ...(isDragReject ? { borderColor: 'var(--error-main)', background: "var(--error-lighter)" } : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);




    return <div className="dropzone-wrap mt2 ">
        <div {...getRootProps({
            className: 'dropzone',
            style
        })}>
            <input
                {...getInputProps()}
                onChange={handleInput}
            />
            <div className="py1 tc">
                <img src={`${urls.appBaseUrl}/assets/svg/upload.svg`} className="w60 mw150 mauto" alt="..." />
                <div className="mt2">Drag and drop, or click to select files</div>
                <div className="f08 cgraya">(Only .xlsx file &lt; 500KB is suppoted)</div>
            </div>
        </div>
    </div>;
}
