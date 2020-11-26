import React, { useMemo, Fragment } from 'react';
import usePagination from 'hooks/usePagination';
import Table from 'common/table/Table';
import Pagination from 'common/Pagination';
import usePermission from 'hooks/usePermission';
import { Wrapper, Section, Heading, Link } from 'common/base';

import styles from './MyUnlockedContentsPage.module.css';

const DATA_NUM_PER_PAGE = 20;
const TYPE_TEXT_MAPPING = {
  work: '工作心得',
  interview: '面試心得',
  salary_work_time: '薪資工時',
};

// render yyyy-mm-dd format
const renderUnlockedTime = item => (
  <div>{item.unlocked_time.toISOString().slice(0, 10)}</div>
);

const renderUnlockedRecord = item => (
  <div className={styles.unlockedDataRow}>
    <span className={styles.typeBadge}>{TYPE_TEXT_MAPPING[item.type]}</span>
    <Link to={item.url} className={styles.link}>
      {item.title}
    </Link>
  </div>
);

const renderTable = (records, page, getPageLink) => {
  if (records && records.length > 0) {
    return (
      <Fragment>
        <Table data={records} primaryKey="data_id">
          <Table.Column
            className={styles.unlockedTimeCol}
            title="解鎖時間"
            dataField={renderUnlockedTime}
          >
            解鎖時間
          </Table.Column>
          <Table.Column
            className={styles.unlockedDataCol}
            title="解鎖內容"
            dataField={renderUnlockedRecord}
          >
            解鎖內容
          </Table.Column>
        </Table>
        <Pagination
          totalCount={records ? records.length : 0}
          unit={DATA_NUM_PER_PAGE}
          currentPage={page}
          createPageLinkTo={getPageLink}
        />
      </Fragment>
    );
  } else {
    return (
      <div className={styles.emptyBlock}>
        <p>目前還沒有解鎖的資料喲！</p>
        <br />
        <p>不妨馬上開始搜尋你有興趣的公司，解鎖薪水、工時、和面試心得！</p>
      </div>
    );
  }
};

const MyUnlockedContentsPage = () => {
  const {
    unlockedSalaryWorkTimeRecords,
    unlockedExperienceRecords,
  } = usePermission();

  const [page, getPageLink] = usePagination();

  // transform data for rendering
  const transformedRecords = useMemo(() => {
    const records = [];
    const expRecords = unlockedExperienceRecords || [];
    const salaryRecords = unlockedSalaryWorkTimeRecords || [];
    expRecords.forEach(r => {
      if (r.data && r.unlocked_time) {
        records.push({
          data_id: r.data.id,
          unlocked_time: new Date(r.unlocked_time),
          type: r.data.type,
          title: `${r.data.company.name} ${r.data.job_title.name}`,
          url: `/experiences/${r.data.id}`,
        });
      }
    });
    salaryRecords.forEach(r => {
      if (r.data && r.unlocked_time) {
        records.push({
          data_id: r.data.id,
          unlocked_time: new Date(r.unlocked_time),
          type: 'salary_work_time',
          title: `${r.data.company.name} ${r.data.job_title.name}`,
          url: `/companies/${r.data.company.name}/salary-work-times`,
        });
      }
    });
    records.sort((a, b) => b.unlocked_time - a.unlocked_time);
    return records;
  }, [unlockedExperienceRecords, unlockedSalaryWorkTimeRecords]);

  const currentPageRecords = useMemo(() => {
    return transformedRecords.slice(
      (page - 1) * DATA_NUM_PER_PAGE,
      page * DATA_NUM_PER_PAGE,
    );
  }, [transformedRecords, page]);

  return (
    <Wrapper size="m">
      <Section paddingTop paddingBottom>
        <Heading size="sm" marginBottomS>
          我解鎖的資料
        </Heading>
        {renderTable(currentPageRecords, page, getPageLink)}
      </Section>
    </Wrapper>
  );
};

export default MyUnlockedContentsPage;
