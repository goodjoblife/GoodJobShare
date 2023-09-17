import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { compose, setStatic } from 'recompose';
import { Section, Wrapper, Heading } from 'common/base';
import Columns from 'common/Columns';
import Loader from 'common/Loader';
import ExperienceBlock from '../ExperienceSearch/ExperienceBlock';
import {
  queryPopularExperiences,
  queryPopularExperiencesIfUnfetched,
} from 'actions/experience';
import { queryPopularCompanyAverageSalary } from 'actions/popularCompanyAverageSalary';
import { queryPopularJobTitleSalaryDistribution } from 'actions/popularJobTitleSalaryDistribution';
import { queryMenu, queryMenuIfUnfetched } from 'actions/laborRights';
import LaborRightsEntry from '../LaborRightsMenu/LaborRightsEntry';
import Banner from './Banner';
import StaticHelmet from 'common/StaticHelmet';
import CallToActionBlock from './CallToActionBlock';
import SummarySection from './SummarySection';
import { isFetching, isFetched, isUnfetched } from 'utils/fetchBox';
import { popularExperiencesStateSelector } from 'selectors/experienceSelector';
import { popularCompanyAverageSalaryStateSelector } from 'selectors/popularCompanyAverageSalary';
import { popularJobTitleSalaryDistributionStateSelector } from 'selectors/popularJobTitleSalaryDistribution';
import { menuBoxSelector } from 'selectors/laborRightsSelector';

const ssr = setStatic('fetchData', ({ store: { dispatch } }) => {
  return Promise.all([
    dispatch(queryPopularExperiences()),
    dispatch(queryMenu()),
  ]);
});

const entryToProps = ({ id, title, coverUrl }) => ({
  link: `/labor-rights/${id}`,
  coverUrl,
  title,
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

  // 勞工法令懶人包
  useEffect(() => {
    dispatch(queryMenuIfUnfetched());
  }, [dispatch]);
  const menuBox = useSelector(menuBoxSelector);

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
          {isFetching(menuBox) && <Loader />}
          {isFetched(menuBox) && (
            <Columns
              gutter="s"
              Item={LaborRightsEntry}
              items={menuBox.data.slice(-3).map(entryToProps)}
            />
          )}
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

const hoc = compose(ssr);

export default hoc(LandingPage);
