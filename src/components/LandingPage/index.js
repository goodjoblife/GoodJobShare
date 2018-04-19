import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import cn from 'classnames';
import Helmet from 'react-helmet';
import { Section, Wrapper, Heading } from 'common/base';
import ShareExpSection from 'common/ShareExpSection';
import Columns from 'common/Columns';
import ExperienceBlock from '../ExperienceSearch/ExperienceBlock';
import { queryPopularExperiences } from '../../actions/popularExperiences';
import { queryMenu } from '../../actions/laborRights';
import LaborRightsEntry from '../LaborRightsMenu/LaborRightsEntry';
import Banner from './Banner';
import Dashboard from './Dashboard';
import { HELMET_DATA } from '../../constants/helmetData';

class LandingPage extends Component {
  static fetchData({ store: { dispatch } }) {
    return Promise.all([
      dispatch(queryPopularExperiences()),
      dispatch(queryMenu()),
    ]);
  }

  static propTypes = {
    queryPopularExperiences: PropTypes.func.isRequired,
    queryMenuIfUnfetched: PropTypes.func.isRequired,
    queryTimeAndSalaryCount: PropTypes.func.isRequired,
    laborRightsMenuEntries: ImmutablePropTypes.list.isRequired,
    popularExperiences: ImmutablePropTypes.list.isRequired,
    laborRightsCount: PropTypes.number.isRequired,
    timeAndSalaryCount: PropTypes.number.isRequired,
  }

  componentDidMount() {
    if (this.props.popularExperiences.size === 0) {
      this.props.queryPopularExperiences();
    }
    this.props.queryMenuIfUnfetched();
    this.props.queryTimeAndSalaryCount();
  }

  render() {
    const popularExperiences = this.props.popularExperiences.take(3).toJS() || [];
    const items = this.props.laborRightsMenuEntries.toJS().map(({ id, title, coverUrl }) => ({
      link: `/labor-rights/${id}`,
      coverUrl,
      title,
    }));
    const { timeAndSalaryCount, laborRightsCount } = this.props;
    return (
      <main>
        <Helmet {...HELMET_DATA.LANDING_PAGE} />
        <Banner />
        <Dashboard timeAndSalaryCount={timeAndSalaryCount} laborRightsCount={laborRightsCount} />
        <ShareExpSection heading="現在就留下你的資料" />
        <Section padding bg="white">
          <Wrapper size="l">
            <Heading size="l" center marginBottom>勞動知識小教室</Heading>
            <Columns
              Item={LaborRightsEntry}
              items={items}
            />
          </Wrapper>
          <Section center Tag="div">
            <Link className={cn('buttonCircleL', 'buttonBlack')} to="/labor-rights" title="勞動知識小教室">
              看更多
            </Link>
          </Section>
        </Section>
        <Section padding>
          <Wrapper size="l">
            <Heading size="l" center marginBottom>熱門分享</Heading>
            <Columns
              Item={ExperienceBlock}
              items={popularExperiences.map(data => ({ data, size: 'm' }))}
              gutter="s"
            />
            <Section center Tag="div">
              <Link className={cn('buttonCircleL', 'buttonBlack')} to="/experiences/search" title="面試工作經驗">
                看更多
              </Link>
            </Section>
          </Wrapper>
        </Section>
      </main>
    );
  }
}

export default LandingPage;
