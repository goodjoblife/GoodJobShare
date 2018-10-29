import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { compose, setStatic } from 'recompose';
import Loader from 'common/Loader';
import Columns from 'common/Columns';
import { Section, Wrapper, Heading } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { queryMenu } from '../../actions/laborRights';
import { isFetching, isError, isFetched } from '../../constants/status';
import { shareLink } from '../../constants/dataProgress';
import LaborRightsEntry from './LaborRightsEntry';
import { HELMET_DATA } from '../../constants/helmetData';
import styles from './LaborRightsEntry.module.css';

class LaborRightsMenu extends React.Component {
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
        <Wrapper size="l">
          <Helmet {...HELMET_DATA.LABOR_RIGHTS_MENU} />
          {isFetching(status) && <Loader />}
          {isError(status) &&
            menuError && (
              <Heading center size="m" Tag="div">
                {menuError.toString()}
              </Heading>
            )}
          {isFetched(status) && (
            <section>
              <Heading size="l" center marginBottom>
                {title}
              </Heading>
              <Columns Item={LaborRightsEntry} items={items} />
            </section>
          )}
        </Wrapper>
        <Wrapper size="s">
          <FanPageBlock className={styles.fanPageBlock} />
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

const ssr = setStatic('fetchData', ({ store }) => {
  return store.dispatch(queryMenu());
});

const hoc = compose(ssr);

export default hoc(LaborRightsMenu);
