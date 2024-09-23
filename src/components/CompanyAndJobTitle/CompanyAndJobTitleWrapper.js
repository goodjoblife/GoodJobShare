import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toPairs, compose, map } from 'ramda';

import Heading from 'common/base/Heading';
import FanPageBlock from 'common/FanPageBlock';
import BreadCrumb from 'common/BreadCrumb';

import { queryRatingStatistcs } from 'actions/company';
import { companyRatingStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { tabTypeTranslation, generateTabURL } from 'constants/companyJobTitle';
import { isFetched } from 'utils/fetchBox';
import { generateBreadCrumbData } from './utils';

import TabLinkGroup from 'common/TabLinkGroup';
import styles from './CompanyAndJobTitleWrapper.module.css';
import Glike from 'common/icons/Glike';

const AverageRating = ({ pageName }) => {
  const ratingStatistcsBox = useSelector(
    companyRatingStatisticsBoxSelectorByName(pageName),
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(queryRatingStatistcs(pageName));
  }, [dispatch, pageName]);

  if (!isFetched(ratingStatistcsBox)) {
    return null;
  }

  const data = ratingStatistcsBox.data;
  if (!data) {
    return null;
  }

  const { averageRating, ratingCount } = data;
  return (
    <>
      <span className={styles.averageRating}>{averageRating}</span>
      <Glike className={styles.icon} />
      <span className={styles.ratingCount}>({ratingCount})</span>
    </>
  );
};

AverageRating.propTypes = {
  pageName: PropTypes.string.isRequired,
};

const CompanyAndJobTitleWrapper = ({
  children,
  pageType,
  pageName,
  tabType,
}) => {
  const tabLinkOptions = useMemo(
    () =>
      compose(
        map(([type, label]) => ({
          label,
          to: generateTabURL({
            pageType,
            pageName,
            tabType: type,
          }),
        })),
        toPairs,
      )(tabTypeTranslation),
    [pageType, pageName],
  );

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <BreadCrumb
          data={generateBreadCrumbData({ pageType, pageName, tabType })}
        />
      </div>
      <Heading
        className={styles.heading}
        style={{ color: '#000000', marginBottom: '30px' }}
      >
        {pageName}
        <AverageRating pageName={pageName} />
      </Heading>
      <TabLinkGroup
        options={tabLinkOptions}
        style={{
          marginBottom: '24px',
        }}
      />
      {children}
      <FanPageBlock className={styles.fanPageBlock} />
    </div>
  );
};

CompanyAndJobTitleWrapper.propTypes = {
  children: PropTypes.node,
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
};

export default CompanyAndJobTitleWrapper;
