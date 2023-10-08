import { useEffect, useState, useMemo } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    // GridToolbar
} from '@mui/x-data-grid';

// import { NoData, Spinner } from "components/xbl";
// import TrackingBody from "components/rows/TrackingBody";
// import TrackingHeader from "components/rows/TrackingHeader";

import Page from "../../components/micro/Page";
import { getStatusLabel, getStatusId } from "../../utils/tracking";
import { statusMap } from "../../configs";
import { fDate } from "../../utils/formatTime";
import columns from "./columns";
import Statuses from '../../sections/Statuses';
import EditDetails from '../../sections/EditDetails';

// import TrackingModal from "modals/TrackingModal";
import useFetchTracking from "../../hooks/useFetchTracking";
import Iconify from '../../components/micro/Iconify';
import TrackingMenu from './components/TrackingMenu';
//
import useTracking from "../../hooks/useTracking";





function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}





// function CustomFooterStatusComponent({ status }) {
//     return (
//         <Box sx={{ p: 1, display: 'flex' }}>
//             Status {status}

//             <CustomPagination />
//         </Box>
//     );
// }




export default function Tracking() {

    // type of tracking status
    const { trackingType } = useParams();

    // get status id 'all', '1' - '6'
    const status = getStatusId(trackingType);


    // hook to fetch
    const {
        data,
        // setData,
        loading,
        totalRows,
        page,
        pageSize,
        pageChanged,
    } = useFetchTracking({ trackingType, status });

    const { deleteAwbs, cancelDelete, onDelete, updateTrackingStatus } = useTracking();

    // ----------------------------------------


    // ------ Context Menu ------
    const [selectedRow, setSelectedRow] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();

        // get id, get item
        const id = event.currentTarget.getAttribute('data-id');
        const selRow = data.find(row => row.id === id);
        setSelectedRow(selRow);

        setContextMenu(
            contextMenu === null
                ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
                : null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };
    // ------ Context Menu ------



    return (
        <Page title="Tracking">
            <Box sx={{
                minHeight: '400px',
                height: '100vh',
                width: '100%',
                paddingTop: {
                    sm: '64px',
                    lg: '0',
                }
            }}>
                {/* remove padding of main */}
                <style>{`
                @media screen and (max-width: 960px){
                    header.MuiAppBar-root{
                        background-color:transparent!important;
                        backdrop-filter: none!important;
                    }
                    header .MuiIconButton-root{
                        background-color: var(--grey-300)!important;
                    }
                    
                }
                main{padding:0!important}
                `}</style>

                <DataGrid
                    rows={data}
                    // total rows {'1':5,'2':3,'all':8}
                    rowCount={totalRows[status]}

                    rowsPerPageOptions={[5]}
                    page={page}
                    pageSize={pageSize}
                    paginationMode="server"
                    onPageChange={pageChanged}
                    // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    columns={columns}
                    // initialState={initialState}

                    components={{
                        LoadingOverlay: LinearProgress,
                        // Toolbar: GridToolbar,
                        // Pagination: CustomPagination,
                        // Footer: CustomFooterStatusComponent,
                    }}
                    // componentsProps={{
                    //     footer: { status },
                    // }}

                    componentsProps={{
                        row: {
                            onContextMenu: handleContextMenu,
                            style: { cursor: 'context-menu' },
                        },
                    }}

                    // checkboxSelection
                    // pagination
                    loading={loading}
                />
                {/* end of data grid */}



                <TrackingMenu
                    contextMenu={contextMenu}
                    selectedRow={selectedRow}
                    onClose={handleClose}
                    onDelete={onDelete}
                    updateStatus={updateTrackingStatus}
                />
            </Box>

            <Statuses />

            <EditDetails />

            <Snackbar
                open={deleteAwbs.length > 0}
                autoHideDuration={10000}
                message={`Deleting ${deleteAwbs.length} AWB`}
                action={<Button color="secondary" size="small" onClick={cancelDelete}>Cancel</Button>}
            />
        </Page>
    )
}

