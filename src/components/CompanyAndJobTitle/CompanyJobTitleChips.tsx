// [職稱合併 mockup] 公司頁的熱門職稱篩選 chip
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { queryCompanyTopNJobTitles } from 'actions/company';
import { Wrapper } from 'common/base';
import { canonicalizeJobTitles } from 'constants/jobTitleMergeMockup';
import { RootState } from 'reducers';
import { companyTopNJobTitlesBoxSelectorByName } from 'selectors/companyAndJobTitle';

import styles from './CompanyJobTitleChips.module.css';
import JobTitleChips from './JobTitleChips';
import { useCompanyName } from './PageContextProvider';
import { useSearchTextFromQuery } from './SearchBar';

type Props = {
  size?: 'l' | 'm';
};

const CompanyJobTitleChips: React.FC<Props> = ({ size = 'm' }) => {
  const companyName = useCompanyName();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useSearchTextFromQuery() as [
    string,
    (next: string) => void,
  ];

  useEffect(() => {
    dispatch(queryCompanyTopNJobTitles({ companyName }));
  }, [dispatch, companyName]);

  const topNJobTitles = useSelector(
    (state: RootState) =>
      companyTopNJobTitlesBoxSelectorByName(companyName)(state).data,
  );

  const items = useMemo(
    () =>
      canonicalizeJobTitles(
        (topNJobTitles ? topNJobTitles.all : []).map(({ name }) => name),
      ).map(name => ({ name })),
    [topNJobTitles],
  );

  if (items.length === 0) return null;

  return (
    <Wrapper size={size} className={styles.container}>
      <JobTitleChips
        label="熱門職稱："
        moreTitle={`${companyName}的職稱`}
        items={[{ name: '全部' }, ...items]}
        previewCount={6}
        activeName={searchText || '全部'}
        onSelect={(name): void => setSearchText(name === '全部' ? '' : name)}
      />
    </Wrapper>
  );
};

export default CompanyJobTitleChips;
