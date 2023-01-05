import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAsyncFn } from 'react-use';
import Modal from 'common/Modal';
import Loader from 'common/Loader';
import { Heading, P } from 'common/base';
import reportApi from 'apis/reportApi';
import styles from './ReportInspectModal.module.css';

const useGetReports = experienceId => {
  return useAsyncFn(async () => {
    return await reportApi.getReports({ id: experienceId });
  }, [experienceId]);
};

const ReportInspectModal = ({ experienceId, isOpen, setIsOpen }) => {
  const [reportsState, getReports] = useGetReports(experienceId);
  useEffect(() => {
    // get reports when modal is open
    if (isOpen) {
      getReports();
    }
  }, [getReports, isOpen]);

  const reports = reportsState.value ? reportsState.value : [];

  return (
    <Modal
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      hasClose
      closableOnClickOutside
    >
      <Heading size="l" marginBottomS center>
        查看檢舉
      </Heading>
      {reportsState.loading && <Loader size="s" />}
      {!reportsState.loading && reports && (
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
      {reportsState.error && (
        <div>
          <div>Oops! 發生錯誤</div>
        </div>
      )}
    </Modal>
  );
};

ReportInspectModal.propTypes = {
  experienceId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ReportInspectModal;
