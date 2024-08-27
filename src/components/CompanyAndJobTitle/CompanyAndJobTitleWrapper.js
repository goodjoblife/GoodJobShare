import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toPairs, compose, map } from 'ramda';

import Heading from 'common/base/Heading';
import FanPageBlock from 'common/FanPageBlock';
import BreadCrumb from 'common/BreadCrumb';
import Redirect from 'common/routing/Redirect';

import {
  tabTypeTranslation,
  generateTabURL,
  pageType as PAGE_TYPE,
  tabType as TAB_TYPE,
} from 'constants/companyJobTitle';
import { generateBreadCrumbData } from './utils';

import {
  companyOverviewBoxSelectorByName,
  companyTimeAndSalaryBoxSelectorByName,
  companyInterviewExperiencesBoxSelectorByName,
  companyWorkExperiencesBoxSelectorByName,
  jobTitleOverviewBoxSelectorByName,
  jobTitleTimeAndSalaryBoxSelectorByName,
  jobTitleInterviewExperiencesBoxSelectorByName,
  jobTitleWorkExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';

import TabLinkGroup from 'common/TabLinkGroup';
import styles from './CompanyAndJobTitleWrapper.module.css';
import { isFetched } from 'utils/fetchBox';

const selectorMapping = {
  [PAGE_TYPE.COMPANY]: {
    [TAB_TYPE.OVERVIEW]: companyOverviewBoxSelectorByName,
    [TAB_TYPE.TIME_AND_SALARY]: companyTimeAndSalaryBoxSelectorByName,
    [TAB_TYPE.INTERVIEW_EXPERIENCE]: companyInterviewExperiencesBoxSelectorByName,
    [TAB_TYPE.WORK_EXPERIENCE]: companyWorkExperiencesBoxSelectorByName,
  },
  [PAGE_TYPE.JOB_TITLE]: {
    [TAB_TYPE.OVERVIEW]: jobTitleOverviewBoxSelectorByName,
    [TAB_TYPE.TIME_AND_SALARY]: jobTitleTimeAndSalaryBoxSelectorByName,
    [TAB_TYPE.INTERVIEW_EXPERIENCE]: jobTitleInterviewExperiencesBoxSelectorByName,
    [TAB_TYPE.WORK_EXPERIENCE]: jobTitleWorkExperiencesBoxSelectorByName,
  },
};

const useBox = ({ pageType, pageName, tabType }) => {
  const boxSelector = useMemo(
    () => selectorMapping[pageType][tabType](pageName),
    [pageType, pageName, tabType],
  );
  const box = useSelector(boxSelector);
  return box;
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

  const box = useBox({ pageType, pageName, tabType });
  if (isFetched(box)) {
    // all the box should have data in form of
    // 1. null --> means no such company or jobTitle
    // 2. { name }
    if (box.data !== null && box.data.name !== pageName) {
      const path = generateTabURL({
        pageType,
        pageName: box.data.name,
        tabType,
      });
      return <Redirect to={path} />;
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <BreadCrumb
          data={generateBreadCrumbData({ pageType, pageName, tabType })}
        />
      </div>
      <Heading style={{ color: '#000000', marginBottom: '30px' }}>
        {pageName}
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
