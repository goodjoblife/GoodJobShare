import React, { useEffect, useMemo } from 'react';
import R from 'ramda';
import usePagination from 'hooks/usePagination';
import { useFetchMyUnlockedContents } from './useQuery';

const DATA_NUM_PER_PAGE = 20;

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
          url: `/companies/${r.data.company.name}/salary_work_times`,
        });
      }
    });
    records.sort((a, b) => b.unlocked_time - a.unlocked_time);
    return records;
  }, [myUnlockedContents]);

  // eslint-disable-next-line
  const currentPageRecords = useMemo(() => {
    return transformedRecords.slice(
      (page - 1) * DATA_NUM_PER_PAGE,
      page * DATA_NUM_PER_PAGE,
    );
  }, [transformedRecords, page]);

  return (
    <div>
      <div>我解鎖的資料</div>
    </div>
  );
};

export default MyUnlockedContentsPage;
