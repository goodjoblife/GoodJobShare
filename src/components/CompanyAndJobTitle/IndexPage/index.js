import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import qs from 'qs';
import Pagination from 'common/Pagination';
import Loader from 'common/Loader';
import WorkingHourBlock from '../../TimeAndSalary/SearchScreen/WorkingHourBlock';
import {
  pageTypeTranslation,
  generatePageURL,
  generateIndexURL,
} from 'constants/companyJobTitle';
import styles from './CompanyAndJobTitleIndex.module.css';
import { isFetched } from 'constants/status';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { SITE_NAME } from 'constants/helmetData';
import usePagination from './usePagination';

const PAGE_SIZE = 10;

const IndexHelmet = ({ pageType, page }) => {
  const title = `所有${pageTypeTranslation[pageType]}資料 - 第${page}頁`;

  const path = generateIndexURL({ pageType });
  const search = qs.stringify(page > 1 ? { p: page } : null, {
    addQueryPrefix: true,
  });
  const canonicalURL = `${formatCanonicalPath(path)}${search}`;

  return (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        {title}
      </title>
      <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
      <meta property="og:url" content={canonicalURL} />
      <link rel="canonical" href={canonicalURL} />
    </Helmet>
  );
};

const CompanyAndJobTitleIndex = ({
  pageType,
  status,
  pageNames,
  totalCount,
}) => {
  const [page, getPageLink] = usePagination();

  if (!isFetched(status)) {
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
          {pageNames.map((pageIndex, i) => (
            <WorkingHourBlock
              key={i}
              pageType={pageType}
              name={pageIndex.name}
              dataCount={pageIndex.dataCount}
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

CompanyAndJobTitleIndex.propTypes = {
  pageType: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  // TODO
  pageNames: PropTypes.arrayOf(PropTypes.string),
};

export default CompanyAndJobTitleIndex;
