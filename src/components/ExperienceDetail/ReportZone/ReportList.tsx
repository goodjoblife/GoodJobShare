import React from 'react';

import { Heading, P } from 'common/base';
import Button from 'common/button/Button';
import DividedList, { DividedListItem } from 'common/DividedList';

import styles from './ReportList.module.css';

type Report = {
  reasonCategory: string;
  reason: string;
};

type Props = {
  reports: Report[];
  reportCount?: number;
  onShowReportForm: () => void;
};

const ReportList: React.FC<Props> = ({
  reports,
  reportCount,
  onShowReportForm,
}) => {
  return (
    <div className={styles.reportList}>
      {reportCount === 0 ? (
        <span className={styles.noReport}>沒有回報記錄</span>
      ) : (
        <div className={styles.headerContainer}>
          <Heading size="l" Tag="div" className={styles.header}>
            查看其他人回報
          </Heading>
          <P className={styles.totalReport}>共 {reportCount} 個回報</P>
        </div>
      )}
      {reports.length > 0 && (
        <DividedList>
          {reports.map(({ reasonCategory, reason }, i) => (
            <DividedListItem key={i} label={reasonCategory}>
              <P size="m" className={styles.reason}>
                {reason}
              </P>
            </DividedListItem>
          ))}
        </DividedList>
      )}
      <Button
        className={styles.reportButton}
        circleSize="md"
        btnStyle="black"
        onClick={onShowReportForm}
      >
        我要回報
      </Button>
    </div>
  );
};

export default ReportList;
