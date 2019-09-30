import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import cn from 'classnames';
import { compose, setStatic, lifecycle } from 'recompose';
import { Section, Wrapper, Heading } from 'common/base';
import ShareExpSection from 'common/ShareExpSection';
import Columns from 'common/Columns';
import FanPageBlock from 'common/FanPageBlock';
import ExperienceBlock from '../ExperienceSearch/ExperienceBlock';
import { queryPopularExperiences } from '../../actions/popularExperiences';
import { queryMenu } from '../../actions/laborRights';
import LaborRightsEntry from '../LaborRightsMenu/LaborRightsEntry';
import Banner from './Banner';
import StaticHelmet from 'common/StaticHelmet';

const ssr = setStatic('fetchData', ({ store: { dispatch } }) => {
  return Promise.all([
    dispatch(queryPopularExperiences()),
    dispatch(queryMenu()),
  ]);
});

const queryData = lifecycle({
  componentDidMount() {
    if (this.props.popularExperiences.size === 0) {
      this.props.queryPopularExperiences();
    }
    this.props.queryMenuIfUnfetched();
    this.props.queryTimeAndSalaryCount();
  },
});

const LandingPage = ({
  popularExperiences: popularExperiencesRaw,
  laborRightsMenuEntries,
  timeAndSalaryCount,
  laborRightsCount,
}) => {
  const popularExperiences = popularExperiencesRaw.toJS() || [];
  const items = laborRightsMenuEntries.map(({ id, title, coverUrl }) => ({
    link: `/labor-rights/${id}`,
    coverUrl,
    title,
  }));
  return (
    <main>
      <StaticHelmet.LandingPage />
      <Banner />
      <ShareExpSection heading="現在就留下你的資料" />
      <Section padding bg="white">
        <Wrapper size="l">
          <Heading size="l" center marginBottom>
            勞動知識小教室
          </Heading>
          <Columns Item={LaborRightsEntry} items={items} />
        </Wrapper>
        <Section center Tag="div">
          <Link
            className={cn('buttonCircleL', 'buttonBlack')}
            to="/labor-rights"
            title="勞動知識小教室"
          >
            看更多
          </Link>
        </Section>
      </Section>
      <Section padding>
        <Wrapper size="l">
          <Heading size="l" center marginBottom>
            最新經驗分享
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
        <FanPageBlock />
      </Section>
    </main>
  );
};

LandingPage.propTypes = {
  laborRightsMenuEntries: PropTypes.array.isRequired,
  popularExperiences: ImmutablePropTypes.list.isRequired,
  laborRightsCount: PropTypes.number.isRequired,
  timeAndSalaryCount: PropTypes.number.isRequired,
};

const hoc = compose(
  ssr,
  queryData,
);

export default hoc(LandingPage);
