import React, { useEffect } from 'react';
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

const mapStateToProps = createStructuredSelector({
  experienceSearch: state => state.experienceSearch,
  loadingStatus: loadingStatusSelector,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(experienceSearchActions, dispatch);

const InterviewExperiences = compose(
  withRouteParameter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(
  ({
    pageType,
    pageName,
    tabName, // eslint-disable-line no-unused-vars
    experienceSearch,
    loadingStatus,
    page,
    sort,
    searchBy,
    searchType,
    fetchExperiences,
    getNewSearchBy,
  }) => {
    useEffect(
      () => {
        fetchExperiences(
          page,
          PAGE_COUNT,
          sort,
          searchBy,
          pageName, // searchQuery
          searchType,
        );
      },
      [fetchExperiences, page, pageName, searchBy, searchType, sort],
    );
    useEffect(
      () => {
        getNewSearchBy(searchBy);
      },
      [getNewSearchBy, searchBy],
    );

    const data = experienceSearch.toJS();
    const { experiences = [], experienceCount } = data;

    return (
      <CompanyAndJobTitleWrapper>
        <InterviewExperiencesSection
          pageType={pageType}
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
  },
);

export default props => <InterviewExperiences {...props} />;
