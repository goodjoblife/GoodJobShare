import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import cn from 'classnames';
import Helmet from 'react-helmet';
import { Section, Wrapper, Heading } from 'common/base';
import ShareExpSection from 'common/ShareExpSection';
import Columns from 'common/Columns';
import ExperienceBlock from '../ExperienceSearch/ExperienceBlock';
import { fetchExperiences } from '../../actions/experienceSearch';
import { fetchMetaListIfNeeded } from '../../actions/laborRightsMenu';
import LaborRightsEntry from '../LaborRightsMenu/LaborRightsEntry';
import Banner from './Banner';
import Dashboard from './Dashboard';
import { HELMET_DATA } from '../../constants/helmetData';

class LandingPage extends Component {
  static fetchData({ store: { dispatch } }) {
    return Promise.all([
      dispatch(fetchExperiences(1, 3, 'popularity', 'created_at', '', ['interview', 'work'])),
      dispatch(fetchMetaListIfNeeded()),
    ]);
  }
  static propTypes = {
    fetchExperiences: PropTypes.func.isRequired,
    experienceSearch: ImmutablePropTypes.map.isRequired,
    fetchMetaListIfNeeded: PropTypes.func.isRequired,
    laborRightsMetaList: ImmutablePropTypes.list.isRequired,
  }
  componentDidMount() {
    Promise.all([
      this.props.fetchExperiences(1, 3, 'popularity', 'created_at', '', ['interview', 'work']),
      this.props.fetchMetaListIfNeeded(),
    ]);
  }

  render() {
    const expData = this.props.experienceSearch.toJS().experiences || [];
    const items = this.props.laborRightsMetaList.toJS().map(({ id, title, coverUrl }) => ({
      link: `/labor-rights/${id}`,
      coverUrl,
      title,
    }));
    return (
      <main>
        <Helmet {...HELMET_DATA.LANDING_PAGE} />
        <Banner />
        <Dashboard />
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
              items={expData.map(data => ({ data, size: 'm' }))}
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
