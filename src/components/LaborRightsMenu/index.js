import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loader from 'common/Loader';
import Columns from 'common/Columns';
import { Section, Wrapper, Heading } from 'common/base';
import getCallToActionLink from 'utils/callToActionUtils';
import {
  fetchMetaListIfNeeded,
} from '../../actions/laborRightsMenu';
import status from '../../constants/status';
import LaborRightsEntry from './LaborRightsEntry';
import About from './About';
import { HELMET_DATA } from '../../constants/helmetData';

class LaborRightsMenu extends React.Component {
  static fetchData({ store }) {
    return store.dispatch(fetchMetaListIfNeeded());
  }

  componentDidMount() {
    this.props.fetchMetaListIfNeeded();
  }

  render() {
    const title = '勞動知識小教室';
    // eslint-disable-next-line no-shadow
    const items = this.props.metaList.toJS().map(({ id, title, coverUrl }) => ({
      link: `/labor-rights/${id}`,
      coverUrl,
      title,
    }));
    items.splice(4, 0, {
      link: getCallToActionLink(),
      coverUrl: 'https://image.goodjob.life/banners/banner3_2x.jpg',
      title: '留下你的面試經驗、工作經驗',
    });
    return (
      <Section Tag="main" pageTop>
        <Wrapper size="l" Tag="main">
          <Helmet {...HELMET_DATA.LABOR_RIGHTS_MENU} />
          {this.props.status === status.FETCHING && <Loader />}
          {
            this.props.status === status.ERROR && this.props.error &&
              <Heading center size="m" Tag="div">{this.props.error.toString()}</Heading>
          }
          {
            this.props.status === status.FETCHED &&
              <section>
                <Heading size="l" center marginBottom>{title}</Heading>
                <Columns
                  Item={LaborRightsEntry}
                  items={items}
                />
              </section>
          }
        </Wrapper>
        <Wrapper size="s">
          <About />
        </Wrapper>
      </Section>
    );
  }
}

LaborRightsMenu.propTypes = {
  metaList: ImmutablePropTypes.list.isRequired,
  fetchMetaListIfNeeded: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  error: ImmutablePropTypes.map,
};

export default LaborRightsMenu;
