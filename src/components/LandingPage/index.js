import cn from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  queryPopularExperiences,
  queryPopularExperiencesIfUnfetched,
} from 'actions/experience';
import { queryMenuIfUnfetched } from 'actions/laborRights';
import { queryPopularCompanyAverageSalary } from 'actions/popularCompanyAverageSalary';
import { queryPopularJobTitleSalaryDistribution } from 'actions/popularJobTitleSalaryDistribution';
import { Heading, Section, Wrapper } from 'common/base';
import Columns from 'common/Columns';
import Loader from 'common/Loader';
import SearchBar from 'common/SearchBar';
import StaticHelmet from 'common/StaticHelmet';
import { BoxesRenderer } from 'common/StatusRenderer';
import { popularExperiencesBoxSelector } from 'selectors/experienceSelector';
import { menuBoxSelector } from 'selectors/laborRightsSelector';
import { popularCompanyAverageSalaryBoxSelector } from 'selectors/popularCompanyAverageSalary';
import { popularJobTitleSalaryDistributionBoxSelector } from 'selectors/popularJobTitleSalaryDistribution';
import { isFetched, isFetching, isUnfetched } from 'utils/fetchBox';

import Banner from './Banner';
import CallToActionBlock from './CallToActionBlock';
import ExperienceBlock from './ExperienceBlock';
import SummarySection from './SummarySection';
import LaborRightsEntry from '../LaborRightsMenu/LaborRightsEntry';

const entryToProps = ({ id, title, coverUrl }) => ({
  link: `/labor-rights/${id}`,
  coverUrl,
  title,
});

const LandingPage = () => {
  const dispatch = useDispatch();

  const popularExperiencesBox = useSelector(popularExperiencesBoxSelector);
  const popularExperiences = popularExperiencesBox.data || [];
  useEffect(() => {
    dispatch(queryPopularExperiencesIfUnfetched());
  }, [dispatch]);

  const popularCompanyAverageSalaryBox = useSelector(
    popularCompanyAverageSalaryBoxSelector,
  );
  useEffect(() => {
    if (isUnfetched(popularCompanyAverageSalaryBox)) {
      dispatch(queryPopularCompanyAverageSalary());
    }
  }, [dispatch, popularCompanyAverageSalaryBox]);

  const popularJobTitleSalaryDistributionBox = useSelector(
    popularJobTitleSalaryDistributionBoxSelector,
  );
  useEffect(() => {
    if (isUnfetched(popularJobTitleSalaryDistributionBox)) {
      dispatch(queryPopularJobTitleSalaryDistribution());
    }
  }, [dispatch, popularJobTitleSalaryDistributionBox]);

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
          <BoxesRenderer
            boxes={[
              popularCompanyAverageSalaryBox,
              popularJobTitleSalaryDistributionBox,
            ]}
            render={([companyData, jobTitleData]) => (
              <SummarySection
                popularCompanyAverageSalary={companyData}
                popularJobTitleSalaryDistribution={jobTitleData}
              />
            )}
          />
        </Wrapper>
      </Section>
      <Section padding>
        <Wrapper size="l">
          <Heading size="l" center marginBottom>
            最新面試、評價
          </Heading>
          <Columns
            Item={ExperienceBlock}
            items={popularExperiences.map(data => ({ data, size: 'm' }))}
            gutter="s"
          />
          <Section center Tag="div">
            <SearchBar />
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

LandingPage.fetchData = ({ store: { dispatch } }) => {
  return Promise.all([
    dispatch(queryPopularExperiences()),
    dispatch(queryMenuIfUnfetched()),
  ]);
};

export default LandingPage;
