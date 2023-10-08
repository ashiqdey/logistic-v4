// @mui
import Chip from '@mui/material/Chip';
// 
import { getStatusLabel, getStatusColor } from "../../utils/tracking";
import { fDate } from "../../utils/formatTime";

const StatusChip = (v) => (<Chip
  sx={{ minWidth: 80 }}
  label={getStatusLabel(v.row.status)}
  color={getStatusColor(v.row.status)}
  size='small'
/>)

const columns = [
  {
    field: 'dated',
    headerName: 'Dated',
    width: 120,
    valueGetter: (params) => fDate(params.row.ts_created)
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: StatusChip
  },
  { field: 'awb', headerName: 'AWB', width: 150, hideable: false },
  { field: 'forwarding_no', headerName: 'Forwarding no', width: 150 },
  { field: 'courier', headerName: 'Courier', width: 120 },
  { field: 'vendor', headerName: 'Vendor', width: 120 },
  { field: 'sender', headerName: 'Sender', width: 150 },
  { field: 'receiver', headerName: 'Receiver', width: 150 },
  { field: 'destination', headerName: 'Destination', width: 150 },
  { field: 'content', headerName: 'Content', width: 100 },
  { field: 'pack', headerName: 'Pack', width: 70 },
  { field: 'wt', headerName: 'Wt.', width: 70 },
  { field: 'dwt', headerName: 'D.wt', width: 70 },
];

export default columns;