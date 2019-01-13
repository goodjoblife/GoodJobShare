import React from 'react';
import PropTypes from 'prop-types';
import { withState, compose, lifecycle, withHandlers } from 'recompose';
import Modal from 'common/Modal';
import Loader from 'common/Loader';
import { Heading, P } from 'common/base';

import styles from './ReportInspectModal.module.css';
import { getReports } from '../../../apis/reportApi';
import fetchingStatus, {
  isFetching,
  isFetched,
  isError,
} from '../../../constants/status';

const store = compose(
  withState('status', 'setStatus', fetchingStatus.UNFETCHED),
  withState('reports', 'setReports', []),
  withHandlers({
    fetchReports: ({ setStatus, setReports }) => id => {
      setStatus(fetchingStatus.FETCHING);
      getReports({ id })
        .then(reports => {
          setStatus(fetchingStatus.FETCHED);
          setReports(reports);
        })
        .catch(error => {
          setStatus(fetchingStatus.ERROR);
          setReports([]);
        });
    },
  }),
);

const queryData = lifecycle({
  componentDidMount() {
    const { id, fetchReports } = this.props;
    fetchReports(id);
  },
  componentDidUpdate(prevProps) {
    const { id, fetchReports } = this.props;
    if (id !== prevProps.id) {
      const { id } = this.props;
      fetchReports(id);
    }
  },
});

const ReportInspectModal = ({
  id,
  isOpen,
  toggleReportInspectModal,
  status,
  reports,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      close={() => toggleReportInspectModal(false)}
      hasClose
    >
      <Heading size="l" marginBottomS center>
        查看檢舉
      </Heading>
      {isFetching(status) && <Loader size="s" />}
      {isFetched(status) && (
        <div>
          {reports.length === 0 ? (
            <span>沒有檢舉記錄</span>
          ) : (
            <span>共 {reports.length} 個檢舉：</span>
          )}
          {reports.map(({ reason_category: reasonCategory, reason }, i) => (
            <div key={i} className={styles.reportItem}>
              <P size="m" bold>
                {reasonCategory}
              </P>
              <P size="m">{reason}</P>
            </div>
          ))}
        </div>
      )}
      {isError(status) && (
        <div>
          <div>Oops! 發生錯誤</div>
        </div>
      )}
    </Modal>
  );
};

ReportInspectModal.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleReportInspectModal: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  reports: PropTypes.array.isRequired,
};

const hoc = compose(
  store,
  queryData,
);

export default hoc(ReportInspectModal);
