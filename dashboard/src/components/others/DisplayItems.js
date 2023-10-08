import PropTypes from 'prop-types';
// @mui
import Typography from '@mui/material/Typography';
// -----------------------------------------------


const DisplayItems = ({ items = [] }) => (<table>
  <thead style={{ color: "#aaa", fontSize: "11px" }}>
    <tr>
      <Typography component="th" variant="caption" sx={{ minWidth: '100px', fontWeight: "500" }}>Item</Typography>
      <Typography component="th" variant="caption" sx={{ fontWeight: "500" }}>Quantity</Typography>
    </tr>
  </thead>
  <tbody>
    {
      items.map((e, index) => <tr key={`row-${index}`}>
        <td>{e.name || ''}</td>
        <td style={{ textAlign: "center" }}>{e.quantity || ''}</td>
      </tr>)
    }
  </tbody>
</table>);
export default DisplayItems;

DisplayItems.propTypes = {
  items: PropTypes.array,
};