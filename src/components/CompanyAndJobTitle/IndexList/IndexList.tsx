import React, { Fragment } from 'react';

import { CompanyInIndex } from 'apis/queryCompanies';
import { JobTitleInIndex } from 'apis/queryJobTitles';
import Loader from 'common/Loader';
import Pagination from 'common/Pagination';
import {
  generatePageURL,
  PAGE_SIZE,
  PageType,
  pageTypeTranslation,
} from 'constants/companyJobTitle';
import FetchBox, { isFetched } from 'utils/fetchBox';

import CompanyJobTitleBlock from '../CompanyJobTitleBlock';
import IndexHelmet from './IndexHelmet';
import styles from './IndexList.module.css';

// Company index items carry businessNumber / dataCount, job title items do not.
type PageIndex = CompanyInIndex | JobTitleInIndex;

const businessNumberOf = (pageIndex: PageIndex): string | null =>
  'businessNumber' in pageIndex ? pageIndex.businessNumber : null;

const dataCountOf = (pageIndex: PageIndex): number | undefined =>
  'dataCount' in pageIndex ? pageIndex.dataCount : undefined;

type IndexListProps = {
  pageType: PageType;
  totalCount: number;
  indexesBox: FetchBox<PageIndex[]>;
  // pagination usage
  page: number;
  getPageLink: (p: number) => string;
};

const IndexList: React.FC<IndexListProps> = ({
  pageType,
  totalCount,
  indexesBox,
  page,
  getPageLink,
}) => {
  if (!isFetched(indexesBox)) {
    return <Loader />;
  }

  return (
    <Fragment>
      <IndexHelmet pageType={pageType} page={page} />
      <div className={styles.container}>
        <div className={styles.title}>
          所有{pageTypeTranslation[pageType]}資料 - 第 {page} 頁
        </div>
        <div className={styles.index}>
          {indexesBox.data.map((pageIndex, i) => (
            <CompanyJobTitleBlock
              key={i}
              pageType={pageType}
              name={pageIndex.name}
              businessNumber={businessNumberOf(pageIndex)}
              dataCount={dataCountOf(pageIndex)}
              to={generatePageURL({ pageType, pageName: pageIndex.name })}
            />
          ))}
        </div>
        <Pagination
          totalCount={totalCount}
          unit={PAGE_SIZE}
          currentPage={page}
          createPageLinkTo={getPageLink}
        />
      </div>
    </Fragment>
  );
};

export default IndexList;
