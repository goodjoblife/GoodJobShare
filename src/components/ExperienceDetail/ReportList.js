import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAsyncFn } from 'react-use';
import Loader from 'common/Loader';
import styles from './ReportList.module.css';
import { P } from 'common/base';
import Button from 'common/button/Button';
import { getExperienceReportsApi } from 'apis/reports';

const useGetReports = experienceId => {
  return useAsyncFn(async () => {
    return await getExperienceReportsApi({ id: experienceId });
  }, [experienceId]);
};

const ReportList = ({ id, onCloseReport }) => {
  const [reportsState, getReports] = useGetReports(id);

  useEffect(() => {
    getReports();
  }, [getReports]);

  if (reportsState.loading) return <Loader size="s" />;
  if (reportsState.error) return <div>Oops! 發生錯誤</div>;

  const reports = reportsState.value || [];

  return (
    <div className={styles.reportList}>
      {reports.length === 0 ? (
        <span>沒有檢舉記錄</span>
      ) : (
        <span>共 {reports.length} 個檢舉：</span>
      )}
      {reports.map(({ reason_category, reason }, i) => (
        <div key={i} className={styles.reportItem}>
          <P size="m" bold>
            {reason_category}
          </P>
          <P size="m">{reason}</P>
        </div>
      ))}
      <Button circleSize="md" btnStyle="black" onClick={onCloseReport}>
        我要回報
      </Button>
    </div>
  );
};

ReportList.propTypes = {
  id: PropTypes.string.isRequired,
  onCloseReport: PropTypes.func.isRequired,
};

export default ReportList;
