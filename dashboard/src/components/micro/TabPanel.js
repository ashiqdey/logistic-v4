import PropTypes from 'prop-types';

const TabPanel = ({ children, value, index }) => (<div
  role="tabpanel"
  hidden={value !== index}
  id={`simple-tabpanel-${index}`}
  aria-labelledby={`simple-tab-${index}`}
>
  {value === index && children}
</div>);


TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number,
};

export default TabPanel;
