import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose, setStatic } from 'recompose';
import Loader from 'common/Loader';
import Columns from 'common/Columns';
import { Section, Wrapper, Heading } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { useShareLink } from 'hooks/experiments';
import { queryMenu } from '../../actions/laborRights';
import { isFetching, isError, isFetched } from '../../constants/status';
import LaborRightsEntry from './LaborRightsEntry';
import StaticHelmet from 'common/StaticHelmet';
import styles from './LaborRightsEntry.module.css';

const LaborRightsMenu = ({
  queryMenuIfUnfetched,
  menuStatus: status,
  menuEntries: entries,
  menuError,
}) => {
  useEffect(() => {
    queryMenuIfUnfetched();
  }, [queryMenuIfUnfetched]);

  const shareLink = useShareLink();

  const title = '勞動知識小教室';
  // eslint-disable-next-line no-shadow
  const items = entries.map(({ id, title, coverUrl }) => ({
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
        <StaticHelmet.LaborRightsMenu />
        {isFetching(status) && <Loader />}
        {isError(status) && menuError && (
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
};

LaborRightsMenu.propTypes = {
  menuEntries: PropTypes.array.isRequired,
  menuStatus: PropTypes.string.isRequired,
  menuError: PropTypes.object,
  queryMenuIfUnfetched: PropTypes.func.isRequired,
};

const ssr = setStatic('fetchData', ({ store }) => {
  return store.dispatch(queryMenu());
});

const hoc = compose(ssr);

export default hoc(LaborRightsMenu);
