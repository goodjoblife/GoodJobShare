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
import * as experienceSearchActions from '../../../actions/experienceSearch';
import { loadingStatusSelector } from '../../../selectors/experienceSearchSelector';
import withRouteParameter from '../../ExperienceSearch/withRouteParameter';

const PAGE_COUNT = 10;

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  experienceSearch,
  loadingStatus,
  page,
  sort,
  searchBy,
  searchType,
  fetchExperiences,
  getNewSearchBy,
}) => {
  useEffect(() => {
    fetchExperiences(
      page,
      PAGE_COUNT,
      sort,
      searchBy,
      pageName, // searchQuery
      searchType,
    );
  }, [fetchExperiences, page, pageName, searchBy, searchType, sort]);
  useEffect(() => {
    getNewSearchBy(searchBy);
  }, [getNewSearchBy, searchBy]);

  const data = experienceSearch.toJS();
  const { experiences = [], experienceCount } = data;

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
        data={experiences}
        status={loadingStatus}
      />
      {isFetched(loadingStatus) && (
        <Pagination
          totalCount={experienceCount}
          unit={PAGE_COUNT}
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
};

const mapStateToProps = createStructuredSelector({
  experienceSearch: state => state.experienceSearch,
  loadingStatus: loadingStatusSelector,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(experienceSearchActions, dispatch);

const enhance = compose(
  withRouteParameter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(InterviewExperiences);
