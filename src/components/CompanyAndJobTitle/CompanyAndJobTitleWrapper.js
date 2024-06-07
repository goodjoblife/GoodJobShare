import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toPairs, compose, map, ifElse, always } from 'ramda';

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
  status as statusSelectorFromBox,
  name as nameSelectorFromBox,
  company as companyBoxSelectorByPageName,
  jobTitle as jobTitleBoxSelectorByPageName,
  companyOverviewBoxSelectorByName,
  jobTitleOverviewBoxSelectorByName,
} from 'selectors/companyAndJobTitle';

import TabLinkGroup from 'common/TabLinkGroup';
import styles from './CompanyAndJobTitleWrapper.module.css';
import { isFetched } from 'constants/status';

const useBoxSelector = ({ pageType, pageName, tabType }) => {
  return useMemo(() => {
    switch (pageType) {
      case PAGE_TYPE.COMPANY:
        if (tabType === TAB_TYPE.OVERVIEW) {
          return companyOverviewBoxSelectorByName(pageName);
        }
        return companyBoxSelectorByPageName(pageName);

      case PAGE_TYPE.JOB_TITLE:
        if (tabType === TAB_TYPE.OVERVIEW) {
          return jobTitleOverviewBoxSelectorByName(pageName);
        }
        return jobTitleBoxSelectorByPageName(pageName);

      default:
        return null;
    }
  }, [pageType, pageName, tabType]);
};

const useNameSelector = ({ boxSelector }) => {
  return useMemo(
    () =>
      compose(
        ifElse(
          compose(
            isFetched,
            statusSelectorFromBox,
          ),
          nameSelectorFromBox,
          always(null),
        ),
        boxSelector,
      ),
    [boxSelector],
  );
};

const useRedirectPath = ({ pageType, pageName, tabType }) => {
  const boxSelector = useBoxSelector({ pageType, pageName, tabType });
  const nameSelector = useNameSelector({ boxSelector });
  const name = useSelector(nameSelector);
  if (!name) return null;

  // No need to redirect if the name is the same as the pageName
  if (name === pageName) return null;

  // Redirect to the canonical path
  return generateTabURL({ pageType, pageName: name, tabType });
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

  const redirectPath = useRedirectPath({ pageType, pageName, tabType });
  if (redirectPath) {
    return <Redirect to={redirectPath} />;
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
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
};
export default CompanyAndJobTitleWrapper;
