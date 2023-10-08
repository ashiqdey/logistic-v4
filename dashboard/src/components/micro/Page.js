import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

// -----------------------------------------------

const Page = ({ children, title = '', meta }) => (
  <>
    <Helmet>
      <title>{`${title} | G move`}</title>
      {meta}
    </Helmet>
    {children}
  </>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
