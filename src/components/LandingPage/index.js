import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import { Section, Wrapper, Heading } from 'common/base';
import ShareExpSection from 'common/ShareExpSection';
import columnStyle from 'common/Columns.module.css';
import ExperienceBlock from '../ExperienceSearch/ExperienceBlock';
import { fetchExperiences } from '../../actions/experienceSearch';
import HomeBanner from './HomeBanner';

class LandingPage extends Component {
  static fetchData({ store: { dispatch } }) {
    return dispatch(fetchExperiences('sort', ''));
  }
  static propTypes = {
    fetchExperiences: PropTypes.func.isRequired,
    experienceSearch: ImmutablePropTypes.map.isRequired,
  }
  componentDidMount() {
    this.props.fetchExperiences('sort', '');
  }
  render() {
    const expDatas = this.props.experienceSearch.toJS().experiences || [];
    console.log(expDatas);
    return (
      <main>
        <Helmet
          title="首頁"
        />
        <HomeBanner />
        <Section padding>
          <Wrapper size="l">
            <Heading size="l" center marginBottom>熱門分享</Heading>
            <div className={columnStyle.columns}>
              {
                expDatas.filter((elem, index) => index < 3).map(data => (
                  <div className={columnStyle.column} key={data._id}>
                    <ExperienceBlock data={data} size="m" />
                  </div>
                ))
              }
            </div>
          </Wrapper>
        </Section>
        <Section padding bg="white">
          <Wrapper size="l">
            <Heading size="l" center marginBottom>勞動知識小教室</Heading>
          </Wrapper>
        </Section>
        <ShareExpSection heading="現在就留下你的資料吧！" />
      </main>
    );
  }
}

export default LandingPage;
