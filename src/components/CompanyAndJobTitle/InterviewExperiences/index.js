import React, { useState, useCallback, useEffect } from 'react';
import Pagination from 'common/Pagination';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import InterviewExperiencesSection from './InterviewExperiences';
import STATUS, { isFetched } from '../../../constants/status';

const PAGE_COUNT = 10;

const mockData = [
  {
    _id: '5d0bb62e1ae15200125e19fb',
    archive: { is_archived: false, reason: '' },
    company: { name: 'ABC' },
    created_at: '2019-06-20T16:37:02.314Z',
    job_title: 'EEE',
    like_count: 0,
    preview: '第一次面試：\n第二次面試：\n工作環境：aaaaaaaaaaaaa',
    region: '基隆市',
    reply_count: 0,
    report_count: 0,
    salary: {
      amount: 24000,
      type: 'month',
    },
    status: 'published',
    title: 'ABC 面試經驗分享',
    type: 'interview',
  },
  {
    _id: '5d0916631ae15200125e19fa',
    archive: { is_archived: false, reason: '' },
    company: { name: 'ABC' },
    created_at: '2019-06-18T16:50:43.115Z',
    job_title: 'ABC',
    like_count: 0,
    preview: '第一次面試：aaaaaaaaaaaaa\n第二次面試：\n工作環境：',
    region: '新竹縣',
    reply_count: 0,
    report_count: 0,
    status: 'published',
    title: 'abc 面試經驗分享',
    type: 'interview',
  },
];

const InterviewExperiences = ({
  pageType,
  pageName, // eslint-disable-line no-unused-vars
  tabName, // eslint-disable-line no-unused-vars
}) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(STATUS.UNFETCHED);
  const [page] = useState(1);
  const fetchData = useCallback(() => {
    setStatus(STATUS.FETCHING);
    setTimeout(() => {
      setData(mockData);
      setStatus(STATUS.FETCHED);
    }, 1000);
  }, []);
  useEffect(
    () => {
      fetchData();
    },
    [fetchData],
  );
  return (
    <CompanyAndJobTitleWrapper>
      <InterviewExperiencesSection
        pageType={pageType}
        data={data}
        status={status}
      />
      {isFetched(status) && (
        <Pagination
          totalCount={data.length}
          unit={PAGE_COUNT}
          currentPage={page}
          createPageLinkTo={page => `?p=${page}`}
        />
      )}
    </CompanyAndJobTitleWrapper>
  );
};

export default props => <InterviewExperiences {...props} />;
