import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import R from 'ramda';
import usePagination from 'hooks/usePagination';
import { useFetchMyUnlockedContents } from './useQuery';
import Table from 'common/table/Table';
import Pagination from 'common/Pagination';

const DATA_NUM_PER_PAGE = 20;
const TYPE_TEXT_MAPPING = {
  work: '工作心得',
  interview: '面試心得',
  salary_work_time: '薪資工時',
};

// render yyyy-mm-dd format
const renderUnlockTime = item => (
  <div>{item.unlocked_time.toISOString().slice(0, 10)}</div>
);

const renderUnlockData = item => (
  <div>
    <span>{TYPE_TEXT_MAPPING[item.type]}</span>
    <Link to={item.url}>{item.title}</Link>
  </div>
);

const MyUnlockedContentsPage = () => {
  const [
    myUnlockedContents,
    fetchMyUnlockedContents,
  ] = useFetchMyUnlockedContents();
  // eslint-disable-next-line no-unused-vars
  const [page, getPageLink] = usePagination();

  useEffect(() => {
    fetchMyUnlockedContents();
  }, [fetchMyUnlockedContents]);

  // transform data for rendering
  const transformedRecords = useMemo(() => {
    const experienceRecords = R.pathOr(
      [],
      ['value', 'me', 'unlocked_experience_records'],
      myUnlockedContents,
    );
    const salaryRecords = R.pathOr(
      [],
      ['value', 'me', 'unlocked_salary_work_time_records'],
      myUnlockedContents,
    );
    const records = [];
    experienceRecords.forEach(r => {
      if (r.data && r.unlocked_time) {
        records.push({
          data_id: r.data.id,
          unlocked_time: new Date(r.unlocked_time),
          type: r.data.type,
          title: r.data.title,
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
          title: `${r.data.company.name} ${r.data.job_title.name} 的薪資工時`,
          url: `/companies/${r.data.company.name}/salary-work-times`,
        });
      }
    });
    records.sort((a, b) => b.unlocked_time - a.unlocked_time);
    return records;
  }, [myUnlockedContents]);

  const currentPageRecords = useMemo(() => {
    return transformedRecords.slice(
      (page - 1) * DATA_NUM_PER_PAGE,
      page * DATA_NUM_PER_PAGE,
    );
  }, [transformedRecords, page]);

  return (
    <div>
      <div>我解鎖的資料</div>
      <Table data={currentPageRecords} primaryKey="data_id">
        <Table.Column title="解鎖時間" dataField={renderUnlockTime}>
          解鎖時間
        </Table.Column>
        <Table.Column title="解鎖內容" dataField={renderUnlockData}>
          解鎖內容
        </Table.Column>
      </Table>
      <Pagination
        totalCount={transformedRecords ? transformedRecords.length : 0}
        unit={DATA_NUM_PER_PAGE}
        currentPage={page}
        createPageLinkTo={getPageLink}
      />
    </div>
  );
};

export default MyUnlockedContentsPage;
