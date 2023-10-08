import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';


function AccountStatus({ status }) {
    return (<Chip
        size='small'
        color={status ? "success" : "error"}
        label={status ? "Active" : "Blocked"}
    />)
}
AccountStatus.propTypes = {
    status: PropTypes.bool
};

export default AccountStatus;