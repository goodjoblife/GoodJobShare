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
import companyAndJobTitleActions from '../../../actions/companyAndJobTitle';
import companyAndJobTitleSelectors from '../../../selectors/companyAndJobTitle';
import withRouteParameter from '../../ExperienceSearch/withRouteParameter';

const pageSize = 10;

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  interviewExperiences,
  status,
  page,
  fetchPageData,
}) => {
  useEffect(() => {
    fetchPageData(pageType, pageName);
  }, [fetchPageData, page, pageName, pageType]);

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
  fetchPageData: PropTypes.func.isRequired,
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
