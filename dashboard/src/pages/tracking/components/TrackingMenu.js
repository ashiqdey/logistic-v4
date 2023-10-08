import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
// @mui
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//
import Iconify from '../../../components/micro/Iconify';
import { onStatusAwb, onEditAwb } from "../../../redux/tracking";


const menuStatus = [
    {
        status: 2,
        icon: 'ic:outline-directions-transit',
        text: 'On transit'
    },
    {
        status: 3,
        icon: 'ic:outline-delivery-dining',
        text: 'Out for delivery'
    },
    {
        status: 4,
        icon: 'ic:outline-access-time',
        text: 'Undelivered'
    },
    {
        status: 5,
        icon: 'ic:baseline-done',
        text: 'Delivered'
    },
    {
        status: 6,
        icon: 'ic:baseline-call-missed-outgoing',
        text: 'RTO'
    }
];




export default function TrackingMenu({
    contextMenu,
    selectedRow,
    onClose,
    onDelete,
    updateStatus
}) {
    const dispatch = useDispatch();


    // --------handle menu--------
    const handleMenuClick = (type, payload) => {
        if (type === 'change-status') {
            // change status
            updateStatus(selectedRow.awb, payload.toString())
        }
        else if (type === 'edit') {
            // edit row
            dispatch(onEditAwb(selectedRow))
        }
        else if (type === 'status') {
            // view status
            dispatch(onStatusAwb(selectedRow.awb))
        }
        else if (type === 'delete') {
            // delete row
            onDelete(selectedRow.awb)
        }
        onClose();
    };



    if (!contextMenu || !selectedRow || !selectedRow?.status) {
        return null;
    }


    return (
        <>
            <Menu
                open
                onClose={onClose}
                anchorReference="anchorPosition"
                anchorPosition={{ top: contextMenu.mouseY, left: contextMenu.mouseX }}
                componentsProps={{
                    root: {
                        onContextMenu: (e) => {
                            e.preventDefault();
                            onClose();
                        },
                    },
                }}
            >

                {
                    // dont show if DELIVERED, RTO
                    (selectedRow.status !== '5' && selectedRow.status !== '6') && <div>
                        <Typography component='div' sx={{ px: 2, color: 'grey.500', minWidth: 160 }} variant='overline'>Mark</Typography>
                        {
                            menuStatus.map(menu => <MenuStatus
                                key={menu.status}
                                status={selectedRow?.status || '1'}
                                menu={menu}
                                onClick={() => handleMenuClick('change-status', menu.status)}
                            />)
                        }
                        <Divider sx={{ my: 2 }} />
                    </div>
                }

                <MenuOthers
                    icon='ic-baseline-edit'
                    text='Edit'
                    onClick={() => handleMenuClick('edit')}
                />
                <MenuOthers
                    icon='ic:sharp-format-list-bulleted'
                    text='Statuses'
                    onClick={() => handleMenuClick('status')}
                />
                <MenuOthers
                    icon='ic-baseline-delete'
                    text='Delete'
                    onClick={() => handleMenuClick('delete')}
                />
            </Menu>
        </>
    )
}
TrackingMenu.propTypes = {
    contextMenu: PropTypes.object,
    selectedRow: PropTypes.object,
    onClose: PropTypes.func,
    onDelete: PropTypes.func,
    updateStatus: PropTypes.func,
};



const MenuStatus = ({ status, menu, onClick }) => {
    const statusInt = parseInt(status, 10);

    // for connected, show on TRANSIT
    // for on transit, show all > TRANSIT
    // for on OUT_FOR_DEL, show UNDELIVERED, DELIVERED, RTO
    // for on UNDELIVERED, show OUT_FOR_DEL, DELIVERED, RTO
    if (
        (statusInt === 1 && (menu.status > 2)) ||
        (statusInt === 2 && (menu.status < 3)) ||
        (statusInt > 2 && (menu.status < 3 || statusInt === menu.status))
    ) {
        return <div />;
    }

    return <MenuItem onClick={onClick}>
        <Iconify color='grey.500' icon={menu.icon} sx={{ mr: 1.5 }} /> {menu.text}
    </MenuItem>
}
MenuStatus.propTypes = {
    status: PropTypes.string,
    menu: PropTypes.object,
    onClick: PropTypes.func,
};



const MenuOthers = ({ icon, text, onClick }) => (<MenuItem onClick={onClick}>
    <Iconify color='grey.500' icon={icon} sx={{ mr: 1.5 }} /> {text}
</MenuItem>);
MenuOthers.propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
};