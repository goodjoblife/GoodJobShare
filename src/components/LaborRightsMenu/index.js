import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loader from 'common/Loader';
import Columns from 'common/Columns';
import { Section, Wrapper, Heading } from 'common/base';
import { queryMenu } from '../../actions/laborRights';
import fetchingStatus from '../../constants/status';
import { shareLink } from '../../constants/dataProgress';
import LaborRightsEntry from './LaborRightsEntry';
import About from './About';
import { HELMET_DATA } from '../../constants/helmetData';

class LaborRightsMenu extends React.Component {
  static fetchData({ store }) {
    return store.dispatch(queryMenu());
  }

  componentDidMount() {
    this.props.queryMenuIfUnfetched();
  }

  render() {
    const title = '勞動知識小教室';
    const { menuStatus: status, menuError, menuEntries: entries } = this.props;
    // eslint-disable-next-line no-shadow
    const items = entries.toJS().map(({ id, title, coverUrl }) => ({
      link: `/labor-rights/${id}`,
      coverUrl,
      title,
    }));
    items.splice(4, 0, {
      link: shareLink,
      coverUrl: 'https://image.goodjob.life/banners/banner3_2x.jpg',
      title: '留下你的面試經驗、工作經驗',
    });
    return (
      <Section Tag="main" pageTop>
        <Wrapper size="l" Tag="main">
          <Helmet {...HELMET_DATA.LABOR_RIGHTS_MENU} />
          {status === fetchingStatus.FETCHING && <Loader />}
          {
            status === fetchingStatus.ERROR && menuError &&
              <Heading center size="m" Tag="div">{menuError.toString()}</Heading>
          }
          {
            status === fetchingStatus.FETCHED &&
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
  menuEntries: ImmutablePropTypes.list.isRequired,
  menuStatus: PropTypes.string.isRequired,
  menuError: ImmutablePropTypes.map,
  queryMenuIfUnfetched: PropTypes.func.isRequired,
};

export default LaborRightsMenu;
