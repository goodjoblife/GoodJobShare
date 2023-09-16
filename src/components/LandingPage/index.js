import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import cn from 'classnames';
import { compose, setStatic, lifecycle } from 'recompose';
import { Section, Wrapper, Heading } from 'common/base';
import Columns from 'common/Columns';
import Loader from 'common/Loader';
import ExperienceBlock from '../ExperienceSearch/ExperienceBlock';
import { queryPopularExperiences } from 'actions/popularExperiences';
import { queryMenu, queryMenuIfUnfetched } from 'actions/laborRights';
import LaborRightsEntry from '../LaborRightsMenu/LaborRightsEntry';
import Banner from './Banner';
import StaticHelmet from 'common/StaticHelmet';
import CallToActionBlock from './CallToActionBlock';
import SummarySection from './SummarySection';
import { isUnfetched } from '../../constants/status';
import { menuStateSelector } from 'selectors/laborRightsSelector';
import { isFetching, isFetched } from 'utils/fetchBox';

const ssr = setStatic('fetchData', ({ store: { dispatch } }) => {
  return Promise.all([
    dispatch(queryPopularExperiences()),
    dispatch(queryMenu()),
  ]);
});

const queryData = lifecycle({
  componentDidMount() {
    if (isUnfetched(this.props.popularCompanyAverageSalaryStatus)) {
      this.props.queryPopularCompanyAverageSalary();
    }
    if (isUnfetched(this.props.popularJobTitleSalaryDistributionStatus)) {
      this.props.queryPopularJobTitleSalaryDistribution();
    }
    if (this.props.popularExperiences.size === 0) {
      this.props.queryPopularExperiences();
    }
  },
});

const entryToProps = ({ id, title, coverUrl }) => ({
  link: `/labor-rights/${id}`,
  coverUrl,
  title,
});

const LandingPage = ({
  popularCompanyAverageSalary,
  popularJobTitleSalaryDistribution,
  popularExperiences: popularExperiencesRaw,
}) => {
  const popularExperiences = popularExperiencesRaw.toJS() || [];

  // 勞工法令懶人包
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(queryMenuIfUnfetched());
  }, [dispatch]);
  const menuState = useSelector(menuStateSelector);

  return (
    <main>
      <StaticHelmet.LandingPage />
      <Banner />
      <Section padding>
        <Wrapper size="l">
          <SummarySection
            popularCompanyAverageSalary={popularCompanyAverageSalary}
            popularJobTitleSalaryDistribution={
              popularJobTitleSalaryDistribution
            }
          />
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
          {isFetching(menuState) && <Loader />}
          {isFetched(menuState) && (
            <Columns
              gutter="s"
              Item={LaborRightsEntry}
              items={menuState.data.slice(-3).map(entryToProps)}
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

LandingPage.propTypes = {
  popularCompanyAverageSalary: PropTypes.array.isRequired,
  popularJobTitleSalaryDistribution: PropTypes.array.isRequired,
  popularExperiences: ImmutablePropTypes.list.isRequired,
  timeAndSalaryCount: PropTypes.number.isRequired,
};

const hoc = compose(
  ssr,
  queryData,
);

export default hoc(LandingPage);
