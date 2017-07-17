import React, { Component, PropTypes } from 'react';
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
import HomeBanner from './HomeBanner';
import helmetData from '../../constants/helmetData';

class LandingPage extends Component {
  static fetchData({ store: { dispatch } }) {
    return Promise.all([
      dispatch(fetchExperiences('sort', '')),
      dispatch(fetchMetaListIfNeeded()),
    ]);
  }
  static propTypes = {
    fetchExperiences: PropTypes.func.isRequired,
    experienceSearch: ImmutablePropTypes.map.isRequired,
    fetchMetaListIfNeeded: React.PropTypes.func.isRequired,
    laborRightsMetaList: ImmutablePropTypes.list.isRequired,
  }
  componentDidMount() {
    Promise.all([
      this.props.fetchExperiences('sort', ''),
      this.props.fetchMetaListIfNeeded(),
    ]);
  }

  renderHelmet = () => {
    const data = helmetData.LANDING_PAGE;
    return (
      <Helmet
        title={data.title}
        meta={data.meta}
      />
    );
  }
  render() {
    const expDatas = this.props.experienceSearch.toJS().experiences || [];
    expDatas.sort((a, b) => {
      if (a.like_count < b.like_count) {
        return 1;
      }
      if (a.like_count > b.like_count) {
        return -1;
      }
      return 0;
    });
    return (
      <main>
        {this.renderHelmet()}
        <HomeBanner />
        <Section padding>
          <Wrapper size="l">
            <Heading size="l" center marginBottom>熱門分享</Heading>
            <Columns
              Item={ExperienceBlock}
              items={expDatas.slice(0, 3).map(data => ({ data, size: 'm' }))}
            />
            <Section center Tag="div">
              <Link className={cn('buttonCircleL', 'buttonBlack')} to="/experiences/search" title="面試工作經驗">
                看更多
              </Link>
            </Section>
          </Wrapper>
        </Section>
        <Section padding bg="white">
          <Wrapper size="l">
            <Heading size="l" center marginBottom>勞動知識小教室</Heading>
            <Columns
              Item={LaborRightsEntry}
              items={this.props.laborRightsMetaList.toJS()}
            />
          </Wrapper>
          <Section center Tag="div">
            <Link className={cn('buttonCircleL', 'buttonBlack')} to="/labor-rights" title="勞動知識小教室">
              看更多
            </Link>
          </Section>
        </Section>
        <ShareExpSection heading="現在就留下你的資料吧！" />
      </main>
    );
  }
}

export default LandingPage;
