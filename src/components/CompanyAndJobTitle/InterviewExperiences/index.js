import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import Pagination from 'common/Pagination';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import InterviewExperiencesSection from './InterviewExperiences';
import { isFetched } from '../../../constants/status';
import * as companyAndJobTitleActions from '../../../actions/companyAndJobTitle';
import companyAndJobTitleSelectors from '../../../selectors/companyAndJobTitle';
import { pageType as PAGE_TYPE } from '../../../constants/companyJobTitle';
import withRouteParameter from '../../ExperienceSearch/withRouteParameter';

const pageSize = 10;

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  interviewExperiences,
  status,
  page,
  fetchCompany,
  fetchJobTitle,
}) => {
  useEffect(() => {
    switch (pageType) {
      case PAGE_TYPE.COMPANY:
        fetchCompany(pageName);
        break;
      case PAGE_TYPE.JOB_TITLE:
        fetchJobTitle(pageName);
        break;
      default:
        console.error(`Unrecognized pageType '${pageType}'`);
    }
  }, [fetchCompany, fetchJobTitle, page, pageName, pageType]);

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
    >
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
      {isFetched(status) && (
        <Pagination
          totalCount={interviewExperiences.length}
          unit={pageSize}
          currentPage={page}
          createPageLinkTo={page => `?p=${page}`}
        />
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
  fetchCompany: PropTypes.func.isRequired,
  fetchJobTitle: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector(companyAndJobTitleSelectors);

const mapDispatchToProps = dispatch =>
  bindActionCreators(companyAndJobTitleActions, dispatch);

const enhance = compose(
  withRouteParameter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(InterviewExperiences);
