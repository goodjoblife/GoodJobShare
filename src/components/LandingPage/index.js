import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { compose, setStatic, lifecycle } from 'recompose';
import { Section, Wrapper, Heading } from 'common/base';
import Columns from 'common/Columns';
import ExperienceBlock from '../ExperienceSearch/ExperienceBlock';
import {
  queryPopularExperiences,
  queryPopularExperiencesIfUnfetched,
} from 'actions/experience';
import { queryPopularCompanyAverageSalary } from 'actions/popularCompanyAverageSalary';
import { queryPopularJobTitleSalaryDistribution } from 'actions/popularJobTitleSalaryDistribution';
import { queryMenu } from 'actions/laborRights';
import LaborRightsEntry from '../LaborRightsMenu/LaborRightsEntry';
import Banner from './Banner';
import StaticHelmet from 'common/StaticHelmet';
import CallToActionBlock from './CallToActionBlock';
import SummarySection from './SummarySection';
import { isFetched, isUnfetched } from 'utils/fetchBox';
import { popularExperiencesStateSelector } from 'selectors/experienceSelector';
import { popularCompanyAverageSalaryStateSelector } from 'selectors/popularCompanyAverageSalary';
import { popularJobTitleSalaryDistributionStateSelector } from 'selectors/popularJobTitleSalaryDistribution';

const ssr = setStatic('fetchData', ({ store: { dispatch } }) => {
  return Promise.all([
    dispatch(queryPopularExperiences()),
    dispatch(queryMenu()),
  ]);
});

const queryData = lifecycle({
  componentDidMount() {
    this.props.queryMenuIfUnfetched();
  },
});

const LandingPage = ({ laborRightsMenuEntries }) => {
  const dispatch = useDispatch();

  const popularExperiencesState = useSelector(popularExperiencesStateSelector);
  const popularExperiences = popularExperiencesState.data || [];
  useEffect(() => {
    dispatch(queryPopularExperiencesIfUnfetched());
  }, [dispatch]);

  const popularCompanyAverageSalaryState = useSelector(
    popularCompanyAverageSalaryStateSelector,
  );
  useEffect(() => {
    if (isUnfetched(popularCompanyAverageSalaryState)) {
      dispatch(queryPopularCompanyAverageSalary());
    }
  }, [dispatch, popularCompanyAverageSalaryState]);

  const popularJobTitleSalaryDistributionState = useSelector(
    popularJobTitleSalaryDistributionStateSelector,
  );
  useEffect(() => {
    if (isUnfetched(popularJobTitleSalaryDistributionState)) {
      dispatch(queryPopularJobTitleSalaryDistribution());
    }
  }, [dispatch, popularJobTitleSalaryDistributionState]);

  const items = laborRightsMenuEntries.map(({ id, title, coverUrl }) => ({
    link: `/labor-rights/${id}`,
    coverUrl,
    title,
  }));
  return (
    <main>
      <StaticHelmet.LandingPage />
      <Banner />
      <Section padding>
        <Wrapper size="l">
          {isFetched(popularCompanyAverageSalaryState) &&
            isFetched(popularJobTitleSalaryDistributionState) && (
              <SummarySection
                popularCompanyAverageSalary={
                  popularCompanyAverageSalaryState.data
                }
                popularJobTitleSalaryDistribution={
                  popularJobTitleSalaryDistributionState.data
                }
              />
            )}
        </Wrapper>
      </Section>
      <Section padding>
        <Wrapper size="l">
          <Heading size="l" center marginBottom>
            最新面試、工作心得
          </Heading>
          <Columns
            Item={ExperienceBlock}
            items={popularExperiences.map(data => ({ data, size: 'm' }))}
            gutter="s"
          />
          <Section center Tag="div">
            <Link
              className={cn('buttonCircleL', 'buttonBlack')}
              to="/experiences/search"
              title="面試工作經驗"
            >
              看更多
            </Link>
          </Section>
        </Wrapper>
      </Section>
      <Section padding bg="white">
        <Wrapper size="l">
          <Heading size="l" center marginBottom>
            勞工法令懶人包
          </Heading>
          <Columns gutter="s" Item={LaborRightsEntry} items={items} />
        </Wrapper>
        <Section center Tag="div">
          <Link
            className={cn('buttonCircleL', 'buttonBlack')}
            to="/labor-rights"
            title="勞工法令懶人包"
          >
            看更多
          </Link>
        </Section>
      </Section>

      <Section padding>
        <Wrapper size="l">
          <CallToActionBlock />
        </Wrapper>
      </Section>
    </main>
  );
};

LandingPage.propTypes = {
  laborRightsMenuEntries: PropTypes.array.isRequired,
  laborRightsCount: PropTypes.number.isRequired,
  timeAndSalaryCount: PropTypes.number.isRequired,
};

const hoc = compose(
  ssr,
  queryData,
);

export default hoc(LandingPage);
