import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Heading from 'common/base/Heading';

import { formatTitle } from 'utils/helmetHelper';
import { SITE_NAME } from '../../constants/helmetData';
import { tabTypeTranslation } from '../../constants/companyJobTitle';

import BreadCrumb from './BreadCrumb';

const CompanyAndJobTitleWrapper = ({
  children,
  pageType,
  pageName,
  tabType,
}) => {
  const helmetTitle = `${pageName} ${tabTypeTranslation[tabType]}`;
  return (
    <div>
      <Helmet>
        <title itemProp="name" lang="zh-TW">
          {helmetTitle}
        </title>
        <meta
          property="og:title"
          content={formatTitle(helmetTitle, SITE_NAME)}
        />
      </Helmet>
      <BreadCrumb
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        style={{ marginBottom: '20px' }}
      />
      <Heading style={{ color: '#000000' }}>{pageName}</Heading>
    </div>
  );
};

CompanyAndJobTitleWrapper.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
};
export default CompanyAndJobTitleWrapper;
