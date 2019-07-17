import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';

import Pagination from 'common/Pagination';
import Loader from 'common/Loader';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import InterviewExperiencesSection from './InterviewExperiences';
import {
  isFetched,
  isFetching,
  isError,
  isUnfetched,
} from '../../../constants/status';
import EmptyView from '../EmptyView';

const pageSize = 10;

const shouldEmptyView = ({ interviewExperiences, status }) =>
  isError(status) ||
  (isFetched(status) &&
    (isNil(interviewExperiences) || interviewExperiences.length === 0));

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  interviewExperiences,
  status,
  page,
}) => {
  if (isFetching(status) || isUnfetched(status)) {
    return (
      <CompanyAndJobTitleWrapper
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
      >
        <Loader size="s" />
      </CompanyAndJobTitleWrapper>
    );
  }
  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
    >
      {shouldEmptyView({ interviewExperiences, status }) ? (
        <EmptyView pageName={pageName} tabType={tabType} />
      ) : (
        <React.Fragment>
          <InterviewExperiencesSection
            pageType={pageType}
            pageName={pageName}
            tabType={tabType}
            data={
              interviewExperiences &&
              interviewExperiences.slice((page - 1) * pageSize, page * pageSize)
            }
            status={status}
          />
          <Pagination
            totalCount={interviewExperiences.length}
            unit={pageSize}
            currentPage={page}
            createPageLinkTo={page => `?p=${page}`}
          />
        </React.Fragment>
      )}
    </CompanyAndJobTitleWrapper>
  );
};

InterviewExperiences.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default InterviewExperiences;
