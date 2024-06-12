import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useViewSalaryWorkTimes } from 'hooks/viewLog';

const ViewLog = ({ pageName, page, contentIds }) => {
  // Send view to backend
  const viewSalaryWorkTimes = useViewSalaryWorkTimes();
  useEffect(() => {
    const referrer = window.location.href;
    viewSalaryWorkTimes({ contentIds, referrer });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName, page, viewSalaryWorkTimes]);

  return null;
};

ViewLog.propTypes = {
  contentIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  page: PropTypes.number.isRequired,

  // key
  pageName: PropTypes.string.isRequired,
};

export default ViewLog;
